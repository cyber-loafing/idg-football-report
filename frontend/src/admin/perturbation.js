import { apiUrl } from "../shared/config.js";

const refs = {
  body: document.querySelector("[data-body]"),
  save: document.querySelector("[data-save]"),
  status: document.querySelector("[data-status]"),
  summary: document.querySelector("[data-summary]"),
  search: document.querySelector("[data-search]"),
};

let catalog = [];
let policy = { fields: {} };

init();

async function init() {
  try {
    const [catalogResponse, policyResponse] = await Promise.all([
      fetch(apiUrl("/perturbation/catalog")),
      fetch(apiUrl("/perturbation/policy")),
    ]);
    catalog = await catalogResponse.json();
    policy = await policyResponse.json();
    render();
    setStatus("已加载");
  } catch (error) {
    setStatus(`加载失败: ${error.message || error}`);
  }
}

function render() {
  const keyword = refs.search.value.trim().toLowerCase();
  const rows = catalog.filter((field) => {
    if (!keyword) return true;
    return `${field.page} ${field.label} ${field.source} ${field.notes}`.toLowerCase().includes(keyword);
  });
  refs.body.innerHTML = rows.map(renderRow).join("");
  refs.summary.textContent = `${rows.length} / ${catalog.length} 个字段`;
}

function renderRow(field) {
  const rule = policy.fields[field.field_id] || {};
  const disabled = field.perturbable ? "" : "disabled";
  const defaultRange = field.default_range || {};
  const method = rule.method || defaultRange.method || "delta";
  const rounding = rule.rounding || defaultRange.rounding || "int";
  const min = valueForInput(rule.min ?? defaultRange.min ?? 0);
  const max = valueForInput(rule.max ?? defaultRange.max ?? 0);
  const clampMin = valueForInput(rule.clamp_min ?? defaultRange.clamp_min ?? "");
  const clampMax = valueForInput(rule.clamp_max ?? defaultRange.clamp_max ?? "");
  return `
    <tr data-row data-field-id="${escapeAttr(field.field_id)}">
      <td><span class="pill">${escapeHtml(field.page)}</span></td>
      <td>
        <strong>${escapeHtml(field.label)}</strong>
        <small>${escapeHtml(field.field_id)}</small>
      </td>
      <td class="note">${escapeHtml(field.source)}</td>
      <td>
        <span class="pill ${field.perturbable ? "ok" : "locked"}">${field.perturbable ? "可以" : "锁定"}</span>
      </td>
      <td><input type="checkbox" data-enabled ${rule.enabled && field.perturbable ? "checked" : ""} ${disabled} /></td>
      <td>
        <select data-method ${disabled}>
          <option value="delta" ${method === "delta" ? "selected" : ""}>增减</option>
          <option value="percent" ${method === "percent" ? "selected" : ""}>百分比</option>
        </select>
      </td>
      <td><div class="range"><input type="number" data-min value="${min}" step="0.1" ${disabled} /><input type="number" data-max value="${max}" step="0.1" ${disabled} /></div></td>
      <td>
        <select data-rounding ${disabled}>
          <option value="int" ${rounding === "int" ? "selected" : ""}>整数</option>
          <option value="decimal1" ${rounding === "decimal1" ? "selected" : ""}>1位小数</option>
          <option value="decimal2" ${rounding === "decimal2" ? "selected" : ""}>2位小数</option>
          <option value="none" ${rounding === "none" ? "selected" : ""}>不处理</option>
        </select>
      </td>
      <td><div class="clamp"><input type="number" data-clamp-min value="${clampMin}" placeholder="下限" step="0.1" ${disabled} /><input type="number" data-clamp-max value="${clampMax}" placeholder="上限" step="0.1" ${disabled} /></div></td>
      <td class="note">${escapeHtml([field.constraints, field.notes].filter(Boolean).join(" / "))}</td>
    </tr>
  `;
}

refs.save.addEventListener("click", async () => {
  const payload = { version: 1, fields: {} };
  document.querySelectorAll("[data-row]").forEach((row) => {
    const fieldId = row.dataset.fieldId;
    payload.fields[fieldId] = {
      enabled: row.querySelector("[data-enabled]").checked,
      method: row.querySelector("[data-method]").value,
      min: numberOrZero(row.querySelector("[data-min]").value),
      max: numberOrZero(row.querySelector("[data-max]").value),
      rounding: row.querySelector("[data-rounding]").value,
      clamp_min: numberOrNull(row.querySelector("[data-clamp-min]").value),
      clamp_max: numberOrNull(row.querySelector("[data-clamp-max]").value),
    };
  });

  setStatus("保存中");
  try {
    const response = await fetch(apiUrl("/perturbation/policy"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    policy = await response.json();
    render();
    setStatus(`已保存 ${new Date().toLocaleTimeString()}`);
  } catch (error) {
    setStatus(`保存失败: ${error.message || error}`);
  }
});

refs.search.addEventListener("input", render);

function setStatus(text) {
  refs.status.textContent = text;
}

function valueForInput(value) {
  return value === null || value === undefined ? "" : String(value);
}

function numberOrZero(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function numberOrNull(value) {
  if (value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}
