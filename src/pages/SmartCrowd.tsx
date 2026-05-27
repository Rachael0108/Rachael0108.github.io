import { useState } from 'react';
import { Filter, Users, Plus, TrendingUp, Zap, ChevronDown, Play, Save } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const savedGroups = [
  { name: '高血压未复诊>30天', count: 312, change: '+24', color: '#dc2626', auto: true, scene: '复诊召回' },
  { name: '糖尿病依从性下降', count: 127, change: '+18', color: '#d97706', auto: true, scene: '干预随访' },
  { name: '术后7-30天患者', count: 89, change: '-5', color: '#6366f1', auto: true, scene: '康复随访' },
  { name: '新患者7日内', count: 456, change: '+67', color: '#059669', auto: false, scene: '新患引导' },
  { name: '高风险慢病患者', count: 234, change: '+12', color: '#dc2626', auto: true, scene: '重点干预' },
];

const smartRecommended = [
  { label: '长期未复诊患者', desc: '超过90天未复诊，共发现 48 人', count: 48, urgency: 'high', icon: '⚠️' },
  { label: '高风险慢病患者', desc: '风险评分>70的慢病患者群', count: 127, urgency: 'high', icon: '🔴' },
  { label: '术后康复患者', desc: '近30天手术、处于康复期', count: 89, urgency: 'medium', icon: '🏥' },
  { label: '依从性下降患者', desc: 'AI检测到依从性连续下降3周', count: 63, urgency: 'medium', icon: '📉' },
];

const trendData = [
  { week: 'W1', 入组: 45, 出组: 12 },
  { week: 'W2', 入组: 67, 出组: 18 },
  { week: 'W3', 入组: 52, 出组: 25 },
  { week: 'W4', 入组: 89, 出组: 21 },
  { week: 'W5', 入组: 73, 出组: 31 },
  { week: 'W6', 入组: 95, 出组: 28 },
];

const conditionOptions = {
  '诊断': ['高血压', '2型糖尿病', '冠心病', '脑梗', '肺癌', '骨折'],
  '生命周期': ['新患者', '复诊患者', '慢病管理', '术后康复', '健康维护'],
  '风险等级': ['高风险', '中风险', '低风险'],
  '随访状态': ['未随访', '随访中', '已完成', '失联'],
  '复诊周期': ['逾期', '本周', '下周', '本月'],
};

export default function SmartCrowd() {
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['高血压', '未随访']);
  const [estimatedCount] = useState(312);
  const [activeGroup, setActiveGroup] = useState(savedGroups[0]);

  const toggleCondition = (cond: string) => {
    setSelectedConditions(prev => prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]);
  };

  return (
    <div className="p-6 space-y-5 fade-in">
      <div className="grid grid-cols-3 gap-5">
        {/* Left - Filter Builder */}
        <div className="col-span-1 space-y-4">
          <div className="glass-card p-5">
            <div className="section-header">
              <Filter size={16} className="text-indigo-400" />
              <span className="section-title">人群条件构建</span>
            </div>

            <div className="space-y-4">
              {Object.entries(conditionOptions).map(([group, options]) => (
                <div key={group}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-slate-400">{group}</span>
                    <ChevronDown size={12} className="text-slate-500" />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => toggleCondition(opt)}
                        className="text-xs px-2.5 py-1 rounded-full transition-all duration-150"
                        style={{
                          background: selectedConditions.includes(opt) ? 'rgba(99,102,241,0.2)' : 'rgba(71,85,105,0.2)',
                          color: selectedConditions.includes(opt) ? '#a5b4fc' : '#64748b',
                          border: `1px solid ${selectedConditions.includes(opt) ? 'rgba(99,102,241,0.4)' : 'rgba(71,85,105,0.3)'}`,
                        }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Estimate */}
            <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-indigo-300">预估人群数量</span>
                <span className="text-2xl font-bold text-indigo-400">{estimatedCount}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">当前条件：{selectedConditions.join(' + ')}</div>
              <div className="progress-bar mt-2">
                <div className="progress-fill" style={{ width: '28%', background: '#6366f1' }} />
              </div>
              <div className="text-xs text-slate-500 mt-1">占总患者 28%</div>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="btn-secondary flex-1 flex items-center justify-center gap-1.5 text-xs">
                <Save size={13} />保存规则
              </button>
              <button className="btn-primary flex-1 flex items-center justify-center gap-1.5 text-xs">
                <Play size={13} />创建人群
              </button>
            </div>
          </div>
        </div>

        {/* Center + Right */}
        <div className="col-span-2 space-y-4">
          {/* Smart Recommendations */}
          <div className="glass-card p-5">
            <div className="section-header">
              <Zap size={16} className="text-yellow-400" />
              <span className="section-title">AI智能推荐人群</span>
              <span className="ai-badge">自动发现</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {smartRecommended.map((item, i) => (
                <div key={i} className="p-4 rounded-xl flex items-start gap-3 cursor-pointer transition-all duration-200"
                  style={{ background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(71,85,105,0.3)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(71,85,105,0.3)')}>
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{item.label}</span>
                      <span className="text-lg font-bold" style={{ color: item.urgency === 'high' ? '#dc2626' : '#d97706' }}>
                        {item.count}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    <button className="mt-2 text-xs px-2.5 py-1 rounded-lg"
                      style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' }}>
                      一键建群
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Groups */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-5">
              <div className="section-header">
                <Users size={16} className="text-cyan-400" />
                <span className="section-title">已保存人群</span>
                <button className="ml-auto text-xs px-2 py-1 rounded-lg flex items-center gap-1"
                  style={{ background: 'rgba(71,85,105,0.2)', color: '#94a3b8' }}>
                  <Plus size={11} />新建
                </button>
              </div>
              <div className="space-y-2">
                {savedGroups.map((group, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGroup(group)}
                    className="w-full p-3 rounded-lg text-left transition-all duration-200"
                    style={{
                      background: activeGroup.name === group.name ? 'rgba(99,102,241,0.1)' : 'rgba(15,23,42,0.5)',
                      border: `1px solid ${activeGroup.name === group.name ? 'rgba(99,102,241,0.4)' : 'rgba(71,85,105,0.2)'}`,
                    }}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-200 truncate flex-1">{group.name}</span>
                      <div className="flex items-center gap-2 ml-2">
                        {group.auto && (
                          <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc' }}>动态</span>
                        )}
                        <span className="text-sm font-bold" style={{ color: group.color }}>{group.count}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">场景：{group.scene}</span>
                      <span className="text-xs" style={{ color: group.change.startsWith('+') ? '#10b981' : '#ef4444' }}>
                        {group.change} 人
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trend */}
            <div className="glass-card p-5">
              <div className="section-header">
                <TrendingUp size={16} className="text-emerald-400" />
                <span className="section-title">人群变化趋势</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">"{activeGroup.name}" 近6周变化</p>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(71,85,105,0.2)" />
                  <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} />
                  <Bar dataKey="入组" fill="#6366f1" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="出组" fill="#dc2626" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
                <div className="flex items-center gap-2">
                  <Zap size={12} className="text-yellow-400" />
                  <span className="text-xs text-slate-300">本周净入组 <span className="text-indigo-400 font-bold">+67</span> 人，建议触发随访任务</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
