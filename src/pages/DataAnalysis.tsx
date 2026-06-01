import { BarChart2, TrendingUp, Target, Zap, Users } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const visitRateData = [
  { month: "1月", 复诊率: 28.5, 目标: 35 },
  { month: "2月", 复诊率: 30.2, 目标: 35 },
  { month: "3月", 复诊率: 32.1, 目标: 35 },
  { month: "4月", 复诊率: 31.8, 目标: 35 },
  { month: "5月", 复诊率: 33.4, 目标: 35 },
  { month: "6月", 复诊率: 34.2, 目标: 35 },
];

const channelData = [
  { name: "微信公众号", value: 45, color: "var(--medical-blue-600)" },
  { name: "短信", value: 28, color: "var(--medical-blue-500)" },
  { name: "企业微信", value: 17, color: "var(--medical-blue-400)" },
  { name: "小程序", value: 10, color: "var(--medical-blue-300)" },
];

const contentData = [
  { title: "高血压用药指南", reads: 2340, openRate: 78, conversion: 34 },
  { title: "复诊提醒消息", reads: 1890, openRate: 71, conversion: 56 },
  { title: "糖尿病饮食指导", reads: 1450, openRate: 65, conversion: 28 },
  { title: "术后康复提醒", reads: 1120, openRate: 84, conversion: 62 },
  { title: "健康检查通知", reads: 980, openRate: 69, conversion: 45 },
];

const deptAnalysis = [
  {
    dept: "心内科",
    patients: 1280,
    pushRate: 94,
    visitRate: 38.2,
    compliance: 72,
  },
  {
    dept: "内分泌科",
    patients: 980,
    pushRate: 91,
    visitRate: 34.5,
    compliance: 68,
  },
  {
    dept: "肿瘤科",
    patients: 756,
    pushRate: 88,
    visitRate: 31.2,
    compliance: 75,
  },
  {
    dept: "骨科",
    patients: 890,
    pushRate: 85,
    visitRate: 28.9,
    compliance: 81,
  },
  {
    dept: "神经科",
    patients: 640,
    pushRate: 82,
    visitRate: 26.4,
    compliance: 65,
  },
];

const hourlyData = [
  { hour: "8时", 打开率: 42 },
  { hour: "9时", 打开率: 58 },
  { hour: "10时", 打开率: 74 },
  { hour: "11时", 打开率: 68 },
  { hour: "12时", 打开率: 45 },
  { hour: "13时", 打开率: 38 },
  { hour: "14时", 打开率: 62 },
  { hour: "15时", 打开率: 71 },
  { hour: "16时", 打开率: 65 },
  { hour: "17时", 打开率: 56 },
  { hour: "18时", 打开率: 48 },
  { hour: "19时", 打开率: 52 },
  { hour: "20时", 打开率: 61 },
  { hour: "21时", 打开率: 44 },
];

const chartAxisTick = { fill: "var(--medical-text-muted)", fontSize: 11 };
const tooltipStyle = {
  background: "var(--medical-bg-card)",
  border: "1px solid var(--medical-border)",
  borderRadius: 8,
  fontSize: 12,
  color: "var(--medical-text)",
};

export default function DataAnalysis() {
  return (
    <div className="p-6 space-y-5 fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "本月复诊率",
            value: "34.2%",
            change: "+2.8% vs上月",
            color: "var(--medical-blue-600)",
            target: "目标 35%",
          },
          {
            label: "推送总量",
            value: "38,420",
            change: "+12.3% vs上月",
            color: "var(--medical-blue-500)",
            target: "月度累计",
          },
          {
            label: "平均打开率",
            value: "68.2%",
            change: "+4.1% vs上月",
            color: "var(--medical-blue-400)",
            target: "行业均值 52%",
          },
          {
            label: "慢病依从率",
            value: "71.5%",
            change: "+3.2% vs上月",
            color: "var(--medical-blue-700)",
            target: "目标 75%",
          },
        ].map((item) => (
          <div key={item.label} className="metric-card p-5">
            <div
              className="text-xs mb-1"
              style={{ color: "var(--medical-text-muted)" }}
            >
              {item.label}
            </div>
            <div
              className="text-3xl font-bold mb-1"
              style={{ color: "var(--medical-text)" }}
            >
              {item.value}
            </div>
            <div className="text-xs font-medium" style={{ color: item.color }}>
              {item.change}
            </div>
            <div
              className="text-xs mt-0.5"
              style={{ color: "var(--medical-text-muted)" }}
            >
              {item.target}
            </div>
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-3 gap-5">
        {/* Visit Rate Trend */}
        <div className="col-span-2 glass-card p-5">
          <div className="section-header">
            <TrendingUp
              size={16}
              style={{ color: "var(--medical-blue-500)" }}
            />
            <span className="section-title">复诊率趋势分析</span>
            <span className="ai-badge">AI预测</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={visitRateData}>
              <defs>
                <linearGradient id="gvisit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--medical-border)"
              />
              <XAxis
                dataKey="month"
                tick={chartAxisTick}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={chartAxisTick}
                axisLine={false}
                tickLine={false}
                domain={[25, 40]}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="复诊率"
                stroke="#6366f1"
                fill="url(#gvisit)"
                strokeWidth={2}
                dot={{ fill: "#6366f1", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="目标"
                stroke="#dc2626"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div
            className="mt-3 p-3 rounded-lg"
            style={{
              background: "var(--medical-focus-ring)",
              border: "1px solid var(--medical-border)",
            }}
          >
            <div className="flex items-center gap-2">
              <Zap size={12} style={{ color: "var(--medical-blue-500)" }} />
              <span
                className="text-xs"
                style={{ color: "var(--medical-text-muted)" }}
              >
                AI预测：下月复诊率预计达{" "}
                <span
                  className="font-bold"
                  style={{ color: "var(--medical-blue-600)" }}
                >
                  35.8%
                </span>
                ，有望首次达成月度目标
              </span>
            </div>
          </div>
        </div>

        {/* Channel Distribution */}
        <div className="glass-card p-5">
          <div className="section-header">
            <BarChart2 size={16} style={{ color: "var(--medical-blue-500)" }} />
            <span className="section-title">渠道转化分布</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={3}
                dataKey="value"
              >
                {channelData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: any) => [`${v}%`, "占比"]}
                contentStyle={tooltipStyle}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {channelData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: item.color }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: "var(--medical-text-muted)" }}
                  >
                    {item.name}
                  </span>
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--medical-text)" }}
                >
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-2 gap-5">
        {/* Best Send Time */}
        <div className="glass-card p-5">
          <div className="section-header">
            <Target size={16} style={{ color: "var(--medical-blue-500)" }} />
            <span className="section-title">最佳推送时段分析</span>
            <span className="ai-badge">AI分析</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={hourlyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--medical-border)"
              />
              <XAxis
                dataKey="hour"
                tick={{ fill: "var(--medical-text-muted)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--medical-text-muted)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={{ ...tooltipStyle, fontSize: 11 }} />
              <Bar
                dataKey="打开率"
                fill="var(--medical-blue-500)"
                radius={[3, 3, 0, 0]}
                label={false}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              {
                label: "最佳时段",
                value: "10:00-11:00",
                color: "var(--medical-blue-500)",
              },
              {
                label: "次佳时段",
                value: "15:00-16:00",
                color: "var(--medical-blue-600)",
              },
              {
                label: "避开时段",
                value: "13:00-14:00",
                color: "var(--medical-blue-700)",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center p-2 rounded-lg"
                style={{
                  background:
                    "color-mix(in srgb, var(--medical-bg-soft) 80%, transparent)",
                  border: "1px solid var(--medical-border)",
                }}
              >
                <div
                  className="text-xs"
                  style={{ color: "var(--medical-text-muted)" }}
                >
                  {item.label}
                </div>
                <div
                  className="text-xs font-bold mt-0.5"
                  style={{ color: item.color }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Performance */}
        <div className="glass-card p-5">
          <div className="section-header">
            <Users size={16} style={{ color: "var(--medical-blue-500)" }} />
            <span className="section-title">高价值内容排行</span>
          </div>
          <div className="space-y-3">
            {contentData.map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-xl"
                style={{
                  background:
                    "color-mix(in srgb, var(--medical-bg-soft) 82%, transparent)",
                  border: "1px solid var(--medical-border)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          i < 3
                            ? "color-mix(in srgb, var(--medical-blue-500) 18%, transparent)"
                            : "var(--medical-focus-ring)",
                        color:
                          i < 3
                            ? "var(--medical-blue-600)"
                            : "var(--medical-text-muted)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--medical-text)" }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: "var(--medical-text-muted)" }}
                  >
                    {item.reads.toLocaleString()} 阅读
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 flex-1">
                    <span
                      className="text-xs w-10"
                      style={{ color: "var(--medical-text-muted)" }}
                    >
                      打开率
                    </span>
                    <div className="flex-1 progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${item.openRate}%`,
                          background: "var(--medical-blue-500)",
                        }}
                      />
                    </div>
                    <span
                      className="text-xs w-8 text-right"
                      style={{ color: "var(--medical-blue-600)" }}
                    >
                      {item.openRate}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <span
                      className="text-xs w-10"
                      style={{ color: "var(--medical-text-muted)" }}
                    >
                      转化率
                    </span>
                    <div className="flex-1 progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${item.conversion}%`,
                          background: "#10b981",
                        }}
                      />
                    </div>
                    <span
                      className="text-xs w-8 text-right"
                      style={{ color: "#059669" }}
                    >
                      {item.conversion}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dept Analysis */}
      <div className="glass-card overflow-hidden">
        <div
          className="p-4"
          style={{ borderBottom: "1px solid var(--medical-border)" }}
        >
          <div className="flex items-center gap-2">
            <BarChart2 size={16} style={{ color: "var(--medical-blue-500)" }} />
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--medical-text)" }}
            >
              科室运营数据分析
            </span>
          </div>
        </div>
        <table className="w-full">
          <thead style={{ background: "var(--medical-bg-soft)" }}>
            <tr style={{ borderBottom: "1px solid var(--medical-border)" }}>
              {[
                "科室",
                "患者总数",
                "推送覆盖率",
                "复诊率",
                "慢病依从率",
                "综合评分",
                "趋势",
              ].map((h) => (
                <th
                  key={h}
                  className="text-xs font-medium text-left px-4 py-3"
                  style={{ color: "var(--medical-text-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {deptAnalysis.map((dept, i) => {
              const score = Math.round(
                (dept.pushRate + dept.visitRate * 2 + dept.compliance) / 4,
              );
              return (
                <tr
                  key={i}
                  className="table-row-hover"
                  style={{ borderBottom: "1px solid var(--medical-border)" }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {i < 3 && (
                        <span
                          className="text-xs font-bold"
                          style={{ color: "#f59e0b" }}
                        >
                          {"⭐".repeat(3 - i)}
                        </span>
                      )}
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--medical-text)" }}
                      >
                        {dept.dept}
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-4 py-3 text-sm"
                    style={{ color: "var(--medical-text-muted)" }}
                  >
                    {dept.patients.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${dept.pushRate}%`,
                            background: "var(--medical-blue-500)",
                          }}
                        />
                      </div>
                      <span
                        className="text-xs"
                        style={{ color: "var(--medical-text-muted)" }}
                      >
                        {dept.pushRate}%
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-4 py-3 text-sm font-medium"
                    style={{
                      color: dept.visitRate > 33 ? "#10b981" : "#d97706",
                    }}
                  >
                    {dept.visitRate}%
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${dept.compliance}%`,
                            background: "var(--medical-blue-400)",
                          }}
                        />
                      </div>
                      <span
                        className="text-xs"
                        style={{ color: "var(--medical-text-muted)" }}
                      >
                        {dept.compliance}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-sm font-bold"
                      style={{ color: score > 60 ? "#10b981" : "#d97706" }}
                    >
                      {score}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 text-xs"
                    style={{ color: "#059669" }}
                  >
                    ↑ 上升
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
