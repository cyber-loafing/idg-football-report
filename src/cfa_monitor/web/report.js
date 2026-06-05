const DEFAULT_FIXTURE_ID = "cq1wnjypozp0xc3b1z3b2hlp0";
const DEFAULT_LANGUAGE = "cn";
const LANGUAGES = ["cn", "en", "es"];
const LANGUAGE_LABELS = { cn: "CN", en: "EN", es: "ES" };
const HTML_LANG = { cn: "zh-CN", en: "en", es: "es" };
const TIME_LOCALE = { cn: "zh-CN", en: "en-US", es: "es-ES" };

const TEXT_TRANSLATIONS = {
  "CFA Match Report": { cn: "CFA 比赛报告", en: "CFA Match Report", es: "Informe de partido CFA" },
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
  "xG": { en: "xG", es: "xG" },
  "xA": { en: "xA", es: "xA" },
  "射门": { en: "Shots", es: "Tiros" },
  "射正": { en: "Shots on Target", es: "Tiros a puerta" },
  "进攻动作": { en: "Attacking Actions", es: "Acciones ofensivas" },
  "传球": { en: "Passes", es: "Pases" },
  "成功率": { en: "Accuracy", es: "Precisión" },
  "传中": { en: "Crosses", es: "Centros" },
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
  "角球": { en: "Corners", es: "Córners" },
  "任意球": { en: "Free Kicks", es: "Tiros libres" },
  "越位": { en: "Offsides", es: "Fueras de juego" },
  "传球成功": { en: "Accurate Passes", es: "Pases precisos" },
  "前场传球": { en: "Final Third Passes", es: "Pases en último tercio" },
  "成功前场传球": { en: "Accurate Final Third Passes", es: "Pases precisos en último tercio" },
  "传中成功": { en: "Accurate Crosses", es: "Centros precisos" },
  "尝试过人": { en: "Dribbles Attempted", es: "Regates intentados" },
  "过人成功": { en: "Successful Dribbles", es: "Regates completados" },
  "对抗成功": { en: "Duels Won", es: "Duelos ganados" },
  "对抗失败": { en: "Duels Lost", es: "Duelos perdidos" },
  "高空球成功": { en: "Aerials Won", es: "Duelos aéreos ganados" },
  "高空球失败": { en: "Aerials Lost", es: "Duelos aéreos perdidos" },
  "夺回球权": { en: "Recoveries", es: "Recuperaciones" },
  "拦截": { en: "Interceptions", es: "Intercepciones" },
  "封堵": { en: "Blocks", es: "Bloqueos" },
  "丢失球权": { en: "Possession Lost", es: "Posesión perdida" },
  "犯规": { en: "Fouls", es: "Faltas" },
  "被犯规": { en: "Fouls Won", es: "Faltas recibidas" },
  "Substitute": { cn: "替补", en: "Substitute", es: "Suplente" },
  Goalkeeper: { cn: "门将", en: "Goalkeeper", es: "Portero" },
  Defender: { cn: "后卫", en: "Defender", es: "Defensa" },
  Midfielder: { cn: "中场", en: "Midfielder", es: "Centrocampista" },
  Striker: { cn: "前锋", en: "Striker", es: "Delantero" },
  Forward: { cn: "前锋", en: "Forward", es: "Delantero" },
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
  document.title = tx("CFA Match Report");
  setText(refs.brandText, tx("Match Center"));
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
    const sourceConfig = await fetchJson("/api/source-config").catch(() => ({
      perform_competition_id: "10n54vtx4fi2s1frl9ipw2t6bu",
      fitness_game_infos: {},
    }));
    const fixtureId = await resolveFixtureId();
    state.fixtureId = fixtureId;

    const latest = await fetchJson(`/api/fixtures/${encodeURIComponent(fixtureId)}/latest`).catch(() => ({
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

async function resolveFixtureId() {
  const fromUrl = fixtureIdFromUrl();
  if (fromUrl) {
    return fromUrl;
  }

  const fixtures = await fetchJson("/api/fixtures").catch(() => []);
  const configured = Array.isArray(fixtures) ? fixtures : [];
  const preferred = configured.find((fixture) => fixture.id === DEFAULT_FIXTURE_ID) || configured[0];
  return preferred?.id || DEFAULT_FIXTURE_ID;
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

  const pathPart = window.location.pathname.replace(/^\/ui\/?/, "").split("/")[0];
  return pathPart && pathPart !== "assets" ? pathPart.trim() : "";
}

async function fetchMatchstats(fixtureId, sourceConfig) {
  return fetchOptaFeed("matchstats", fixtureId, sourceConfig, "_rt=b&_fmt=json&detailed=yes&_lcl=zh-cn");
}

async function fetchOptaFeed(feed, fixtureId, sourceConfig, query = "_rt=b&_fmt=json") {
  const competitionId = sourceConfig.perform_competition_id || "10n54vtx4fi2s1frl9ipw2t6bu";
  const url = `http://api.performfeeds.com/soccerdata/${feed}/${competitionId}/${fixtureId}?${query}`;
  const payload = await fetchJson(`/bsApi/api/data/zx?url=${encodeURIComponent(url)}`);
  return unwrapPayload(payload);
}

async function fetchFitness(fixtureId, fixture, matchstats, sourceConfig) {
  const group = sourceConfig.fitness_game_infos?.[fixtureId];
  if (!group) {
    return null;
  }
  const date = getMatchInfo(matchstats).localDate || fixture?.local_date || "";
  const year = date ? `cfa${String(date).slice(0, 4)}` : `cfa${new Date().getFullYear()}`;
  const payload = await fetchJson(
    `/bsApi/api/data/zx_tnsj?year=${encodeURIComponent(year)}&tmcl=${encodeURIComponent(group)}&fixtureUuid=${encodeURIComponent(fixtureId)}`,
  );
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
  const teamStats = {
    home: mergeStats(lineups.home.stats, expectedLineups.home.stats),
    away: mergeStats(lineups.away.stats, expectedLineups.away.stats),
  };
  const goals = normalizeGoals(liveData, home, away);
  const score = normalizeScore(liveData, matchInfo, goals);
  const events = normalizeEvents(liveData, goals, home, away);
  const players = mergePlayerStatSources(normalizePlayers(lineups), normalizePlayers(expectedLineups));
  const fitnessModel = normalizeFitness(fitness, home, away);
  const metricGroups = buildMetricGroups(teamStats, score);
  const playerTables = buildPlayerTables(players, fitnessModel.players);
  const matrix = normalizePassMatrix(passmatrix, home, away);
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
  renderHeader(model);
  renderActiveView();
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
  const status = translateStatus(model.liveData?.matchDetails?.matchStatus || fixture?.status);

  setText(refs.matchDate, dateText || "--");
  setText(refs.matchStatus, status);
  setText(refs.competition, tx(competition));
  setText(refs.stage, tx(stage));
  setText(refs.homeName, teamDisplayName(home));
  setText(refs.awayName, teamDisplayName(away));
  setText(refs.homeScore, score.home ?? "-");
  setText(refs.awayScore, score.away ?? "-");
  setText(refs.period, tx(score.period || status));
  setText(refs.venue, tx(getVenue(matchInfo)));
  setText(refs.goalsSummary, goalsSummary(goals, home, away));
  renderFlag(refs.homeFlag, home);
  renderFlag(refs.awayFlag, away);
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
    ? `<div class="timeline">${model.events.map((event) => renderEvent(event, model)).join("")}</div>`
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
            <h2 class="panel-title">${escapeHtml(tx("首发阵容球场"))}</h2>
            <p class="panel-subtitle">${escapeHtml(tx("按场上位置展示"))}</p>
          </div>
        </div>
        <div class="panel-body">
          ${renderPitch(model)}
        </div>
      </section>

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
        ${rows.length ? renderPlayerStatsTable(rows, config.columns) : `<div class="empty-state">${escapeHtml(tx("暂无球员统计。"))}</div>`}
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
  return `
    <div class="event-row">
      <span class="event-minute">${escapeHtml(event.minuteLabel)}</span>
      <div class="event-card">
        <strong class="event-title">${renderEventTitle(event, model)}</strong>
        <span>${escapeHtml(eventSubtitle(event, model))}</span>
      </div>
    </div>
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
  return `${teamName}${event.penalty ? ` / ${tx("点球")}` : ""}`;
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
      subtitle: tx("进球、xG、射门和进攻参与"),
      columns: [
        ["no", tx("号码"), "no"],
        ["player", tx("球员"), ""],
        ["goals", tx("进球"), "num"],
        ["xg", tx("xG"), "num"],
        ["shots", tx("射门"), "num"],
        ["shotsOn", tx("射正"), "num"],
        ["actions", tx("进攻动作"), "num"],
      ],
    },
    passing: {
      title: tx("球员传球"),
      subtitle: tx("传球、成功率、传中和预期助攻"),
      columns: [
        ["no", tx("号码"), "no"],
        ["player", tx("球员"), ""],
        ["xa", tx("xA"), "num"],
        ["passes", tx("传球"), "num"],
        ["accuracy", tx("成功率"), "num"],
        ["crosses", tx("传中"), "num"],
        ["recoveries", tx("夺回"), "num"],
      ],
    },
    general: {
      title: tx("综合数据"),
      subtitle: tx("出场时间、触球、过人和对抗"),
      columns: [
        ["no", tx("号码"), "no"],
        ["player", tx("球员"), ""],
        ["minutes", tx("时间"), "num"],
        ["touches", tx("触球"), "num"],
        ["dribbles", tx("过人"), "num"],
        ["duels", tx("对抗"), "num"],
        ["losses", tx("丢失"), "num"],
      ],
    },
    defense: {
      title: tx("防守数据"),
      subtitle: tx("对抗、夺回、解围和抢断"),
      columns: [
        ["no", tx("号码"), "no"],
        ["player", tx("球员"), ""],
        ["duels", tx("对抗"), "num"],
        ["recoveries", tx("夺回"), "num"],
        ["clearances", tx("解围"), "num"],
        ["tackles", tx("抢断"), "num"],
        ["losses", tx("丢失"), "num"],
      ],
    },
  };
  return configs[type] || configs.general;
}

function renderPlayerStatsTable(rows, columns) {
  const head = columns.map(([, label, className]) => `<th class="${escapeHtml(className)}">${escapeHtml(label)}</th>`).join("");
  const body = rows
    .map(
      (row) => `
        <tr>
          ${columns.map(([key, , className]) => renderPlayerStatsCell(row, key, className)).join("")}
        </tr>
      `,
    )
    .join("");

  return `
    <div class="table-wrap player-table-wrap">
      <table class="data-table player-stats-table">
        <thead><tr>${head}</tr></thead>
        <tbody>${body}</tbody>
      </table>
    </div>
  `;
}

function renderPlayerStatsCell(row, key, className) {
  if (key === "no") {
    return `<td class="${escapeHtml(className)}"><span class="stat-pill ${row.side}">${escapeHtml(row.no || "--")}</span></td>`;
  }
  if (key === "player") {
    return `
      <td>
        <span class="player-name">
          <strong>${escapeHtml(row.player)}</strong>
          <span>${escapeHtml(translatePosition(row.position || "--"))}</span>
        </span>
      </td>
    `;
  }
  return `<td class="${escapeHtml(className)}">${escapeHtml(row[key] ?? "--")}</td>`;
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
  return Array.from({ length: rowCount }, (_, index) => min + ((max - min) * index) / (rowCount - 1));
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
    return `${prefix}B` || "DF";
  }
  if (position.includes("midfielder")) {
    return `${prefix}MF` || "MF";
  }
  if (position.includes("striker") || position.includes("forward") || position.includes("attacker")) {
    return `${prefix}F` || "FW";
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
      ownGoal: Boolean(goal.ownGoal || goal.type === "own goal"),
      penalty: Boolean(goal.penalty || goal.type === "penalty"),
      raw: goal,
    };
  });
}

function normalizeEvents(liveData, goals, home, away) {
  const goalEvents = goals.map((goal) => ({
    minute: goal.minute,
    minuteLabel: formatMinute(goal.minute),
    title: `${goal.player || "未知球员"} ${goal.ownGoal ? "乌龙球" : "进球"}`,
    side: goal.side,
    penalty: goal.penalty,
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

function buildMetricGroups(teamStats, score) {
  const groupDefinitions = [
    {
      title: "进攻",
      rows: [
        { label: "进球", home: score.home, away: score.away },
        { label: "xG", keys: ["expectedGoals", "expectedGoal", "xG", "expected_goals"], decimals: 2 },
        { label: "射门", keys: ["totalScoringAtt", "totalShots", "shots"] },
        { label: "射正", keys: ["ontargetScoringAtt", "onTargetScoringAtt", "shotOnTarget", "shotsOnTarget"] },
        { label: "禁区内射门", keys: ["attIboxGoal", "attemptsIbox", "totalAttemptsIbox"] },
        { label: "禁区外射门", keys: ["attOboxGoal", "attemptsObox", "totalAttemptsObox"] },
        { label: "角球", keys: ["wonCorners", "cornerTaken", "corners"] },
        { label: "任意球", keys: ["fkFoulWon", "freeKicks"] },
        { label: "越位", keys: ["totalOffside", "offsides"] },
      ],
    },
    {
      title: "传控",
      rows: [
        { label: "控球率", keys: ["possessionPercentage", "possession", "possessionPct"], suffix: "%" },
        { label: "传球", keys: ["totalPass", "passes"] },
        { label: "传球成功", keys: ["accuratePass", "successfulPass", "accuratePasses"] },
        {
          label: "传球成功率",
          ratio: { made: ["accuratePass", "successfulPass", "accuratePasses"], total: ["totalPass", "passes"] },
          suffix: "%",
        },
        { label: "前场传球", keys: ["totalFinalThirdPasses", "finalThirdPasses"] },
        { label: "成功前场传球", keys: ["successfulFinalThirdPasses", "accurateFinalThirdPasses"] },
        { label: "传中", keys: ["totalCross", "crosses"] },
        { label: "传中成功", keys: ["accurateCross", "successfulCrosses"] },
      ],
    },
    {
      title: "常规",
      rows: [
        { label: "触球", keys: ["touches", "touchesBall", "totalTouches"] },
        { label: "尝试过人", keys: ["totalContest", "dribbles"] },
        { label: "过人成功", keys: ["wonContest", "successfulDribbles"] },
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
        { label: "抢断", keys: ["totalTackle", "wonTackle", "tackles"] },
        { label: "解围", keys: ["totalClearance", "clearances"] },
        { label: "拦截", keys: ["interception", "interceptions"] },
        { label: "封堵", keys: ["blockedScoringAtt", "blockedShots"] },
        { label: "丢失球权", keys: ["possLostAll", "possLost", "turnovers"] },
        { label: "犯规", keys: ["fkFoulLost", "fouls", "totalFouls"] },
        { label: "被犯规", keys: ["fkFoulWon", "foulsWon"] },
        { label: "黄牌", keys: ["totalYellowCard", "yellowCard", "yellowCards"] },
        { label: "红牌", keys: ["totalRedCard", "redCard", "redCards"] },
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
  const homeRaw = definition.home ?? metricRawValue(teamStats.home, definition);
  const awayRaw = definition.away ?? metricRawValue(teamStats.away, definition);
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
  if (definition.ratio) {
    const made = pickStat(stats, definition.ratio.made);
    const total = pickStat(stats, definition.ratio.total);
    if (!hasMetricValue(made) || !hasMetricValue(total)) {
      return null;
    }
    const value = ratio(made, total);
    return value === null ? null : value * 100;
  }
  return pickStat(stats, definition.keys || []);
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
  return players
    .filter((player) => player.side === side)
    .map((player) => buildPlayerTableRow(player, type))
    .sort((a, b) => b.sortValue - a.sortValue || toNumber(a.no) - toNumber(b.no));
}

function buildPlayerTableRow(player, type) {
  const base = {
    side: player.side,
    no: player.shirt || "--",
    player: player.name,
    position: player.positionCode || player.position || player.status || "--",
    goals: playerStatLabel(player, ["goals", "goal", "totalGoals"]),
    xg: playerStatLabel(player, ["expectedGoals", "expectedGoal", "xG", "expected_goals"], "", 2),
    shots: playerStatLabel(player, ["totalScoringAtt", "totalShots", "shots"]),
    shotsOn: playerStatLabel(player, ["ontargetScoringAtt", "onTargetScoringAtt", "shotsOnTarget"]),
    actions: playerStatLabel(player, ["touches", "touchesBall", "totalTouches", "attAssist", "totalAttAssist"]),
    xa: playerStatLabel(player, ["expectedAssists", "expectedAssist", "xA", "expected_assists"], "", 2),
    passes: playerStatLabel(player, ["totalPass", "passes"]),
    accuracy: playerRatioLabel(player, ["accuratePass", "successfulPass", "accuratePasses"], ["totalPass", "passes"]),
    crosses: playerStatLabel(player, ["totalCross", "crosses"]),
    recoveries: playerStatLabel(player, ["ballRecovery", "possWon", "recoveries"]),
    minutes: playerStatLabel(player, ["minsPlayed", "minutesPlayed", "minutes", "totalMins"]),
    touches: playerStatLabel(player, ["touches", "touchesBall", "totalTouches"]),
    dribbles: playerFractionLabel(player, ["wonContest", "successfulDribbles"], ["totalContest", "dribbles"]),
    duels: playerSumLabel(player, ["duelWon", "duelsWon"], ["duelLost", "duelsLost"]),
    losses: playerStatLabel(player, ["possLostAll", "possLost", "turnovers"]),
    clearances: playerStatLabel(player, ["totalClearance", "clearances"]),
    tackles: playerStatLabel(player, ["totalTackle", "wonTackle", "tackles"]),
  };
  const sortKeys = {
    attack: ["goals", "xg", "shots", "shotsOn"],
    passing: ["passes", "accuracyRaw", "xa"],
    general: ["minutes", "touches", "duelsRaw"],
    defense: ["recoveries", "duelsRaw", "clearances", "tackles"],
  };
  return {
    ...base,
    sortValue: sortKeys[type].reduce((sum, key, index) => sum + toNumber(base[key]) * 10 ** (sortKeys[type].length - index), 0),
  };
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
    const value = stat.value ?? stat.total ?? stat.amount ?? stat.val ?? stat["@value"];
    if (!key) {
      return;
    }
    result[String(key)] = value;
    result[normalizeKey(key)] = value;
  });
  return result;
}

function mergeStats(primary, secondary) {
  return { ...(secondary || {}), ...(primary || {}) };
}

function pickStat(map, keys) {
  if (!map || !keys) {
    return null;
  }
  for (const key of keys) {
    if (map[key] !== undefined && map[key] !== null) {
      return map[key];
    }
    const normalized = normalizeKey(key);
    if (map[normalized] !== undefined && map[normalized] !== null) {
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
  const events = new EventSource("/api/events");
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
