
export const htmlErrorHandler = (content) => {

  try{
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const errors = doc.getElementsByTagName('parsererror');
    if (errors.length > 0) {
      return `HTML Error: ${errors[0].textContent}`;
    }
    return null;
  } catch (e) {
    return e.message;
  }
};

