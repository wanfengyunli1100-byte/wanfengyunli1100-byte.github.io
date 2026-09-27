/**
 * 全站唯一信息源（Single Source of Truth）
 *
 * 凡是"会出现在多个页面"的信息（姓名 / 定位句 / 邮箱 / GitHub / 导航 / 规格表），
 * 一律写在这里，不要在页面里各写一份。改一次，全站生效。
 *
 * 派生规则（改这里之前先读）：
 * - GitHub 链接由 githubUser 拼出，不要再写第二遍用户名
 * - 规格表值只有下面这一份：页面只允许"挑行 + 排序"，需要短句用 shortBase() 派生
 */

/** 姓名、定位句、GitHub 用户名：各只写一遍 */
const name = '韦文轩';
const tagline = '嵌入式 AI 应用开发';
const githubUser = 'wanfengyunli1100-byte';

/** 工作地：详细值为准；首页规格表只显示 `·` 前一段，由 shortBase() 派生 */
const base = '深圳 · 芯片与器件方向';

/** 规格表数据（唯一来源）：首页与 /about 各自挑行，但值不允许多处手写 */
const profileData = [
  { k: 'ROLE', v: 'FAE 现场应用工程师', b: true },
  { k: 'BASE', v: base },
  { k: 'FIELD', v: '嵌入式系统 · AI 应用部署' },
  { k: 'EDU', v: '大连大学 · 电子信息工程 · 2026 届' },
  { k: 'KEYS', v: '硬件底子 / AI 实践 / 产品落地' },
  { k: 'CURRENTLY', v: '在深圳做现场应用，业余推进自研硬件项目' },
  { k: 'STATUS', v: '在职 · 欢迎技术交流' },
];

/** 规格表一行 */
export type ProfileRow = { k: string; v: string; b?: boolean };

export const site = {
  /** 姓名（唯一来源） */
  name,
  /** 定位句（唯一来源：页脚、标题、描述都取自它） */
  tagline,
  /** 浏览器标题后缀 / 默认标题 */
  title: `${name} · ${tagline}`,
  /** 顶栏字标（`//` 由样式渲染成强调色） */
  brand: { left: 'WWX', sep: '//', right: 'EMBEDDED-AI' },
  /** 默认描述（SEO / 分享卡片） */
  description: `${tagline}。从 STM32 硬件底层到 QLoRA 模型部署，自己做硬件、画板子、写固件。`,

  /** 顶部规格条（数据手册风：型号 + 版本 + 地点） */
  datasheet: {
    model: 'WWX-2026',
    label: 'PERSONAL DATASHEET',
    rev: 'REV 2026.09',
    place: 'SHENZHEN',
  },

  /** 联系方式：公开信息，不放手机号 */
  email: 'wanfengyunli@163.com',
  /** GitHub 用户名（唯一来源） */
  githubUser,
  /** GitHub 链接：由 githubUser 拼出，不再写第二遍 */
  github: `https://github.com/${githubUser}`,

  /** 规格表（键值对，顺序即展示顺序） */
  profile: profileData,

  /**
   * 顶栏导航
   * 已有独立页面就用路由；锚点类链接（含 #）只做首页内跳转高亮。
   */
  nav: [
    { label: '主页', href: '/' },
    { label: '项目', href: '/projects/' },
    { label: '笔记', href: '/notes/' },
    { label: '关于', href: '/about/' },
    { label: '联系', href: '/#contact' },
  ],
} as const;

/** 按 key 取规格行（页面侧只负责挑行与排序，值一律来自 site.profile） */
export function profileRow(key: string): ProfileRow {
  return profileData.find((r) => r.k === key) ?? { k: key, v: '—' };
}

/** 规格表两列排布（一行两项），供首页与 /about 共用 */
export function toPairs(rows: ProfileRow[]): ProfileRow[][] {
  const out: ProfileRow[][] = [];
  for (let i = 0; i < rows.length; i += 2) {
    out.push(rows.slice(i, i + 2));
  }
  return out;
}

/** 派生短句：取 `·` 前一段（首页 BASE 只显示「深圳」，不写第二份字面量） */
export function shortBase(v: string): string {
  return v.split('·')[0]!.trim();
}
