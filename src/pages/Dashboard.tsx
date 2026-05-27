import { 
  AlertTriangle, FileText, Send, TrendingUp, 
  Brain, Clock, CheckCircle, ArrowUp,
  Activity, Zap, Target, Star
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const trendData = [
  { day: '周一', 推送: 1240, 打开: 856, 复诊: 124 },
  { day: '周二', 推送: 1380, 打开: 920, 复诊: 156 },
  { day: '周三', 推送: 1520, 打开: 1080, 复诊: 189 },
  { day: '周四', 推送: 1290, 打开: 890, 复诊: 143 },
  { day: '周五', 推送: 1680, 打开: 1240, 复诊: 212 },
  { day: '周六', 推送: 980, 打开: 720, 复诊: 98 },
  { day: '周日', 推送: 760, 打开: 540, 复诊: 76 },
];

const lifecycleData = [
  { name: '新患者', value: 1240, color: '#6366f1' },
  { name: '复诊患者', value: 3820, color: '#0891b2' },
  { name: '慢病管理', value: 2650, color: '#059669' },
  { name: '术后康复', value: 980, color: '#d97706' },
  { name: '高风险', value: 420, color: '#dc2626' },
];

const deptData = [
  { dept: '心内科', score: 94, patients: 1280 },
  { dept: '内分泌科', score: 91, patients: 980 },
  { dept: '肿瘤科', score: 88, patients: 756 },
  { dept: '骨科', score: 85, patients: 890 },
  { dept: '神经科', score: 82, patients: 640 },
];

const aiSuggestions = [
  { type: 'warning', icon: '⚠️', text: '发现 127 名慢病患者本月依从性下降，建议立即触发随访干预', action: '立即处理' },
  { type: 'opportunity', icon: '🎯', text: '312 名出院患者进入复诊黄金期（第 7-14 天），推荐发送复诊提醒', action: '创建任务' },
  { type: 'insight', icon: '💡', text: '周四 10:00-11:00 为本周最佳推送时间，打开率高出均值 34%', action: '查看详情' },
  { type: 'risk', icon: '🔴', text: '48 名高血压患者超过 90 天未复诊，失访风险极高', action: '预警干预' },
];

const todoList = [
  { type: 'review', label: '待审核AI内容', count: 23, color: '#8b5cf6', urgent: false },
  { type: 'followup', label: '今日待随访', count: 156, color: '#0891b2', urgent: false },
  { type: 'risk', label: '高风险患者', count: 48, color: '#dc2626', urgent: true },
  { type: 'push', label: '待发送任务', count: 8, color: '#d97706', urgent: false },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3" style={{ minWidth: 140 }}>
        <p className="text-xs text-slate-400 mb-2">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-xs font-medium" style={{ color: p.color }}>
            {p.name}: {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '今日待随访', value: '156', sub: '较昨日 +23', icon: Clock, trend: 'up', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
          { label: '高风险患者', value: '48', sub: '新增 12 人', icon: AlertTriangle, trend: 'up', color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
          { label: '待审核内容', value: '23', sub: 'AI生成待审', icon: FileText, trend: 'neutral', color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
          { label: '今日推送量', value: '1,847', sub: '打开率 68.2%', icon: Send, trend: 'up', color: '#059669', bg: 'rgba(5,150,105,0.1)' },
        ].map((item) => (
          <div key={item.label} className="metric-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                <p className="text-3xl font-bold text-white">{item.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {item.trend === 'up' && <ArrowUp size={11} style={{ color: item.color }} />}
                  <span className="text-xs" style={{ color: item.color }}>{item.sub}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: item.bg }}>
                <item.icon size={20} style={{ color: item.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Push Trend */}
        <div className="col-span-2 glass-card p-5">
          <div className="section-header">
            <TrendingUp size={16} className="text-indigo-400" />
            <span className="section-title">近7日推送效果趋势</span>
            <span className="ai-badge">AI分析</span>
            <div className="ml-auto flex gap-2">
              {['推送', '打开', '复诊'].map((k, i) => (
                <div key={k} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: ['#6366f1','#0891b2','#059669'][i] }} />
                  <span className="text-xs text-slate-400">{k}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData}>
              <defs>
                {[['indigo','#6366f1'],['cyan','#0891b2'],['emerald','#059669']].map(([n,c]) => (
                  <linearGradient key={n} id={`g${n}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={c} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={c} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.2)" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="推送" stroke="#6366f1" fill="url(#gindigo)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="打开" stroke="#0891b2" fill="url(#gcyan)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="复诊" stroke="#059669" fill="url(#gemerald)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Lifecycle */}
        <div className="glass-card p-5">
          <div className="section-header">
            <Activity size={16} className="text-indigo-400" />
            <span className="section-title">患者生命周期分布</span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={lifecycleData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {lifecycleData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => [v.toLocaleString(), '患者数']} contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {lifecycleData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-xs text-slate-400">{item.name}</span>
                </div>
                <span className="text-xs font-medium text-slate-300">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* AI Suggestions */}
        <div className="col-span-2 glass-card p-5">
          <div className="section-header">
            <Brain size={16} className="text-purple-400" />
            <span className="section-title">AI运营建议</span>
            <span className="ai-badge">实时生成</span>
          </div>
          <div className="space-y-3">
            {aiSuggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg"
                style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(71, 85, 105, 0.3)' }}>
                <span className="text-lg flex-shrink-0">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300">{s.text}</p>
                </div>
                <button className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium"
                  style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' }}>
                  {s.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Todo & Dept */}
        <div className="space-y-4">
          {/* Today's Todo */}
          <div className="glass-card p-5">
            <div className="section-header">
              <CheckCircle size={16} className="text-emerald-400" />
              <span className="section-title">今日待办</span>
            </div>
            <div className="space-y-2.5">
              {todoList.map((item) => (
                <div key={item.type} className="flex items-center justify-between p-2.5 rounded-lg"
                  style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(71,85,105,0.2)' }}>
                  <div className="flex items-center gap-2">
                    {item.urgent && <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: '#ef4444' }} />}
                    <span className="text-xs text-slate-300">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: item.color }}>{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dept Ranking */}
          <div className="glass-card p-5">
            <div className="section-header">
              <Star size={16} className="text-yellow-400" />
              <span className="section-title">科室运营排行</span>
            </div>
            <div className="space-y-2.5">
              {deptData.map((d, i) => (
                <div key={d.dept} className="flex items-center gap-2">
                  <span className="text-xs font-bold w-4 text-center" style={{ color: i < 3 ? '#f59e0b' : '#64748b' }}>
                    {i + 1}
                  </span>
                  <span className="text-xs text-slate-400 w-16 truncate">{d.dept}</span>
                  <div className="flex-1 progress-bar">
                    <div className="progress-fill" style={{ width: `${d.score}%`, background: i < 3 ? '#6366f1' : '#334155' }} />
                  </div>
                  <span className="text-xs font-medium text-slate-300 w-8 text-right">{d.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '本月复诊率', value: '34.2%', change: '+2.8%', icon: Target, color: '#059669' },
          { label: '慢病依从率', value: '71.5%', change: '+4.1%', icon: Activity, color: '#6366f1' },
          { label: 'AI内容生成', value: '2,847', change: '今日生成', icon: Zap, color: '#d97706' },
          { label: '患者满意度', value: '4.8/5', change: '+0.2分', icon: Star, color: '#ec4899' },
        ].map((item) => (
          <div key={item.label} className="metric-card p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${item.color}20` }}>
              <item.icon size={18} style={{ color: item.color }} />
            </div>
            <div>
              <p className="text-xs text-slate-400">{item.label}</p>
              <p className="text-xl font-bold text-white">{item.value}</p>
              <div className="flex items-center gap-1">
                <ArrowUp size={10} style={{ color: item.color }} />
                <span className="text-xs" style={{ color: item.color }}>{item.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
