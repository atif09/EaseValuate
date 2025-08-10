export const supportedLanguages = {
  html: {
    name: 'HTML',
    mode: 'html',
    defaultTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Page</title>
  <style>
    body { 
      font-family: Arial, sans-serif;
      margin: 20px;
    }
  </style>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`,
    preview: 'iframe'
  },
  javascript: {
    name: 'JavaScript',
    mode: 'javascript',
    defaultTemplate: `// Write your JavaScript code here
console.log("Hello World");`,
    preview: 'console'
  },
  python: {
    name: 'Python',
    mode: 'python',
    defaultTemplate: `# Write your Python code here
print("Hello World")`,
    preview: 'output'
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