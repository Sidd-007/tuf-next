// src/types/rehype-slug.d.ts
declare module 'rehype-slug' {
  import { Plugin } from 'unified';
  const slug: Plugin<[], import('hast').Root>;
  export = slug;
}
