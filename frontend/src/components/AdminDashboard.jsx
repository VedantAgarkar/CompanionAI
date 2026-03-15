import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Users, MessageSquare, ShieldCheck, ShieldOff, Trash2,
  Zap, Crown, Server, Activity, RefreshCw, ArrowLeft,
  Globe, TrendingUp, CheckCircle, AlertCircle, Clock, Mail
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const API_BASE = 'http://localhost:8000';

const AdminDashboard = ({ onNavigate }) => {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState(null);
  const [contactReqs, setContactReqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, statsRes, statusRes, contactRes] = await Promise.all([
        axios.get(`${API_BASE}/admin/users`, { headers }),
        axios.get(`${API_BASE}/admin/stats`, { headers }),
        axios.get(`${API_BASE}/admin/status`, { headers }),
        axios.get(`${API_BASE}/admin/contact-requests`, { headers }),
      ]);
      setUsers(usersRes.data);
      setStats(statsRes.data);
      setStatus(statusRes.data);
      setContactReqs(contactRes.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const showMsg = (msg) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(''), 3000);
  };

  const grantAdmin = async (id) => {
    await axios.post(`${API_BASE}/admin/users/${id}/grant-admin`, {}, { headers });
    showMsg('Admin privileges granted ✓');
    fetchAll();
  };

  const revokeAdmin = async (id) => {
    await axios.post(`${API_BASE}/admin/users/${id}/revoke-admin`, {}, { headers });
    showMsg('Admin privileges revoked ✓');
    fetchAll();
  };

  const deleteUser = async (id, name) => {
    if (!window.confirm(`Delete account for "${name}"? This cannot be undone.`)) return;
    await axios.delete(`${API_BASE}/admin/users/${id}`, { headers });
    showMsg(`Account "${name}" deleted ✓`);
    fetchAll();
  };

  const deleteContactReq = async (id) => {
    await axios.delete(`${API_BASE}/admin/contact-requests/${id}`, { headers });
    showMsg('Request dismissed ✓');
    fetchAll();
  };

  if (loading) return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-yellow-400/20 border-t-yellow-400 animate-spin" />
        <p className="text-yellow-400 font-semibold">Loading Admin Panel...</p>
      </div>
    </div>
  );

  const domainColors = {
    business: 'text-blue-400', startup: 'text-emerald-400',
    farming: 'text-amber-400', general: 'text-purple-400'
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-16">
      {/* Top Bar */}
      <div className="border-b border-[var(--border-color)] px-8 py-5 flex items-center justify-between sticky top-0 bg-[var(--bg-primary)]/80 backdrop-blur-xl z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('landing')} className="p-2 rounded-xl hover:bg-white/5 text-[var(--text-secondary)] transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
            <Crown className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">Admin Dashboard</h1>
            <p className="text-xs text-yellow-400/80">Logged in as {user?.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {actionMsg && (
            <motion.span
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-sm text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-full border border-emerald-400/20"
            >
              {actionMsg}
            </motion.span>
          )}
          <button onClick={fetchAll} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm hover:border-yellow-500/30 transition-all">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-12 gap-5 auto-rows-auto">

          {/* Stat: Total Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="col-span-12 sm:col-span-6 lg:col-span-3 p-6 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-blue-500/30 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-[var(--text-secondary)] text-sm mb-1">Total Users</p>
            <p className="text-4xl font-bold">{stats?.total_users ?? '—'}</p>
            <p className="text-xs text-blue-400 mt-2">{stats?.admin_count} admin{stats?.admin_count !== 1 ? 's' : ''}</p>
          </motion.div>

          {/* Stat: Total Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="col-span-12 sm:col-span-6 lg:col-span-3 p-6 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-emerald-500/30 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="text-[var(--text-secondary)] text-sm mb-1">Total Messages</p>
            <p className="text-4xl font-bold">{stats?.total_messages ?? '—'}</p>
            <p className="text-xs text-emerald-400 mt-2">across all domains</p>
          </motion.div>

          {/* Server Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="col-span-12 sm:col-span-6 lg:col-span-3 p-6 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-purple-500/30 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
              <Server className="w-6 h-6 text-purple-400" />
            </div>
            <p className="text-[var(--text-secondary)] text-sm mb-1">Server</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-2xl font-bold capitalize">{status?.server ?? '—'}</p>
            </div>
            <p className="text-xs text-purple-400 mt-2">FastAPI + Uvicorn</p>
          </motion.div>

          {/* AI API Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className={`col-span-12 sm:col-span-6 lg:col-span-3 p-6 rounded-3xl bg-[var(--bg-secondary)] border transition-all ${
              status?.api_status === 'ready' ? 'border-emerald-500/30' : 'border-red-500/30'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
              status?.api_status === 'ready' ? 'bg-emerald-500/10' : 'bg-red-500/10'
            }`}>
              <Activity className={`w-6 h-6 ${status?.api_status === 'ready' ? 'text-emerald-400' : 'text-red-400'}`} />
            </div>
            <p className="text-[var(--text-secondary)] text-sm mb-1">AI API</p>
            <div className="flex items-center gap-2">
              {status?.api_status === 'ready'
                ? <CheckCircle className="w-5 h-5 text-emerald-400" />
                : <AlertCircle className="w-5 h-5 text-red-400" />
              }
              <p className="text-2xl font-bold capitalize">{status?.api_status ?? '—'}</p>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              {status?.api_provider} · {status?.api_latency_ms ? `${status.api_latency_ms}ms` : 'timeout'}
            </p>
          </motion.div>

          {/* Domain Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="col-span-12 lg:col-span-4 p-6 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold">Domain Usage</h2>
            </div>
            {stats?.domain_stats?.length > 0 ? (
              <div className="space-y-4">
                {stats.domain_stats.map(({ domain, count }) => {
                  const maxCount = Math.max(...stats.domain_stats.map(d => d.count));
                  const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
                  return (
                    <div key={domain}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className={`font-semibold capitalize ${domainColors[domain] || 'text-[var(--text-secondary)]'}`}>{domain}</span>
                        <span className="text-[var(--text-secondary)]">{count} msgs</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.4, duration: 0.8 }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-[var(--text-secondary)] text-sm mt-4">No messages yet.</p>
            )}
          </motion.div>

          {/* Recent Signups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="col-span-12 lg:col-span-4 p-6 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-cyan-400" />
              <h2 className="font-bold">Recent Signups</h2>
            </div>
            <div className="space-y-4">
              {stats?.recent_users?.length > 0 ? stats.recent_users.map((u) => (
                <div key={u.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/30 to-emerald-500/30 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {u.full_name?.[0] || '?'}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-semibold text-sm truncate">{u.full_name}</p>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</p>
                  </div>
                </div>
              )) : <p className="text-[var(--text-secondary)] text-sm">No recent signups.</p>}
            </div>
          </motion.div>

          {/* AI Model Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="col-span-12 lg:col-span-4 p-6 rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-5 h-5 text-blue-400" />
              <h2 className="font-bold">AI Configuration</h2>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Provider', val: status?.api_provider || '—' },
                { label: 'Model', val: status?.api_model || '—' },
                { label: 'Latency', val: status?.api_latency_ms ? `${status.api_latency_ms} ms` : 'N/A' },
                { label: 'Status', val: status?.api_status || '—', color: status?.api_status === 'ready' ? 'text-emerald-400' : 'text-red-400' },
              ].map(({ label, val, color }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-[var(--text-secondary)]">{label}</span>
                  <span className={`font-semibold ${color || ''}`}>{val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Full User Management Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="col-span-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-6 py-5 border-b border-[var(--border-color)]">
              <Globe className="w-5 h-5 text-yellow-400" />
              <h2 className="font-bold">User Management</h2>
              <span className="ml-auto text-xs text-[var(--text-secondary)] bg-white/5 px-3 py-1 rounded-full">{users.length} accounts</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)] text-[var(--text-secondary)]">
                    {['Name', 'Email', 'Role', 'Messages', 'Joined', 'Actions'].map(h => (
                      <th key={h} className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <motion.tr
                      key={u.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * i }}
                      className="border-b border-[var(--border-color)]/50 hover:bg-white/5 transition-colors last:border-0"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-emerald-500/30 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {u.full_name?.[0] || '?'}
                          </div>
                          <span className={`font-semibold ${u.role === 'admin' ? 'text-yellow-400' : ''}`}>
                            {u.full_name} {u.role === 'admin' && '👑'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[var(--text-secondary)]">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          u.role === 'admin' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' : 'bg-blue-400/10 text-blue-400 border border-blue-400/20'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[var(--text-secondary)]">{u.message_count}</td>
                      <td className="px-6 py-4 text-[var(--text-secondary)]">
                        {u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {u.role === 'admin' ? (
                            <button onClick={() => revokeAdmin(u.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 text-xs font-semibold transition-all border border-yellow-500/20">
                              <ShieldOff className="w-3.5 h-3.5" /> Revoke
                            </button>
                          ) : (
                            <button onClick={() => grantAdmin(u.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold transition-all border border-emerald-500/20">
                              <ShieldCheck className="w-3.5 h-3.5" /> Grant Admin
                            </button>
                          )}
                          <button onClick={() => deleteUser(u.id, u.full_name)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition-all border border-red-500/20">
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Contact Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="col-span-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-6 py-5 border-b border-[var(--border-color)]">
              <Mail className="w-5 h-5 text-cyan-400" />
              <h2 className="font-bold">Contact Requests</h2>
              <span className="ml-auto text-xs text-[var(--text-secondary)] bg-white/5 px-3 py-1 rounded-full">{contactReqs.length} requests</span>
            </div>
            {contactReqs.length > 0 ? (
              <div className="divide-y divide-[var(--border-color)]/50">
                {contactReqs.map((r) => (
                  <div key={r.id} className="px-6 py-5 hover:bg-white/5 transition-colors flex gap-5 items-start">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-sm font-bold flex-shrink-0 text-cyan-400">
                      {r.name?.[0] || '?'}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-sm">{r.name}</span>
                        <span className="text-xs text-[var(--text-secondary)]">{r.email}</span>
                        <span className="ml-auto text-xs text-[var(--text-secondary)]">{r.created_at ? new Date(r.created_at).toLocaleString() : '—'}</span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{r.message}</p>
                    </div>
                    <button
                      onClick={() => deleteContactReq(r.id)}
                      className="flex-shrink-0 p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all border border-red-500/20"
                      title="Dismiss"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[var(--text-secondary)] text-sm px-6 py-8 text-center">No contact requests yet.</p>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
