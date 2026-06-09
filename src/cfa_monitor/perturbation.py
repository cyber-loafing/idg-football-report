from __future__ import annotations

from dataclasses import dataclass
from hashlib import sha256
import copy
import json
import math
from pathlib import Path
from typing import Any

from .config import PERFORM_COMPETITION_ID, Settings


RangeSpec = dict[str, Any]


COUNT_RANGE: RangeSpec = {"method": "delta", "min": -2, "max": 2, "rounding": "int", "clamp_min": 0, "clamp_max": None}
BIG_COUNT_RANGE: RangeSpec = {"method": "percent", "min": -5, "max": 5, "rounding": "int", "clamp_min": 0, "clamp_max": None}
SMALL_DECIMAL_RANGE: RangeSpec = {"method": "delta", "min": -0.2, "max": 0.2, "rounding": "decimal2", "clamp_min": 0, "clamp_max": None}
DISTANCE_RANGE: RangeSpec = {"method": "percent", "min": -3, "max": 3, "rounding": "int", "clamp_min": 0, "clamp_max": None}
MATRIX_RANGE: RangeSpec = {"method": "delta", "min": -2, "max": 2, "rounding": "int", "clamp_min": 0, "clamp_max": None}
PERCENT_RANGE: RangeSpec = {"method": "delta", "min": -5, "max": 5, "rounding": "decimal1", "clamp_min": 0, "clamp_max": 100}


@dataclass(frozen=True)
class FieldDefinition:
    field_id: str
    label: str
    page: str
    source: str
    value_type: str
    perturbable: bool
    default_range: RangeSpec | None
    constraints: str
    notes: str
    targets: tuple[dict[str, Any], ...] = ()

    def catalog_row(self) -> dict[str, Any]:
        return {
            "field_id": self.field_id,
            "label": self.label,
            "page": self.page,
            "source": self.source,
            "value_type": self.value_type,
            "perturbable": self.perturbable,
            "default_range": self.default_range,
            "constraints": self.constraints,
            "notes": self.notes,
        }


def locked(field_id: str, label: str, page: str, source: str, notes: str) -> FieldDefinition:
    return FieldDefinition(
        field_id=field_id,
        label=label,
        page=page,
        source=source,
        value_type="identity",
        perturbable=False,
        default_range=None,
        constraints="不可扰动",
        notes=notes,
    )


def team_stat(
    field_id: str,
    label: str,
    keys: list[str],
    *,
    range_spec: RangeSpec = COUNT_RANGE,
    source: str = "matchstats",
    value_type: str = "count",
    constraints: str = "整数，最小值 0",
    notes: str = "",
) -> FieldDefinition:
    return FieldDefinition(
        field_id=field_id,
        label=label,
        page="球队数据",
        source=f"{source}:team.stat[{', '.join(keys)}]",
        value_type=value_type,
        perturbable=True,
        default_range=range_spec,
        constraints=constraints,
        notes=notes,
        targets=({"source": source, "kind": "stat", "scope": "team", "keys": tuple(keys)},),
    )


def player_stat(
    field_id: str,
    label: str,
    page: str,
    keys: list[str],
    *,
    range_spec: RangeSpec = COUNT_RANGE,
    value_type: str = "count",
    constraints: str = "整数，最小值 0",
    notes: str = "",
) -> FieldDefinition:
    return FieldDefinition(
        field_id=field_id,
        label=label,
        page=page,
        source=f"matchstats:player.stat[{', '.join(keys)}]",
        value_type=value_type,
        perturbable=True,
        default_range=range_spec,
        constraints=constraints,
        notes=notes,
        targets=({"source": "matchstats", "kind": "stat", "scope": "player", "keys": tuple(keys)},),
    )


def derived(field_id: str, label: str, page: str, source: str, notes: str) -> FieldDefinition:
    return FieldDefinition(
        field_id=field_id,
        label=label,
        page=page,
        source=source,
        value_type="derived",
        perturbable=False,
        default_range=None,
        constraints="由分子/分母字段计算，不单独扰动",
        notes=notes,
    )


def build_catalog() -> list[FieldDefinition]:
    header = [
        locked("header.datetime", "比赛时间", "比赛头部", "matchInfo.localDate/localTime", "保持赛程信息真实"),
        locked("header.status", "比赛状态", "比赛头部", "liveData.matchDetails.matchStatus", "避免影响页面状态流转"),
        locked("header.competition", "赛事/阶段", "比赛头部", "matchInfo.competition/stage", "文本身份字段不扰动"),
        locked("header.venue", "场地", "比赛头部", "matchInfo.venue", "文本身份字段不扰动"),
        locked("header.teams", "球队名/国旗", "比赛头部", "matchInfo.contestant", "身份字段不扰动"),
        locked("header.score", "比分", "比赛头部", "liveData.matchDetails.scores", "比分需要联动进球事件，首版不单独扰动"),
    ]

    team = [
        team_stat("team.xg", "xG", ["expectedGoals", "expectedGoal", "xG", "expected_goals"], range_spec=SMALL_DECIMAL_RANGE, source="expected_goals", value_type="decimal", constraints="小数，最小值 0"),
        team_stat("team.shots", "射门", ["totalScoringAtt", "totalShots", "shots"]),
        team_stat("team.shots_on", "射正", ["ontargetScoringAtt", "onTargetScoringAtt", "shotOnTarget", "shotsOnTarget"], constraints="整数，0 <= 射正 <= 射门"),
        team_stat("team.shots_ibox", "禁区内射门", ["attemptsIbox", "totalAttemptsIbox", "attIboxTotal"]),
        derived("team.shots_obox", "禁区外射门", "球队数据", "totalScoringAtt - attemptsIbox", "由总射门和禁区内射门自动计算"),
        team_stat("team.hit_woodwork", "击中门框", ["hitWoodwork", "postScoringAtt"]),
        team_stat("team.big_chance", "绝佳机会", ["bigChanceCreated"]),
        team_stat("team.touches_opp_box", "对方禁区内触球", ["touchesInOppBox", "touchesInPenaltyArea", "penAreaTouches"]),
        team_stat("team.final_third_entries", "攻入进攻三区", ["finalThirdEntries"]),
        team_stat("team.corners", "角球", ["wonCorners", "cornerTaken", "corners"], notes="球队数据中重复出现时共享同一原始字段"),
        team_stat("team.offsides", "越位", ["totalOffside", "offsides"]),
        team_stat(
            "team.possession",
            "控球率",
            ["possessionPercentage", "possession", "possessionPct"],
            range_spec=PERCENT_RANGE,
            value_type="decimal",
            constraints="百分比，0 <= 控球率 <= 100",
        ),
        team_stat("team.passes", "传球", ["totalPass", "passes"], range_spec=BIG_COUNT_RANGE),
        derived("team.accurate_passes", "传球成功", "球队数据", "sum(passmatrix.playerPass.value)", "由传球矩阵自动汇总"),
        derived("team.pass_accuracy", "传球成功率", "球队数据", "accuratePass / totalPass", "由传球成功和传球自动计算"),
        team_stat("team.opp_half_passes", "对方半场传球", ["totalFwdZonePass", "fwdZonePasses"], range_spec=BIG_COUNT_RANGE),
        derived("team.opp_half_pass_accuracy", "对方半场传球成功率", "球队数据", "accurateFwdZonePass / totalFwdZonePass", "由分子/分母自动计算"),
        team_stat("team.final_third_passes", "进攻三区传球", ["totalFinalThirdPasses", "finalThirdPasses"], range_spec=BIG_COUNT_RANGE),
        team_stat("team.accurate_final_third_passes", "进攻三区传球成功", ["successfulFinalThirdPasses", "accurateFinalThirdPasses"], range_spec=BIG_COUNT_RANGE, constraints="整数，0 <= 成功 <= 总数"),
        derived("team.final_third_pass_accuracy", "进攻三区传球成功率", "球队数据", "successfulFinalThirdPasses / totalFinalThirdPasses", "由分子/分母自动计算"),
        team_stat("team.crosses", "传中", ["totalCross", "crosses"]),
        team_stat("team.accurate_crosses", "传中成功", ["accurateCross", "successfulCrosses"], constraints="整数，0 <= 传中成功 <= 传中"),
        team_stat("team.touches", "触球", ["touches", "touchesBall", "totalTouches"], range_spec=BIG_COUNT_RANGE),
        team_stat("team.dribble_attempts", "尝试过人", ["totalContest", "dribbles"]),
        team_stat("team.dribbles_won", "过人成功", ["wonContest", "successfulDribbles"], constraints="整数，0 <= 过人成功 <= 尝试过人"),
        derived("team.dribble_accuracy", "过人成功率", "球队数据", "wonContest / totalContest", "由过人成功和尝试过人自动计算"),
        team_stat("team.duels", "争抢", ["duelLost"], notes="通过调整失败争抢影响总争抢；成功争抢单独配置"),
        team_stat("team.duels_won", "争抢成功", ["duelWon", "duelsWon"]),
        derived("team.duel_accuracy", "争抢成功率", "球队数据", "duelWon / (duelWon + duelLost)", "由成功/失败争抢自动计算"),
        team_stat("team.aerial_duels", "高空球争抢", ["aerialLost"], notes="通过调整失败高空球影响总高空球争抢；成功项单独配置"),
        team_stat("team.aerial_won", "高空球成功", ["aerialWon", "aerialDuelsWon"]),
        derived("team.aerial_accuracy", "高空球争抢成功率", "球队数据", "aerialWon / (aerialWon + aerialLost)", "由成功/失败高空球自动计算"),
        team_stat("team.poss_won_final_third", "进攻三区获得球权", ["possWonAtt3rd", "possWonFinalThird"]),
        team_stat("team.recoveries", "夺回球权", ["ballRecovery", "possWon", "recoveries"]),
        team_stat("team.tackle_attempts", "尝试抢断", ["totalTackle", "tacklesAttempted"]),
        team_stat("team.tackles", "抢断", ["wonTackle", "tacklesWon"], constraints="整数，0 <= 抢断 <= 尝试抢断"),
        team_stat("team.clearances", "解围", ["totalClearance", "clearances"]),
        team_stat("team.interceptions", "拦截", ["interception", "interceptions"]),
        team_stat("team.blocks", "封堵", ["blockedScoringAtt", "blockedShots"]),
        team_stat("team.possession_lost", "丢失球权", ["possLostAll", "possLost", "turnovers"], range_spec=BIG_COUNT_RANGE),
        team_stat("team.fouls", "犯规", ["fkFoulLost", "fouls", "totalFouls"]),
        team_stat("team.fouls_won", "被犯规", ["fkFoulWon", "foulsWon"]),
        locked("team.yellow_cards", "黄牌", "球队数据", "matchstats:card aggregation", "由红黄牌事件自动汇总"),
        locked("team.red_cards", "红牌", "球队数据", "matchstats:card aggregation", "由红黄牌事件自动汇总"),
    ]

    player_attack = [
        locked("player.attack.goals", "进球", "球员进攻", "matchstats:goal aggregation", "由进球事件自动汇总"),
        player_stat("player.attack.shots", "射门", "球员进攻", ["totalScoringAtt", "totalShots", "shots"]),
        player_stat("player.attack.shots_on", "射正", "球员进攻", ["ontargetScoringAtt", "onTargetScoringAtt", "shotsOnTarget"], constraints="整数，0 <= 射正 <= 射门"),
        player_stat("player.attack.shots_ibox", "禁区内射门", "球员进攻", ["attemptsIbox", "totalAttemptsIbox"]),
        derived("player.attack.shots_obox", "禁区外射门", "球员进攻", "totalScoringAtt - attemptsIbox", "由总射门和禁区内射门自动计算"),
        player_stat("player.attack.touches_opp_box", "对方禁区内触球", "球员进攻", ["touchesInOppBox"]),
        player_stat("player.attack.offsides", "越位", "球员进攻", ["totalOffside", "offsides"]),
        player_stat("player.attack.big_chances", "绝佳机会", "球员进攻", ["bigChanceCreated"]),
        player_stat("player.attack.final_third_entries", "攻入进攻三区", "球员进攻", ["finalThirdEntries"]),
    ]

    player_passing = [
        player_stat("player.passing.assists", "助攻", "球员传球", ["goalAssist", "assists", "assist"]),
        player_stat("player.passing.chances", "创造机会", "球员传球", ["totalAttAssist", "attAssist"]),
        player_stat("player.passing.touches", "触球", "球员传球", ["touches", "touchesBall", "totalTouches"], range_spec=BIG_COUNT_RANGE),
        player_stat("player.passing.passes", "传球", "球员传球", ["totalPass", "passes"], range_spec=BIG_COUNT_RANGE),
        derived("player.passing.accurate_passes", "传球成功", "球员传球", "sum(playerPass.value)", "由传球矩阵自动汇总"),
        derived("player.passing.pass_accuracy", "传球成功率%", "球员传球", "accuratePass / totalPass", "由传球成功和传球自动计算"),
        player_stat("player.passing.final_third_passes", "进攻三区传球", "球员传球", ["totalFinalThirdPasses", "finalThirdPasses"], range_spec=BIG_COUNT_RANGE),
        derived("player.passing.final_third_pass_accuracy", "进攻三区传球成功率%", "球员传球", "successfulFinalThirdPasses / totalFinalThirdPasses", "由分子/分母自动计算"),
        player_stat("player.passing.crosses", "传中", "球员传球", ["totalCross", "crosses"]),
    ]

    player_general = [
        player_stat("player.general.dribble_attempts", "尝试过人", "综合数据", ["totalContest", "dribbles"]),
        player_stat("player.general.dribbles_won", "过人", "综合数据", ["wonContest", "successfulDribbles"], constraints="整数，0 <= 过人 <= 尝试过人"),
        player_stat("player.general.duels", "争抢", "综合数据", ["duelLost"], notes="通过调整失败争抢影响总争抢；成功争抢单独配置"),
        player_stat("player.general.duels_won", "争抢成功", "综合数据", ["duelWon", "duelsWon"]),
        player_stat("player.general.aerial_duels", "高空球争抢", "综合数据", ["aerialLost"], notes="通过调整失败高空球影响总高空球争抢；成功项单独配置"),
        player_stat("player.general.aerial_won", "高空球争抢成功", "综合数据", ["aerialWon", "aerialDuelsWon"]),
        player_stat("player.general.recoveries", "获得球权", "综合数据", ["ballRecovery", "possWon", "recoveries"], range_spec=BIG_COUNT_RANGE),
        player_stat("player.general.final_third_recoveries", "进攻三区获得球权", "综合数据", ["possWonAtt3rd"]),
        player_stat("player.general.losses", "失去球权", "综合数据", ["possLostAll", "possLost", "turnovers"], range_spec=BIG_COUNT_RANGE),
    ]

    player_defense = [
        player_stat("player.defense.tackle_attempts", "尝试抢断", "防守数据", ["totalTackle"]),
        player_stat("player.defense.tackles", "抢断", "防守数据", ["wonTackle", "tacklesWon"], constraints="整数，0 <= 抢断 <= 尝试抢断"),
        player_stat("player.defense.interceptions", "拦截", "防守数据", ["interception", "interceptions"]),
        player_stat("player.defense.fouls", "犯规", "防守数据", ["fouls", "fkFoulLost"]),
        player_stat("player.defense.fouls_won", "被犯规", "防守数据", ["wasFouled", "fkFoulWon"]),
        locked("player.defense.yellow_cards", "黄牌", "防守数据", "matchstats:card aggregation", "由红黄牌事件自动汇总"),
        locked("player.defense.red_cards", "红牌", "防守数据", "matchstats:card aggregation", "由红黄牌事件自动汇总"),
        player_stat("player.defense.saves", "扑救", "防守数据", ["saves"]),
        player_stat("player.defense.clearances", "解围", "防守数据", ["totalClearance", "effectiveClearance", "clearances"]),
    ]

    lineup_events = [
        locked("lineup.pitch", "首发阵容球场", "阵容", "matchstats:lineUp/player", "阵型位置、首发身份和球员坐标不扰动"),
        locked("lineup.roster", "首发/替补名单", "阵容", "matchstats:lineUp/player", "名单身份不扰动"),
        locked("events.minute", "事件分钟", "比赛事件", "matchstats:goal/card/substitute", "时间线不扰动"),
        locked("events.goal", "进球事件", "比赛事件", "matchstats:goal", "进球事件需联动比分，首版不扰动"),
        locked("events.card", "红黄牌事件", "比赛事件", "matchstats:card", "纪律事件首版不扰动"),
        locked("events.substitution", "换人事件", "比赛事件", "matchstats:substitute", "阵容联动事件首版不扰动"),
    ]

    matrix = [
        FieldDefinition(
            field_id="matrix.pass_value",
            label="球员间传球次数",
            page="传球矩阵",
            source="passmatrix:player.playerPass.value",
            value_type="count",
            perturbable=True,
            default_range=MATRIX_RANGE,
            constraints="整数，最小值 0",
            notes="传球者、接球者和球员坐标不扰动",
            targets=({"source": "passmatrix", "kind": "passmatrix", "keys": ("value",)},),
        )
    ]

    fitness = [
        locked("fitness.team.total_distance", "球队总跑动", "体能数据", "sum(Players.TotalDistance)", "由球员总跑动自动汇总"),
        locked("fitness.team.sprint_distance", "球队冲刺距离", "体能数据", "sum(Players.SprintingDistance)", "由球员冲刺距离自动汇总"),
        locked("fitness.team.offensive_distance", "球队进攻跑动", "体能数据", "sum(Players.OffensiveDistance)", "由球员进攻跑动自动汇总"),
        locked("fitness.team.defensive_distance", "球队防守跑动", "体能数据", "sum(Players.DefensiveDistance)", "由球员防守跑动自动汇总"),
        FieldDefinition("fitness.player.total_distance", "球员总跑动", "体能数据", "zx_tnsj:Players.TotalDistance", "distance", True, DISTANCE_RANGE, "整数米，最小值 0", "姓名、号码、球队不扰动", ({"source": "zx_tnsj", "kind": "fitness", "scope": "player", "keys": ("TotalDistance",)},)),
        FieldDefinition("fitness.player.sprint_distance", "球员冲刺距离", "体能数据", "zx_tnsj:Players.SprintingDistance", "distance", True, DISTANCE_RANGE, "整数米，最小值 0", "姓名、号码、球队不扰动", ({"source": "zx_tnsj", "kind": "fitness", "scope": "player", "keys": ("SprintingDistance",)},)),
    ]

    return header + team + player_attack + player_passing + player_general + player_defense + lineup_events + matrix + fitness


CATALOG = build_catalog()
CATALOG_BY_ID = {field.field_id: field for field in CATALOG}


class PerturbationError(ValueError):
    pass


class PerturbationService:
    def __init__(self, settings: Settings):
        self.settings = settings
        self.policy_path = settings.perturbation_policy_path or settings.data_dir / "perturbation_policy.json"

    def catalog(self) -> list[dict[str, Any]]:
        return [field.catalog_row() for field in CATALOG]

    def default_policy_for(self, field: FieldDefinition) -> dict[str, Any]:
        range_spec = field.default_range or {"method": "delta", "min": 0, "max": 0, "rounding": "int", "clamp_min": 0, "clamp_max": None}
        return {
            "enabled": False,
            "method": range_spec.get("method", "delta"),
            "min": range_spec.get("min", 0),
            "max": range_spec.get("max", 0),
            "rounding": range_spec.get("rounding", "int"),
            "clamp_min": range_spec.get("clamp_min"),
            "clamp_max": range_spec.get("clamp_max"),
        }

    def load_policy(self) -> dict[str, Any]:
        raw = self._read_policy_file()
        raw_fields = raw.get("fields", {}) if isinstance(raw, dict) else {}
        fields = {}
        for field in CATALOG:
            rule = self.default_policy_for(field)
            override = raw_fields.get(field.field_id, {}) if isinstance(raw_fields, dict) else {}
            if isinstance(override, dict):
                rule.update({key: override[key] for key in rule if key in override})
            if not field.perturbable:
                rule["enabled"] = False
            fields[field.field_id] = rule
        return {"version": 1, "fields": fields}

    def save_policy(self, payload: dict[str, Any]) -> dict[str, Any]:
        if not isinstance(payload, dict):
            raise PerturbationError("Policy payload must be an object.")
        payload_fields = payload.get("fields", payload)
        if not isinstance(payload_fields, dict):
            raise PerturbationError("Policy fields must be an object.")

        current = self.load_policy()["fields"]
        for field_id, incoming in payload_fields.items():
            if field_id not in CATALOG_BY_ID:
                raise PerturbationError(f"Unknown perturbation field: {field_id}")
            if not isinstance(incoming, dict):
                raise PerturbationError(f"Policy for {field_id} must be an object.")
            current[field_id] = self._normalize_rule(CATALOG_BY_ID[field_id], current[field_id] | incoming)

        saved = {"version": 1, "fields": current}
        self.policy_path.parent.mkdir(parents=True, exist_ok=True)
        self.policy_path.write_text(json.dumps(saved, ensure_ascii=False, indent=2, sort_keys=True), encoding="utf-8")
        return self.load_policy()

    def apply_latest_response(self, response: dict[str, Any], fixture_id: str) -> dict[str, Any]:
        policy = self.load_policy()
        if not self._has_enabled(policy):
            return response
        result = copy.deepcopy(response)
        for source_name, source_info in (result.get("sources") or {}).items():
            if isinstance(source_info, dict) and "payload" in source_info:
                source_info["payload"] = self.apply_source_payload(source_info["payload"], source_name, fixture_id, policy=policy)
        return result

    def apply_source_payload(self, payload: Any, source: str | None, fixture_id: str | None, *, policy: dict[str, Any] | None = None) -> Any:
        policy = policy or self.load_policy()
        if not source or not self._has_enabled(policy):
            return payload
        rules = self._rules_for_source(source, policy)
        if not rules:
            return payload

        result = copy.deepcopy(payload)
        if source in {"matchstats", "expected_goals"}:
            self._apply_stat_payload(result, source, fixture_id or "", rules)
        elif source == "passmatrix":
            self._apply_passmatrix_payload(result, fixture_id or "", rules)
        elif source == "zx_tnsj":
            self._apply_fitness_payload(result, fixture_id or "", rules)
        return result

    def source_from_bsapi(self, path: str, params: dict[str, Any]) -> tuple[str | None, str | None]:
        clean_path = path if path.startswith("/") else f"/{path}"
        if clean_path.endswith("/api/data/zx_tnsj") or clean_path == "/api/data/zx_tnsj":
            return "zx_tnsj", str(params.get("fixtureUuid") or "") or None

        url = str(params.get("url") or "")
        fixture_id = fixture_id_from_opta_url(url)
        if "/matchstats/" in url:
            return "matchstats", fixture_id
        if "/matchexpectedgoals/" in url:
            return "expected_goals", fixture_id
        if "/passmatrix/" in url:
            return "passmatrix", fixture_id
        return None, fixture_id

    def _read_policy_file(self) -> dict[str, Any]:
        if not self.policy_path.exists():
            return {"version": 1, "fields": {}}
        try:
            return json.loads(self.policy_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            raise PerturbationError(f"Invalid perturbation policy JSON: {exc}") from exc

    def _normalize_rule(self, field: FieldDefinition, rule: dict[str, Any]) -> dict[str, Any]:
        normalized = self.default_policy_for(field)
        normalized.update({key: rule.get(key, normalized[key]) for key in normalized})
        normalized["enabled"] = bool(normalized["enabled"]) and field.perturbable
        normalized["method"] = str(normalized["method"])
        normalized["rounding"] = str(normalized["rounding"])
        for key in ("min", "max", "clamp_min", "clamp_max"):
            if normalized[key] in ("", None):
                normalized[key] = None if key.startswith("clamp") else 0
            else:
                normalized[key] = float(normalized[key])
        if float(normalized["min"]) > float(normalized["max"]):
            raise PerturbationError(f"Invalid range for {field.field_id}: min cannot exceed max.")
        return normalized

    def _has_enabled(self, policy: dict[str, Any]) -> bool:
        fields = policy.get("fields") or {}
        return any(bool(rule.get("enabled")) for rule in fields.values() if isinstance(rule, dict))

    def _rules_for_source(self, source: str, policy: dict[str, Any]) -> dict[tuple[str, str, str], tuple[FieldDefinition, dict[str, Any]]]:
        rules: dict[tuple[str, str, str], tuple[FieldDefinition, dict[str, Any]]] = {}
        fields = policy.get("fields") or {}
        for field in CATALOG:
            rule = fields.get(field.field_id) or {}
            if not field.perturbable or not rule.get("enabled"):
                continue
            for target in field.targets:
                if target.get("source") != source:
                    continue
                for key in target.get("keys", ()):
                    rule_key = (str(target.get("kind")), str(target.get("scope", "")), str(key))
                    rules.setdefault(rule_key, (field, rule))
        return rules

    def _payload_body(self, payload: Any) -> Any:
        current = payload
        for _ in range(4):
            if isinstance(current, dict) and isinstance(current.get("result"), dict):
                current = current["result"]
            elif isinstance(current, dict) and isinstance(current.get("data"), dict) and "matchInfo" not in current:
                current = current["data"]
            elif isinstance(current, dict) and isinstance(current.get("Result"), dict):
                current = current["Result"]
            else:
                break
        return current

    def _apply_stat_payload(
        self,
        payload: Any,
        source: str,
        fixture_id: str,
        rules: dict[tuple[str, str, str], tuple[FieldDefinition, dict[str, Any]]],
    ) -> None:
        body = self._payload_body(payload)
        live = (body.get("liveData") or {}) if isinstance(body, dict) else {}
        lineups = live.get("lineUp") or live.get("lineup") or live.get("lineups") if isinstance(live, dict) else []
        for lineup_index, lineup in enumerate(lineups or []):
            if not isinstance(lineup, dict):
                continue
            team_context = str(lineup.get("contestantId") or lineup.get("teamId") or lineup.get("contestantName") or lineup_index)
            self._apply_stat_list(lineup.get("stat") or lineup.get("stats"), "team", source, fixture_id, team_context, rules)
            for player_index, player in enumerate(lineup.get("player") or lineup.get("players") or []):
                if not isinstance(player, dict):
                    continue
                player_context = str(player.get("playerId") or player.get("id") or player.get("shirtNumber") or player_index)
                self._apply_stat_list(player.get("stat") or player.get("stats"), "player", source, fixture_id, player_context, rules)
        self._rebalance_team_possession(lineups, rules)

    def _apply_stat_list(
        self,
        stats: Any,
        scope: str,
        source: str,
        fixture_id: str,
        context: str,
        rules: dict[tuple[str, str, str], tuple[FieldDefinition, dict[str, Any]]],
    ) -> None:
        if not isinstance(stats, list):
            return
        by_type = {str(stat.get("type") or stat.get("name")): stat for stat in stats if isinstance(stat, dict) and (stat.get("type") or stat.get("name"))}
        for stat_type, stat in by_type.items():
            rule_info = rules.get(("stat", scope, stat_type))
            if not rule_info:
                continue
            field, rule = rule_info
            original = stat.get("value", stat.get("total", stat.get("amount")))
            adjusted = self._perturb_value(original, rule, f"{fixture_id}:{source}:{field.field_id}:{scope}:{context}:{stat_type}")
            if "value" in stat:
                stat["value"] = adjusted
            elif "total" in stat:
                stat["total"] = adjusted
            elif "amount" in stat:
                stat["amount"] = adjusted
        self._derive_shot_breakdown(by_type)
        self._clamp_subset_constraints(by_type)
        self._clamp_stat_constraints(by_type)

    def _clamp_stat_constraints(self, by_type: dict[str, dict[str, Any]]) -> None:
        for made_key, total_key in (
            ("accuratePass", "totalPass"),
            ("successfulFinalThirdPasses", "totalFinalThirdPasses"),
            ("accurateCross", "totalCross"),
            ("wonContest", "totalContest"),
            ("wonTackle", "totalTackle"),
            ("ontargetScoringAtt", "totalScoringAtt"),
            ("goals", "totalScoringAtt"),
        ):
            if made_key in by_type and total_key in by_type:
                made = _numeric(_stat_value(by_type[made_key]))
                total = _numeric(_stat_value(by_type[total_key]))
                if made is not None and total is not None and made > total:
                    _set_stat_value(by_type[made_key], _format_like(_stat_value(by_type[made_key]), total, "int"))

    def _derive_shot_breakdown(self, by_type: dict[str, dict[str, Any]]) -> None:
        total_stat = next((by_type[key] for key in ("totalScoringAtt", "totalShots", "shots") if key in by_type), None)
        ibox_stat = next((by_type[key] for key in ("attemptsIbox", "totalAttemptsIbox", "attIboxTotal") if key in by_type), None)
        obox_stat = next((by_type[key] for key in ("attemptsObox", "totalAttemptsObox", "attOboxTotal") if key in by_type), None)
        if total_stat is None or ibox_stat is None or obox_stat is None:
            return

        total_value = _numeric(_stat_value(total_stat))
        ibox_value = _numeric(_stat_value(ibox_stat))
        if total_value is None or ibox_value is None:
            return
        ibox_value = min(max(ibox_value, 0), total_value)
        outside_value = max(total_value - ibox_value, 0)
        _set_stat_value(ibox_stat, _format_like(_stat_value(ibox_stat), ibox_value, "int"))
        _set_stat_value(obox_stat, _format_like(_stat_value(obox_stat), outside_value, "int"))

    def _clamp_subset_constraints(self, by_type: dict[str, dict[str, Any]]) -> None:
        for subset_keys, total_keys in (
            (("possWonAtt3rd", "possWonFinalThird"), ("ballRecovery", "possWon", "recoveries")),
            (("wonTackle", "tacklesWon"), ("totalTackle", "tacklesAttempted")),
            (("ontargetScoringAtt", "onTargetScoringAtt", "shotOnTarget", "shotsOnTarget"), ("totalScoringAtt", "totalShots", "shots")),
            (("goals", "goal", "totalGoals"), ("totalScoringAtt", "totalShots", "shots")),
            (("attemptsIbox", "totalAttemptsIbox", "attIboxTotal"), ("totalScoringAtt", "totalShots", "shots")),
        ):
            subset_stat = next((by_type[key] for key in subset_keys if key in by_type), None)
            total_stat = next((by_type[key] for key in total_keys if key in by_type), None)
            if subset_stat is None or total_stat is None:
                continue
            subset_value = _numeric(_stat_value(subset_stat))
            total_value = _numeric(_stat_value(total_stat))
            if subset_value is None or total_value is None:
                continue
            if subset_value > total_value:
                _set_stat_value(subset_stat, _format_like(_stat_value(subset_stat), total_value, "int"))

    def _rebalance_team_possession(
        self,
        lineups: Any,
        rules: dict[tuple[str, str, str], tuple[FieldDefinition, dict[str, Any]]],
    ) -> None:
        possession_rule = None
        possession_key_order = ("possessionPercentage", "possession", "possessionPct")
        for key in possession_key_order:
            rule_info = rules.get(("stat", "team", key))
            if rule_info:
                possession_rule = rule_info[1]
                break
        if possession_rule is None or not isinstance(lineups, list):
            return

        possession_stats: list[dict[str, Any]] = []
        for lineup in lineups:
            if not isinstance(lineup, dict):
                continue
            stats = lineup.get("stat") or lineup.get("stats")
            if not isinstance(stats, list):
                continue
            by_type = {str(stat.get("type") or stat.get("name")): stat for stat in stats if isinstance(stat, dict) and (stat.get("type") or stat.get("name"))}
            stat = next((by_type[key] for key in possession_key_order if key in by_type and _numeric(_stat_value(by_type[key])) is not None), None)
            if stat is not None:
                possession_stats.append(stat)
        if len(possession_stats) != 2:
            return

        first_original = _stat_value(possession_stats[0])
        first_value = _numeric(first_original)
        if first_value is None:
            return

        clamp_min = float(possession_rule.get("clamp_min", 0) or 0)
        clamp_max = float(possession_rule.get("clamp_max", 100) or 100)
        first_value = min(max(first_value, clamp_min), clamp_max)
        second_value = 100 - first_value
        second_value = min(max(second_value, clamp_min), clamp_max)
        first_value = 100 - second_value

        rounding = str(possession_rule.get("rounding") or "decimal1")
        _set_stat_value(possession_stats[0], _format_like(first_original, first_value, rounding))
        _set_stat_value(possession_stats[1], _format_like(_stat_value(possession_stats[1]), second_value, rounding))

    def _apply_passmatrix_payload(
        self,
        payload: Any,
        fixture_id: str,
        rules: dict[tuple[str, str, str], tuple[FieldDefinition, dict[str, Any]]],
    ) -> None:
        rule_info = rules.get(("passmatrix", "", "value"))
        if not rule_info:
            return
        field, rule = rule_info
        body = self._payload_body(payload)
        live = (body.get("liveData") or {}) if isinstance(body, dict) else {}
        for lineup in (live.get("lineUp") or live.get("lineup") or live.get("lineups") or []):
            for player in lineup.get("player") or lineup.get("players") or []:
                player_id = str(player.get("playerId") or player.get("id") or player.get("shirtNumber") or "")
                for link in player.get("playerPass") or player.get("passesTo") or player.get("passTo") or []:
                    target_id = str(link.get("playerId") or link.get("targetPlayerId") or link.get("toPlayerId") or link.get("id") or "")
                    if "value" in link:
                        link["value"] = self._perturb_value(link["value"], rule, f"{fixture_id}:passmatrix:{field.field_id}:{player_id}:{target_id}")

    def _apply_fitness_payload(
        self,
        payload: Any,
        fixture_id: str,
        rules: dict[tuple[str, str, str], tuple[FieldDefinition, dict[str, Any]]],
    ) -> None:
        body = self._payload_body(payload)
        if not isinstance(body, dict):
            return
        for scope, collection in (("team", body.get("Teams") or body.get("teams") or []), ("player", body.get("Players") or body.get("players") or [])):
            for index, row in enumerate(collection):
                if not isinstance(row, dict):
                    continue
                context = str(row.get("TeamName") or row.get("teamName") or row.get("ShirtNumber") or row.get("shirtNumber") or index)
                for key, value in list(row.items()):
                    rule_info = rules.get(("fitness", scope, str(key)))
                    if not rule_info:
                        continue
                    field, rule = rule_info
                    row[key] = self._perturb_value(value, rule, f"{fixture_id}:zx_tnsj:{field.field_id}:{scope}:{context}:{key}")
        self._aggregate_team_fitness(body)

    def _aggregate_team_fitness(self, body: dict[str, Any]) -> None:
        team_rows = body.get("Teams") or body.get("teams") or []
        player_rows = body.get("Players") or body.get("players") or []
        if not isinstance(team_rows, list) or not isinstance(player_rows, list):
            return

        fields = (
            "TotalDistance",
            "SprintingDistance",
            "OffensiveDistance",
            "DefensiveDistance",
        )
        team_name_keys = ("TeamName", "teamName", "Name", "name", "ClubName")
        player_team_keys = ("TeamName", "teamName", "ClubName", "team")
        totals: dict[str, dict[str, float]] = {}
        for row in player_rows:
            if not isinstance(row, dict):
                continue
            team_name = next((str(row.get(key) or "").strip() for key in player_team_keys if row.get(key)), "")
            if not team_name:
                continue
            bucket = totals.setdefault(team_name, {field: 0.0 for field in fields})
            for field in fields:
                value = _numeric(_dict_get_case_insensitive(row, field))
                if value is not None:
                    bucket[field] += value

        for row in team_rows:
            if not isinstance(row, dict):
                continue
            team_name = next((str(row.get(key) or "").strip() for key in team_name_keys if row.get(key)), "")
            if not team_name or team_name not in totals:
                continue
            for field in fields:
                actual_key = _dict_find_key_case_insensitive(row, field)
                if actual_key is not None:
                    row[actual_key] = _format_like(row[actual_key], totals[team_name][field], "int")

    def _perturb_value(self, original: Any, rule: dict[str, Any], seed: str) -> Any:
        number = _numeric(original)
        if number is None:
            return original
        method = str(rule.get("method") or "delta")
        low = float(rule.get("min") or 0)
        high = float(rule.get("max") or 0)
        fraction = _stable_fraction(seed)
        if method == "percent":
            offset = low + (high - low) * fraction
            value = number * (1 + offset / 100)
        else:
            if str(rule.get("rounding")) == "int":
                low_int = math.ceil(low)
                high_int = math.floor(high)
                if high_int < low_int:
                    delta = round(low + (high - low) * fraction)
                else:
                    delta = low_int + int(fraction * (high_int - low_int + 1))
                    delta = min(delta, high_int)
                value = number + delta
            else:
                value = number + low + (high - low) * fraction
        clamp_min = rule.get("clamp_min")
        clamp_max = rule.get("clamp_max")
        if clamp_min is not None:
            value = max(float(clamp_min), value)
        if clamp_max is not None:
            value = min(float(clamp_max), value)
        return _format_like(original, value, str(rule.get("rounding") or "int"))


def fixture_id_from_opta_url(url: str) -> str | None:
    for marker in ("/matchstats/", "/matchexpectedgoals/", "/passmatrix/", "/matchplaytime/"):
        if marker in url:
            tail = url.split(marker, 1)[1]
            parts = tail.split("/")
            if len(parts) >= 2 and parts[0] == PERFORM_COMPETITION_ID:
                return parts[1].split("?", 1)[0]
    return None


def _stable_fraction(seed: str) -> float:
    digest = sha256(seed.encode("utf-8")).hexdigest()
    return int(digest[:12], 16) / float(0xFFFFFFFFFFFF)


def _numeric(value: Any) -> float | None:
    if value is None or value == "":
        return None
    try:
        return float(str(value).replace("%", "").replace(",", "").strip())
    except ValueError:
        return None


def _format_like(original: Any, value: float, rounding: str) -> Any:
    if rounding in {"decimal2", "2"}:
        rounded: float | int = round(value, 2)
    elif rounding in {"decimal1", "one_decimal", "1"}:
        rounded = round(value, 1)
    elif rounding == "none":
        rounded = value
    else:
        rounded = int(round(value))

    if isinstance(original, str):
        if isinstance(rounded, int):
            return str(rounded)
        return f"{rounded:.2f}".rstrip("0").rstrip(".")
    if isinstance(original, int) and not isinstance(original, bool):
        return int(round(float(rounded)))
    return rounded


def _dict_find_key_case_insensitive(row: dict[str, Any], expected: str) -> str | None:
    normalized = str(expected).lower()
    for key in row:
        if str(key).lower() == normalized:
            return str(key)
    return None


def _dict_get_case_insensitive(row: dict[str, Any], expected: str) -> Any:
    actual_key = _dict_find_key_case_insensitive(row, expected)
    return row.get(actual_key) if actual_key is not None else None


def _stat_value(stat: dict[str, Any]) -> Any:
    if "value" in stat:
        return stat["value"]
    if "total" in stat:
        return stat["total"]
    return stat.get("amount")


def _set_stat_value(stat: dict[str, Any], value: Any) -> None:
    if "value" in stat:
        stat["value"] = value
    elif "total" in stat:
        stat["total"] = value
    else:
        stat["amount"] = value
