import React, { createContext, useState, useContext } from 'react';
const AuditContext = createContext();

export function AuditProvider({ children }) {
  const [auditHistory, setAuditHistory] = useState([]);
  const [currentAudit, setCurrentAudit] = useState(null);

  const addAudit = (auditResult) => {
    setAuditHistory(prev => [auditResult, ...prev]);
    setCurrentAudit(auditResult);
  };

  const clearHistory = () => {
    setAuditHistory([]);
    setCurrentAudit(null);
  };

  return (
    <AuditContext.Provider value={{
      auditHistory,
      currentAudit,
      addAudit,
      clearHistory
    }}>
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit() {
  return useContext(AuditContext);
}