// src/lib/monaco.ts
/** Hook that patches worker URLs so Monaco works under Next 14/15 */
export function loadMonaco() {
  self.MonacoEnvironment = {
    getWorkerUrl() {
      // every language can reuse the same worker in the CDN build
      return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
        self.MonacoEnvironment={baseUrl:'https://unpkg.com/monaco-editor@0.45.0/min/'};
        importScripts('https://unpkg.com/monaco-editor@0.45.0/min/vs/base/worker/workerMain.js');`
      )}`;
    },
  };
}
