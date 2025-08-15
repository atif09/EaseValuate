export const supportedLanguages = {
  html: {
    name: 'HTML',
  
    label: 'HTML',
    mode: 'html',
    defaultTemplate: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Document</title>\n  </head>\n  <body>\n    \n  </body>\n</html>',
  },
  javascript: {
    name: 'JavaScript',

    label: 'JavaScript',
    mode: 'javascript',
    defaultTemplate: `// Write your JavaScript code here\nconsole.log("Hello World");`,
    
  },
  python: {

    name: 'Python',
    mode: 'python',
    defaultTemplate: `# Write your Python code here\nprint("Hello World")`,
    
  }
};

export const languageSettings = {
  html: {
    tabSize: 2,
    useSoftTabs: true,
    showInvisibles: true
  },
  javascript: {
    tabSize: 2,
    useSoftTabs: true,
    showInvisibles: true
  },
  python: {
    tabSize: 4,
    useSoftTabs: true,
    showInvisibles: true
  }
};