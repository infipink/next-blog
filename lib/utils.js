import { marked } from 'marked';
// import hljs from 'highlight.js';
/**
 * @description: 通用渲染markdown文本
 * @param {String} value markdown字符串
 * @returns {string} html格式字符串
 */
function mdToHtml(value) {
  if (!value) {
    return '暂无文档';
  }
  // 配置markdown
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    escaped: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    langPrefix: 'hljs language-',
    xhtml: false,
    highlight(code, lang) {
      const hljs = require('highlight.js');
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  });

  return marked.parse(value);
}

export { mdToHtml };
