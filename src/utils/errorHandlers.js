export const htmlErrorHandler = (content) => {
  if(!content) return null;

  const errors = {
    doctype: {
      pattern: /^(?!<!DOCTYPE)/i,
      message: 'Missing DOCTYPE declaration'
    },

    unclosedTags: {
      pattern: /<([a-z]+)[^>]*>[^<]*$/i,
      message: 'Unclosed HTML tag detected'
    },

    invalidNesting: {
      pattern: /<(\w+)[^>]*>[^<]*<\/(?!\1)/,
      message: 'Invalid tag nesting'
    },

    missingQuotes: {
      pattern: /\s(\w+)=[^"'\s>]/,
      message: 'Missing quotes in attributes'
    },

    InvalidAttributes: 
      {
        pattern: /<[^>]+\s\w+=['"][^'"]*$/,
        message: 'Invalid or unclosed attribute'
      }
    
  };

  for(const [type,check] of Object.entries(errors)){
    if(check.pattern.test(content)){
      return `HTML Error: ${check.message}`;

    }

  }
  return null;
};

export const javascriptErrorHandler = (content) => {
  if(!content) return null;

  const syntaxErrors = {
    missingParentheses: {
      pattern: /\b(if|for|while|switch|catch)\s*[^(]/,
      message: 'Missing parentheses after control statement'
    },

    missingSemicolon: {
      pattern: /[^;{}\n]\s*$/,
      message: 'Missing semicolon'
    },

    unclosedBraces: {
      pattern: /{([^{}]*$)/,
      message: 'Unclosed curly brace'
    },

    consoleErrors: {
      pattern: /console\.(lg|lo|lgo)/,
      message: 'Did you mean console.log?'
    },
    
    undefinedVariable: {
      pattern: /\b(?!let|const|var|function|class|if|else|for|while|do|switch|return|break|continue|try|catch|finally|throw|typeof|instanceof|in|of|new|this|super|extends|import|export|default|null|undefined|true|false|void|delete|async|await)\b[a-zA-Z_$][0-9a-zA-Z_$]*(?!\s*[=:(])/,
      message: 'Potential undefined variable used'
    }
  };

  for(const[type,check] of Object.entries(syntaxErrors)){
    if(check.pattern.test(content)){
      return `JavaScript Error: ${check.message}`;
    }
  }
  return null;
};

export const pythonErrorHandler = (content) => {
  if (!content) return null;

  const pythonErrors = {
    indentation: {
      pattern: /^[ ]{1,3}[^ ]/m,
      message: 'Invalid indentation (use 4 spaces)'
    },
    syntax: {
      pattern: /[^:]\s*\n\s+/,
      message: 'Missing colon before indented block'
    },
    print: {
      pattern: /print [^(]/,
      message: 'print() requires parentheses in Python 3'
    },
    quotes: {
      pattern: /(['"]).*\1.*\1/,
      message: 'Inconsistent string quotes'
    }
  };

  for(const[type,check] of Object.entries(pythonErrors)){
    if(check.pattern.test(content)){
      return `Python Error: ${check.message}`;
    }
  }
  return null;
};