"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { FiX, FiLock, FiActivity, FiGlobe, FiUsers, FiLink } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

interface PageView {
  id: number;
  pathname: string;
  referrer: string;
  country: string;
  city: string;
  viewed_at: string;
}

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnalyticsModal({ isOpen, onClose }: AnalyticsModalProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [views, setViews] = useState<PageView[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const HARDCODED_PASSWORD = "admin"; // Easy hardcoded password for the user

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
    }
  }, [isAuthenticated]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("page_views")
        .select("*")
        .order("viewed_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      setViews(data || []);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === HARDCODED_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  // Calculate Stats
  const totalViews = views.length;
  const uniqueCountries = new Set(views.map(v => v.country)).size;
  const referrers = views.reduce((acc, curr) => {
    const ref = curr.referrer === "Direct" || !curr.referrer ? "Direct Traffic" : 
                curr.referrer.includes("linkedin") ? "LinkedIn" : 
                curr.referrer.includes("whatsapp") ? "WhatsApp" : curr.referrer;
    acc[ref] = (acc[ref] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FiActivity className="text-primary" />
                Portfolio Analytics
              </h2>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                <FiX size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {!isAuthenticated ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                    <FiLock className="text-primary" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Admin Access Required</h3>
                  <p className="text-gray-400 mb-8 text-center max-w-md">
                    Please enter the master password to view real-time traffic statistics and visitor insights.
                  </p>
                  
                  <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                      className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-center tracking-widest"
                    />
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    <Button type="submit" className="w-full">Unlock Dashboard</Button>
                  </form>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 rounded-xl border-white/10 flex items-center gap-4">
                      <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg"><FiUsers size={24} /></div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium">Total Views</p>
                        <p className="text-3xl font-bold text-white">{totalViews}</p>
                      </div>
                    </div>
                    <div className="glass-card p-6 rounded-xl border-white/10 flex items-center gap-4">
                      <div className="p-3 bg-green-500/20 text-green-400 rounded-lg"><FiGlobe size={24} /></div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium">Countries Reached</p>
                        <p className="text-3xl font-bold text-white">{uniqueCountries}</p>
                      </div>
                    </div>
                    <div className="glass-card p-6 rounded-xl border-white/10 flex items-center gap-4">
                      <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg"><FiLink size={24} /></div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium">Top Source</p>
                        <p className="text-xl font-bold text-white truncate max-w-[150px]">
                          {Object.keys(referrers).length > 0 ? Object.entries(referrers).sort((a,b)=>b[1]-a[1])[0][0] : "None"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Traffic Sources */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Traffic Sources</h3>
                    <div className="glass-card rounded-xl border-white/10 overflow-hidden">
                      {Object.entries(referrers).length === 0 ? (
                        <p className="p-6 text-gray-400 text-center">No traffic data yet.</p>
                      ) : (
                        <div className="divide-y divide-white/10">
                          {Object.entries(referrers).sort((a,b)=>b[1]-a[1]).map(([source, count], idx) => (
                            <div key={idx} className="flex justify-between items-center p-4 hover:bg-white/5 transition-colors">
                              <span className="text-gray-300 font-medium truncate max-w-[200px] md:max-w-md">{source}</span>
                              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold">{count} visits</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recent Visitors Table */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Recent Visitors</h3>
                    <div className="glass-card rounded-xl border-white/10 overflow-hidden overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm">
                            <th className="p-4 font-medium">Time</th>
                            <th className="p-4 font-medium">Location</th>
                            <th className="p-4 font-medium">Source</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-sm">
                          {isLoading ? (
                            <tr><td colSpan={3} className="p-4 text-center text-gray-500">Loading data...</td></tr>
                          ) : views.length === 0 ? (
                            <tr><td colSpan={3} className="p-4 text-center text-gray-500">Waiting for first visitor...</td></tr>
                          ) : (
                            views.slice(0, 10).map((v) => (
                              <tr key={v.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 text-gray-300">{new Date(v.viewed_at).toLocaleString()}</td>
                                <td className="p-4 text-gray-300 flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-green-500" />
                                  {v.city !== "Unknown" ? `${v.city}, ` : ""}{v.country}
                                </td>
                                <td className="p-4 text-gray-400 truncate max-w-[150px]">
                                  {v.referrer === "Direct" ? "Direct Link" : v.referrer}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
