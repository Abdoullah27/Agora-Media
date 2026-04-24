import { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";
import { useCMS } from "@/context/CMSContext";

const AdminLogin = () => {
  const { isAuthenticated, login } = useCMS();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-background" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-8 md:p-10 border border-white/10 shadow-2xl">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-6 h-6 text-accent" />
          </div>
          
          <h1 className="text-2xl font-display font-bold text-center mb-2">Admin Portal</h1>
          <p className="text-muted-foreground text-center text-sm mb-8">
            Enter your credentials to manage content.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Password (admin123)"
                className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
              />
              {error && (
                <div className="flex items-center gap-2 mt-2 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Incorrect password</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="glass-button w-full neon-glow-red !border-accent/30 text-foreground flex items-center justify-center gap-2 group"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <a href="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              ← Back to Site
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
