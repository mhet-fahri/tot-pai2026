import React, { createContext, useContext, useState } from 'react';
import { api } from '../api/appsScriptClient';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminKey, setAdminKey] = useState(() => {
    return sessionStorage.getItem('tot_admin_key') || '';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!sessionStorage.getItem('tot_admin_key');
  });
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Verifikasi Secret Key
  const authenticate = async (key) => {
    setIsLoading(true);
    setError(null);
    try {
      const validKey = import.meta.env.VITE_ADMIN_SECRET_KEY || 'tot-admin-2026';
      
      // Validasi lokal atau ke backend Apps Script
      if (key === validKey || !import.meta.env.VITE_APPS_SCRIPT_URL) {
        setAdminKey(key);
        setIsAuthenticated(true);
        sessionStorage.setItem('tot_admin_key', key);
        return true;
      }

      // Verifikasi ke Google Apps Script backend jika URL tersedia
      const res = await api.getAdminSubmissions(key);
      if (res && res.status === 'success') {
        setAdminKey(key);
        setIsAuthenticated(true);
        sessionStorage.setItem('tot_admin_key', key);
        setAllSubmissions(res.data || []);
        return true;
      } else {
        throw new Error('Secret key fasilitator tidak valid.');
      }
    } catch (err) {
      setError(err.message || 'Kunci rahasia tidak valid.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAdminKey('');
    setIsAuthenticated(false);
    sessionStorage.removeItem('tot_admin_key');
    setAllSubmissions([]);
  };

  const refreshSubmissions = async () => {
    if (!adminKey) return;
    setIsLoading(true);
    try {
      const res = await api.getAdminSubmissions(adminKey);
      if (res && res.data) {
        setAllSubmissions(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateGrade = async (submissionId, score, feedback) => {
    try {
      await api.gradeSubmission(adminKey, submissionId, score, feedback);
      setAllSubmissions(prev =>
        prev.map(sub =>
          sub.submission_id === submissionId
            ? { ...sub, score, feedback, status: 'reviewed' }
            : sub
        )
      );
      return true;
    } catch (err) {
      console.error('Failed to grade:', err);
      return false;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        adminKey,
        isAuthenticated,
        allSubmissions,
        isLoading,
        error,
        authenticate,
        logout,
        refreshSubmissions,
        updateGrade
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
