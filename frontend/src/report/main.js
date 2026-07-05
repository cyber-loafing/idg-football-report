import { faArrowDown, faArrowUp, faFutbol, faSquare, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { DEFAULT_FIXTURE_ID, PUBLIC_BASE_URL, apiUrl, bsApiUrl, resolveFixtureIdAlias } from "../shared/config.js";
import "./report.css";

const DEFAULT_LANGUAGE = "cn";
const REPORT_BRAND_TITLE = "IDG FOOTBALL GROUP";
const LANGUAGES = ["cn", "en", "es"];
const LANGUAGE_LABELS = { cn: "CN", en: "EN", es: "ES" };
const HTML_LANG = { cn: "zh-CN", en: "en", es: "es" };
const TIME_LOCALE = { cn: "zh-CN", en: "en-US", es: "es-ES" };

const TEXT_TRANSLATIONS = {
  "IDG FOOTBALL GROUP": { cn: "IDG FOOTBALL GROUP", en: "IDG FOOTBALL GROUP", es: "IDG FOOTBALL GROUP" },
  "Match Center": { cn: "比赛中心", en: "Match Center", es: "Centro de partido" },
  Language: { cn: "语言", en: "Language", es: "Idioma" },
  Venue: { cn: "场地", en: "Venue", es: "Sede" },
  Goals: { cn: "进球", en: "Goals", es: "Goles" },
  "比赛导航": { en: "Match navigation", es: "Navegación del partido" },
  "比赛数据标签": { en: "Match data tabs", es: "Pestañas de datos del partido" },
  "比赛数据分类": { en: "Match data categories", es: "Categorías de datos del partido" },
  "比赛数据": { en: "Match Data", es: "Datos del partido" },
  "球队数据": { en: "Team Stats", es: "Datos de equipo" },
  "球队球员": { en: "Lineups", es: "Alineaciones" },
  "比赛赛况": { en: "Match Events", es: "Eventos del partido" },
  "球员进攻": { en: "Player Attack", es: "Ataque de jugadores" },
  "球员传球": { en: "Player Passing", es: "Pase de jugadores" },
  "综合数据": { en: "General Stats", es: "Datos generales" },
  "防守数据": { en: "Defense", es: "Defensa" },
  "传球矩阵": { en: "Pass Matrix", es: "Matriz de pases" },
  "体能数据": { en: "Fitness", es: "Datos físicos" },
  "对比": { en: "Comparison", es: "Comparación" },
  "暂无球队技术统计。": { en: "No team technical stats.", es: "Sin estadísticas técnicas de equipo." },
  "暂无比赛事件数据。": { en: "No match event data.", es: "Sin datos de eventos del partido." },
  "进球、红黄牌、换人": { en: "Goals, cards, substitutions", es: "Goles, tarjetas, cambios" },
  "首发阵容球场": { en: "Starting XI Pitch", es: "Campo del once inicial" },
  "按场上位置展示": { en: "Shown by on-field position", es: "Mostrado por posición en cancha" },
  "首发阵容": { en: "Starting Lineups", es: "Alineaciones titulares" },
  "替补名单": { en: "Substitutes", es: "Suplentes" },
  "替补出场与未出场球员": { en: "Used and unused substitutes", es: "Suplentes utilizados y no utilizados" },
  "教练": { en: "Coaches", es: "Entrenadores" },
  "暂无球员统计。": { en: "No player stats.", es: "Sin estadísticas de jugadores." },
  "球员之间成功传球次数": { en: "Successful passes between players", es: "Pases completados entre jugadores" },
  "暂无传球矩阵数据。": { en: "No pass matrix data.", es: "Sin datos de matriz de pases." },
  "体能总览": { en: "Fitness Overview", es: "Resumen físico" },
  "跑动距离、冲刺、进攻与防守跑动": {
    en: "Distance, sprint, attacking and defensive runs",
    es: "Distancia, sprints, carreras ofensivas y defensivas",
  },
  "球员体能": { en: "Player Fitness", es: "Datos físicos de jugadores" },
  "按总跑动距离排序": { en: "Sorted by total distance", es: "Ordenado por distancia total" },
  "这场比赛暂未发现可用体能数据，页面其余数据仍可正常显示。": {
    en: "No fitness data is available for this match; other data remains visible.",
    es: "No hay datos físicos disponibles para este partido; el resto de datos sigue visible.",
  },
  "暂无该队球员体能明细。": { en: "No player fitness details for this team.", es: "Sin detalles físicos de este equipo." },
  "体能摘要": { en: "Fitness Summary", es: "Resumen físico" },
  "暂无核心指标。": { en: "No core metrics.", es: "Sin indicadores principales." },
  "暂无首发名单。": { en: "No starting lineup.", es: "Sin titulares." },
  "暂无替补名单。": { en: "No substitute list.", es: "Sin lista de suplentes." },
  "选择球队": { en: "Select team", es: "Seleccionar equipo" },
  "未知球员": { en: "Unknown player", es: "Jugador desconocido" },
  "未知": { en: "Unknown", es: "Desconocido" },
  "乌龙球": { en: "Own goal", es: "Autogol" },
  "进球": { en: "Goal", es: "Gol" },
  "点球": { en: "Penalty", es: "Penalti" },
  "黄牌": { en: "Yellow card", es: "Tarjeta amarilla" },
  "红牌": { en: "Red card", es: "Tarjeta roja" },
  "换下": { en: "for", es: "por" },
  "换人": { en: "Substitution", es: "Cambio" },
  "首发": { en: "Starter", es: "Titular" },
  "替补": { en: "Substitute", es: "Suplente" },
  "替补未出场": { en: "Unused substitute", es: "Suplente no utilizado" },
  "上": { en: "on", es: "entra" },
  "下": { en: "off", es: "sale" },
  "已完赛": { en: "Finished", es: "Finalizado" },
  "进行中": { en: "Live", es: "En juego" },
  "未开始": { en: "Scheduled", es: "Programado" },
  "加载中": { en: "Loading", es: "Cargando" },
  "已同步": { en: "Synced", es: "Sincronizado" },
  "加载失败": { en: "Load failed", es: "Error de carga" },
  "数据加载失败": { en: "Data load failed", es: "Error al cargar datos" },
  "等待数据": { en: "Waiting for data", es: "Esperando datos" },
  "距开赛": { en: "Kickoff in", es: "Inicio en" },
  "即将开赛": { en: "Kickoff soon", es: "Comienza pronto" },
  "主队": { en: "Home", es: "Local" },
  "客队": { en: "Away", es: "Visitante" },
  "常规赛": { en: "Regular Stage", es: "Fase regular" },
  "友谊赛": { en: "Friendly", es: "Amistoso" },
  "U16国家队友谊赛": { en: "U16 International Friendly", es: "Amistoso internacional Sub-16" },
  "CFA国际青年足球锦标赛": {
    en: "CFA International Youth Football Championship",
    es: "Campeonato Internacional Juvenil CFA",
  },
  "国家北方足球训练基地1号场": {
    en: "National Northern Football Training Base Field 1",
    es: "Campo 1, Base Nacional Norte de Entrenamiento de Futbol",
  },
  "中国": { en: "China", es: "China" },
  "中国U16": { en: "China U16", es: "China Sub-16" },
  "韩国": { en: "Korea Republic", es: "Corea del Sur" },
  "韩国U16": { en: "Korea Republic U16", es: "Corea del Sur Sub-16" },
  "塔吉克斯坦U16": { en: "Tajikistan U16", es: "Tayikistán Sub-16" },
  "乌兹别克斯坦U16": { en: "Uzbekistan U16", es: "Uzbekistán Sub-16" },
  "号码": { en: "No", es: "N.º" },
  No: { cn: "号码", en: "No", es: "N.º" },
  "球员": { en: "Player", es: "Jugador" },
  Player: { cn: "球员", en: "Player", es: "Jugador" },
  Pos: { cn: "位置", en: "Pos", es: "Pos" },
  Min: { cn: "时间", en: "Min", es: "Min" },
  G: { cn: "进球", en: "G", es: "G" },
  Sh: { cn: "射门", en: "Sh", es: "Tir" },
  Pass: { cn: "传球", en: "Pass", es: "Pase" },
  Tkl: { cn: "抢断", en: "Tkl", es: "Ent" },
  "总跑动": { en: "Total Distance", es: "Distancia total" },
  "冲刺": { en: "Sprint", es: "Sprint" },
  Distance: { cn: "总跑动", en: "Distance", es: "Distancia" },
  Sprint: { cn: "冲刺", en: "Sprint", es: "Sprint" },
  "冲刺距离": { en: "Sprint Distance", es: "Distancia de sprint" },
  "进攻距离": { en: "Attacking Distance", es: "Distancia ofensiva" },
  "防守距离": { en: "Defensive Distance", es: "Distancia defensiva" },
  "进球、xG、射门和进攻参与": { en: "Goals, xG, shots and attacking actions", es: "Goles, xG, tiros y acciones ofensivas" },
  "传球、成功率、传中和预期助攻": { en: "Passing, accuracy, crosses and xA", es: "Pase, precisión, centros y xA" },
  "出场时间、触球、过人和对抗": { en: "Minutes, touches, dribbles and duels", es: "Minutos, toques, regates y duelos" },
  "对抗、夺回、解围和抢断": { en: "Duels, recoveries, clearances and tackles", es: "Duelos, recuperaciones, despejes y entradas" },
  "进球、射门和关键进攻表现": { en: "Goals, shots and key attacking output", es: "Goles, tiros y producción ofensiva clave" },
  "助攻、机会创造和传球效率": { en: "Assists, chance creation and passing efficiency", es: "Asistencias, creación de ocasiones y eficiencia de pase" },
  "过人、对抗和球权表现": { en: "Dribbles, duels and possession actions", es: "Regates, duelos y acciones de posesión" },
  "抢断、拦截和防守贡献": { en: "Tackles, interceptions and defensive contribution", es: "Entradas, intercepciones y contribución defensiva" },
  "前三": { en: "Top 3", es: "Top 3" },
  "球队总计": { en: "Team Total", es: "Total del equipo" },
  "xG": { en: "xG", es: "xG" },
  "xA": { en: "xA", es: "xA" },
  "射门": { en: "Shots", es: "Tiros" },
  "射正": { en: "Shots on Target", es: "Tiros a puerta" },
  "进攻动作": { en: "Attacking Actions", es: "Acciones ofensivas" },
  "传球": { en: "Passes", es: "Pases" },
  "成功率": { en: "Accuracy", es: "Precisión" },
  "传中": { en: "Crosses", es: "Centros" },
  "助攻": { en: "Assists", es: "Asistencias" },
  "助攻球员": { en: "Assist", es: "Asistencia" },
  "创造机会": { en: "Chances Created", es: "Ocasiones creadas" },
  "传球成功率%": { en: "Pass Accuracy %", es: "Precisión de pase %" },
  "进攻三区传球成功率%": { en: "Final Third Pass Accuracy %", es: "Precisión en último tercio %" },
  "争抢成功": { en: "Duels Won", es: "Duelos ganados" },
  "高空球争抢成功": { en: "Aerial Duels Won", es: "Duelos aéreos ganados" },
  "获得球权": { en: "Recoveries", es: "Recuperaciones" },
  "失去球权": { en: "Possession Lost", es: "Posesión perdida" },
  "扑救": { en: "Saves", es: "Paradas" },
  "夺回": { en: "Recoveries", es: "Recuperaciones" },
  "时间": { en: "Minutes", es: "Minutos" },
  "触球": { en: "Touches", es: "Toques" },
  "过人": { en: "Dribbles", es: "Regates" },
  "对抗": { en: "Duels", es: "Duelos" },
  "丢失": { en: "Losses", es: "Pérdidas" },
  "解围": { en: "Clearances", es: "Despejes" },
  "抢断": { en: "Tackles", es: "Entradas" },
  "传球者": { en: "Passer", es: "Pasador" },
  "接球者": { en: "Receiver", es: "Receptor" },
  "次数": { en: "Count", es: "Veces" },
  "比分": { en: "Score", es: "Marcador" },
  "全场总比分": { en: "Final score", es: "Marcador final" },
  "主队 / 客队": { en: "Home / Away", es: "Local / Visitante" },
  "传球成功率": { en: "Pass Accuracy", es: "Precisión de pase" },
  "准确传球 / 总传球": { en: "Accurate / Total passes", es: "Pases precisos / Totales" },
  "预期进球": { en: "Expected Goals", es: "Goles esperados" },
  "事件数": { en: "Events", es: "Eventos" },
  "进球、牌、换人": { en: "Goals, cards, substitutions", es: "Goles, tarjetas, cambios" },
  "体能总跑动": { en: "Total Team Distance", es: "Distancia total del equipo" },
  "两队合计": { en: "Both teams", es: "Total de ambos equipos" },
  "暂无数据": { en: "No data", es: "Sin datos" },
  "进攻": { en: "Attack", es: "Ataque" },
  "传控": { en: "Possession & Passing", es: "Posesión y pase" },
  "常规": { en: "General", es: "General" },
  "防守&纪律": { en: "Defense & Discipline", es: "Defensa y disciplina" },
  "控球率": { en: "Possession", es: "Posesión" },
  "禁区内射门": { en: "Shots Inside Box", es: "Tiros dentro del área" },
  "禁区外射门": { en: "Shots Outside Box", es: "Tiros fuera del área" },
  "击中门框": { en: "Hit Woodwork", es: "Tiros al poste" },
  "绝佳机会": { en: "Big Chances", es: "Grandes ocasiones" },
  "对方禁区内触球": { en: "Touches in Opposition Box", es: "Toques en el área rival" },
  "攻入进攻三区": { en: "Final Third Entries", es: "Entradas al último tercio" },
  "角球": { en: "Corners", es: "Córners" },
  "任意球": { en: "Free Kicks", es: "Tiros libres" },
  "越位": { en: "Offsides", es: "Fueras de juego" },
  "传球成功": { en: "Accurate Passes", es: "Pases precisos" },
  "对方半场传球": { en: "Opposition Half Passes", es: "Pases en campo rival" },
  "对方半场传球成功率": { en: "Opposition Half Pass Accuracy", es: "Precisión de pase en campo rival" },
  "进攻三区传球": { en: "Final Third Passes", es: "Pases en último tercio" },
  "进攻三区传球成功": { en: "Accurate Final Third Passes", es: "Pases precisos en último tercio" },
  "进攻三区传球成功率": { en: "Final Third Pass Accuracy", es: "Precisión de pase en último tercio" },
  "传中成功": { en: "Accurate Crosses", es: "Centros precisos" },
  "实时体能": { en: "Live Fitness", es: "Datos físicos en vivo" },
  "跑动距离(米)": { en: "Distance (m)", es: "Distancia (m)" },
  "冲刺距离(米)": { en: "Sprint Distance (m)", es: "Distancia de sprint (m)" },
  "进攻跑动距离(米)": { en: "Attacking Distance (m)", es: "Distancia ofensiva (m)" },
  "防守跑动距离(米)": { en: "Defensive Distance (m)", es: "Distancia defensiva (m)" },
  "尝试过人": { en: "Dribbles Attempted", es: "Regates intentados" },
  "过人成功": { en: "Successful Dribbles", es: "Regates completados" },
  "过人成功率": { en: "Dribble Success Rate", es: "Precisión de regate" },
  "争抢": { en: "Duels", es: "Duelos" },
  "争抢成功率": { en: "Duel Success Rate", es: "Precisión de duelos" },
  "高空球争抢": { en: "Aerial Duels", es: "Duelos aéreos" },
  "高空球争抢成功率": { en: "Aerial Duel Success Rate", es: "Precisión de duelos aéreos" },
  "进攻三区获得球权": { en: "Possession Won in Final Third", es: "Recuperaciones en último tercio" },
  "对抗成功": { en: "Duels Won", es: "Duelos ganados" },
  "对抗失败": { en: "Duels Lost", es: "Duelos perdidos" },
  "高空球成功": { en: "Aerials Won", es: "Duelos aéreos ganados" },
  "高空球失败": { en: "Aerials Lost", es: "Duelos aéreos perdidos" },
  "夺回球权": { en: "Recoveries", es: "Recuperaciones" },
  "拦截": { en: "Interceptions", es: "Intercepciones" },
  "封堵": { en: "Blocks", es: "Bloqueos" },
  "丢失球权": { en: "Possession Lost", es: "Posesión perdida" },
  "尝试抢断": { en: "Tackles Attempted", es: "Entradas intentadas" },
  "犯规": { en: "Fouls", es: "Faltas" },
  "被犯规": { en: "Fouls Won", es: "Faltas recibidas" },
  "Substitute": { cn: "替补", en: "Substitute", es: "Suplente" },
  Goalkeeper: { cn: "门将", en: "Goalkeeper", es: "Portero" },
  Defender: { cn: "后卫", en: "Defender", es: "Defensa" },
  Midfielder: { cn: "中场", en: "Midfielder", es: "Centrocampista" },
  Striker: { cn: "前锋", en: "Striker", es: "Delantero" },
  Forward: { cn: "前锋", en: "Forward", es: "Delantero" },
};

const TEAM_PALETTES = {
  china: {
    base: "#d71920",
    deep: "#a90f18",
    soft: "#fff1f2",
    border: "#f4a7ad",
  },
  blue: {
    base: "#2563eb",
    deep: "#153e9f",
    soft: "#eff6ff",
    border: "#b8cdfd",
  },
  blueAlt: {
    base: "#0f5f99",
    deep: "#0b3d66",
    soft: "#edf7ff",
    border: "#a7d5f7",
  },
};

const EVENT_ICON_CONFIG = {
  goal: { icon: faFutbol, label: "进球" },
  "penalty-goal": { icon: faFutbol, label: "点球", badgeText: "P" },
  "own-goal": { icon: faFutbol, label: "乌龙球", badgeIcon: faTriangleExclamation },
  "yellow-card": { icon: faSquare, label: "黄牌" },
  "red-card": { icon: faSquare, label: "红牌" },
  substitution: { label: "换人", substitution: true },
};

const tabs = [{ id: "match", label: "比赛数据" }];

const matchSubTabs = [
  { id: "team", label: "球队数据" },
  { id: "lineup", label: "球队球员" },
  { id: "events", label: "比赛赛况" },
  { id: "attack", label: "球员进攻" },
  { id: "passing", label: "球员传球" },
  { id: "general", label: "综合数据" },
  { id: "defense", label: "防守数据" },
  { id: "matrix", label: "传球矩阵" },
  { id: "fitness", label: "体能数据" },
];

const state = {
  activeTab: "match",
  activeSubTab: "team",
  activeTeam: "home",
  fixtureId: "",
  model: null,
  lang: initialLanguage(),
  syncKey: "等待数据",
  syncReady: false,
  syncTime: null,
  reloadTimer: 0,
  countdownTimer: 0,
};

const refs = {
  shell: document.querySelector("[data-app-shell]"),
  mobileTabs: document.querySelector("[data-mobile-tabs]"),
  desktopTabs: document.querySelector("[data-desktop-tabs]"),
  viewStack: document.querySelector("[data-view-stack]"),
  error: document.querySelector("[data-error]"),
  liveDot: document.querySelector("[data-live-dot]"),
  syncText: document.querySelector("[data-sync-text]"),
  brandText: document.querySelector("[data-brand-text]"),
  langSwitch: document.querySelector("[data-lang-switch]"),
  matchDate: document.querySelector("[data-match-date]"),
  matchStatus: document.querySelector("[data-match-status]"),
  competition: document.querySelector("[data-competition]"),
  stage: document.querySelector("[data-stage]"),
  homeName: document.querySelector("[data-home-name]"),
  awayName: document.querySelector("[data-away-name]"),
  homeScore: document.querySelector("[data-home-score]"),
  awayScore: document.querySelector("[data-away-score]"),
  period: document.querySelector("[data-period]"),
  venueLabel: document.querySelector("[data-label-venue]"),
  venue: document.querySelector("[data-venue]"),
  goalsLabel: document.querySelector("[data-label-goals]"),
  goalsSummary: document.querySelector("[data-goals-summary]"),
  homeFlag: document.querySelector("[data-home-flag]"),
  awayFlag: document.querySelector("[data-away-flag]"),
};

init();

function init() {
  renderLanguageSwitch();
  setupTabs();
  setupReportInteractions();
  renderLoading();
  loadReport();
  connectEvents();
}

function setupTabs() {
  const html = tabs
    .map((tab) => `<button class="top-tab" type="button" data-tab="${tab.id}">${escapeHtml(tx(tab.label))}</button>`)
    .join("");
  refs.mobileTabs.innerHTML = html;
  refs.desktopTabs.innerHTML = html.replaceAll("top-tab", "rail-tab");

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => selectTab(button.dataset.tab));
  });
  selectTab(state.activeTab);
}

function selectTab(tabId) {
  state.activeTab = tabId || "match";
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === state.activeTab);
  });
  document.querySelectorAll("[data-view]").forEach((view) => {
    view.classList.toggle("active", view.dataset.view === state.activeTab);
  });
}

function setupReportInteractions() {
  document.addEventListener("click", (event) => {
    const language = event.target.closest("[data-lang]");
    if (language) {
      setLanguage(language.dataset.lang);
      return;
    }

    const subTab = event.target.closest("[data-sub-tab]");
    if (subTab) {
      state.activeSubTab = subTab.dataset.subTab || "team";
      renderActiveView();
      return;
    }

    const team = event.target.closest("[data-team-filter]");
    if (team) {
      state.activeTeam = team.dataset.teamFilter || "home";
      renderActiveView();
    }
  });
}

function initialLanguage() {
  const url = new URL(window.location.href);
  const hashParams = new URLSearchParams((window.location.hash.split("?", 2)[1] || "").trim());
  return normalizeLanguage(url.searchParams.get("lang") || hashParams.get("lang") || readStoredLanguage() || DEFAULT_LANGUAGE);
}

function readStoredLanguage() {
  try {
    return window.localStorage.getItem("cfa-report-lang");
  } catch {
    return "";
  }
}

function setStoredLanguage(language) {
  try {
    window.localStorage.setItem("cfa-report-lang", language);
  } catch {
    // Local storage can be blocked in private browsing; the in-memory language still works.
  }
}

function normalizeLanguage(language) {
  const normalized = String(language || "").trim().toLowerCase();
  if (["zh", "zh-cn", "cn"].includes(normalized)) {
    return "cn";
  }
  return LANGUAGES.includes(normalized) ? normalized : DEFAULT_LANGUAGE;
}

function setLanguage(language) {
  const next = normalizeLanguage(language);
  if (next === state.lang) {
    return;
  }
  state.lang = next;
  setStoredLanguage(next);
  renderLanguageSwitch();
  setupTabs();
  if (state.model) {
    renderHeader(state.model);
    renderActiveView();
  } else {
    renderLoading();
  }
}

function renderLanguageSwitch() {
  document.documentElement.lang = HTML_LANG[state.lang] || HTML_LANG.cn;
  document.title = tx(REPORT_BRAND_TITLE);
  setText(refs.brandText, tx(REPORT_BRAND_TITLE));
  setText(refs.venueLabel, tx("Venue"));
  setText(refs.goalsLabel, tx("Goals"));
  if (refs.mobileTabs) {
    refs.mobileTabs.setAttribute("aria-label", tx("比赛数据标签"));
  }
  if (refs.desktopTabs) {
    refs.desktopTabs.setAttribute("aria-label", tx("比赛导航"));
  }
  if (refs.langSwitch) {
    refs.langSwitch.setAttribute("aria-label", tx("Language"));
    refs.langSwitch.innerHTML = LANGUAGES.map(
      (language) => `
        <button class="${language === state.lang ? "active" : ""}" type="button" data-lang="${language}" aria-pressed="${language === state.lang}">
          ${LANGUAGE_LABELS[language]}
        </button>
      `,
    ).join("");
  }
  renderSyncStatus();
}

function tx(value) {
  const text = safeText(value);
  if (text === "--") {
    return text;
  }
  return TEXT_TRANSLATIONS[text]?.[state.lang] || text;
}

function teamDisplayName(team, preferShort = false) {
  if (!team) {
    return "--";
  }
  const name = preferShort ? team.shortName || team.name : team.name || team.shortName;
  return tx(name);
}

async function loadReport() {
  hideError();
  setSyncStatus("加载中", false);

  try {
    const sourceConfig = await fetchJson(apiUrl("/source-config")).catch(() => ({
      perform_competition_id: "10n54vtx4fi2s1frl9ipw2t6bu",
      fitness_game_infos: {},
    }));
    const fixtureId = await resolveFixtureId(sourceConfig);
    state.fixtureId = fixtureId;

    const latest = await fetchJson(apiUrl(`/fixtures/${encodeURIComponent(fixtureId)}/latest`)).catch(() => ({
      fixture: { id: fixtureId },
      sources: {},
    }));
    const sources = latest.sources || {};
    let matchstats = unwrapPayload(sources.matchstats?.payload);

    if (!hasMatchData(matchstats)) {
      matchstats = await fetchMatchstats(fixtureId, sourceConfig).catch(() => matchstats);
    }

    let expectedGoals = unwrapPayload(sources.expected_goals?.payload);
    if (!hasAnyData(expectedGoals)) {
      expectedGoals = await fetchOptaFeed("matchexpectedgoals", fixtureId, sourceConfig).catch(() => expectedGoals);
    }

    let passmatrix = unwrapPayload(sources.passmatrix?.payload);
    if (!hasAnyData(passmatrix)) {
      passmatrix = await fetchOptaFeed("passmatrix", fixtureId, sourceConfig, "_rt=b&_fmt=json&_lcl=zh-cn").catch(() => passmatrix);
    }

    let fitness = unwrapPayload(sources.zx_tnsj?.payload);
    if (!hasFitnessData(fitness)) {
      fitness = await fetchFitness(fixtureId, latest.fixture, matchstats, sourceConfig).catch(() => fitness);
    }

    const model = buildModel({
      fixtureId,
      fixture: latest.fixture || { id: fixtureId },
      matchstats,
      expectedGoals,
      passmatrix,
      fitness,
      sources,
    });

    renderReport(model);
    setSyncStatus("已同步", true, new Date());
  } catch (error) {
    showError(`${tx("数据加载失败")}: ${error.message || error}`);
    setSyncStatus("加载失败", false);
  }
}

async function resolveFixtureId(sourceConfig = {}) {
  const fromUrl = fixtureIdFromUrl();
  if (fromUrl) {
    return resolveFixtureIdAlias(fromUrl);
  }

  const backendDefault = String(sourceConfig.default_fixture_id || "").trim();
  if (backendDefault) {
    return resolveFixtureIdAlias(backendDefault);
  }

  const fixtures = await fetchJson(apiUrl("/fixtures")).catch(() => []);
  const configured = Array.isArray(fixtures) ? fixtures : [];
  const preferred = configured.find((fixture) => fixture.id === DEFAULT_FIXTURE_ID) || configured[0];
  return resolveFixtureIdAlias(preferred?.id || DEFAULT_FIXTURE_ID);
}

function fixtureIdFromUrl() {
  const url = new URL(window.location.href);
  const searchId = url.searchParams.get("id") || url.searchParams.get("fixture_id");
  if (searchId) {
    return searchId.trim();
  }

  const hashQuery = (window.location.hash.split("?", 2)[1] || "").trim();
  if (hashQuery) {
    const hashParams = new URLSearchParams(hashQuery);
    const hashId = hashParams.get("id") || hashParams.get("fixture_id");
    if (hashId) {
      return hashId.trim();
    }
  }

  return fixtureIdFromPath(window.location.pathname);
}

function fixtureIdFromPath(pathname) {
  const path = decodePathname(pathname);
  const basePaths = [basePath(PUBLIC_BASE_URL), "/ui/"].filter(Boolean);
  for (const base of basePaths) {
    if (path.startsWith(base)) {
      const candidate = path.slice(base.length).split("/")[0];
      if (candidate && candidate !== "assets") {
        return candidate.trim();
      }
    }
  }
  const segments = path.split("/").filter(Boolean);
  const uiIndex = segments.lastIndexOf("ui");
  const candidate = uiIndex >= 0 ? segments[uiIndex + 1] : "";
  return candidate && candidate !== "assets" ? candidate.trim() : "";
}

function basePath(value) {
  try {
    const path = new URL(value, window.location.origin).pathname;
    return path.endsWith("/") ? path : `${path}/`;
  } catch {
    const path = `/${String(value || "").replace(/^\/+|\/+$/g, "")}/`;
    return path === "//" ? "/" : path;
  }
}

function decodePathname(pathname) {
  try {
    return decodeURIComponent(pathname || "");
  } catch {
    return pathname || "";
  }
}

async function fetchMatchstats(fixtureId, sourceConfig) {
  return fetchOptaFeed("matchstats", fixtureId, sourceConfig, "_rt=b&_fmt=json&detailed=yes&_lcl=zh-cn");
}

async function fetchOptaFeed(feed, fixtureId, sourceConfig, query = "_rt=b&_fmt=json") {
  const competitionId = sourceConfig.perform_competition_id || "10n54vtx4fi2s1frl9ipw2t6bu";
  const url = `http://api.performfeeds.com/soccerdata/${feed}/${competitionId}/${fixtureId}?${query}`;
  const payload = await fetchJson(bsApiUrl("/api/data/zx", { url }));
  return unwrapPayload(payload);
}

async function fetchFitness(fixtureId, fixture, matchstats, sourceConfig) {
  const group = sourceConfig.fitness_game_infos?.[fixtureId];
  if (!group) {
    return null;
  }
  const date = getMatchInfo(matchstats).localDate || fixture?.local_date || "";
  const year = date ? `cfa${String(date).slice(0, 4)}` : `cfa${new Date().getFullYear()}`;
  const payload = await fetchJson(bsApiUrl("/api/data/zx_tnsj", { year, tmcl: group, fixtureUuid: fixtureId }));
  return unwrapPayload(payload);
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

function buildModel({ fixtureId, fixture, matchstats, expectedGoals, passmatrix, fitness, sources }) {
  const matchInfo = getMatchInfo(matchstats);
  const liveData = getLiveData(matchstats);
  const home = normalizeTeam(matchInfo, fixture, "home");
  const away = normalizeTeam(matchInfo, fixture, "away");
  const lineups = normalizeLineups(liveData, home, away);
  const expectedLiveData = getLiveData(expectedGoals);
  const expectedSource = Object.keys(expectedLiveData).length ? expectedLiveData : unwrapPayload(expectedGoals) || {};
  const expectedLineups = normalizeLineups(expectedSource, home, away);
  const expectedEventStats = aggregateExpectedGoalEvents(expectedSource, home, away);
  const expectedTeamStats = {
    home: mergeStats(expectedLineups.home.stats, expectedEventStats.home),
    away: mergeStats(expectedLineups.away.stats, expectedEventStats.away),
  };
  preferExpectedGoals(expectedTeamStats.home, expectedEventStats.home);
  preferExpectedGoals(expectedTeamStats.away, expectedEventStats.away);
  const teamStats = {
    home: mergeStats(lineups.home.stats, expectedTeamStats.home),
    away: mergeStats(lineups.away.stats, expectedTeamStats.away),
  };
  preferExpectedGoals(teamStats.home, expectedTeamStats.home);
  preferExpectedGoals(teamStats.away, expectedTeamStats.away);
  const goals = normalizeGoals(liveData, home, away);
  const score = normalizeScore(liveData, matchInfo, goals);
  const events = normalizeEvents(liveData, goals, home, away);
  const basePlayers = mergePlayerStatSources(normalizePlayers(lineups), normalizePlayers(expectedLineups));
  const matrix = normalizePassMatrix(passmatrix, home, away);
  const players = applyMatrixDerivedPassing(basePlayers, matrix);
  const matrixTeamStats = deriveTeamAccuratePassesFromPlayers(players);
  if (hasMetricValue(matrixTeamStats.home)) {
    teamStats.home.accuratePass = matrixTeamStats.home;
    teamStats.home.successfulPass = matrixTeamStats.home;
    teamStats.home.accuratePasses = matrixTeamStats.home;
  }
  if (hasMetricValue(matrixTeamStats.away)) {
    teamStats.away.accuratePass = matrixTeamStats.away;
    teamStats.away.successfulPass = matrixTeamStats.away;
    teamStats.away.accuratePasses = matrixTeamStats.away;
  }
  const fitnessModel = normalizeFitness(fitness, home, away);
  const metricStats = mergeTeamFitnessStats(teamStats, fitnessModel);
  const rawStatus = liveData?.matchDetails?.matchStatus || fixture?.status;
  const metricGroups = isScheduledStatus(rawStatus) ? [] : buildMetricGroups(metricStats, score);
  const playerTables = buildPlayerTables(players, fitnessModel.players);
  const coaches = normalizeCoaches(lineups, home, away);

  return {
    fixtureId,
    fixture,
    sources,
    matchInfo,
    liveData,
    home,
    away,
    lineups,
    teamStats,
    metricStats,
    goals,
    score,
    events,
    players,
    playerTables,
    fitness: fitnessModel,
    coaches,
    matrix,
    metricGroups,
    metrics: buildMetricRows(teamStats, score),
    quickStats: buildQuickStats(teamStats, score, events, fitnessModel),
  };
}

function renderReport(model) {
  state.model = model;
  applyTeamPalette(model);
  renderHeader(model);
  renderActiveView();
}

function applyTeamPalette(model) {
  const homePalette = paletteForTeam(model.home, "home", model.away);
  const awayPalette = paletteForTeam(model.away, "away", model.home);
  const accentPalette = isChinaTeam(model.home) || isChinaTeam(model.away) ? TEAM_PALETTES.china : TEAM_PALETTES.blue;
  const root = document.documentElement;
  const values = {
    "--home": homePalette.base,
    "--away": awayPalette.base,
    "--home-deep": homePalette.deep,
    "--away-deep": awayPalette.deep,
    "--home-soft": homePalette.soft,
    "--away-soft": awayPalette.soft,
    "--home-border": homePalette.border,
    "--away-border": awayPalette.border,
    "--accent": accentPalette.base,
    "--accent-soft": accentPalette.soft,
  };
  Object.entries(values).forEach(([name, value]) => root.style.setProperty(name, value));
}

function paletteForTeam(team, side, opponent) {
  if (isChinaTeam(team)) {
    return TEAM_PALETTES.china;
  }
  if (isChinaTeam(opponent)) {
    return TEAM_PALETTES.blue;
  }
  return side === "home" ? TEAM_PALETTES.blue : TEAM_PALETTES.blueAlt;
}

function isChinaTeam(team) {
  const key = normalizeKey([team?.name, team?.shortName, team?.officialName, team?.countryId].filter(Boolean).join(" "));
  return key.includes("中国") || key.includes("china") || key.includes("chn");
}

function renderActiveView() {
  if (!state.model) {
    return;
  }
  refs.viewStack.innerHTML = renderMatchShell(state.model);
  selectTab(state.activeTab);
}

function renderHeader(model) {
  const { matchInfo, fixture, home, away, score, goals } = model;
  const competition = matchInfo.competition?.name || fixture?.competition || "比赛数据";
  const stage = matchInfo.stage?.name || matchInfo.stage?.type || matchInfo.series?.name || "常规赛";
  const dateText = formatDateTime(matchInfo.localDate || fixture?.local_date, matchInfo.localTime || fixture?.local_time);
  const rawStatus = model.liveData?.matchDetails?.matchStatus || fixture?.status;
  const status = translateStatus(rawStatus);

  setText(refs.matchDate, dateText || "--");
  setText(refs.matchStatus, status);
  setText(refs.competition, tx(competition));
  setText(refs.stage, tx(stage));
  setText(refs.homeName, teamDisplayName(home));
  setText(refs.awayName, teamDisplayName(away));
  setText(refs.homeScore, score.home ?? "-");
  setText(refs.awayScore, score.away ?? "-");
  renderPeriod(model, rawStatus, score.period || status);
  setText(refs.venue, tx(getVenue(matchInfo)));
  setText(refs.goalsSummary, goalsSummary(goals, home, away));
  renderFlag(refs.homeFlag, home);
  renderFlag(refs.awayFlag, away);
}

function renderPeriod(model, rawStatus, fallbackText) {
  stopCountdown();
  const kickoffAt = kickoffDate(model);
  if (!isScheduledStatus(rawStatus) || !kickoffAt) {
    setText(refs.period, tx(fallbackText));
    return;
  }

  const update = () => {
    const text = countdownText(kickoffAt);
    setText(refs.period, text);
    if (kickoffAt.getTime() <= Date.now()) {
      stopCountdown();
      scheduleReload();
    }
  };
  update();
  state.countdownTimer = window.setInterval(update, 1000);
}

function stopCountdown() {
  if (state.countdownTimer) {
    window.clearInterval(state.countdownTimer);
    state.countdownTimer = 0;
  }
}

function renderMatchShell(model) {
  const subTabs = matchSubTabs
    .map(
      (tab) => `
        <button class="sub-tab ${tab.id === state.activeSubTab ? "active" : ""}" type="button" data-sub-tab="${tab.id}">
          ${escapeHtml(tx(tab.label))}
        </button>
      `,
    )
    .join("");

  return `
    <section class="view active subview-${escapeHtml(state.activeSubTab)}" data-view="match">
      <div class="sub-tabs-wrap">
        <h2>${escapeHtml(tx("比赛数据"))}</h2>
        <div class="sub-tabs" aria-label="${escapeHtml(tx("比赛数据分类"))}">${subTabs}</div>
        <div class="sub-scrollbar" aria-hidden="true"></div>
      </div>
      <div class="section-pad">${renderMatchSubView(model)}</div>
    </section>
  `;
}

function renderMatchSubView(model) {
  const renderers = {
    team: renderTeamStatsView,
    lineup: renderLineupsView,
    events: renderEventsView,
    attack: (currentModel) => renderPlayerStatsView(currentModel, "attack"),
    passing: (currentModel) => renderPlayerStatsView(currentModel, "passing"),
    general: (currentModel) => renderPlayerStatsView(currentModel, "general"),
    defense: (currentModel) => renderPlayerStatsView(currentModel, "defense"),
    matrix: renderMatrixView,
    fitness: renderFitnessView,
  };
  return (renderers[state.activeSubTab] || renderers.team)(model);
}

function renderTeamStatsView(model) {
  const groups = model.metricGroups.length
    ? model.metricGroups.map(renderMetricGroup).join("")
    : `<div class="empty-state">${escapeHtml(tx("暂无球队技术统计。"))}</div>`;

  return `
    <section class="panel">
      <div class="metric-compare-head">
        <span class="team-head home"><i></i>${escapeHtml(teamDisplayName(model.home))}</span>
        <strong>${escapeHtml(tx("对比"))}</strong>
        <span class="team-head away">${escapeHtml(teamDisplayName(model.away))}<i></i></span>
      </div>
      <div class="panel-body metric-panel-body">${groups}</div>
    </section>
  `;
}

function renderMetricGroup(group) {
  return `
    <div class="metric-group">
      <h3 class="metric-group-title">${escapeHtml(tx(group.title))}</h3>
      <div class="metric-list">${group.rows.map(renderCompareMetricRow).join("")}</div>
    </div>
  `;
}

function renderCompareMetricRow(metric) {
  const total = Math.max(toNumber(metric.home.raw), 0) + Math.max(toNumber(metric.away.raw), 0);
  const homeWidth = total > 0 ? (toNumber(metric.home.raw) / total) * 100 : 0;
  const awayWidth = total > 0 ? (toNumber(metric.away.raw) / total) * 100 : 0;
  const homeBetter = toNumber(metric.home.raw) > toNumber(metric.away.raw);
  const awayBetter = toNumber(metric.away.raw) > toNumber(metric.home.raw);

  return `
    <div class="metric-row compare-row">
      <div class="metric-value home-value ${homeBetter ? "is-better" : ""}">${escapeHtml(metric.home.label)}</div>
      <div class="bar-track home-track"><span class="bar-home" style="width:${clamp(homeWidth, 0, 100)}%"></span></div>
      <div class="metric-name">${escapeHtml(tx(metric.label))}</div>
      <div class="bar-track away-track"><span class="bar-away" style="width:${clamp(awayWidth, 0, 100)}%"></span></div>
      <div class="metric-value away-value ${awayBetter ? "is-better" : ""}">${escapeHtml(metric.away.label)}</div>
    </div>
  `;
}

function renderEventsView(model) {
  const body = model.events.length
    ? `
      <div class="timeline">
        <div class="timeline-team-head" aria-hidden="true">
          <span class="home">${escapeHtml(teamDisplayName(model.home))}</span>
          <span></span>
          <span class="away">${escapeHtml(teamDisplayName(model.away))}</span>
        </div>
        ${model.events
          .slice()
          .sort((a, b) => toNumber(b.minute) - toNumber(a.minute))
          .map((event) => renderEvent(event, model))
          .join("")}
      </div>
    `
    : `<div class="empty-state">${escapeHtml(tx("暂无比赛事件数据。"))}</div>`;

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2 class="panel-title">${escapeHtml(tx("比赛赛况"))}</h2>
          <p class="panel-subtitle">${escapeHtml(tx("进球、红黄牌、换人"))}</p>
        </div>
      </div>
      <div class="panel-body">${body}</div>
    </section>
  `;
}

function renderLineupsView(model) {
  return `
    <div class="lineups-flow">
      <section class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${escapeHtml(tx("首发阵容"))}</h2>
            <p class="panel-subtitle">${escapeHtml(teamDisplayName(model.home))} / ${escapeHtml(teamDisplayName(model.away))}</p>
          </div>
        </div>
        <div class="panel-body">
          ${renderLineupPairTable(model, "starters")}
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${escapeHtml(tx("替补名单"))}</h2>
            <p class="panel-subtitle">${escapeHtml(tx("替补出场与未出场球员"))}</p>
          </div>
        </div>
        <div class="panel-body">
          ${renderLineupPairTable(model, "substitutes")}
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${escapeHtml(tx("教练"))}</h2>
            <p class="panel-subtitle">${escapeHtml(teamDisplayName(model.home))} / ${escapeHtml(teamDisplayName(model.away))}</p>
          </div>
        </div>
        <div class="panel-body">
          ${renderCoachTable(model)}
        </div>
      </section>
    </div>
  `;
}

function renderPlayerStatsView(model, type) {
  const config = playerTableConfig(type);
  const rows = model.playerTables[type]?.[state.activeTeam] || [];
  const rankedRows = rankPlayerRows(rows, config.columns);
  const totals = buildPlayerTotalRow(rankedRows, config.columns, state.activeTeam);
  return `
    <section class="panel player-panel">
      <div class="panel-head player-panel-head">
        <div>
          <h2 class="panel-title">${escapeHtml(config.title)}</h2>
          <p class="panel-subtitle">${escapeHtml(config.subtitle)}</p>
        </div>
        ${renderTeamSwitch(model)}
      </div>
      <div class="panel-body">
        ${
          rows.length
            ? `${renderPlayerStatsTable(rankedRows, config.columns, totals, config.minWidth)}${renderPlayerTopThree(rankedRows, config.columns)}`
            : `<div class="empty-state">${escapeHtml(tx("暂无球员统计。"))}</div>`
        }
        ${type === "general" ? renderFitnessInline(model) : ""}
      </div>
    </section>
  `;
}

function renderMatrixView(model) {
  const current = model.matrix[state.activeTeam] || { players: [], rows: [], links: [], max: 0 };
  const gridTemplate = `grid-template-columns:minmax(82px,1.4fr) repeat(${Math.max(current.players.length, 1)}, minmax(30px,1fr))`;
  const header = current.players
    .map((player) => `<span class="matrix-head-cell">${escapeHtml(player.shirt || shortPlayerName(player.name))}</span>`)
    .join("");
  const rows = current.rows
    .map(
      (row) => `
        <div class="matrix-row" style="${gridTemplate}">
          <span class="matrix-player-label">${escapeHtml(row.player.shirt || "--")} ${escapeHtml(shortPlayerName(row.player.name))}</span>
          ${row.cells
            .map((cell) => {
              const strength = current.max ? clamp(toNumber(cell.value) / current.max, 0, 1) : 0;
              return `<span class="matrix-cell ${cell.value ? "has-value" : ""}" style="--cell-alpha:${strength.toFixed(2)}">${cell.value ? escapeHtml(cell.value) : ""}</span>`;
            })
            .join("")}
        </div>
      `,
    )
    .join("");

  const linkRows = current.links
    .slice(0, 12)
    .map(
      (link) => `
        <tr>
          <td>${escapeHtml(link.from.shirt || "--")} ${escapeHtml(link.from.name)}</td>
          <td>${escapeHtml(link.to.shirt || "--")} ${escapeHtml(link.to.name)}</td>
          <td class="num">${escapeHtml(link.value)}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <section class="panel player-panel">
      <div class="panel-head player-panel-head">
        <div>
          <h2 class="panel-title">${escapeHtml(tx("传球矩阵"))}</h2>
          <p class="panel-subtitle">${escapeHtml(tx("球员之间成功传球次数"))}</p>
        </div>
        ${renderTeamSwitch(model)}
      </div>
      <div class="panel-body">
        ${
          current.players.length
            ? `
              <div class="matrix-wrap">
                <div class="matrix-header" style="${gridTemplate}">
                  <span></span>
                  ${header}
                </div>
                ${rows}
              </div>
              <div class="table-wrap matrix-links">
                <table class="data-table compact-table">
                  <thead><tr><th>${escapeHtml(tx("传球者"))}</th><th>${escapeHtml(tx("接球者"))}</th><th class="num">${escapeHtml(tx("次数"))}</th></tr></thead>
                  <tbody>${linkRows}</tbody>
                </table>
              </div>
            `
            : `<div class="empty-state">${escapeHtml(tx("暂无传球矩阵数据。"))}</div>`
        }
      </div>
    </section>
  `;
}

function renderFitnessView(model) {
  const hasFitness = model.fitness.available;
  const teamBody = hasFitness
    ? `<div class="fitness-grid">${model.fitness.teams.map(renderFitnessCard).join("")}</div>`
    : `<div class="empty-state">${escapeHtml(tx("这场比赛暂未发现可用体能数据，页面其余数据仍可正常显示。"))}</div>`;

  const fitnessPlayers = fitnessPlayersForSide(model, state.activeTeam);
  const playerBody = fitnessPlayers.length
    ? renderFitnessPlayerTable(fitnessPlayers)
    : `<div class="empty-state">${escapeHtml(tx("暂无该队球员体能明细。"))}</div>`;

  return `
    <div class="lineups-flow">
      <section class="panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${escapeHtml(tx("体能总览"))}</h2>
            <p class="panel-subtitle">${escapeHtml(tx("跑动距离、冲刺、进攻与防守跑动"))}</p>
          </div>
        </div>
        <div class="panel-body">${teamBody}</div>
      </section>

      <section class="panel player-panel">
        <div class="panel-head player-panel-head">
          <div>
            <h2 class="panel-title">${escapeHtml(tx("球员体能"))}</h2>
            <p class="panel-subtitle">${escapeHtml(tx("按总跑动距离排序"))}</p>
          </div>
          ${renderTeamSwitch(model)}
        </div>
        <div class="panel-body">${playerBody}</div>
      </section>
    </div>
  `;
}

function fitnessPlayersForSide(model, side) {
  const team = side === "home" ? model.home : model.away;
  return model.fitness.players
    .filter((player) => player.side === side || sameText(player.teamName, team.name) || sameText(player.teamName, team.shortName));
}

function renderLoading() {
  refs.viewStack.innerHTML = `
    <section class="view active" data-view="match">
      <div class="view-grid">
        <section class="panel skeleton"><div class="panel-body"></div></section>
        <section class="panel skeleton"><div class="panel-body"></div></section>
      </div>
    </section>
  `;
}

function renderStatTile(item) {
  return `
    <div class="stat-tile">
      <span>${escapeHtml(tx(item.label))}</span>
      <strong>${escapeHtml(item.value)}</strong>
      <small>${escapeHtml(tx(item.detail || ""))}</small>
    </div>
  `;
}

function renderMetricList(metrics) {
  if (!metrics.length) {
    return `<div class="empty-state">${escapeHtml(tx("暂无核心指标。"))}</div>`;
  }
  return `<div class="metric-list">${metrics.map(renderMetricRow).join("")}</div>`;
}

function renderMetricRow(metric) {
  const total = Math.max(toNumber(metric.home.raw), 0) + Math.max(toNumber(metric.away.raw), 0);
  const homeWidth = total > 0 ? (toNumber(metric.home.raw) / total) * 100 : 0;
  const awayWidth = total > 0 ? (toNumber(metric.away.raw) / total) * 100 : 0;

  return `
    <div class="metric-row">
      <div class="metric-top">
        <span class="metric-value home">${escapeHtml(metric.home.label)}</span>
        <span class="metric-name">${escapeHtml(tx(metric.label))}</span>
        <span class="metric-value away">${escapeHtml(metric.away.label)}</span>
      </div>
      <div class="metric-bars">
        <span class="bar-half home"><span class="bar-fill home" style="width:${clamp(homeWidth, 0, 100)}%"></span></span>
        <span class="bar-half away"><span class="bar-fill away" style="width:${clamp(awayWidth, 0, 100)}%"></span></span>
      </div>
    </div>
  `;
}

function renderTeamMini(team, lineup, side) {
  return `
    <div class="team-mini ${side}">
      <strong>${escapeHtml(teamDisplayName(team))}</strong>
      <span>${escapeHtml(tx("首发"))} ${lineup.starters.length || "-"} / ${escapeHtml(tx("替补"))} ${lineup.substitutes.length || "-"}</span>
      <span>Team ID ${escapeHtml(team.id || "--")}</span>
    </div>
  `;
}

function renderEvent(event, model) {
  const side = event.side === "away" ? "away" : event.side === "home" ? "home" : "neutral";
  const card = renderEventCard(event, model);
  return `
    <div class="event-row ${side}">
      <div class="event-side event-side-home">${side === "home" ? card : ""}</div>
      <div class="event-axis">
        <span class="event-minute">${escapeHtml(event.minuteLabel)}</span>
      </div>
      <div class="event-side event-side-away">${side === "away" ? card : ""}</div>
      ${side === "neutral" ? `<div class="event-neutral">${card}</div>` : ""}
    </div>
  `;
}

function renderEventCard(event, model) {
  return `
    <div class="event-card">
      <strong class="event-title">
        ${renderEventIcon(event)}
        <span class="event-title-text">${renderEventTitle(event, model)}</span>
      </strong>
      <span>${escapeHtml(eventSubtitle(event, model))}</span>
    </div>
  `;
}

function renderEventIcon(event) {
  const type = String(event.type || "event");
  const config = EVENT_ICON_CONFIG[type] || { icon: faFutbol, label: "比赛事件" };
  if (config.substitution) {
    return `
      <span class="event-icon event-icon-substitution" aria-label="${escapeHtml(tx(config.label))}" title="${escapeHtml(tx(config.label))}">
        <span class="sub-arrow sub-arrow-on">${renderFontAwesomeIcon(faArrowUp)}</span>
        <span class="sub-arrow sub-arrow-off">${renderFontAwesomeIcon(faArrowDown)}</span>
      </span>
    `;
  }
  const badge = config.badgeIcon
    ? `<span class="event-icon-badge">${renderFontAwesomeIcon(config.badgeIcon)}</span>`
    : config.badgeText
      ? `<span class="event-icon-badge text">${escapeHtml(config.badgeText)}</span>`
      : "";
  return `
    <span class="event-icon event-icon-${escapeHtml(type)}" aria-label="${escapeHtml(tx(config.label))}" title="${escapeHtml(tx(config.label))}">
      ${renderFontAwesomeIcon(config.icon)}
      ${badge}
    </span>
  `;
}

function renderFontAwesomeIcon(iconDefinition) {
  const [width, height, , , pathData] = iconDefinition.icon;
  const paths = Array.isArray(pathData) ? pathData : [pathData];
  return `
    <svg viewBox="0 0 ${width} ${height}" focusable="false" aria-hidden="true">
      ${paths.map((path) => `<path fill="currentColor" d="${escapeHtml(path)}"></path>`).join("")}
    </svg>
  `;
}

function renderEventTitle(event, model) {
  if (!event.titleParts?.length) {
    return escapeHtml(tx(event.title || "--"));
  }
  return event.titleParts.map((part) => renderEventTitlePart(part, model)).join("");
}

function renderEventTitlePart(part, model) {
  if (part.kind === "player") {
    const team = teamBySide(part.side, model);
    return `
      <span class="event-player-name">${escapeHtml(part.name || tx("未知球员"))}</span>
      ${renderInlineFlag(team)}
    `;
  }
  return `<span class="event-action-text">${escapeHtml(tx(part.text || ""))}</span>`;
}

function eventSubtitle(event, model) {
  const team = teamBySide(event.side, model);
  const teamName = team ? teamDisplayName(team) : tx(event.subtitle || "--");
  const assist = event.assist ? ` / ${tx("助攻球员")}: ${event.assist}` : "";
  return `${teamName}${event.penalty ? ` / ${tx("点球")}` : ""}${assist}`;
}

function renderPitch(model) {
  const awaySlots = lineupSlots(model.lineups.away, "away");
  const homeSlots = lineupSlots(model.lineups.home, "home");

  return `
    <div class="pitch-layout">
      <div class="pitch-meta">
        <span class="side-chip away">${escapeHtml(teamDisplayName(model.away))} ${escapeHtml(model.lineups.away.formation || "--")}</span>
        <span class="side-chip home">${escapeHtml(teamDisplayName(model.home))} ${escapeHtml(model.lineups.home.formation || "--")}</span>
      </div>
      <div class="football-pitch" aria-label="${escapeHtml(tx("首发阵容球场"))}">
        <div class="pitch-stripes"></div>
        <div class="pitch-border"></div>
        <div class="pitch-line center"></div>
        <div class="pitch-circle"></div>
        <div class="pitch-box top penalty"></div>
        <div class="pitch-box top goal"></div>
        <div class="pitch-box bottom penalty"></div>
        <div class="pitch-box bottom goal"></div>
        <span class="pitch-team-label away">${escapeHtml(teamDisplayName(model.away))}</span>
        <span class="pitch-team-label home">${escapeHtml(teamDisplayName(model.home))}</span>
        ${awaySlots.map((slot) => renderPitchPlayer(slot, "away")).join("")}
        ${homeSlots.map((slot) => renderPitchPlayer(slot, "home")).join("")}
      </div>
    </div>
  `;
}

function renderPitchPlayer(slot, side) {
  const player = slot.player;
  return `
    <div class="pitch-player ${side}" style="left:${slot.x}%; top:${slot.y}%">
      <span class="pitch-number">${escapeHtml(player.shirt || "--")}</span>
      <span class="pitch-name">${escapeHtml(shortPlayerName(player.name))}</span>
    </div>
  `;
}

function renderLineupPairTable(model, type) {
  const homeRows = model.lineups.home[type];
  const awayRows = model.lineups.away[type];
  const maxRows = Math.max(homeRows.length, awayRows.length);
  if (!maxRows) {
    return `<div class="empty-state">${escapeHtml(tx(type === "starters" ? "暂无首发名单。" : "暂无替补名单。"))}</div>`;
  }

  const rows = Array.from({ length: maxRows }, (_, index) => {
    const homePlayer = homeRows[index];
    const awayPlayer = awayRows[index];
    return `
      <tr>
        ${renderLineupTableCell(homePlayer, "home")}
        ${renderLineupTableCell(awayPlayer, "away")}
      </tr>
    `;
  }).join("");

  return `
    <div class="table-wrap lineup-table-wrap">
      <table class="data-table lineup-pair-table">
        <thead>
          <tr>
            <th colspan="2">${escapeHtml(teamDisplayName(model.home))}</th>
            <th colspan="2">${escapeHtml(teamDisplayName(model.away))}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderLineupTableCell(player, side) {
  if (!player) {
    return `
      <td class="lineup-number-cell"></td>
      <td class="lineup-player-cell empty">--</td>
    `;
  }
  return `
    <td class="lineup-number-cell">
      <span class="lineup-number ${side}">${escapeHtml(player.shirt || "--")}</span>
    </td>
    <td class="lineup-player-cell">
      <strong>${escapeHtml(player.name)}</strong>
      <span>${escapeHtml(lineupPlayerMeta(player))}</span>
    </td>
  `;
}

function lineupPlayerMeta(player) {
  return [translatePosition(player.positionCode || player.position), translateLineupStatus(player.status)].filter(Boolean).join(" / ") || "--";
}

function translatePosition(position) {
  const text = safeText(position);
  if (text === "--") {
    return text;
  }
  return tx(text);
}

function translateLineupStatus(status) {
  const text = safeText(status);
  if (text === "--") {
    return text;
  }
  if (state.lang === "cn") {
    return text;
  }
  return text
    .replaceAll("替补未出场", tx("替补未出场"))
    .replaceAll("首发", tx("首发"))
    .replaceAll("替补", tx("替补"))
    .replaceAll("下", tx("下"))
    .replaceAll("上", tx("上"));
}

function renderCoachTable(model) {
  return `
    <div class="table-wrap lineup-table-wrap">
      <table class="data-table lineup-pair-table compact-table">
        <tbody>
          <tr>
            <td class="lineup-player-cell"><strong>${escapeHtml(teamDisplayName(model.home))}</strong></td>
            <td>${escapeHtml(model.coaches.home || "-")}</td>
          </tr>
          <tr>
            <td class="lineup-player-cell"><strong>${escapeHtml(teamDisplayName(model.away))}</strong></td>
            <td>${escapeHtml(model.coaches.away || "-")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderTeamSwitch(model) {
  return `
    <div class="team-switch" role="group" aria-label="${escapeHtml(tx("选择球队"))}">
      <button class="${state.activeTeam === "home" ? "active" : ""}" type="button" data-team-filter="home">
        ${escapeHtml(teamDisplayName(model.home, true))}
      </button>
      <button class="${state.activeTeam === "away" ? "active" : ""}" type="button" data-team-filter="away">
        ${escapeHtml(teamDisplayName(model.away, true))}
      </button>
    </div>
  `;
}

function playerTableConfig(type) {
  const configs = {
    attack: {
      title: tx("球员进攻"),
      subtitle: tx("进球、射门和关键进攻表现"),
      minWidth: 940,
      columns: [
        statColumn("no", "号码", "no", { fixed: true }),
        statColumn("player", "球员", "player-col", { fixed: true }),
        statColumn("goals", "进球", "num", { keys: ["goals", "goal", "totalGoals"], teamKeys: ["goals"] }),
        statColumn("shots", "射门", "num", { keys: ["totalScoringAtt", "totalShots", "shots"], teamKeys: ["totalScoringAtt", "totalShots", "shots"] }),
        statColumn("shotsOn", "射正", "num", { keys: ["ontargetScoringAtt", "onTargetScoringAtt", "shotsOnTarget"], teamKeys: ["ontargetScoringAtt", "onTargetScoringAtt", "shotsOnTarget"] }),
        statColumn("shotsIbox", "禁区内射门", "num", { keys: ["attemptsIbox", "totalAttemptsIbox"], teamKeys: ["attemptsIbox", "totalAttemptsIbox"] }),
        statColumn("touchesOppBox", "对方禁区内触球", "num", { keys: ["touchesInOppBox"], teamKeys: ["touchesInOppBox"] }),
        statColumn("offsides", "越位", "num", { keys: ["totalOffside", "offsides"], teamKeys: ["totalOffside", "offsides"], defaultValue: 0 }),
        statColumn("bigChances", "绝佳机会", "num", { keys: ["bigChanceCreated"], teamKeys: ["bigChanceCreated"] }),
        statColumn("finalThirdEntries", "攻入进攻三区", "num", { keys: ["finalThirdEntries"], teamKeys: ["finalThirdEntries"] }),
      ],
    },
    passing: {
      title: tx("球员传球"),
      subtitle: tx("助攻、机会创造和传球效率"),
      minWidth: 1060,
      columns: [
        statColumn("no", "号码", "no", { fixed: true }),
        statColumn("player", "球员", "player-col", { fixed: true }),
        statColumn("assists", "助攻", "num", { keys: ["goalAssist", "assists", "assist"], teamKeys: ["goalAssist", "assists", "assist"] }),
        statColumn("chances", "创造机会", "num", { keys: ["totalAttAssist", "attAssist"], teamKeys: ["totalAttAssist", "attAssist"] }),
        statColumn("touches", "触球", "num", { keys: ["touches", "touchesBall", "totalTouches"], teamKeys: ["touches", "touchesBall", "totalTouches"] }),
        statColumn("passes", "传球", "num", { keys: ["totalPass", "passes"], teamKeys: ["totalPass", "passes"] }),
        statColumn("accuratePasses", "传球成功", "num", { keys: ["accuratePass", "successfulPass", "accuratePasses"], teamKeys: ["accuratePass", "successfulPass", "accuratePasses"] }),
        statColumn("passAccuracy", "传球成功率%", "num", {
          ratio: { made: ["accuratePass", "successfulPass", "accuratePasses"], total: ["totalPass", "passes"] },
          teamRatio: { made: ["accuratePass", "successfulPass", "accuratePasses"], total: ["totalPass", "passes"] },
          decimals: 1,
        }),
        statColumn("finalThirdPasses", "进攻三区传球", "num", { keys: ["totalFinalThirdPasses", "finalThirdPasses"], teamKeys: ["totalFinalThirdPasses", "finalThirdPasses"] }),
        statColumn("finalThirdPassAccuracy", "进攻三区传球成功率%", "num", {
          ratio: { made: ["successfulFinalThirdPasses", "accurateFinalThirdPasses"], total: ["totalFinalThirdPasses", "finalThirdPasses"] },
          teamRatio: { made: ["successfulFinalThirdPasses", "accurateFinalThirdPasses"], total: ["totalFinalThirdPasses", "finalThirdPasses"] },
          decimals: 1,
        }),
        statColumn("crosses", "传中", "num", { keys: ["totalCross", "crosses"], teamKeys: ["totalCross", "crosses"] }),
      ],
    },
    general: {
      title: tx("综合数据"),
      subtitle: tx("过人、对抗和球权表现"),
      minWidth: 1040,
      columns: [
        statColumn("no", "号码", "no", { fixed: true }),
        statColumn("player", "球员", "player-col", { fixed: true }),
        statColumn("dribbleAttempts", "尝试过人", "num", { keys: ["totalContest", "dribbles"], teamKeys: ["totalContest", "dribbles"] }),
        statColumn("successfulDribbles", "过人", "num", { keys: ["wonContest", "successfulDribbles"], teamKeys: ["wonContest", "successfulDribbles"] }),
        statColumn("duels", "争抢", "num", {
          sum: [["duelWon", "duelsWon"], ["duelLost", "duelsLost"]],
          teamSum: [["duelWon", "duelsWon"], ["duelLost", "duelsLost"]],
        }),
        statColumn("duelsWon", "争抢成功", "num", { keys: ["duelWon", "duelsWon"], teamKeys: ["duelWon", "duelsWon"] }),
        statColumn("aerialDuels", "高空球争抢", "num", {
          sum: [["aerialWon", "aerialDuelsWon"], ["aerialLost", "aerialDuelsLost"]],
          teamSum: [["aerialWon", "aerialDuelsWon"], ["aerialLost", "aerialDuelsLost"]],
        }),
        statColumn("aerialDuelsWon", "高空球争抢成功", "num", { keys: ["aerialWon", "aerialDuelsWon"], teamKeys: ["aerialWon", "aerialDuelsWon"] }),
        statColumn("recoveries", "获得球权", "num", { keys: ["ballRecovery", "possWon", "recoveries"], teamKeys: ["ballRecovery", "possWon", "recoveries"] }),
        statColumn("finalThirdRecoveries", "进攻三区获得球权", "num", { keys: ["possWonAtt3rd"], teamKeys: ["possWonAtt3rd"] }),
        statColumn("losses", "失去球权", "num", { keys: ["possLostAll", "possLost", "turnovers"], teamKeys: ["possLostAll", "possLost", "turnovers"] }),
      ],
    },
    defense: {
      title: tx("防守数据"),
      subtitle: tx("抢断、拦截和防守贡献"),
      minWidth: 1020,
      columns: [
        statColumn("no", "号码", "no", { fixed: true }),
        statColumn("player", "球员", "player-col", { fixed: true }),
        statColumn("tackleAttempts", "尝试抢断", "num", { keys: ["totalTackle"], teamKeys: ["totalTackle"] }),
        statColumn("tackles", "抢断", "num", { keys: ["wonTackle", "tacklesWon"], teamKeys: ["wonTackle", "tacklesWon"] }),
        statColumn("interceptions", "拦截", "num", { keys: ["interception", "interceptions"], teamKeys: ["interception", "interceptions"] }),
        statColumn("fouls", "犯规", "num", { keys: ["fouls", "fkFoulLost"], teamKeys: ["fkFoulLost", "fouls"] }),
        statColumn("foulsWon", "被犯规", "num", { keys: ["wasFouled", "fkFoulWon"], teamKeys: ["fkFoulWon", "foulsWon"] }),
        statColumn("yellowCards", "黄牌", "num", { keys: ["yellowCard", "totalYellowCard"], teamKeys: ["totalYellowCard", "yellowCard"], defaultValue: 0 }),
        statColumn("redCards", "红牌", "num", { keys: ["redCard", "totalRedCard"], teamKeys: ["totalRedCard", "redCard"], defaultValue: 0 }),
        statColumn("saves", "扑救", "num", { keys: ["saves"], teamKeys: ["saves"], defaultValue: 0 }),
        statColumn("clearances", "解围", "num", { keys: ["totalClearance", "effectiveClearance", "clearances"], teamKeys: ["totalClearance", "clearances"] }),
      ],
    },
  };
  return configs[type] || configs.general;
}

function statColumn(key, label, className = "", options = {}) {
  return { key, label, className, ...options };
}

function renderPlayerStatsTable(rows, columns, totalRow, minWidth) {
  const head = columns.map((column) => `<th class="${escapeHtml(column.className || "")}">${escapeHtml(tx(column.label))}</th>`).join("");
  const body = rows
    .map(
      (row) => `
        <tr>
          ${columns.map((column) => renderPlayerStatsCell(row, column)).join("")}
        </tr>
      `,
    )
    .join("");
  const total = totalRow
    ? `
      <tfoot>
        <tr>
          ${columns.map((column) => renderPlayerStatsCell(totalRow, column, true)).join("")}
        </tr>
      </tfoot>
    `
    : "";

  return `
    <div class="table-wrap player-table-wrap" style="--player-table-min:${Number(minWidth) || 760}px">
      <table class="data-table player-stats-table">
        <thead><tr>${head}</tr></thead>
        <tbody>${body}</tbody>
        ${total}
      </table>
    </div>
  `;
}

function renderPlayerStatsCell(row, column, isTotal = false) {
  const { key, className = "" } = column;
  if (key === "no") {
    const content = isTotal ? "" : `<span class="stat-pill ${row.side}">${escapeHtml(row.no || "--")}</span>`;
    return `<td class="${escapeHtml(className)}">${content}</td>`;
  }
  if (key === "player") {
    return `
      <td class="${escapeHtml(className)}">
        <span class="player-name">
          <strong>${escapeHtml(isTotal ? tx("球队总计") : row.player)}</strong>
          ${isTotal ? "" : `<span>${escapeHtml(translatePosition(row.position || "--"))}</span>`}
        </span>
      </td>
    `;
  }
  const rank = row.heat?.[key];
  const side = row.side || "";
  const value = row[key] ?? "";
  return `<td class="${escapeHtml([className, rank ? `heat-${rank}` : "", side, isTotal ? "team-total-cell" : ""].filter(Boolean).join(" "))}">${escapeHtml(value)}</td>`;
}

function renderFitnessInline(model) {
  if (!model.fitness.available) {
    return "";
  }
  const rows = model.fitness.players
    .filter((player) => player.side === state.activeTeam)
    .sort((a, b) => toNumber(b.totalDistance) - toNumber(a.totalDistance))
    .slice(0, 8)
    .map(
      (player) => `
        <tr>
          <td>${escapeHtml(player.shirt || "--")}</td>
          <td>${escapeHtml(player.name)}</td>
          <td class="num">${formatDistance(player.totalDistance)}</td>
          <td class="num">${formatDistance(player.sprintDistance)}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <div class="inline-section">
      <h3 class="panel-title">${escapeHtml(tx("体能摘要"))}</h3>
      ${
        rows
          ? `<div class="table-wrap"><table class="data-table compact-table"><thead><tr><th>${escapeHtml(tx("号码"))}</th><th>${escapeHtml(tx("球员"))}</th><th class="num">${escapeHtml(tx("总跑动"))}</th><th class="num">${escapeHtml(tx("冲刺"))}</th></tr></thead><tbody>${rows}</tbody></table></div>`
          : `<div class="empty-state">${escapeHtml(tx("暂无该队球员体能明细。"))}</div>`
      }
    </div>
  `;
}

function lineupSlots(lineup, side) {
  const starters = lineup.starters.slice().sort((a, b) => toNumber(a.formationPlace) - toNumber(b.formationPlace));
  if (!starters.length) {
    return [];
  }

  const rowSizes = formationRows(lineup.formation, starters);
  const ordered = starters.slice();
  const rows = [];
  let cursor = 0;

  rowSizes.forEach((size) => {
    rows.push(ordered.slice(cursor, cursor + size));
    cursor += size;
  });
  if (cursor < ordered.length) {
    rows[rows.length - 1].push(...ordered.slice(cursor));
  }

  const yValues = pitchYValues(rows.length, side);
  return rows.flatMap((row, rowIndex) => {
    const sortedRow = row.slice().sort((a, b) => sideOrder(a, b));
    return sortedRow.map((player, playerIndex) => ({
      player,
      x: pitchX(playerIndex, sortedRow.length),
      y: yValues[rowIndex],
    }));
  });
}

function formationRows(formation, starters) {
  const digits = String(formation || "")
    .replace(/[^0-9]/g, "")
    .split("")
    .map((value) => Number(value))
    .filter((value) => value > 0);
  const expected = digits.reduce((sum, value) => sum + value, 0);
  if (digits.length && expected === starters.length - 1) {
    return [1, ...digits];
  }
  if (digits.length && expected === starters.length) {
    return digits;
  }

  const byPosition = [
    starters.filter((player) => /goalkeeper/i.test(player.position)),
    starters.filter((player) => /defender/i.test(player.position)),
    starters.filter((player) => /midfielder/i.test(player.position)),
    starters.filter((player) => /striker|forward|attacker/i.test(player.position)),
  ].filter((row) => row.length);

  const counted = byPosition.reduce((sum, row) => sum + row.length, 0);
  if (counted === starters.length && byPosition.length > 1) {
    return byPosition.map((row) => row.length);
  }
  return [1, 4, 3, Math.max(0, starters.length - 8)].filter((value) => value > 0);
}

function pitchYValues(rowCount, side) {
  const min = side === "away" ? 8 : 58;
  const max = side === "away" ? 42 : 92;
  if (rowCount <= 1) {
    return [(min + max) / 2];
  }
  const values = Array.from({ length: rowCount }, (_, index) => min + ((max - min) * index) / (rowCount - 1));
  return side === "home" ? values.reverse() : values;
}

function pitchX(index, count) {
  if (count <= 1) {
    return 50;
  }
  return 14 + ((72 * index) / (count - 1));
}

function sideOrder(a, b) {
  const sideRank = (player) => {
    const value = String(player.positionSide || "").toLowerCase();
    if (value.includes("left")) {
      return 0;
    }
    if (value.includes("centre") || value.includes("center")) {
      return 1;
    }
    if (value.includes("right")) {
      return 2;
    }
    return 1;
  };
  return sideRank(a) - sideRank(b) || toNumber(a.formationPlace) - toNumber(b.formationPlace);
}

function shortPlayerName(name) {
  const value = String(name || "--").trim();
  if (value.length <= 6) {
    return value;
  }
  if (/^[\u4e00-\u9fa5·]+$/.test(value)) {
    return value.slice(0, 6);
  }
  const parts = value.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}. ${parts.at(-1)}`.slice(0, 12);
  }
  return value.slice(0, 10);
}

function renderPlayerTable(players) {
  const rows = players
    .map(
      (player) => `
        <tr>
          <td>
            <span class="player-name">
              <strong>${escapeHtml(player.name)}</strong>
              <span>${escapeHtml(tx(player.teamName))}${player.shirt ? ` #${escapeHtml(player.shirt)}` : ""}</span>
            </span>
          </td>
          <td>${escapeHtml(translatePosition(player.position || "--"))}</td>
          <td class="num">${formatMetricValue(player.stats.minutes, "")}</td>
          <td class="num">${formatMetricValue(player.stats.goals, "")}</td>
          <td class="num">${formatMetricValue(player.stats.shots, "")}</td>
          <td class="num">${formatMetricValue(player.stats.passes, "")}</td>
          <td class="num">${formatMetricValue(player.stats.tackles, "")}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>${escapeHtml(tx("Player"))}</th>
            <th>${escapeHtml(tx("Pos"))}</th>
            <th class="num">${escapeHtml(tx("Min"))}</th>
            <th class="num">${escapeHtml(tx("G"))}</th>
            <th class="num">${escapeHtml(tx("Sh"))}</th>
            <th class="num">${escapeHtml(tx("Pass"))}</th>
            <th class="num">${escapeHtml(tx("Tkl"))}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderFitnessCard(team) {
  const metrics = [
    [tx("总跑动"), formatDistance(team.totalDistance)],
    [tx("冲刺距离"), formatDistance(team.sprintDistance)],
    [tx("进攻距离"), formatDistance(team.offensiveDistance)],
    [tx("防守距离"), formatDistance(team.defensiveDistance)],
  ];

  return `
    <div class="fitness-card ${team.side}">
      <h3>${escapeHtml(teamDisplayName(team))}</h3>
      <div class="fitness-metrics">
        ${metrics
          .map(
            ([label, value]) => `
              <div class="fitness-metric">
                <span>${escapeHtml(label)}</span>
                <strong>${escapeHtml(value)}</strong>
              </div>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderFitnessPlayerTable(players) {
  const rows = players
    .slice()
    .sort((a, b) => toNumber(b.totalDistance) - toNumber(a.totalDistance))
    .slice(0, 30)
    .map(
      (player) => `
        <tr>
          <td>
            <span class="player-name">
              <strong>${escapeHtml(player.name)}</strong>
              <span>${escapeHtml(tx(player.teamName || "--"))}</span>
            </span>
          </td>
          <td class="num">${escapeHtml(player.shirt || "--")}</td>
          <td class="num">${formatDistance(player.totalDistance)}</td>
          <td class="num">${formatDistance(player.sprintDistance)}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>${escapeHtml(tx("Player"))}</th>
            <th class="num">${escapeHtml(tx("No"))}</th>
            <th class="num">${escapeHtml(tx("Distance"))}</th>
            <th class="num">${escapeHtml(tx("Sprint"))}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function getMatchInfo(payload) {
  const unwrapped = unwrapPayload(payload);
  return unwrapped?.matchInfo || unwrapped?.match?.matchInfo || {};
}

function getLiveData(payload) {
  const unwrapped = unwrapPayload(payload);
  return unwrapped?.liveData || unwrapped?.matchLiveData || unwrapped?.live || {};
}

function unwrapPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return payload || null;
  }
  let current = payload;
  for (let i = 0; i < 4; i += 1) {
    if (current?.result && typeof current.result === "object") {
      current = current.result;
    } else if (current?.data && typeof current.data === "object" && !current.matchInfo) {
      current = current.data;
    } else if (current?.Result && typeof current.Result === "object") {
      current = current.Result;
    } else {
      break;
    }
  }
  return current;
}

function hasMatchData(payload) {
  const data = unwrapPayload(payload);
  return Boolean(data?.matchInfo || data?.liveData);
}

function hasAnyData(payload) {
  const data = unwrapPayload(payload);
  return Boolean(data && typeof data === "object" && Object.keys(data).length);
}

function hasFitnessData(payload) {
  const root = findFitnessRoot(payload);
  return Boolean(root && (arrayOf(root.Teams).length || arrayOf(root.teams).length || arrayOf(root.Players).length || arrayOf(root.players).length));
}

function normalizeTeam(matchInfo, fixture, side) {
  const contestants = arrayOf(matchInfo.contestant || matchInfo.contestants);
  const bySide = contestants.find((team) => String(team.position || "").toLowerCase() === side);
  const fallback = contestants[side === "home" ? 0 : 1] || {};
  const team = bySide || fallback;
  const fixtureName = side === "home" ? fixture?.home_name : fixture?.away_name;
  const name = team.name || team.officialName || team.shortName || fixtureName || (side === "home" ? "主队" : "客队");

  return {
    side,
    id: team.id || team.contestantId || team.teamId || "",
    name,
    shortName: team.shortName || name,
    countryId: team.country?.id || team.countryId || "",
  };
}

function normalizeLineups(liveData, home, away) {
  const rawLineups = arrayOf(liveData?.lineUp || liveData?.lineup || liveData?.lineups);
  const substitutions = arrayOf(liveData?.substitute || liveData?.substitutes || liveData?.substitution);
  const homeLineup = findLineup(rawLineups, home, 0);
  const awayLineup = findLineup(rawLineups, away, 1);
  return {
    home: normalizeLineup(homeLineup, home, substitutions),
    away: normalizeLineup(awayLineup, away, substitutions),
  };
}

function findLineup(lineups, team, index) {
  return (
    lineups.find((lineup) => sameText(lineup.contestantId || lineup.teamId, team.id)) ||
    lineups.find((lineup) => sameText(lineup.contestantName || lineup.teamName || lineup.name, team.name)) ||
    lineups[index] ||
    {}
  );
}

function normalizeLineup(lineup, team, substitutions = []) {
  const subMaps = substitutionMaps(team, substitutions);
  const players = arrayOf(lineup.player || lineup.players).map((player) => normalizePlayer(player, team, subMaps));
  const explicitSubstitutes = arrayOf(lineup.substitute || lineup.substitutes || lineup.bench).map((player) =>
    normalizePlayer(player, team, subMaps, true),
  );
  const starters = players.filter((player) => player.isStarter).slice(0, 11);
  const starterIds = new Set(starters.map((player) => player.id || `${player.shirt}:${player.name}`));
  const substitutes = [...players, ...explicitSubstitutes]
    .filter((player) => !starterIds.has(player.id || `${player.shirt}:${player.name}`))
    .sort((a, b) => {
      const aMinute = a.subOnMinute ?? 999;
      const bMinute = b.subOnMinute ?? 999;
      return aMinute - bMinute || toNumber(a.shirt) - toNumber(b.shirt);
    });
  return {
    raw: lineup || {},
    stats: statsMap(lineup?.stat || lineup?.stats),
    formation: lineup?.formationUsed || lineup?.formation || "",
    players,
    starters: starters.length ? starters : players.slice(0, 11),
    substitutes,
  };
}

function aggregateExpectedGoalEvents(liveData, home, away) {
  const totals = { home: 0, away: 0 };
  let hasExpectedGoals = false;

  arrayOf(liveData?.event || liveData?.events).forEach((event) => {
    const xg = expectedGoalValueFromEvent(event);
    if (xg === null) {
      return;
    }
    const side = sideForTeam(event.contestantId || event.teamId || event.contestantName || event.teamName, home, away);
    if (!side) {
      return;
    }
    totals[side] += xg;
    hasExpectedGoals = true;
  });

  if (!hasExpectedGoals) {
    return { home: {}, away: {} };
  }
  return {
    home: { expectedGoals: totals.home },
    away: { expectedGoals: totals.away },
  };
}

function preferExpectedGoals(targetStats, sourceStats) {
  const expectedGoals = pickStat(sourceStats, ["expectedGoals", "expectedGoal", "xG", "expected_goals"]);
  if (hasMetricValue(expectedGoals)) {
    targetStats.expectedGoals = expectedGoals;
  }
}

function expectedGoalValueFromEvent(event) {
  const direct = valueFrom(event, ["expectedGoals", "expectedGoal", "xG", "expected_goals"]);
  if (direct !== null && direct !== undefined && direct !== "") {
    const number = parseNumeric(direct);
    return Number.isFinite(number) ? number : null;
  }
  const qualifier = arrayOf(event?.qualifier || event?.qualifiers).find(
    (item) => Number(item?.qualifierId ?? item?.id ?? item?.typeId) === 321 && item?.value !== undefined && item?.value !== null,
  );
  if (!qualifier) {
    return null;
  }
  const number = parseNumeric(qualifier.value);
  return Number.isFinite(number) ? number : null;
}

function normalizePlayer(player, team, subMaps = { on: new Map(), off: new Map() }, forceSubstitute = false) {
  const name = player.matchName || player.knownName || player.name || [player.firstName, player.lastName].filter(Boolean).join(" ") || "--";
  const statMap = statsMap(player.stat || player.stats);
  const id = player.id || player.playerId || "";
  const formationPlace = player.formationPlace || pickStat(statMap, ["formationPlace"]);
  const gameStarted = toNumber(pickStat(statMap, ["gameStarted"])) === 1;
  const subOnMinute = subMaps.on.get(id) ?? null;
  const subOffMinute = subMaps.off.get(id) ?? null;
  const hasPitchPlace = toNumber(formationPlace) >= 1 && toNumber(formationPlace) <= 11;
  const isStarter = !forceSubstitute && (gameStarted || (hasPitchPlace && subOnMinute === null));
  const status = isStarter
    ? subOffMinute !== null
      ? `首发 / ${subOffMinute}'下`
      : "首发"
    : subOnMinute !== null
      ? `替补 / ${subOnMinute}'上`
      : "替补未出场";
  return {
    id,
    shirt: player.shirtNumber || player.uniformNumber || player.jerseyNumber || "",
    name,
    teamName: team.name,
    side: team.side,
    position: player.position || player.positionSide || player.type || "",
    positionSide: player.positionSide || "",
    positionCode: positionCode(player),
    formationPlace,
    isStarter,
    subOnMinute,
    subOffMinute,
    status: player.status || status,
    raw: player,
    statMap,
    stats: {
      minutes: pickStat(statMap, ["minsPlayed", "minutesPlayed", "minutes", "totalMins"]),
      goals: pickStat(statMap, ["goals", "goal", "totalGoals"]),
      assists: pickStat(statMap, ["goalAssist", "assists", "assist"]),
      shots: pickStat(statMap, ["totalScoringAtt", "totalShots", "shots"]),
      passes: pickStat(statMap, ["totalPass", "passes"]),
      tackles: pickStat(statMap, ["totalTackle", "wonTackle", "tackles"]),
    },
  };
}

function substitutionMaps(team, substitutions) {
  const on = new Map();
  const off = new Map();
  substitutions
    .filter((event) => {
      const teamValue = event.contestantId || event.teamId || event.contestantName || event.teamName;
      return sameText(teamValue, team.id) || sameText(teamValue, team.name);
    })
    .forEach((event) => {
      const minute = toNumber(minuteOf(event));
      if (event.playerOnId) {
        on.set(event.playerOnId, minute);
      }
      if (event.playerOffId) {
        off.set(event.playerOffId, minute);
      }
    });
  return { on, off };
}

function positionCode(player) {
  const position = String(player.position || "").toLowerCase();
  const side = String(player.positionSide || "").toLowerCase();
  const prefix = side.includes("left")
    ? "L"
    : side.includes("right")
      ? "R"
      : side.includes("centre") || side.includes("center")
        ? "C"
        : "";
  if (position.includes("goalkeeper")) {
    return "GK";
  }
  if (position.includes("defender")) {
    return prefix ? `${prefix}B` : "DF";
  }
  if (position.includes("midfielder")) {
    return prefix ? `${prefix}MF` : "MF";
  }
  if (position.includes("striker") || position.includes("forward") || position.includes("attacker")) {
    return prefix ? `${prefix}F` : "FW";
  }
  return player.position || "";
}

function normalizePlayers(lineups) {
  return [
    ...lineups.home.players,
    ...lineups.home.substitutes,
    ...lineups.away.players,
    ...lineups.away.substitutes,
  ].filter((player, index, all) => {
    const key = player.id || `${player.teamName}:${player.name}:${player.shirt}`;
    return all.findIndex((item) => (item.id || `${item.teamName}:${item.name}:${item.shirt}`) === key) === index;
  });
}

function normalizeScore(liveData, matchInfo, goals) {
  const details = liveData?.matchDetails || liveData?.details || {};
  const total = details.scores?.total || details.score?.total || matchInfo?.score || {};
  let home = valueFrom(total, ["home", "homeScore", "home_score"]);
  let away = valueFrom(total, ["away", "awayScore", "away_score"]);
  if (home === null || home === undefined || away === null || away === undefined) {
    home = goals.filter((goal) => goal.side === "home").length;
    away = goals.filter((goal) => goal.side === "away").length;
  }
  const rawPeriod = details.period;
  const period =
    typeof rawPeriod === "string" || typeof rawPeriod === "number"
      ? String(rawPeriod)
      : details.matchLengthMin
        ? `${details.matchLengthMin}'`
        : translateStatus(details.matchStatus);
  return {
    home,
    away,
    period,
  };
}

function normalizeGoals(liveData, home, away) {
  return arrayOf(liveData?.goal || liveData?.goals).map((goal) => {
    const teamSide = sideForTeam(goal.contestantId || goal.teamId || goal.contestantName || goal.teamName, home, away);
    return {
      side: teamSide,
      minute: minuteOf(goal),
      player: playerName(goal),
      assist: assistPlayerName(goal),
      ownGoal: Boolean(goal.ownGoal || goal.type === "own goal"),
      penalty: Boolean(goal.penalty || goal.type === "penalty"),
      raw: goal,
    };
  });
}

function normalizeEvents(liveData, goals, home, away) {
  const goalEvents = goals.map((goal) => ({
    type: goal.ownGoal ? "own-goal" : goal.penalty ? "penalty-goal" : "goal",
    minute: goal.minute,
    minuteLabel: formatMinute(goal.minute),
    title: `${goal.player || "未知球员"} ${goal.ownGoal ? "乌龙球" : "进球"}`,
    side: goal.side,
    penalty: goal.penalty,
    assist: goal.assist,
    titleParts: [
      { kind: "player", name: goal.player || "未知球员", side: goal.side },
      { kind: "text", text: goal.ownGoal ? "乌龙球" : "进球" },
    ],
    subtitle: `${teamNameBySide(goal.side, home, away)}${goal.penalty ? " / 点球" : ""}`,
  }));

  const cardEvents = arrayOf(liveData?.card || liveData?.cards).map((card) => {
    const side = sideForTeam(card.contestantId || card.teamId || card.contestantName || card.teamName, home, away);
    const cardType = String(card.cardType || card.type || "").toLowerCase().includes("red") ? "红牌" : "黄牌";
    return {
      type: cardType === "红牌" ? "red-card" : "yellow-card",
      minute: minuteOf(card),
      minuteLabel: formatMinute(minuteOf(card)),
      title: `${playerName(card) || "未知球员"} ${cardType}`,
      side,
      titleParts: [
        { kind: "player", name: playerName(card) || "未知球员", side },
        { kind: "text", text: cardType },
      ],
      subtitle: teamNameBySide(side, home, away),
    };
  });

  const subs = arrayOf(liveData?.substitute || liveData?.substitutes || liveData?.substitution).map((sub) => {
    const side = sideForTeam(sub.contestantId || sub.teamId || sub.contestantName || sub.teamName, home, away);
    const on = sub.playerOnName || sub.playerOn || sub.playerName || sub.subOn || "未知球员";
    const off = sub.playerOffName || sub.playerOff || sub.subOff || "";
    return {
      type: "substitution",
      minute: minuteOf(sub),
      minuteLabel: formatMinute(minuteOf(sub)),
      title: off ? `${on} 换下 ${off}` : `${on} 换人`,
      side,
      titleParts: off
        ? [
            { kind: "player", name: on, side },
            { kind: "text", text: "换下" },
            { kind: "player", name: off, side },
          ]
        : [
            { kind: "player", name: on, side },
            { kind: "text", text: "换人" },
          ],
      subtitle: teamNameBySide(side, home, away),
    };
  });

  return [...goalEvents, ...cardEvents, ...subs].sort((a, b) => toNumber(a.minute) - toNumber(b.minute));
}

function buildMetricRows(teamStats, score) {
  const definitions = [
    { label: "进球", home: score.home, away: score.away, suffix: "" },
    { label: "控球率", keys: ["possessionPercentage", "possession", "possessionPct"], suffix: "%" },
    { label: "射门", keys: ["totalScoringAtt", "totalShots", "shots"], suffix: "" },
    { label: "射正", keys: ["ontargetScoringAtt", "onTargetScoringAtt", "shotOnTarget", "shotsOnTarget"], suffix: "" },
    { label: "预期进球", keys: ["expectedGoals", "expectedGoal", "xG", "expected_goals"], suffix: "", decimals: 2 },
    { label: "传球", keys: ["totalPass", "passes"], suffix: "" },
    { label: "传球成功", keys: ["accuratePass", "successfulPass", "accuratePasses"], suffix: "" },
    { label: "角球", keys: ["wonCorners", "cornerTaken", "corners"], suffix: "" },
    { label: "抢断", keys: ["totalTackle", "wonTackle", "tackles"], suffix: "" },
    { label: "解围", keys: ["totalClearance", "clearances"], suffix: "" },
    { label: "犯规", keys: ["fkFoulLost", "fouls", "totalFouls"], suffix: "" },
    { label: "越位", keys: ["totalOffside", "offsides"], suffix: "" },
  ];

  return definitions
    .map((definition) => {
      const homeRaw = definition.home ?? pickStat(teamStats.home, definition.keys || []);
      const awayRaw = definition.away ?? pickStat(teamStats.away, definition.keys || []);
      if (!hasMetricValue(homeRaw) && !hasMetricValue(awayRaw)) {
        return null;
      }
      return {
        label: definition.label,
        home: {
          raw: toNumber(homeRaw),
          label: formatMetricValue(homeRaw, definition.suffix, definition.decimals),
        },
        away: {
          raw: toNumber(awayRaw),
          label: formatMetricValue(awayRaw, definition.suffix, definition.decimals),
        },
      };
    })
    .filter(Boolean);
}

function buildQuickStats(teamStats, score, events, fitness) {
  const homeShots = pickStat(teamStats.home, ["totalScoringAtt", "totalShots", "shots"]);
  const awayShots = pickStat(teamStats.away, ["totalScoringAtt", "totalShots", "shots"]);
  const homePass = pickStat(teamStats.home, ["totalPass", "passes"]);
  const awayPass = pickStat(teamStats.away, ["totalPass", "passes"]);
  const homeAcc = pickStat(teamStats.home, ["accuratePass", "successfulPass", "accuratePasses"]);
  const awayAcc = pickStat(teamStats.away, ["accuratePass", "successfulPass", "accuratePasses"]);
  const xgHome = pickStat(teamStats.home, ["expectedGoals", "expectedGoal", "xG", "expected_goals"]);
  const xgAway = pickStat(teamStats.away, ["expectedGoals", "expectedGoal", "xG", "expected_goals"]);
  const totalDistance = fitness.teams.reduce((sum, team) => sum + toNumber(team.totalDistance), 0);

  return [
    {
      label: "比分",
      value: `${safeText(score.home)} - ${safeText(score.away)}`,
      detail: "全场总比分",
    },
    {
      label: "射门",
      value: `${formatMetricValue(homeShots, "")} / ${formatMetricValue(awayShots, "")}`,
      detail: "主队 / 客队",
    },
    {
      label: "传球成功率",
      value: `${formatPercent(ratio(homeAcc, homePass))} / ${formatPercent(ratio(awayAcc, awayPass))}`,
      detail: "准确传球 / 总传球",
    },
    {
      label: "预期进球",
      value: `${formatMetricValue(xgHome, "", 2)} / ${formatMetricValue(xgAway, "", 2)}`,
      detail: "xG",
    },
    {
      label: "事件数",
      value: String(events.length || 0),
      detail: "进球、牌、换人",
    },
    {
      label: "体能总跑动",
      value: totalDistance ? formatDistance(totalDistance) : "--",
      detail: fitness.available ? "两队合计" : "暂无数据",
    },
  ];
}

function mergeTeamFitnessStats(teamStats, fitness) {
  const bySide = Object.fromEntries((fitness?.teams || []).map((team) => [team.side, team]));
  return {
    home: { ...(teamStats.home || {}), ...fitnessTeamStats(bySide.home) },
    away: { ...(teamStats.away || {}), ...fitnessTeamStats(bySide.away) },
  };
}

function fitnessTeamStats(team) {
  if (!team) {
    return {};
  }
  return {
    fitnessTotalDistance: team.totalDistance,
    fitnessSprintDistance: team.sprintDistance,
    fitnessOffensiveDistance: team.offensiveDistance,
    fitnessDefensiveDistance: team.defensiveDistance,
  };
}

function buildMetricGroups(teamStats, score) {
  const groupDefinitions = [
    {
      title: "进攻",
      rows: [
        { label: "进球", home: score.home, away: score.away },
        { label: "xG", keys: ["expectedGoals", "expectedGoal", "xG", "expected_goals"], decimals: 2 },
        { label: "射门", keys: ["totalScoringAtt", "totalShots", "shots"] },
        { label: "射正", keys: ["ontargetScoringAtt", "onTargetScoringAtt", "shotOnTarget", "shotsOnTarget"] },
        { label: "禁区内射门", keys: ["attemptsIbox", "totalAttemptsIbox", "attIboxTotal"] },
        { label: "禁区外射门", keys: ["attemptsObox", "totalAttemptsObox", "attOboxTotal"] },
        { label: "击中门框", keys: ["hitWoodwork", "postScoringAtt"], defaultValue: 0 },
        { label: "绝佳机会", keys: ["bigChanceCreated"] },
        { label: "对方禁区内触球", keys: ["touchesInOppBox", "touchesInPenaltyArea", "penAreaTouches"] },
        { label: "攻入进攻三区", keys: ["finalThirdEntries"] },
        { label: "角球", keys: ["wonCorners", "cornerTaken", "corners"] },
        { label: "任意球", keys: ["fkFoulWon", "freeKicks"] },
        { label: "越位", keys: ["totalOffside", "offsides"], defaultValue: 0 },
      ],
    },
    {
      title: "传控",
      rows: [
        { label: "控球率", keys: ["possessionPercentage", "possession", "possessionPct"], suffix: "%", decimals: 1 },
        { label: "传球", keys: ["totalPass", "passes"] },
        { label: "传球成功", keys: ["accuratePass", "successfulPass", "accuratePasses"] },
        {
          label: "传球成功率",
          ratio: { made: ["accuratePass", "successfulPass", "accuratePasses"], total: ["totalPass", "passes"] },
          suffix: "%",
          decimals: 1,
        },
        { label: "对方半场传球", keys: ["totalFwdZonePass", "fwdZonePasses"] },
        {
          label: "对方半场传球成功率",
          ratio: { made: ["accurateFwdZonePass"], total: ["totalFwdZonePass", "fwdZonePasses"] },
          suffix: "%",
          decimals: 1,
        },
        { label: "进攻三区传球", keys: ["totalFinalThirdPasses", "finalThirdPasses"] },
        { label: "进攻三区传球成功", keys: ["successfulFinalThirdPasses", "accurateFinalThirdPasses"] },
        {
          label: "进攻三区传球成功率",
          ratio: { made: ["successfulFinalThirdPasses", "accurateFinalThirdPasses"], total: ["totalFinalThirdPasses", "finalThirdPasses"] },
          suffix: "%",
          decimals: 1,
        },
        { label: "传中", keys: ["totalCross", "crosses"] },
        { label: "传中成功", keys: ["accurateCross", "successfulCrosses"] },
        { label: "角球", keys: ["wonCorners", "cornerTaken", "corners"] },
      ],
    },
    {
      title: "实时体能",
      rows: [
        { label: "跑动距离(米)", keys: ["fitnessTotalDistance"] },
        { label: "冲刺距离(米)", keys: ["fitnessSprintDistance"] },
        { label: "进攻跑动距离(米)", keys: ["fitnessOffensiveDistance"] },
        { label: "防守跑动距离(米)", keys: ["fitnessDefensiveDistance"] },
      ],
    },
    {
      title: "常规",
      rows: [
        { label: "触球", keys: ["touches", "touchesBall", "totalTouches"] },
        { label: "尝试过人", keys: ["totalContest", "dribbles"] },
        { label: "过人成功", keys: ["wonContest", "successfulDribbles"] },
        {
          label: "过人成功率",
          ratio: { made: ["wonContest", "successfulDribbles"], total: ["totalContest", "dribbles"] },
          suffix: "%",
          decimals: 1,
        },
        { label: "争抢", sum: [["duelWon", "duelsWon"], ["duelLost", "duelsLost"]] },
        {
          label: "争抢成功率",
          ratio: { made: ["duelWon", "duelsWon"], totalSum: [["duelWon", "duelsWon"], ["duelLost", "duelsLost"]] },
          suffix: "%",
          decimals: 1,
        },
        { label: "高空球争抢", sum: [["aerialWon", "aerialDuelsWon"], ["aerialLost", "aerialDuelsLost"]] },
        {
          label: "高空球争抢成功率",
          ratio: { made: ["aerialWon", "aerialDuelsWon"], totalSum: [["aerialWon", "aerialDuelsWon"], ["aerialLost", "aerialDuelsLost"]] },
          suffix: "%",
          decimals: 1,
        },
        { label: "进攻三区获得球权", keys: ["possWonAtt3rd", "possWonFinalThird"] },
        { label: "对抗成功", keys: ["duelWon", "duelsWon"] },
        { label: "对抗失败", keys: ["duelLost", "duelsLost"] },
        { label: "高空球成功", keys: ["aerialWon", "aerialDuelsWon"] },
        { label: "高空球失败", keys: ["aerialLost", "aerialDuelsLost"] },
        { label: "夺回球权", keys: ["ballRecovery", "possWon", "recoveries"] },
      ],
    },
    {
      title: "防守&纪律",
      rows: [
        { label: "尝试抢断", keys: ["totalTackle", "tacklesAttempted"] },
        { label: "抢断", keys: ["wonTackle", "tacklesWon"] },
        { label: "解围", keys: ["totalClearance", "clearances"] },
        { label: "拦截", keys: ["interception", "interceptions"] },
        { label: "封堵", keys: ["blockedScoringAtt", "blockedShots"] },
        { label: "丢失球权", keys: ["possLostAll", "possLost", "turnovers"] },
        { label: "犯规", keys: ["fkFoulLost", "fouls", "totalFouls"] },
        { label: "被犯规", keys: ["fkFoulWon", "foulsWon"] },
        { label: "黄牌", keys: ["totalYellowCard", "yellowCard", "yellowCards"] },
        { label: "红牌", keys: ["totalRedCard", "redCard", "redCards"], defaultValue: 0 },
      ],
    },
  ];

  return groupDefinitions
    .map((group) => ({
      title: group.title,
      rows: group.rows.map((definition) => buildMetricGroupRow(definition, teamStats)).filter(Boolean),
    }))
    .filter((group) => group.rows.length);
}

function buildMetricGroupRow(definition, teamStats) {
  const homeValue = definition.home ?? metricRawValue(teamStats.home, definition);
  const awayValue = definition.away ?? metricRawValue(teamStats.away, definition);
  const shouldUseZeroDefault = missingMetricDefaultsToZero(definition);
  const homeDefault = definition.defaultValue ?? (shouldUseZeroDefault && hasMetricValue(awayValue) ? 0 : undefined);
  const awayDefault = definition.defaultValue ?? (shouldUseZeroDefault && hasMetricValue(homeValue) ? 0 : undefined);
  const homeRaw = hasMetricValue(homeValue) ? homeValue : homeDefault;
  const awayRaw = hasMetricValue(awayValue) ? awayValue : awayDefault;
  if (!hasMetricValue(homeRaw) && !hasMetricValue(awayRaw)) {
    return null;
  }

  return {
    label: definition.label,
    home: {
      raw: toNumber(homeRaw),
      label: formatMetricValue(homeRaw, definition.suffix || "", definition.decimals || 0),
    },
    away: {
      raw: toNumber(awayRaw),
      label: formatMetricValue(awayRaw, definition.suffix || "", definition.decimals || 0),
    },
  };
}

function metricRawValue(stats, definition) {
  if (definition.sum) {
    return sumStats(stats, definition.sum);
  }
  if (definition.ratio) {
    const made = pickStat(stats, definition.ratio.made);
    const total = definition.ratio.totalSum ? sumStats(stats, definition.ratio.totalSum) : pickStat(stats, definition.ratio.total);
    if (!hasMetricValue(total)) {
      return null;
    }
    const value = ratio(hasMetricValue(made) ? made : 0, total);
    return value === null ? null : value * 100;
  }
  return pickStat(stats, definition.keys || []);
}

function missingMetricDefaultsToZero(definition) {
  if (definition.ratio || definition.sum) {
    return false;
  }
  if (definition.suffix === "%" || String(definition.label || "").includes("率")) {
    return false;
  }
  const keys = definition.keys || [];
  if (keys.some((key) => String(key).startsWith("fitness"))) {
    return false;
  }
  return true;
}

function sumStats(stats, keyGroups) {
  const values = keyGroups.map((keys) => pickStat(stats, keys));
  if (!values.some(hasMetricValue)) {
    return null;
  }
  return values.reduce((sum, value) => sum + toNumber(value), 0);
}

function mergePlayerStatSources(players, expectedPlayers) {
  const expectedByKey = new Map();
  expectedPlayers.forEach((player) => {
    playerMergeKeys(player).forEach((key) => expectedByKey.set(key, player));
  });

  return players.map((player) => {
    const expected = playerMergeKeys(player).map((key) => expectedByKey.get(key)).find(Boolean);
    if (!expected) {
      return player;
    }
    const statMap = { ...(expected.statMap || {}), ...(player.statMap || {}) };
    return {
      ...player,
      statMap,
      stats: {
        ...player.stats,
        expectedGoals: pickStat(statMap, ["expectedGoals", "expectedGoal", "xG", "expected_goals"]),
        expectedAssists: pickStat(statMap, ["expectedAssists", "expectedAssist", "xA", "expected_assists"]),
      },
    };
  });
}

function playerMergeKeys(player) {
  return [
    player.id ? `id:${player.id}` : "",
    player.shirt ? `shirt:${player.side}:${player.shirt}` : "",
    player.name ? `name:${player.side}:${normalizeKey(player.name)}` : "",
  ].filter(Boolean);
}

function buildPlayerTables(players) {
  const types = ["attack", "passing", "general", "defense"];
  return Object.fromEntries(
    types.map((type) => [
      type,
      {
        home: buildPlayerTableRows(players, "home", type),
        away: buildPlayerTableRows(players, "away", type),
      },
    ]),
  );
}

function buildPlayerTableRows(players, side, type) {
  const config = playerTableConfig(type);
  return players
    .filter((player) => player.side === side)
    .map((player) => buildPlayerTableRow(player, type, config.columns))
    .sort((a, b) => b.sortValue - a.sortValue || toNumber(a.no) - toNumber(b.no));
}

function buildPlayerTableRow(player, type, columns) {
  const row = {
    side: player.side,
    no: player.shirt || "--",
    player: player.name,
    position: player.positionCode || player.position || player.status || "--",
    rawValues: {},
    ratioParts: {},
    heat: {},
  };

  columns.forEach((column) => {
    if (column.key === "no" || column.key === "player") {
      return;
    }
    const raw = playerColumnRawValue(player, column);
    row.rawValues[column.key] = raw;
    row[column.key] = playerColumnLabel(raw, column);
    if (column.ratio) {
      row.ratioParts[column.key] = playerColumnRatioParts(player, column);
    }
  });

  return {
    ...row,
    sortValue: playerTableSortValue(row, type),
  };
}

function playerTableSortValue(row, type) {
  const sortKeys = {
    attack: ["goals", "shots", "shotsOn", "touchesOppBox"],
    passing: ["assists", "chances", "passes", "passAccuracy"],
    general: ["recoveries", "duels", "dribbleAttempts", "losses"],
    defense: ["tackles", "interceptions", "clearances", "saves"],
  };
  const keys = sortKeys[type] || sortKeys.general;
  return keys.reduce((sum, key, index) => sum + toNumber(row.rawValues?.[key]) * 10 ** (keys.length - index), 0);
}

function playerColumnRawValue(player, column) {
  let raw = null;
  if (column.sum) {
    raw = sumStats(player.statMap, column.sum);
  } else if (column.ratio) {
    const parts = playerColumnRatioParts(player, column);
    const value = ratio(parts.made, parts.total);
    raw = value === null ? null : value * 100;
  } else {
    raw = pickStat(player.statMap, column.keys || []);
  }

  if (!hasMetricValue(raw) && Object.prototype.hasOwnProperty.call(column, "defaultValue")) {
    return column.defaultValue;
  }
  return raw;
}

function playerColumnRatioParts(player, column) {
  return {
    made: pickStat(player.statMap, column.ratio?.made || []),
    total: column.ratio?.totalSum ? sumStats(player.statMap, column.ratio.totalSum) : pickStat(player.statMap, column.ratio?.total || []),
  };
}

function playerColumnLabel(raw, column) {
  return formatMetricValue(raw, column.suffix || "", column.decimals || 0);
}

function rankPlayerRows(rows, columns) {
  const rankedRows = rows.map((row) => ({ ...row, heat: {} }));
  columns.filter(isRankableColumn).forEach((column) => {
    rankedRows
      .filter((row) => Number.isFinite(toNumber(row.rawValues?.[column.key])) && toNumber(row.rawValues?.[column.key]) > 0)
      .sort((a, b) => toNumber(b.rawValues[column.key]) - toNumber(a.rawValues[column.key]))
      .slice(0, 3)
      .forEach((row, index) => {
        row.heat[column.key] = index + 1;
      });
  });
  return rankedRows;
}

function isRankableColumn(column) {
  return column.key !== "no" && column.key !== "player" && !column.fixed;
}

function buildPlayerTotalRow(rows, columns, side) {
  const totalRow = {
    side,
    no: "",
    player: tx("球队总计"),
    position: "",
    rawValues: {},
    ratioParts: {},
    heat: {},
  };

  columns.forEach((column) => {
    if (!isRankableColumn(column)) {
      return;
    }
    const raw = column.ratio ? ratioTotalFromRows(rows, column.key) : summedTotalFromRows(rows, column.key, column);
    totalRow.rawValues[column.key] = raw;
    totalRow[column.key] = playerColumnLabel(raw, { ...column, decimals: column.teamDecimals ?? column.decimals });
  });

  return totalRow;
}

function ratioTotalFromRows(rows, key) {
  const totals = rows.reduce(
    (acc, row) => {
      const parts = row.ratioParts?.[key] || {};
      if (hasMetricValue(parts.made)) {
        acc.made += toNumber(parts.made);
      }
      if (hasMetricValue(parts.total)) {
        acc.total += toNumber(parts.total);
      }
      return acc;
    },
    { made: 0, total: 0 },
  );
  const value = ratio(totals.made, totals.total);
  return value === null ? null : value * 100;
}

function summedTotalFromRows(rows, key, column) {
  let seen = false;
  const total = rows.reduce((sum, row) => {
    const value = row.rawValues?.[key];
    if (!hasMetricValue(value)) {
      return sum;
    }
    seen = true;
    return sum + toNumber(value);
  }, 0);
  if (seen) {
    return total;
  }
  return Object.prototype.hasOwnProperty.call(column, "defaultValue") ? column.defaultValue : null;
}

function renderPlayerTopThree(rows, columns) {
  const cards = columns
    .filter(isRankableColumn)
    .map((column) => {
      const leaders = rows
        .filter((row) => Number.isFinite(toNumber(row.rawValues?.[column.key])) && toNumber(row.rawValues?.[column.key]) > 0)
        .sort((a, b) => toNumber(b.rawValues[column.key]) - toNumber(a.rawValues[column.key]))
        .slice(0, 3);
      if (!leaders.length) {
        return "";
      }
      return `
        <article class="top-three-card ${escapeHtml(state.activeTeam)}">
          <h3>${escapeHtml(tx(column.label))}</h3>
          <div class="top-three-list">
            ${leaders
              .map(
                (row, index) => `
                  <div class="top-three-row heat-${index + 1}">
                    <span class="top-three-rank">${index + 1}</span>
                    <span class="top-three-player">${escapeHtml(row.player)}</span>
                    <strong>${escapeHtml(playerColumnLabel(row.rawValues[column.key], column))}</strong>
                  </div>
                `,
              )
              .join("")}
          </div>
        </article>
      `;
    })
    .filter(Boolean)
    .join("");

  if (!cards) {
    return "";
  }

  return `
    <section class="top-three-heatmap">
      <div class="top-three-head">
        <h3>${escapeHtml(tx("前三"))}</h3>
      </div>
      <div class="top-three-grid">${cards}</div>
    </section>
  `;
}

function playerStatLabel(player, keys, suffix = "", decimals = 0) {
  return formatMetricValue(pickStat(player.statMap, keys), suffix, decimals);
}

function playerRatioLabel(player, madeKeys, totalKeys) {
  const made = pickStat(player.statMap, madeKeys);
  const total = pickStat(player.statMap, totalKeys);
  return formatPercent(ratio(made, total));
}

function playerFractionLabel(player, madeKeys, totalKeys) {
  const made = pickStat(player.statMap, madeKeys);
  const total = pickStat(player.statMap, totalKeys);
  if (!hasMetricValue(made) && !hasMetricValue(total)) {
    return "--";
  }
  return `${formatMetricValue(made, "")}/${formatMetricValue(total, "")}`;
}

function playerSumLabel(player, firstKeys, secondKeys) {
  const first = pickStat(player.statMap, firstKeys);
  const second = pickStat(player.statMap, secondKeys);
  if (!hasMetricValue(first) && !hasMetricValue(second)) {
    return "--";
  }
  return String(toNumber(first) + toNumber(second));
}

function normalizePassMatrix(payload, home, away) {
  const liveData = getLiveData(payload);
  const lineups = arrayOf(liveData?.lineUp || liveData?.lineup || liveData?.lineups);
  return {
    home: normalizePassMatrixTeam(findLineup(lineups, home, 0)),
    away: normalizePassMatrixTeam(findLineup(lineups, away, 1)),
  };
}

function normalizePassMatrixTeam(lineup) {
  const players = arrayOf(lineup?.player || lineup?.players)
    .map((player) => ({
      id: player.playerId || player.id || "",
      shirt: player.shirtNumber || player.uniformNumber || player.jerseyNumber || "",
      name: player.matchName || player.knownName || player.name || [player.firstName, player.lastName].filter(Boolean).join(" ") || "--",
      passSuccess: toNumber(player.passSuccess),
      passLost: toNumber(player.passLost),
      raw: player,
    }))
    .filter((player) => player.id || player.name !== "--");
  const byId = new Map(players.map((player) => [player.id, player]));
  const links = [];
  const rows = players.map((player) => {
    const passes = new Map(
      arrayOf(player.raw.playerPass || player.raw.passesTo || player.raw.passTo).map((pass) => {
        const targetId = pass.playerId || pass.targetPlayerId || pass.toPlayerId || pass.id || "";
        return [targetId, toNumber(pass.value || pass.total || pass.count)];
      }),
    );
    const cells = players.map((target) => {
      const value = passes.get(target.id) || 0;
      if (value > 0 && byId.has(target.id)) {
        links.push({ from: player, to: target, value });
      }
      return { target, value };
    });
    return { player, cells };
  });
  const max = links.reduce((current, link) => Math.max(current, toNumber(link.value)), 0);
  return {
    players,
    rows,
    links: links.sort((a, b) => toNumber(b.value) - toNumber(a.value)),
    max,
  };
}

function applyMatrixDerivedPassing(players, matrix) {
  const passByPlayer = new Map();
  ["home", "away"].forEach((side) => {
    arrayOf(matrix?.[side]?.rows).forEach((row) => {
      const total = arrayOf(row.cells).reduce((sum, cell) => sum + toNumber(cell.value), 0);
      const player = row.player || {};
      buildPlayerLookupKeys({
        id: player.id,
        shirt: player.shirt,
        name: player.name,
        side,
      }).forEach((key) => passByPlayer.set(key, total));
    });
  });

  return players.map((player) => {
    const key = buildPlayerLookupKeys(player).find((item) => passByPlayer.has(item));
    if (!key) {
      return player;
    }
    const accurate = passByPlayer.get(key);
    const statMap = {
      ...(player.statMap || {}),
      accuratePass: accurate,
      successfulPass: accurate,
      accuratePasses: accurate,
    };
    return {
      ...player,
      statMap,
      stats: {
        ...(player.stats || {}),
        passes: pickStat(statMap, ["totalPass", "passes"]),
      },
    };
  });
}

function deriveTeamAccuratePassesFromPlayers(players) {
  const totals = { home: null, away: null };
  ["home", "away"].forEach((side) => {
    const group = players.filter((player) => player.side === side);
    const values = group
      .map((player) => pickStat(player.statMap, ["accuratePass", "successfulPass", "accuratePasses"]))
      .filter(hasMetricValue);
    if (values.length) {
      totals[side] = values.reduce((sum, value) => sum + toNumber(value), 0);
    }
  });
  return totals;
}

function buildPlayerLookupKeys(player) {
  return [
    player.id ? `id:${player.id}` : "",
    player.shirt ? `shirt:${player.side}:${player.shirt}` : "",
    player.name ? `name:${player.side}:${normalizeKey(player.name)}` : "",
  ].filter(Boolean);
}

function normalizeCoaches(lineups) {
  return {
    home: coachNameFromLineup(lineups.home.raw),
    away: coachNameFromLineup(lineups.away.raw),
  };
}

function coachNameFromLineup(lineup) {
  const officials = arrayOf(lineup?.teamOfficial || lineup?.teamOfficials || lineup?.official || lineup?.officials);
  const coach =
    officials.find((official) => /coach|manager|head/i.test(String(official.type || official.role || official.position || ""))) || officials[0];
  return (
    coach?.matchName ||
    coach?.knownName ||
    coach?.name ||
    [coach?.firstName, coach?.lastName].filter(Boolean).join(" ") ||
    lineup?.coachName ||
    lineup?.managerName ||
    "-"
  );
}

function normalizeFitness(payload, home, away) {
  const root = findFitnessRoot(payload);
  if (!root) {
    return { available: false, teams: [], players: [] };
  }

  const rawTeams = arrayOf(root.Teams || root.teams || root.Team || root.team);
  const rawPlayers = arrayOf(root.Players || root.players || root.Player || root.player);
  const homeRaw = matchFitnessTeam(rawTeams, home) || rawTeams[0] || {};
  const awayRaw = matchFitnessTeam(rawTeams, away) || rawTeams.find((team) => team !== homeRaw) || rawTeams[1] || {};

  const teams = [
    normalizeFitnessTeam(homeRaw, home, "home"),
    normalizeFitnessTeam(awayRaw, away, "away"),
  ];
  const teamCodeMap = new Map(
    [
      [valueFrom(homeRaw, ["TeamName", "teamName", "Name", "name", "ClubName"]), home.name],
      [valueFrom(awayRaw, ["TeamName", "teamName", "Name", "name", "ClubName"]), away.name],
    ]
      .filter(([code]) => Boolean(code))
      .map(([code, name]) => [normalizeKey(code), name]),
  );

  const players = rawPlayers
    .map((player) => normalizeFitnessPlayer(player, home, away, teamCodeMap))
    .filter((player) => player.name !== "--");
  return {
    available: Boolean(rawTeams.length || rawPlayers.length),
    teams,
    players,
  };
}

function findFitnessRoot(payload) {
  const unwrapped = unwrapPayload(payload);
  if (!unwrapped || typeof unwrapped !== "object") {
    return null;
  }
  if (unwrapped.Teams || unwrapped.teams || unwrapped.Players || unwrapped.players) {
    return unwrapped;
  }
  return unwrapped.Data || unwrapped.data || unwrapped.result || unwrapped.Result || null;
}

function matchFitnessTeam(rawTeams, team) {
  return rawTeams.find((row) => {
    const id = valueFrom(row, ["TeamUuid", "TeamId", "FixtureTeamUuid", "teamId", "contestantId"]);
    const name = valueFrom(row, ["TeamName", "teamName", "Name", "name", "ClubName"]);
    return (team.id && sameText(id, team.id)) || sameText(name, team.name);
  });
}

function normalizeFitnessTeam(row, team, side) {
  return {
    side,
    name: team.name,
    totalDistance: valueFrom(row, ["TotalDistance", "totalDistance", "Distance", "RunDistance", "跑动距离", "总跑动"]),
    highSpeedDistance: valueFrom(row, ["HighSpeedDistance", "HighSpeedRunDistance", "HSRDistance", "highSpeedDistance", "高强度跑"]),
    sprintDistance: valueFrom(row, ["SprintingDistance", "SprintDistance", "sprintDistance", "冲刺距离"]),
    offensiveDistance: valueFrom(row, ["OffensiveDistance", "offensiveDistance", "进攻距离"]),
    defensiveDistance: valueFrom(row, ["DefensiveDistance", "defensiveDistance", "防守距离"]),
    maxSpeed: valueFrom(row, ["MaxSpeed", "maxSpeed", "TopSpeed", "最高速度"]),
  };
}

function normalizeFitnessPlayer(row, home, away, teamCodeMap) {
  const rawTeamName = valueFrom(row, ["TeamName", "teamName", "ClubName", "team"]) || "";
  const teamName = teamCodeMap.get(normalizeKey(rawTeamName)) || rawTeamName;
  const side = sameText(teamName, home.name) ? "home" : sameText(teamName, away.name) ? "away" : "";
  const firstName = valueFrom(row, ["FirstName", "firstName", "GivenName"]);
  const lastName = valueFrom(row, ["LastName", "lastName", "FamilyName"]);
  const fallbackName = [firstName, lastName].filter(Boolean).join("");
  return {
    side,
    teamName: teamName || (side === "home" ? home.name : side === "away" ? away.name : "--"),
    shirt: valueFrom(row, ["ShirtNumber", "shirtNumber", "JerseyNumber", "No", "号码"]) || "",
    name: valueFrom(row, ["PlayerName", "playerName", "Name", "name", "MatchName", "姓名"]) || fallbackName || "--",
    totalDistance: valueFrom(row, ["TotalDistance", "totalDistance", "Distance", "RunDistance", "跑动距离", "总跑动"]),
    highSpeedDistance: valueFrom(row, ["HighSpeedDistance", "HighSpeedRunDistance", "HSRDistance", "highSpeedDistance", "高强度跑"]),
    sprintDistance: valueFrom(row, ["SprintingDistance", "SprintDistance", "sprintDistance", "冲刺距离"]),
    offensiveDistance: valueFrom(row, ["OffensiveDistance", "offensiveDistance", "进攻距离"]),
    defensiveDistance: valueFrom(row, ["DefensiveDistance", "defensiveDistance", "防守距离"]),
    maxSpeed: valueFrom(row, ["MaxSpeed", "maxSpeed", "TopSpeed", "最高速度"]),
  };
}

function statsMap(stats) {
  const result = {};
  arrayOf(stats).forEach((stat) => {
    if (!stat || typeof stat !== "object") {
      return;
    }
    const key = stat.type || stat.name || stat.key || stat.id || stat.statType;
    const value = firstMetricValue(stat.value, stat.total, stat.amount, stat.val, stat["@value"]);
    if (!hasMetricValue(key)) {
      return;
    }
    result[String(key)] = value;
    result[normalizeKey(key)] = value;
  });
  return result;
}

function firstMetricValue(...values) {
  const value = values.find(hasMetricValue);
  return value === undefined ? null : value;
}

function mergeStats(primary, secondary) {
  return { ...(secondary || {}), ...(primary || {}) };
}

function pickStat(map, keys) {
  if (!map || !keys) {
    return null;
  }
  for (const key of keys) {
    if (hasMetricValue(map[key])) {
      return map[key];
    }
    const normalized = normalizeKey(key);
    if (hasMetricValue(map[normalized])) {
      return map[normalized];
    }
  }
  return null;
}

function valueFrom(row, keys) {
  if (!row || typeof row !== "object") {
    return null;
  }
  const direct = keys.find((key) => row[key] !== undefined && row[key] !== null);
  if (direct) {
    return row[direct];
  }
  const normalized = new Map(Object.keys(row).map((key) => [normalizeKey(key), key]));
  for (const key of keys) {
    const actual = normalized.get(normalizeKey(key));
    if (actual && row[actual] !== undefined && row[actual] !== null) {
      return row[actual];
    }
  }
  return null;
}

function normalizeKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, "");
}

function arrayOf(value) {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

function playerName(row) {
  return row.playerName || row.scorerName || row.matchName || row.name || row.player?.matchName || row.player?.name || "";
}

function assistPlayerName(row) {
  const direct = valueFrom(row, ["assistPlayerName", "assistName", "goalAssistName", "assistPlayerMatchName"]);
  if (direct) {
    return direct;
  }
  const assistPlayer = row.assistPlayer;
  if (typeof assistPlayer === "string") {
    return assistPlayer;
  }
  return assistPlayer?.matchName || assistPlayer?.name || "";
}

function minuteOf(row) {
  return (
    valueFrom(row, ["timeMin", "minute", "min", "periodMinute", "time"]) ??
    valueFrom(row, ["timeMinSec", "timeStamp"]) ??
    0
  );
}

function sideForTeam(teamValue, home, away) {
  if (sameText(teamValue, home.id) || sameText(teamValue, home.name)) {
    return "home";
  }
  if (sameText(teamValue, away.id) || sameText(teamValue, away.name)) {
    return "away";
  }
  return "";
}

function teamNameBySide(side, home, away) {
  return side === "home" ? home.name : side === "away" ? away.name : "--";
}

function teamBySide(side, model) {
  return side === "home" ? model.home : side === "away" ? model.away : null;
}

function sameText(a, b) {
  if (!a || !b) {
    return false;
  }
  return normalizeKey(a) === normalizeKey(b);
}

function hasMetricValue(value) {
  return value !== null && value !== undefined && value !== "";
}

function toNumber(value) {
  const number = parseNumeric(value);
  return Number.isFinite(number) ? number : 0;
}

function parseNumeric(value) {
  if (value === null || value === undefined || value === "") {
    return Number.NaN;
  }
  const number = Number(String(value).replace(/[%公里千米kmKM\s,]/g, ""));
  return Number.isFinite(number) ? number : Number.NaN;
}

function ratio(part, total) {
  const denominator = toNumber(total);
  return denominator > 0 ? toNumber(part) / denominator : null;
}

function playerSortScore(player) {
  return (
    toNumber(player.stats.goals) * 1000 +
    toNumber(player.stats.assists) * 600 +
    toNumber(player.stats.shots) * 20 +
    toNumber(player.stats.passes) +
    toNumber(player.stats.minutes) * 0.2
  );
}

function formatMetricValue(value, suffix = "", decimals = 0) {
  if (!hasMetricValue(value)) {
    return "--";
  }
  const number = parseNumeric(value);
  if (!Number.isFinite(number)) {
    return `${value}${suffix}`;
  }
  const formatted = decimals > 0 ? number.toFixed(decimals) : String(Math.round(number));
  return `${formatted}${suffix}`;
}

function formatPercent(value) {
  return value === null || value === undefined ? "--" : `${Math.round(value * 100)}%`;
}

function formatDistance(value) {
  if (!hasMetricValue(value)) {
    return "--";
  }
  const number = toNumber(value);
  if (!number) {
    return "0 m";
  }
  return number >= 1000 ? `${(number / 1000).toFixed(2)} km` : `${Math.round(number)} m`;
}

function formatSpeed(value) {
  if (!hasMetricValue(value)) {
    return "--";
  }
  const number = toNumber(value);
  return number ? `${number.toFixed(1)} km/h` : "--";
}

function formatMinute(value) {
  const number = toNumber(value);
  return number ? `${Math.floor(number)}'` : "--";
}

function formatDateTime(date, time) {
  if (!date && !time) {
    return "";
  }
  return [date, time ? String(time).slice(0, 5) : ""].filter(Boolean).join(" ");
}

function kickoffDate(model) {
  const matchInfo = model?.matchInfo || {};
  const fixture = model?.fixture || {};
  const utcDate = String(matchInfo.date || "").replace(/Z$/, "");
  const utcTime = String(matchInfo.time || "");
  if (utcDate && utcTime.endsWith("Z")) {
    const parsed = new Date(`${utcDate}T${utcTime}`);
    if (Number.isFinite(parsed.getTime())) {
      return parsed;
    }
  }

  const localDate = matchInfo.localDate || fixture.local_date;
  const localTime = matchInfo.localTime || fixture.local_time || "00:00:00";
  if (localDate) {
    const parsed = new Date(`${localDate}T${String(localTime).slice(0, 8)}+08:00`);
    if (Number.isFinite(parsed.getTime())) {
      return parsed;
    }
  }
  return null;
}

function isScheduledStatus(status) {
  const normalized = String(status || "").toLowerCase();
  return ["fixture", "prematch", "scheduled"].includes(normalized);
}

function countdownText(target) {
  const remainingMs = target.getTime() - Date.now();
  if (remainingMs <= 0) {
    return tx("即将开赛");
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const time = days > 0 ? `${days}d ${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}` : `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
  return `${tx("距开赛")} ${time}`;
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function formatClock(date) {
  return date.toLocaleTimeString(TIME_LOCALE[state.lang] || TIME_LOCALE.cn, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function translateStatus(status) {
  const normalized = String(status || "").toLowerCase();
  if (!normalized) {
    return "--";
  }
  if (["played", "fulltime", "full time", "ft"].includes(normalized)) {
    return tx("已完赛");
  }
  if (["playing", "live", "firsthalf", "secondhalf", "halftime"].includes(normalized)) {
    return tx("进行中");
  }
  if (["fixture", "prematch", "scheduled"].includes(normalized)) {
    return tx("未开始");
  }
  return tx(status);
}

function getVenue(matchInfo) {
  const venue = matchInfo.venue || {};
  return venue.longName || venue.name || matchInfo.venueName || matchInfo.description || "--";
}

function goalsSummary(goals, home, away) {
  if (!goals.length) {
    return "--";
  }
  const homeGoals = goals
    .filter((goal) => goal.side === "home")
    .map((goal) => `${goal.player || tx("未知")} ${formatMinute(goal.minute)}`);
  const awayGoals = goals
    .filter((goal) => goal.side === "away")
    .map((goal) => `${goal.player || tx("未知")} ${formatMinute(goal.minute)}`);
  return [`${teamDisplayName(home, true)}: ${homeGoals.join(", ") || "-"}`, `${teamDisplayName(away, true)}: ${awayGoals.join(", ") || "-"}`].join(" | ");
}

function flagImageUrl(team) {
  return team?.countryId
    ? `https://omo.akamai.opta.net/image.php?h=omo.akamai.opta.net&sport=football&entity=flags&description=countries&dimensions=21x21&id=${encodeURIComponent(team.countryId)}`
    : "";
}

function renderInlineFlag(team) {
  const url = flagImageUrl(team);
  if (url) {
    return `<img class="inline-flag" src="${escapeHtml(url)}" alt="${escapeHtml(teamDisplayName(team, true))}" loading="lazy" />`;
  }
  return `<span class="inline-flag fallback">${escapeHtml(initials(team?.shortName || team?.name))}</span>`;
}

function renderFlag(target, team) {
  target.innerHTML = "";
  const url = flagImageUrl(team);
  if (url) {
    const image = document.createElement("img");
    image.alt = teamDisplayName(team, true);
    image.src = url;
    image.onerror = () => {
      target.textContent = initials(teamDisplayName(team));
    };
    target.appendChild(image);
    return;
  }
  target.textContent = initials(teamDisplayName(team));
}

function initials(value) {
  const text = String(value || "").trim();
  if (!text) {
    return "--";
  }
  return text.length <= 2 ? text : text.slice(0, 2);
}

function setText(target, value) {
  if (target) {
    target.textContent = safeText(value);
  }
}

function safeText(value) {
  return value === null || value === undefined || value === "" ? "--" : String(value);
}

function escapeHtml(value) {
  return safeText(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function showError(message) {
  refs.error.hidden = false;
  refs.error.textContent = message;
}

function hideError() {
  refs.error.hidden = true;
  refs.error.textContent = "";
}

function setSyncStatus(key, ready, time = null) {
  state.syncKey = key;
  state.syncReady = Boolean(ready);
  state.syncTime = time;
  renderSyncStatus();
}

function renderSyncStatus() {
  if (refs.syncText) {
    const suffix = state.syncTime ? ` ${formatClock(state.syncTime)}` : "";
    refs.syncText.textContent = `${tx(state.syncKey)}${suffix}`;
  }
  if (refs.liveDot) {
    refs.liveDot.classList.toggle("ready", state.syncReady);
  }
}

function connectEvents() {
  if (!window.EventSource) {
    return;
  }
  const events = new window.EventSource(apiUrl("/events"));
  events.onmessage = (message) => {
    try {
      const payload = JSON.parse(message.data);
      if (!payload.fixture_id || payload.fixture_id === state.fixtureId) {
        scheduleReload();
      }
    } catch {
      // Keep the report usable even if a malformed SSE payload appears.
    }
  };
}

function scheduleReload() {
  window.clearTimeout(state.reloadTimer);
  state.reloadTimer = window.setTimeout(loadReport, 700);
}
