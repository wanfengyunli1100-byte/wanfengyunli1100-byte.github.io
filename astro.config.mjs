import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // 上线域名（M5 部署前可改）—— sitemap 依赖它生成绝对 URL
  site: 'https://wanfengyunli.top',
  // Sitemap：构建期产出 sitemap-index.xml（M3b 的 SEO 基础件）
  integrations: [sitemap()],
  // 旧链接落地（2026-09-27 实测发现的真缺陷）：
  // 简历材料里印过 github.io/resume 与 wanfengyunli.top/resume。域名被本仓库认领后，
  // GitHub Pages 会把 github.io/<repo>/ 全量 301 到自定义域名——页面自身的 meta 跳转
  // 永远没机会执行，于是旧链接会直接落到 /resume/ 这个不存在的路径上。
  // 这里显式产出重定向页兜住它（static 模式下 Astro 生成 HTML + meta refresh）。
  redirects: {
    '/resume': '/',
  },
  build: {
    // 输出 /projects/xxx/index.html，路径干净且与 GitHub Pages 兼容
    format: 'directory',
  },
  markdown: {
    // 数据手册风：全站只保留一个强调色（铁锈橙）。
    // 关掉 Shiki 语法高亮，代码块用纸底 + 等宽黑字，避免引入彩色主题。
    syntaxHighlight: false,
  },
  devToolbar: {
    enabled: false,
  },
  // 预取：M3.5 已用 <ClientRouter />（页面切换淡入），该路由器下 prefetchAll 默认为 true，
  // 这里**显式写出**，避免未来 Astro 改默认值时行为静默改变。
  // 策略保持 'hover'：桌面悬停/聚焦即预取，不产生非交互流量（守"克制"原则）。
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
