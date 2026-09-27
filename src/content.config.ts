/**
 * 内容集合定义 —— 项目防屎山的"闸门"
 *
 * 作用：给每个 Markdown 文件的抬头（frontmatter）定字段契约。
 * 字段名写错、必填项漏填、类型不对 —— 构建直接报错，
 * 不会像手写 HTML 那样静默出问题。
 *
 * 新增内容时看 docs/03_内容规范.md 的字段表。
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** 项目档案：一个项目一个 md 文件，文件名即网址 */
const projects = defineCollection({
  // 下划线开头的文件视为模板，不作为内容收录
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    period: z.string(),
    role: z.string().default('独立开发'),
    status: z.enum(['进行中', '已完成', '归档']).default('已完成'),
    /** 列表页/详情页顶部的大图（可选；放 src/assets/ 用相对路径，或 public/ 用 / 开头） */
    cover: z.string().optional(),
    /** 首页/列表页展示顺序，数字小的在前 */
    order: z.number().default(99),
    /** 是否登上首页精选 */
    featured: z.boolean().default(false),
    /** 真稿才发布；草稿写 true */
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    links: z
      .object({
        github: z.string().optional(),
        demo: z.string().optional(),
      })
      .default({}),
  }),
});

/** 技术笔记：一篇文章一个 md 文件（C 定位的主力模块） */
const notes = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, notes };
