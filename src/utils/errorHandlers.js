
export const htmlErrorHandler = (content) => {
  if (!content) return null;

  try{
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const errors = doc.getElementsByTagName('parsererror');
    if (errors.length > 0) {
      return `HTML Error: ${errors[0].textContent}`;
    }
    return null;
  } catch (error) {
    return `HTML Error: ${error.message}`;
  }
};

export const pythonErrorHandler = (content) => {
  if (!content) return null;
  const rules = [
    { pattern: /^[ ]{1,3}[^ ]/m, message: 'Invalid indentation (use 4 spaces)' },
    { pattern: /print [^(]/, message: 'print() requires parentheses in Python 3' },
    { pattern: /([^=!<>])(=)([^=])/, message: 'Single = used for comparison instead of ==' }
  ];
  for (const rule of rules) {
    if (rule.pattern.test(content)) {
      return `Python Error: ${rule.message}`;
    }
  }
  return null;
};
