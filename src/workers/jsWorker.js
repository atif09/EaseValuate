self.onmessage=function(e){
  const code=e.data;
  let result ='';
  let error=null;

  const originalLog=self.console.log;
  self.console.log=(...args) => {
    result += args.join(' ') + '\n';
  };

  try{
    // Use Function constructor instead of eval for better security
    const func = new Function(code);
    func();
  }catch(err){
    error=err.message;
  }

  self.console.log=originalLog;
  self.postMessage({result: result.trim(),error});
};

function createJsWorker() {
  const code = `
    self.onmessage = function (e) {
      const code = e.data;
      let result = '';
      let error = null;
      const originalLog = self.console.log;
      self.console.log = (...args) => {
        result += args.join(' ') + '\\n';
      };
      try {
        // Use Function constructor instead of eval for better security
        const func = new Function(code);
        func();
      } catch (err) {
        error = err.message;
      }
      self.console.log = originalLog;
      self.postMessage({ result: result.trim(), error });
    };
  `;
  const blob = new Blob([code], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
}