import {
  MessageSquare,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Settings,
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

const channels = [
  {
    name: "微信公众号",
    icon: "💬",
    status: "healthy",
    sends: 12450,
    openRate: 71.2,
    failRate: 0.8,
    color: "#10b981",
    followers: "23.4万",
  },
  {
    name: "企业微信",
    icon: "🏢",
    status: "healthy",
    sends: 5680,
    openRate: 84.5,
    failRate: 0.3,
    color: "#6366f1",
    followers: "1.2万",
  },
  {
    name: "短信",
    icon: "📱",
    status: "warning",
    sends: 8920,
    openRate: 45.8,
    failRate: 3.2,
    color: "#f59e0b",
    followers: "-",
  },
  {
    name: "小程序",
    icon: "📲",
    status: "healthy",
    sends: 4230,
    openRate: 62.3,
    failRate: 1.1,
    color: "#0891b2",
    followers: "8.7万",
  },
  {
    name: "APP消息",
    icon: "📱",
    status: "offline",
    sends: 320,
    openRate: 22.1,
    failRate: 12.4,
    color: "#dc2626",
    followers: "0.3万",
  },
];

const channelTrend = [
  { date: "06/07", 微信: 1850, 短信: 1230, 企业微信: 680, 小程序: 520 },
  { date: "06/08", 微信: 2100, 短信: 1450, 企业微信: 720, 小程序: 640 },
  { date: "06/09", 微信: 1680, 短信: 980, 企业微信: 560, 小程序: 420 },
  { date: "06/10", 微信: 2340, 短信: 1560, 企业微信: 890, 小程序: 780 },
  { date: "06/11", 微信: 2180, 短信: 1320, 企业微信: 760, 小程序: 590 },
  { date: "06/12", 微信: 2560, 短信: 1780, 企业微信: 980, 小程序: 820 },
];

const templates = [
  { name: "复诊提醒模板", channel: "微信公众号", status: "active", uses: 891 },
  { name: "出院随访短信", channel: "短信", status: "active", uses: 342 },
  { name: "慢病关怀消息", channel: "企业微信", status: "active", uses: 156 },
  { name: "健康宣教推文", channel: "微信公众号", status: "draft", uses: 0 },
  { name: "检查提醒通知", channel: "小程序", status: "active", uses: 234 },
];

const statusStyle: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  healthy: { label: "正常", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  warning: { label: "警告", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  offline: { label: "离线", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
};

export default function MessageChannels() {
  return (
    <div className="p-6 space-y-5 fade-in">
      {/* Channel Cards */}
      <div className="grid grid-cols-5 gap-4">
        {channels.map((ch) => {
          const s = statusStyle[ch.status];
          return (
            <div key={ch.name} className="metric-card p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{ch.icon}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: s.bg, color: s.color }}
                >
                  {s.label}
                </span>
              </div>
              <div className="text-sm font-semibold text-white mb-1">
                {ch.name}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">今日发送</span>
                  <span className="font-medium" style={{ color: ch.color }}>
                    {ch.sends.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">打开率</span>
                  <span className="text-emerald-400">{ch.openRate}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">失败率</span>
                  <span
                    style={{ color: ch.failRate > 3 ? "#ef4444" : "#64748b" }}
                  >
                    {ch.failRate}%
                  </span>
                </div>
              </div>
              <div className="mt-3 progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${ch.openRate}%`, background: ch.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Channel Trend */}
        <div className="col-span-2 glass-card p-5">
          <div className="section-header">
            <TrendingUp size={16} className="text-indigo-400" />
            <span className="section-title">渠道推送量趋势（近7日）</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={channelTrend}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(71,85,105,0.2)"
              />
              <XAxis
                dataKey="date"
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
                  background: "#ffffff",
                  border: "1px solid #334155",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="微信"
                fill="#10b981"
                radius={[2, 2, 0, 0]}
                stackId="a"
              />
              <Bar
                dataKey="短信"
                fill="#f59e0b"
                radius={[0, 0, 0, 0]}
                stackId="a"
              />
              <Bar dataKey="企业微信" fill="#6366f1" stackId="a" />
              <Bar
                dataKey="小程序"
                fill="#0891b2"
                radius={[2, 2, 0, 0]}
                stackId="a"
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-2">
            {[
              ["微信", "#10b981"],
              ["短信", "#f59e0b"],
              ["企业微信", "#6366f1"],
              ["小程序", "#0891b2"],
            ].map(([n, c]) => (
              <div key={n} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: c }} />
                <span className="text-xs text-slate-400">{n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Health */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <div className="section-header">
              <AlertCircle size={16} className="text-yellow-400" />
              <span className="section-title">渠道健康监控</span>
            </div>
            <div className="space-y-3">
              {channels.map((ch) => {
                const s = statusStyle[ch.status];
                return (
                  <div
                    key={ch.name}
                    className="flex items-center gap-3 py-2"
                    style={{ borderBottom: "1px solid rgba(71,85,105,0.15)" }}
                  >
                    <span className="text-base">{ch.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-300">
                          {ch.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: s.color,
                              boxShadow: `0 0 4px ${s.color}`,
                            }}
                          />
                          <span className="text-xs" style={{ color: s.color }}>
                            {s.label}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        失败率 {ch.failRate}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="section-header">
              <Settings size={16} className="text-slate-400" />
              <span className="section-title">渠道配置</span>
            </div>
            <div className="space-y-2">
              {[
                "微信公众号AppID",
                "企业微信CorpID",
                "短信签名",
                "小程序AppID",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between py-1.5"
                  style={{ borderBottom: "1px solid rgba(71,85,105,0.1)" }}
                >
                  <span className="text-xs text-slate-400">{item}</span>
                  <button className="text-xs text-indigo-400 hover:text-indigo-300">
                    配置
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Template Management */}
      <div className="glass-card overflow-hidden">
        <div
          className="p-4 flex items-center gap-3"
          style={{ borderBottom: "1px solid rgba(71,85,105,0.2)" }}
        >
          <MessageSquare size={16} className="text-indigo-400" />
          <span className="text-sm font-semibold text-(--medical-text)">
            消息模板管理
          </span>
          <button className="ml-auto btn-primary text-xs">+ 新建模板</button>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(71,85,105,0.2)" }}>
              {["模板名称", "适用渠道", "使用次数", "状态", "操作"].map((h) => (
                <th
                  key={h}
                  className="text-xs text-(--medical-text-muted) font-medium text-left px-4 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {templates.map((t, i) => (
              <tr
                key={i}
                className="table-row-hover"
                style={{ borderBottom: "1px solid rgba(71,85,105,0.1)" }}
              >
                <td className="px-4 py-3 text-sm font-medium text-(--medical-text)">
                  {t.name}
                </td>
                <td className="px-4 py-3">
                  <span className="tag-blue text-xs px-2 py-0.5 rounded">
                    {t.channel}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-(--medical-text-muted)">
                  {t.uses}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {t.status === "active" ? (
                      <CheckCircle size={12} className="text-emerald-400" />
                    ) : (
                      <AlertCircle size={12} className="text-slate-500" />
                    )}
                    <span
                      className="text-xs"
                      style={{
                        color: t.status === "active" ? "#10b981" : "#64748b",
                      }}
                    >
                      {t.status === "active" ? "启用" : "草稿"}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-xs text-indigo-400 hover:text-indigo-300">
                      编辑
                    </button>
                    <button className="text-xs text-slate-400 hover:text-slate-300">
                      预览
                    </button>
                    <button className="text-xs text-red-400 hover:text-red-300">
                      删除
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
