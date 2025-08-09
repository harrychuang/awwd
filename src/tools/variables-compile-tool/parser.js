// 解析 :root 區塊內的 CSS variables，並解析 var() 相依

const VAR_DECL_REGEX = /--([A-Za-z0-9-_]+)\s*:\s*([^;]+);/g;
const HEX_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const PX_REGEX = /^-?\d+(?:\.\d+)?px$/;
const REM_REGEX = /^-?\d+(?:\.\d+)?rem$/;
const NUM_REGEX = /^-?\d+(?:\.\d+)?$/;

const trimValue = (val) => val.trim();

const detectType = (raw) => {
  const value = raw.trim();
  if (HEX_REGEX.test(value)) return 'color';
  if (PX_REGEX.test(value)) return 'size_px';
  if (REM_REGEX.test(value)) return 'size_rem';
  if (NUM_REGEX.test(value)) return 'number';
  return 'string';
};

const stripUnit = (value) => {
  if (value.endsWith('px')) return parseFloat(value.replace('px', ''));
  if (value.endsWith('rem')) return parseFloat(value.replace('rem', ''));
  return value;
};

const resolveVar = (value, map, stack = new Set()) => {
  const v = value.trim();
  const varMatch = v.match(/^var\((--[A-Za-z0-9-_]+)\)$/);
  if (!varMatch) return v; // literal
  const ref = varMatch[1];
  const key = ref.replace(/^--/, '');
  if (stack.has(key)) return v; // circular
  const target = map.get(key);
  if (!target) return v; // missing
  stack.add(key);
  const resolved = resolveVar(target.raw, map, stack);
  stack.delete(key);
  return resolved;
};

export const parseCssVariables = (cssText) => {
  if (!cssText || typeof cssText !== 'string') {
    return { tokens: [], summary: { total: 0, resolved: 0, unresolved: 0 } };
  }

  // 只擷取 :root {...} 內容，以免誤判
  const rootMatch = cssText.match(/:root\s*\{([\s\S]*?)\}/);
  const rootBody = rootMatch ? rootMatch[1] : cssText;

  const entries = [];
  let m;
  while ((m = VAR_DECL_REGEX.exec(rootBody)) !== null) {
    const name = m[1];
    const raw = trimValue(m[2]);
    entries.push({ name, raw });
  }

  // 初步建立 map
  const map = new Map();
  entries.forEach(({ name, raw }) => map.set(name, { raw }));

  // 解析 var() 相依並擴充資訊
  const tokens = entries.map(({ name, raw }) => {
    const resolved = resolveVar(raw, map);
    const type = detectType(resolved);
    const numeric = type.startsWith('size_') || type === 'number' ? stripUnit(resolved) : null;
    return {
      name: `--${name}`,
      key: name,
      raw,
      resolved,
      type,
      numeric,
    };
  });

  const summary = {
    total: tokens.length,
    resolved: tokens.filter(t => t.resolved !== t.raw || !t.raw.startsWith('var(')).length,
    unresolved: tokens.filter(t => t.raw.startsWith('var(') && t.resolved === t.raw).length,
  };

  return { tokens, summary };
};


