let pyodideReadyPromise = null;

self.onmessage = async (event) => {
  const code = event.data;
  try {
    if (!pyodideReadyPromise) {
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js');
      pyodideReadyPromise = self.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/' });
    }
    const pyodide = await pyodideReadyPromise;

    let result = '';
    pyodide.setStdout({
      batched: (s) => { result += s; }
    });
    pyodide.setStderr({
      batched: (s) => { result += s; }
    });

    try {
      await pyodide.runPythonAsync(code);
      self.postMessage({ result: result.trim(), error: null });
    } catch (err) {
      self.postMessage({ result: '', error: err.message });
    }
  } catch (err) {
    self.postMessage({ result: '', error: 'Pyodide failed to load: ' + err.message });
  }
};