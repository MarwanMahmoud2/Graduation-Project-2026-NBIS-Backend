import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../api/auth';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const getDashboardPath = (role) => {
  const rolePaths = {
    admin: '/admin/dashboard',
    nurse: '/nurse/dashboard',
    police: '/police/dashboard',
    user: '/parent/dashboard',
  };
  return rolePaths[role] || '/login';
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Helper to get the appropriate storage based on remember preference
  const getStorage = () => rememberMe ? localStorage : sessionStorage;

  // Inactivity timeout (15 minutes in milliseconds)
  const INACTIVITY_TIMEOUT = 15 * 60 * 1000;

  // Update last activity timestamp
  const updateActivity = () => {
    setLastActivity(Date.now());
  };

  // Check for inactivity and auto-logout
  useEffect(() => {
    if (!isAuthenticated || rememberMe) return; // Only check for non-remembered sessions

    const checkInactivity = () => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivity;

      if (timeSinceActivity >= INACTIVITY_TIMEOUT) {
        // Show warning before logout
        const warningShown = sessionStorage.getItem('inactivity_warning_shown');
        if (!warningShown) {
          sessionStorage.setItem('inactivity_warning_shown', 'true');
          // You've been inactive for 15 minutes. You will be logged out.
          alert('You have been inactive for 15 minutes. You will be logged out for security.');
        }
        logout();
      }
    };

    const inactivityInterval = setInterval(checkInactivity, 60000); // Check every minute

    return () => clearInterval(inactivityInterval);
  }, [isAuthenticated, rememberMe, lastActivity]);

  // Track user activity
  useEffect(() => {
    if (!isAuthenticated) return;

    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

    const handleActivity = () => {
      updateActivity();
    };

    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [isAuthenticated]);

  useEffect(() => {
    const initAuth = async () => {
      // Check localStorage first (for remembered sessions)
      const storedToken = localStorage.getItem('nbis_token');
      const storedUser = localStorage.getItem('nbis_user');
      const storedRemember = localStorage.getItem('nbis_remember');
      
      // Also check sessionStorage for non-remembered sessions
      const sessionToken = sessionStorage.getItem('nbis_token');
      const sessionUser = sessionStorage.getItem('nbis_user');
      
      const tokenToUse = storedToken || sessionToken;
      const userToUse = storedUser || sessionUser;
      const rememberToUse = storedRemember === 'true';

      if (tokenToUse && userToUse) {
        setRememberMe(rememberToUse);
        setToken(tokenToUse);
        setUser(JSON.parse(userToUse));
        setLastActivity(Date.now());
        
        // Validate token with backend
        try {
          const response = await authService.getCurrentUser();
          setUser(response.user);
          const storage = rememberToUse ? localStorage : sessionStorage;
          storage.setItem('nbis_user', JSON.stringify(response.user));
          setIsAuthenticated(true);
        } catch (error) {
          // Token is invalid, clear storage
          localStorage.removeItem('nbis_token');
          localStorage.removeItem('nbis_user');
          localStorage.removeItem('nbis_remember');
          sessionStorage.removeItem('nbis_token');
          sessionStorage.removeItem('nbis_user');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const { token, user } = response;
      const remember = credentials.remember || false;
      
      setRememberMe(remember);
      setLastActivity(Date.now());
      const storage = remember ? localStorage : sessionStorage;
      
      // Always clear both storage types first
      localStorage.removeItem('nbis_token');
      localStorage.removeItem('nbis_user');
      localStorage.removeItem('nbis_remember');
      sessionStorage.removeItem('nbis_token');
      sessionStorage.removeItem('nbis_user');
      
      // Store in appropriate storage
      storage.setItem('nbis_token', token);
      storage.setItem('nbis_user', JSON.stringify(user));
      
      if (remember) {
        localStorage.setItem('nbis_remember', 'true');
      }
      
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
        errors: error.response?.data?.errors,
      };
    }
  };

  const register = async (data) => {
    try {
      const response = await authService.register(data);
      const { token, user } = response;
      const remember = data.remember || false;
      
      setRememberMe(remember);
      setLastActivity(Date.now());
      const storage = remember ? localStorage : sessionStorage;
      
      // Always clear both storage types first
      localStorage.removeItem('nbis_token');
      localStorage.removeItem('nbis_user');
      localStorage.removeItem('nbis_remember');
      sessionStorage.removeItem('nbis_token');
      sessionStorage.removeItem('nbis_user');
      
      // Store in appropriate storage
      storage.setItem('nbis_token', token);
      storage.setItem('nbis_user', JSON.stringify(user));
      
      if (remember) {
        localStorage.setItem('nbis_remember', 'true');
      }
      
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
        errors: error.response?.data?.errors,
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear both storage types
      localStorage.removeItem('nbis_token');
      localStorage.removeItem('nbis_user');
      localStorage.removeItem('nbis_remember');
      sessionStorage.removeItem('nbis_token');
      sessionStorage.removeItem('nbis_user');
      sessionStorage.removeItem('inactivity_warning_shown');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      setRememberMe(false);
      setLastActivity(Date.now());
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      console.log('getCurrentUser response:', response);
      setUser(response.user);
      const storage = getStorage();
      storage.setItem('nbis_user', JSON.stringify(response.user));
      return response.user;
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
      }
      throw error;
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    getCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
