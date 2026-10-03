import React from "react";
import Link from "next/link";

interface AdminLoginFormProps {
  usernameInput: string;
  setUsernameInput: (val: string) => void;
  passwordInput: string;
  setPasswordInput: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  loginError: string;
  isLoggingIn: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AdminLoginForm({
  usernameInput,
  setUsernameInput,
  passwordInput,
  setPasswordInput,
  showPassword,
  setShowPassword,
  loginError,
  isLoggingIn,
  onSubmit,
}: AdminLoginFormProps) {
  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-amber-600/20 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto mb-4 font-serif font-bold text-2xl">
            MA
          </div>
          <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
            Host Administration
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Maa Annapurna Home Stay &amp; Hotel • Bodhgaya
          </p>
        </div>

        {loginError && (
          <div className="mb-6 p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs text-center font-medium">
            {loginError}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Host Username
            </label>
            <input
              type="text"
              required
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="e.g. mukeshsingh"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoggingIn ? (
              <>
                <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></div>
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Log In to Host Dashboard</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-stone-400 hover:text-white transition flex items-center justify-center gap-1"
          >
            <span>← Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
