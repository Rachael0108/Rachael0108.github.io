import { useState } from 'react';
import { Search, Filter, Eye, Clock, Send, AlertTriangle, Heart, Pill, FileText } from 'lucide-react';

const patients = [
  { id: 'P001', name: '张建国', age: 62, gender: '男', dept: '心内科', disease: '高血压、糖尿病', lifecycle: '慢病管理', risk: 'high', lastVisit: '45天前', nextVisit: '逾期', tags: ['高风险', '失访预警', '慢病'], phone: '138****8821', visitCount: 24 },
  { id: 'P002', name: '李秀英', age: 54, gender: '女', dept: '内分泌科', disease: '2型糖尿病', lifecycle: '复诊患者', risk: 'medium', lastVisit: '21天前', nextVisit: '本周', tags: ['依从性下降', '复诊提醒'], phone: '139****2345', visitCount: 16 },
  { id: 'P003', name: '王大明', age: 48, gender: '男', dept: '骨科', disease: '腰椎间盘突出', lifecycle: '术后康复', risk: 'low', lastVisit: '7天前', nextVisit: '明天', tags: ['术后康复', '按时复诊'], phone: '135****6678', visitCount: 8 },
  { id: 'P004', name: '陈美华', age: 71, gender: '女', dept: '神经科', disease: '脑梗后遗症', lifecycle: '慢病管理', risk: 'high', lastVisit: '60天前', nextVisit: '逾期', tags: ['高风险', '失访', '用药提醒'], phone: '136****9921', visitCount: 31 },
  { id: 'P005', name: '刘志远', age: 35, gender: '男', dept: '肿瘤科', disease: '肺癌术后', lifecycle: '术后康复', risk: 'high', lastVisit: '14天前', nextVisit: '后天', tags: ['重点关注', '化疗随访'], phone: '137****4421', visitCount: 12 },
  { id: 'P006', name: '孙小燕', age: 28, gender: '女', dept: '妇产科', disease: '产后检查', lifecycle: '新患者', risk: 'low', lastVisit: '3天前', nextVisit: '下周', tags: ['产后', '新患者'], phone: '159****1234', visitCount: 2 },
];

const timelineEvents = [
  { time: '2025-06-01', type: 'visit', title: '门诊复诊', desc: '血压控制良好，血糖略高，调整用药', icon: Heart, color: '#059669' },
  { time: '2025-05-20', type: 'push', title: '收到健康提醒', desc: '高血压患者夏季用药注意事项', icon: Send, color: '#6366f1' },
  { time: '2025-05-10', type: 'risk', title: '风险预警触发', desc: 'AI检测到血压数据异常波动', icon: AlertTriangle, color: '#dc2626' },
  { time: '2025-04-15', type: 'visit', title: '检查结果', desc: '心电图、血生化检查已完成', icon: FileText, color: '#0891b2' },
  { time: '2025-04-01', type: 'medicine', title: '用药提醒', desc: '苯磺酸氨氯地平片已更新处方', icon: Pill, color: '#d97706' },
];

const riskColors: Record<string, string> = {
  high: '#dc2626', medium: '#d97706', low: '#059669'
};
const riskLabels: Record<string, string> = {
  high: '高风险', medium: '中风险', low: '低风险'
};

export default function Patients() {
  const [selected, setSelected] = useState(patients[0]);
  const [search, setSearch] = useState('');

  const filtered = patients.filter(p => p.name.includes(search) || p.dept.includes(search) || p.disease.includes(search));

  return (
    <div className="flex h-full gap-4 p-6 fade-in" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Left Panel - Patient List */}
      <div className="w-80 flex flex-col gap-3 flex-shrink-0">
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input className="input-field pl-8 text-xs" style={{ height: '34px' }} placeholder="搜索患者姓名/科室..."
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400"
              style={{ background: 'rgba(71,85,105,0.2)', border: '1px solid rgba(71,85,105,0.3)' }}>
              <Filter size={14} />
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['全部', '高风险', '慢病', '术后'].map(tag => (
              <button key={tag} className="text-xs px-2.5 py-1 rounded-full"
                style={{ background: tag === '全部' ? 'rgba(99,102,241,0.2)' : 'rgba(71,85,105,0.2)', color: tag === '全部' ? '#a5b4fc' : '#94a3b8', border: `1px solid ${tag === '全部' ? 'rgba(99,102,241,0.4)' : 'rgba(71,85,105,0.3)'}` }}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {filtered.map(p => (
            <button key={p.id} onClick={() => setSelected(p)} className="w-full text-left glass-card p-4 transition-all duration-200"
              style={{ borderColor: selected.id === p.id ? 'rgba(99,102,241,0.5)' : undefined, background: selected.id === p.id ? 'rgba(99,102,241,0.1)' : undefined }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{p.name}</span>
                    <span className="text-xs text-slate-400">{p.age}岁 {p.gender}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{p.dept} · {p.disease}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${riskColors[p.risk]}20`, color: riskColors[p.risk], border: `1px solid ${riskColors[p.risk]}40` }}>
                    {riskLabels[p.risk]}
                  </span>
                  <span className="text-xs text-slate-500">{p.lastVisit}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {p.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="tag-blue text-xs px-1.5 py-0.5 rounded">{tag}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Patient 360 */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Basic Info */}
        <div className="glass-card p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                {selected.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-white">{selected.name}</h2>
                  <span className="text-sm text-slate-400">{selected.age}岁 · {selected.gender}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: `${riskColors[selected.risk]}20`, color: riskColors[selected.risk], border: `1px solid ${riskColors[selected.risk]}40` }}>
                    {riskLabels[selected.risk]}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-slate-400">{selected.dept}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-sm text-slate-400">{selected.disease}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-sm text-slate-400">{selected.phone}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selected.tags.map(tag => (
                    <span key={tag} className="tag-purple text-xs px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary text-xs flex items-center gap-1.5"><Eye size={13} />查看详情</button>
              <button className="btn-primary text-xs flex items-center gap-1.5"><Send size={13} />发送消息</button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4 pt-4" style={{ borderTop: '1px solid rgba(71,85,105,0.3)' }}>
            {[
              { label: '生命周期阶段', value: selected.lifecycle, color: '#6366f1' },
              { label: '总复诊次数', value: `${selected.visitCount} 次`, color: '#0891b2' },
              { label: '上次就诊', value: selected.lastVisit, color: '#d97706' },
              { label: '下次复诊', value: selected.nextVisit, color: selected.nextVisit === '逾期' ? '#dc2626' : '#059669' },
            ].map(item => (
              <div key={item.label} className="text-center p-3 rounded-xl" style={{ background: 'rgba(15,23,42,0.5)' }}>
                <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                <p className="text-sm font-bold" style={{ color: item.color }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Timeline */}
          <div className="glass-card p-5">
            <div className="section-header">
              <Clock size={16} className="text-indigo-400" />
              <span className="section-title">患者时间轴</span>
            </div>
            <div className="space-y-4">
              {timelineEvents.map((event, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${event.color}20`, border: `1px solid ${event.color}40` }}>
                      <event.icon size={14} style={{ color: event.color }} />
                    </div>
                    {i < timelineEvents.length - 1 && (
                      <div className="w-px flex-1 mt-1" style={{ background: 'rgba(71,85,105,0.3)', minHeight: 16 }} />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{event.title}</span>
                      <span className="text-xs text-slate-500">{event.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Push History & Risk */}
          <div className="space-y-4">
            <div className="glass-card p-5">
              <div className="section-header">
                <Send size={16} className="text-indigo-400" />
                <span className="section-title">历史推送记录</span>
              </div>
              <div className="space-y-2">
                {[
                  { title: '高血压患者夏季用药指南', time: '2025-05-20', status: '已读', rate: 92 },
                  { title: '复诊提醒：距离上次就诊已30天', time: '2025-05-01', status: '已读', rate: 100 },
                  { title: '糖尿病饮食管理要点', time: '2025-04-20', status: '未读', rate: 0 },
                  { title: '血压自测记录提醒', time: '2025-04-10', status: '已读', rate: 78 },
                ].map((item, i) => (
                  <div key={i} className="p-2.5 rounded-lg" style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(71,85,105,0.2)' }}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-300 truncate flex-1 mr-2">{item.title}</span>
                      <span className="text-xs flex-shrink-0" style={{ color: item.status === '已读' ? '#10b981' : '#f59e0b' }}>{item.status}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-slate-500">{item.time}</span>
                      <span className="text-xs text-slate-500">阅读率 {item.rate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <div className="section-header">
                <AlertTriangle size={16} className="text-red-400" />
                <span className="section-title">风险记录</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: '失访风险', score: 78, color: '#dc2626', trend: '↑ 上升' },
                  { label: '依从性评分', score: 52, color: '#d97706', trend: '↓ 下降' },
                  { label: '复诊概率', score: 34, color: '#d97706', trend: '↓ 偏低' },
                  { label: '慢病控制', score: 61, color: '#6366f1', trend: '→ 稳定' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-20 flex-shrink-0">{item.label}</span>
                    <div className="flex-1 progress-bar">
                      <div className="progress-fill" style={{ width: `${item.score}%`, background: item.color }} />
                    </div>
                    <span className="text-xs font-bold w-6 text-right" style={{ color: item.color }}>{item.score}</span>
                    <span className="text-xs w-14 text-right" style={{ color: item.color }}>{item.trend}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
