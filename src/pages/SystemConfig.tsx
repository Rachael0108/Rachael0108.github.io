import { useState } from 'react';
import { Settings, Tag, Brain, GitBranch, Bell, Building, Plus, Save, Edit3 } from 'lucide-react';

const configTabs = [
  { id: 'tags', label: '标签字典', icon: Tag },
  { id: 'prompts', label: 'AI Prompt模板', icon: Brain },
  { id: 'lifecycle', label: '生命周期规则', icon: GitBranch },
  { id: 'push', label: '推送规则', icon: Bell },
  { id: 'dept', label: '科室配置', icon: Building },
  { id: 'ai', label: 'AI参数配置', icon: Settings },
];

const tagDict = [
  { category: '诊断标签', tags: ['高血压', '糖尿病', '冠心病', '脑梗', '肺癌', '骨折', '腰椎间盘突出'], color: '#6366f1' },
  { category: '风险标签', tags: ['高风险', '中风险', '低风险', '失访预警', '依从性差'], color: '#dc2626' },
  { category: '行为标签', tags: ['活跃用户', '沉默用户', '微信偏好', '短信偏好', '工作日就诊'], color: '#0891b2' },
  { category: '运营标签', tags: ['慢病管理', '术后康复', '新患引导', '复诊召回', '健康维护'], color: '#059669' },
];

const promptTemplates = [
  { name: '高血压随访提示词', scene: '慢病随访', model: 'GPT-4', tokens: 512, active: true },
  { name: '术后康复内容生成', scene: '术后随访', model: 'GPT-4', tokens: 768, active: true },
  { name: '复诊召回消息', scene: '复诊提醒', model: 'GPT-3.5', tokens: 256, active: true },
  { name: '新患者欢迎内容', scene: '新患引导', model: 'GPT-3.5', tokens: 384, active: false },
];

const lifecycleRules = [
  { name: '术后随访规则', trigger: '手术完成', stages: ['第3天', '第7天', '第14天', '第30天', '第90天'], active: true },
  { name: '出院随访规则', trigger: '办理出院', stages: ['出院当天', '第3天', '第7天', '第1月'], active: true },
  { name: '慢病管理规则', trigger: '慢病入组', stages: ['每月随访', '季度评估', '年度体检'], active: true },
  { name: '新患引导规则', trigger: '首次就诊', stages: ['当天', '第3天', '第7天', '第30天'], active: false },
];

const deptConfig = [
  { name: '心内科', code: 'CARD', patients: 1280, admin: '张医生', followupRule: '术后随访规则', active: true },
  { name: '内分泌科', code: 'ENDO', patients: 980, admin: '李医生', followupRule: '慢病管理规则', active: true },
  { name: '骨科', code: 'ORTH', patients: 890, admin: '王医生', followupRule: '术后随访规则', active: true },
  { name: '肿瘤科', code: 'ONCO', patients: 756, admin: '陈医生', followupRule: '慢病管理规则', active: true },
  { name: '神经科', code: 'NEUR', patients: 640, admin: '刘医生', followupRule: '出院随访规则', active: true },
];

const aiParams = [
  { key: '内容生成模型', value: 'GPT-4', desc: '用于AI内容生成的基础模型', editable: true },
  { key: '风险评估阈值', value: '70', desc: '患者风险评分触发预警的阈值（0-100）', editable: true },
  { key: '失访预警天数', value: '30', desc: '患者未复诊超过N天触发失访预警', editable: true },
  { key: '内容审核模式', value: '人工+AI', desc: 'AI内容发布前的审核方式', editable: true },
  { key: 'AI生成语言风格', value: '专业温和', desc: 'AI生成内容的语言风格偏好', editable: true },
  { key: '最大批量推送量', value: '10000', desc: '单次任务最大推送患者数量', editable: true },
  { key: '推送间隔最小时间', value: '24小时', desc: '同一患者接收推送的最小间隔', editable: true },
];

export default function SystemConfig() {
  const [activeTab, setActiveTab] = useState('tags');

  return (
    <div className="p-6 space-y-5 fade-in">
      {/* Tab Navigation */}
      <div className="flex gap-2 flex-wrap">
        {configTabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: activeTab === tab.id ? 'rgba(99,102,241,0.2)' : 'rgba(71,85,105,0.2)',
                color: activeTab === tab.id ? '#a5b4fc' : '#64748b',
                border: `1px solid ${activeTab === tab.id ? 'rgba(99,102,241,0.4)' : 'rgba(71,85,105,0.3)'}`,
              }}>
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tag Dictionary */}
      {activeTab === 'tags' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">共 {tagDict.reduce((acc, c) => acc + c.tags.length, 0)} 个标签</span>
            <button className="btn-primary text-xs flex items-center gap-1.5"><Plus size={13} />新增标签</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {tagDict.map(cat => (
              <div key={cat.category} className="glass-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                    <span className="text-sm font-semibold text-white">{cat.category}</span>
                    <span className="text-xs text-slate-500">({cat.tags.length})</span>
                  </div>
                  <button className="text-xs text-indigo-400 hover:text-indigo-300">编辑</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.tags.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}30` }}>
                      {tag}
                    </span>
                  ))}
                  <button className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1"
                    style={{ background: 'rgba(71,85,105,0.15)', color: '#64748b', border: '1px dashed rgba(71,85,105,0.4)' }}>
                    <Plus size={10} />添加
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prompt Templates */}
      {activeTab === 'prompts' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button className="btn-primary text-xs flex items-center gap-1.5"><Plus size={13} />新建Prompt</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {promptTemplates.map((pt, i) => (
              <div key={i} className="glass-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{pt.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${pt.active ? 'tag-green' : 'tag-gray'}`}>
                        {pt.active ? '启用' : '停用'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span>场景：{pt.scene}</span>
                      <span>模型：{pt.model}</span>
                      <span>Token：{pt.tokens}</span>
                    </div>
                  </div>
                  <button className="btn-secondary text-xs flex items-center gap-1.5">
                    <Edit3 size={11} />编辑
                  </button>
                </div>
                <div className="p-3 rounded-xl text-xs text-slate-400 leading-relaxed"
                  style={{ background: 'rgba(15,23,42,0.6)', fontFamily: 'monospace', border: '1px solid rgba(71,85,105,0.2)' }}>
                  请根据患者的{'{病种}'}和{'{生命周期阶段}'}，生成一篇适合{'{场景}'}的医疗内容，要求：语言温和专业，不超过300字...
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lifecycle Rules */}
      {activeTab === 'lifecycle' && (
        <div className="space-y-4">
          {lifecycleRules.map((rule, i) => (
            <div key={i} className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-base font-semibold text-white">{rule.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${rule.active ? 'tag-green' : 'tag-gray'}`}>
                    {rule.active ? '运行中' : '已停用'}
                  </span>
                  <span className="text-sm text-slate-400">触发：{rule.trigger}</span>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary text-xs">暂停</button>
                  <button className="btn-primary text-xs flex items-center gap-1.5"><Edit3 size={11} />编辑</button>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {rule.stages.map((stage, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="px-3 py-2 rounded-xl text-center"
                      style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', minWidth: 80 }}>
                      <div className="text-xs font-medium text-indigo-300">{stage}</div>
                      <div className="text-xs text-slate-500 mt-0.5">AI推送</div>
                    </div>
                    {j < rule.stages.length - 1 && (
                      <div className="text-slate-600">→</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dept Config */}
      {activeTab === 'dept' && (
        <div className="glass-card overflow-hidden">
          <div className="p-4 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(71,85,105,0.2)' }}>
            <Building size={16} className="text-indigo-400" />
            <span className="text-sm font-semibold text-slate-200">科室配置管理</span>
            <button className="ml-auto btn-primary text-xs flex items-center gap-1.5"><Plus size={13} />新增科室</button>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(71,85,105,0.2)' }}>
                {['科室名称', '科室代码', '患者数', '科室负责人', '随访规则', '状态', '操作'].map(h => (
                  <th key={h} className="text-xs text-slate-500 font-medium text-left px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deptConfig.map((d, i) => (
                <tr key={i} className="table-row-hover" style={{ borderBottom: '1px solid rgba(71,85,105,0.1)' }}>
                  <td className="px-4 py-3 text-sm font-medium text-slate-200">{d.name}</td>
                  <td className="px-4 py-3 text-xs font-mono text-indigo-400">{d.code}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{d.patients.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-slate-400">{d.admin}</td>
                  <td className="px-4 py-3"><span className="tag-purple text-xs px-2 py-0.5 rounded">{d.followupRule}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${d.active ? 'tag-green' : 'tag-gray'}`}>{d.active ? '启用' : '停用'}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs text-indigo-400 hover:text-indigo-300">配置</button>
                      <button className="text-xs text-slate-400 hover:text-slate-300">编辑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* AI Params */}
      {activeTab === 'ai' && (
        <div className="glass-card p-5">
          <div className="section-header">
            <Brain size={16} className="text-purple-400" />
            <span className="section-title">AI引擎参数配置</span>
            <span className="ai-badge">高级设置</span>
          </div>
          <div className="space-y-4">
            {aiParams.map((param, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(71,85,105,0.2)' }}>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-200">{param.key}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{param.desc}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-xl text-sm font-medium text-indigo-300"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', minWidth: 120, textAlign: 'center' }}>
                    {param.value}
                  </div>
                  {param.editable && (
                    <button className="btn-secondary text-xs flex items-center gap-1.5">
                      <Edit3 size={11} />修改
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button className="btn-primary flex items-center gap-2">
              <Save size={14} />保存配置
            </button>
          </div>
        </div>
      )}

      {/* Push Rules */}
      {activeTab === 'push' && (
        <div className="space-y-4">
          <div className="glass-card p-5">
            <div className="section-header">
              <Bell size={16} className="text-yellow-400" />
              <span className="section-title">推送规则配置</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '推送频率限制', value: '每患者每天最多3条', desc: '防止过度打扰患者' },
                { label: '免打扰时段', value: '22:00 - 08:00', desc: '该时段内不发送任何推送' },
                { label: 'AI推荐发送时间', value: '已开启', desc: '根据患者历史行为优化发送时间' },
                { label: '推送失败重试', value: '重试3次，间隔1小时', desc: '消息发送失败后的自动重试策略' },
                { label: '渠道优先级', value: '微信 > 企业微信 > 短信 > APP', desc: '多渠道发送的优先顺序' },
                { label: '内容个性化', value: '已开启', desc: '根据患者画像个性化推送内容' },
              ].map((rule, i) => (
                <div key={i} className="p-4 rounded-xl"
                  style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(71,85,105,0.2)' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-200 mb-1">{rule.label}</div>
                      <div className="text-xs text-slate-500">{rule.desc}</div>
                    </div>
                    <button className="text-xs text-indigo-400 hover:text-indigo-300 ml-3 flex-shrink-0">修改</button>
                  </div>
                  <div className="mt-2 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-300 w-fit"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    {rule.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
