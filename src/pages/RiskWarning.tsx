import {
  AlertTriangle,
  Bell,
  TrendingDown,
  Zap,
  Phone,
  Send,
  Eye,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const highRiskPatients = [
  {
    name: "陈美华",
    age: 71,
    dept: "神经科",
    disease: "脑梗后遗症",
    risk: 95,
    reason: "60天未复诊，血压数据异常",
    lastContact: "62天前",
    phone: "136****9921",
    action: "电话随访",
  },
  {
    name: "张建国",
    age: 62,
    dept: "心内科",
    disease: "高血压",
    risk: 88,
    reason: "45天未复诊，依从性持续下降",
    lastContact: "45天前",
    phone: "138****8821",
    action: "电话随访",
  },
  {
    name: "刘志远",
    age: 35,
    dept: "肿瘤科",
    disease: "肺癌术后",
    risk: 82,
    reason: "化疗后未随访，症状自述不佳",
    lastContact: "21天前",
    phone: "137****4421",
    action: "医生联系",
  },
  {
    name: "王建平",
    age: 58,
    dept: "内分泌科",
    disease: "2型糖尿病",
    risk: 76,
    reason: "血糖长期超标，用药不规律",
    lastContact: "30天前",
    phone: "135****1234",
    action: "推送干预",
  },
  {
    name: "孙大为",
    age: 67,
    dept: "心内科",
    disease: "冠心病",
    risk: 71,
    reason: "近期多次SOS请求",
    lastContact: "10天前",
    phone: "139****5678",
    action: "重点关注",
  },
];

const warningTypes = [
  {
    type: "失访风险预警",
    count: 48,
    color: "#dc2626",
    icon: "⚠️",
    desc: "超过30天未就诊患者",
  },
  {
    type: "高危患者预警",
    count: 23,
    color: "#dc2626",
    icon: "🔴",
    desc: "风险评分>80的患者",
  },
  {
    type: "依从性下降预警",
    count: 63,
    color: "#d97706",
    icon: "📉",
    desc: "依从性连续3周下降",
  },
  {
    type: "慢病失控预警",
    count: 31,
    color: "#d97706",
    icon: "💊",
    desc: "关键指标超过阈值",
  },
  {
    type: "推送失败预警",
    count: 156,
    color: "#64748b",
    icon: "📵",
    desc: "消息无法送达患者",
  },
];

const riskTrend = [
  { week: "W1", 高风险: 35, 中风险: 89, 失访: 42 },
  { week: "W2", 高风险: 38, 中风险: 95, 失访: 48 },
  { week: "W3", 高风险: 41, 中风险: 102, 失访: 51 },
  { week: "W4", 高风险: 45, 中风险: 98, 失访: 47 },
  { week: "W5", 高风险: 48, 中风险: 112, 失访: 53 },
  { week: "W6", 高风险: 48, 中风险: 108, 失访: 48 },
];

const getRiskColor = (score: number) => {
  if (score >= 85) return "#dc2626";
  if (score >= 70) return "#d97706";
  return "#10b981";
};

export default function RiskWarning() {
  return (
    <div className="p-6 space-y-5 fade-in">
      {/* Warning Cards */}
      <div className="grid grid-cols-5 gap-4">
        {warningTypes.map((w) => (
          <div
            key={w.type}
            className="metric-card p-4 cursor-pointer"
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = `${w.color}60`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(71,85,105,0.5)")
            }
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{w.icon}</span>
              <div
                className="w-2 h-2 rounded-full pulse-dot"
                style={{ background: w.color }}
              />
            </div>
            <div className="text-2xl font-bold mb-1" style={{ color: w.color }}>
              {w.count}
            </div>
            <div className="text-xs font-medium text-slate-700">{w.type}</div>
            <div className="text-xs text-slate-400 mt-0.5">{w.desc}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Risk Trend */}
        <div className="col-span-2 glass-card p-5">
          <div className="section-header">
            <TrendingDown size={16} className="text-red-400" />
            <span className="section-title">风险患者趋势（近6周）</span>
            <span className="ai-badge">AI监测</span>
          </div>
          <ResponsiveContainer width="100%" height={"100%"} className="pb-5">
            <BarChart data={riskTrend}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(71,85,105,0.2)"
              />
              <XAxis
                dataKey="week"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="高风险" fill="#dc2626" radius={[2, 2, 0, 0]} />
              <Bar dataKey="中风险" fill="#d97706" radius={[2, 2, 0, 0]} />
              <Bar dataKey="失访" fill="#6366f1" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-2">
            {[
              ["高风险", "#dc2626"],
              ["中风险", "#d97706"],
              ["失访", "#6366f1"],
            ].map(([n, c]) => (
              <div key={n} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: c }} />
                <span className="text-xs text-slate-400">{n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Alerts */}
        <div className="glass-card p-5">
          <div className="section-header">
            <Zap size={16} className="text-yellow-400" />
            <span className="section-title">AI实时预警</span>
            <div
              className="ml-auto w-2 h-2 rounded-full pulse-dot"
              style={{ background: "#dc2626" }}
            />
          </div>
          <div className="space-y-3">
            {[
              {
                text: "陈美华血压数据出现急剧波动，风险等级从高升至极高",
                time: "2分钟前",
                type: "critical",
              },
              {
                text: "发现12名患者本周依从性骤降，建议立即介入",
                time: "15分钟前",
                type: "warning",
              },
              {
                text: "48名患者超过90天失访，达到触发干预阈值",
                time: "1小时前",
                type: "warning",
              },
              {
                text: "短信渠道失败率超过3%，已触发渠道切换",
                time: "2小时前",
                type: "info",
              },
              {
                text: "心内科本月复诊率超过目标，建议保持当前策略",
                time: "今天",
                type: "success",
              },
            ].map((alert, i) => (
              <div
                key={i}
                className="p-3 rounded-xl"
                style={{
                  background:
                    alert.type === "critical"
                      ? "var(--medical-danger-bg)"
                      : alert.type === "warning"
                        ? "var(--medical-warning-bg)"
                        : alert.type === "success"
                          ? "rgba(16,185,129,0.08)"
                          : "var(--medical-focus-ring)",
                  border: `1px solid ${
                    alert.type === "critical"
                      ? "var(--medical-danger)"
                      : alert.type === "warning"
                        ? "var(--medical-warning)"
                        : alert.type === "success"
                          ? "var(--medical-success)"
                          : "var(--medical-border)"
                  }`,
                }}
              >
                <div className="flex items-start gap-2">
                  <span className="text-sm flex-shrink-0">
                    {alert.type === "critical"
                      ? "🚨"
                      : alert.type === "warning"
                        ? "⚠️"
                        : alert.type === "success"
                          ? "✅"
                          : "ℹ️"}
                  </span>
                  <div>
                    <p className="text-xs text-(--medical-text-muted)">
                      {alert.text}
                    </p>
                    <p className="text-xs text-(--medical-text) mt-0.5">
                      {alert.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High Risk Patient List */}
      <div className="glass-card overflow-hidden">
        <div
          className="p-4 flex items-center gap-3"
          style={{ borderBottom: "1px solid rgba(71,85,105,0.2)" }}
        >
          <AlertTriangle size={16} className="text-red-400" />
          <span className="text-sm font-semibold text-slate-500">
            高风险患者列表
          </span>
          <div
            className="ml-2 w-2 h-2 rounded-full pulse-dot"
            style={{ background: "#dc2626" }}
          />
          <span className="text-xs text-slate-500">实时更新</span>
          <div className="ml-auto flex gap-2">
            <button className="btn-primary text-xs flex items-center gap-1.5">
              <Bell size={12} />
              批量干预
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(71,85,105,0.2)" }}>
              {[
                "患者",
                "科室/病种",
                "风险评分",
                "预警原因",
                "最后联系",
                "建议干预",
                "操作",
              ].map((h) => (
                <th
                  key={h}
                  className="text-xs text-slate-500 font-medium text-left px-4 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {highRiskPatients.map((p, i) => (
              <tr
                key={i}
                className="table-row-hover"
                style={{ borderBottom: "1px solid rgba(71,85,105,0.1)" }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{
                        background: `${getRiskColor(p.risk)}20`,
                        border: `1px solid ${getRiskColor(p.risk)}40`,
                      }}
                    >
                      {p.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{p.name}</div>
                      <div className="text-xs text-slate-500">
                        {p.age}岁 · {p.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-xs text-(--medical-text-muted)">
                    {p.dept}
                  </div>
                  <div className="text-xs text-slate-500">{p.disease}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: `${getRiskColor(p.risk)}15`,
                        border: `2px solid ${getRiskColor(p.risk)}`,
                        color: getRiskColor(p.risk),
                      }}
                    >
                      {p.risk}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-400 max-w-48">
                  {p.reason}
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  {p.lastContact}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{
                      background: "rgba(220,38,38,0.1)",
                      color: "#f87171",
                      border: "1px solid rgba(220,38,38,0.3)",
                    }}
                  >
                    {p.action}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                      <Eye size={11} />
                      查看
                    </button>
                    <button className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                      <Phone size={11} />
                      联系
                    </button>
                    <button className="text-xs text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                      <Send size={11} />
                      推送
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
