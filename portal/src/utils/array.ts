/* eslint-disable import/prefer-default-export */
export function groupBy<K extends string | number | symbol, V>(
  arr: V[],
  key: (x: V) => K
): Record<K, V[]> {
  const m = new Map<K, V[]>();
  arr.forEach((x) => {
    const k = key(x);
    const a = m.get(k);
    m.set(key(x), a?.concat([x]) ?? [x]);
  });
  return Object.fromEntries(m) as Record<K, V[]>;
}
