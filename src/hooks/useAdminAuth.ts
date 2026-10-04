import { useState, useEffect, useCallback, useRef } from "react";
import { authService } from "@/services/authService";

export function useAdminAuth(onLoginSuccess?: () => void, onLogoutSuccess?: () => void) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const onLoginSuccessRef = useRef(onLoginSuccess);
  useEffect(() => {
    onLoginSuccessRef.current = onLoginSuccess;
  }, [onLoginSuccess]);

  const onLogoutSuccessRef = useRef(onLogoutSuccess);
  useEffect(() => {
    onLogoutSuccessRef.current = onLogoutSuccess;
  }, [onLogoutSuccess]);

  useEffect(() => {
    let isMounted = true;
    async function check() {
      const auth = await authService.checkAuth();
      if (isMounted) {
        setIsAuthenticated(auth);
      }
    }
    check();
    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      setLoginError("");
      setIsLoggingIn(true);

      try {
        const res = await authService.login({
          username: usernameInput.trim(),
          password: passwordInput,
        });

        if (res.success) {
          setIsAuthenticated(true);
          onLoginSuccessRef.current?.();
        } else {
          setLoginError(res.error || "Invalid username or password");
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Authentication error. Please try again.";
        setLoginError(msg);
      } finally {
        setIsLoggingIn(false);
      }
    },
    [usernameInput, passwordInput]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setIsAuthenticated(false);
      setUsernameInput("");
      setPasswordInput("");
      onLogoutSuccessRef.current?.();
    }
  }, []);

  return {
    isAuthenticated,
    usernameInput,
    setUsernameInput,
    passwordInput,
    setPasswordInput,
    showPassword,
    setShowPassword,
    loginError,
    isLoggingIn,
    login,
    logout,
  };
}
