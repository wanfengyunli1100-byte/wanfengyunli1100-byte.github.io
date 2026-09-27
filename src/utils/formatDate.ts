/**
 * 日期格式化（本地时区，避免 toISOString 的 UTC 偏移导致差一天）
 * 笔记列表页与详情页共用。
 */
export function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
