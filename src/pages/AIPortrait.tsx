import { useState } from "react";
import {
  Brain,
  Tag,
  Activity,
  TrendingUp,
  AlertTriangle,
  Target,
  Zap,
  RefreshCw,
} from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const radarData = [
  { subject: "依从性", A: 62, fullMark: 100 },
  { subject: "活跃度", A: 45, fullMark: 100 },
  { subject: "风险控制", A: 38, fullMark: 100 },
  { subject: "复诊率", A: 71, fullMark: 100 },
  { subject: "满意度", A: 85, fullMark: 100 },
  { subject: "慢病管理", A: 55, fullMark: 100 },
];

const healthTrend = [
  { month: "1月", 血压: 145, 血糖: 7.8, 依从性: 72 },
  { month: "2月", 血压: 138, 血糖: 7.2, 依从性: 78 },
  { month: "3月", 血压: 142, 血糖: 7.5, 依从性: 65 },
  { month: "4月", 血压: 151, 血糖: 8.1, 依从性: 58 },
  { month: "5月", 血压: 147, 血糖: 7.9, 依从性: 52 },
  { month: "6月", 血压: 155, 血糖: 8.3, 依从性: 45 },
];

const aiTags = [
  {
    label: "高风险失访患者",
    color: "#dc2626",
    bg: "rgba(220,38,38,0.1)",
    border: "rgba(220,38,38,0.3)",
    icon: "🔴",
    confidence: 94,
  },
  {
    label: "慢病依从性下降",
    color: "#d97706",
    bg: "rgba(217,119,6,0.1)",
    border: "rgba(217,119,6,0.3)",
    icon: "⚠️",
    confidence: 87,
  },
  {
    label: "适合复诊召回",
    color: "var(--medical-blue-600)",
    bg: "var(--medical-focus-ring)",
    border: "rgba(14,165,233,0.3)",
    icon: "🎯",
    confidence: 82,
  },
  {
    label: "血压控制不稳定",
    color: "#dc2626",
    bg: "rgba(220,38,38,0.1)",
    border: "rgba(220,38,38,0.3)",
    icon: "📊",
    confidence: 91,
  },
  {
    label: "用药依从度低",
    color: "#d97706",
    bg: "rgba(217,119,6,0.1)",
    border: "rgba(217,119,6,0.3)",
    icon: "💊",
    confidence: 76,
  },
  {
    label: "家庭支持不足",
    color: "var(--medical-text-muted)",
    bg: "var(--medical-focus-ring)",
    border: "var(--medical-border)",
    icon: "👨‍👩‍👧",
    confidence: 63,
  },
];

const basicTags = ["高血压", "2型糖尿病", "62岁", "男性", "心内科", "医保患者"];
const behaviorTags = [
  "常在工作日就诊",
  "偏好微信消息",
  "上午阅读活跃",
  "偶尔忽略提醒",
];
const lifecycleTags = ["慢病长期管理", "建档3年", "高频复诊", "科室熟客"];

const patients = ["张建国", "李秀英", "王大明", "陈美华", "刘志远"];

const THEME = {
  primary: "var(--medical-blue-500)",
  primaryStrong: "var(--medical-blue-600)",
  primarySoft: "var(--medical-blue-300)",
  text: "var(--medical-text)",
  textMuted: "var(--medical-text-muted)",
  border: "var(--medical-border)",
  borderStrong: "var(--medical-border-strong)",
  focusRing: "var(--medical-focus-ring)",
};

export default function AIPortrait() {
  const [selectedPatient, setSelectedPatient] = useState("张建国");

  return (
    <div className="p-6 space-y-5 fade-in">
      {/* Patient Selector + AI Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${THEME.primaryStrong}, ${THEME.primary})`,
            }}
          >
            {selectedPatient[0]}
          </div>
          <select
            className="input-field text-sm"
            style={{ width: 180 }}
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            {patients.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{
              background: THEME.focusRing,
              border: `1px solid ${THEME.borderStrong}`,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full pulse-dot"
              style={{ background: "#10b981" }}
            />
            <span className="text-xs" style={{ color: THEME.primaryStrong }}>
              AI实时分析中
            </span>
          </div>
        </div>
        <button className="btn-secondary flex items-center gap-2 text-xs">
          <RefreshCw size={13} />
          刷新画像
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-5">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Risk Scores */}
          <div className="glass-card p-5">
            <div className="section-header">
              <Target size={16} style={{ color: THEME.primaryStrong }} />
              <span className="section-title">运营评分</span>
            </div>
            <div className="space-y-3">
              {[
                {
                  label: "风险评分",
                  score: 78,
                  color: "#dc2626",
                  desc: "高风险",
                },
                {
                  label: "依从性评分",
                  score: 45,
                  color: "#d97706",
                  desc: "较低",
                },
                {
                  label: "复诊概率",
                  score: 32,
                  color: "#d97706",
                  desc: "偏低",
                },
                {
                  label: "患者活跃度",
                  score: 61,
                  color: "var(--medical-blue-600)",
                  desc: "中等",
                },
                {
                  label: "满意度评分",
                  score: 85,
                  color: "#059669",
                  desc: "良好",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs" style={{ color: THEME.textMuted }}>
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: THEME.textMuted }}>
                        {item.desc}
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: item.color }}
                      >
                        {item.score}
                      </span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${item.score}%`,
                        background: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lifecycle Stage */}
          <div className="glass-card p-5">
            <div className="section-header">
              <Activity size={16} style={{ color: THEME.primary }} />
              <span className="section-title">生命周期阶段</span>
            </div>
            <div className="space-y-2">
              {[
                "新患者入组",
                "急性期治疗",
                "慢病长期管理",
                "康复期",
                "健康维护",
              ].map((stage, i) => (
                <div key={stage} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background:
                        i === 2
                          ? THEME.focusRing
                          : "rgba(100, 116, 139, 0.12)",
                      border: `2px solid ${i === 2 ? THEME.primary : i < 2 ? "#059669" : THEME.borderStrong}`,
                      color:
                        i === 2 ? THEME.primaryStrong : i < 2 ? "#10b981" : THEME.textMuted,
                    }}
                  >
                    {i < 2 ? "✓" : i === 2 ? "●" : i + 1}
                  </div>
                  <span
                    className="text-xs"
                    style={{
                      color:
                        i === 2 ? THEME.primaryStrong : i < 2 ? "#10b981" : THEME.textMuted,
                    }}
                  >
                    {stage}
                    {i === 2 && (
                      <span className="ml-1" style={{ color: THEME.primary }}>
                        ← 当前
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column - Radar + Tags */}
        <div className="space-y-4">
          {/* Radar */}
          <div className="glass-card p-5">
            <div className="section-header">
              <Brain size={16} style={{ color: THEME.primary }} />
              <span className="section-title">患者画像雷达图</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={THEME.borderStrong} />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: THEME.textMuted, fontSize: 11 }}
                />
                <Radar
                  name="患者"
                  dataKey="A"
                  stroke={THEME.primary}
                  fill={THEME.primary}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* AI Tags */}
          <div className="glass-card p-5">
            <div className="section-header">
              <Zap size={16} style={{ color: THEME.primaryStrong }} />
              <span className="section-title">AI推理标签</span>
              <span className="ai-badge">实时更新</span>
            </div>
            <div className="space-y-2">
              {aiTags.map((tag, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-lg"
                  style={{
                    background: tag.bg,
                    border: `1px solid ${tag.border}`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{tag.icon}</span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: tag.color }}
                    >
                      {tag.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs" style={{ color: THEME.textMuted }}>
                      置信度
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: tag.color }}
                    >
                      {tag.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Tag Groups */}
          <div className="glass-card p-5">
            <div className="section-header">
              <Tag size={16} style={{ color: THEME.primary }} />
              <span className="section-title">标签体系</span>
            </div>
            <div className="space-y-4">
              <div>
                <p
                  className="text-xs font-medium mb-2 flex items-center gap-1"
                  style={{ color: THEME.textMuted }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ background: THEME.primary }}
                  />
                  基础标签
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {basicTags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-blue text-xs px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p
                  className="text-xs font-medium mb-2 flex items-center gap-1"
                  style={{ color: THEME.textMuted }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ background: THEME.primaryStrong }}
                  />
                  行为标签
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {behaviorTags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-purple text-xs px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p
                  className="text-xs font-medium mb-2 flex items-center gap-1"
                  style={{ color: THEME.textMuted }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  生命周期标签
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {lifecycleTags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-green text-xs px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Health Trend */}
          <div className="glass-card p-5">
            <div className="section-header">
              <TrendingUp size={16} style={{ color: THEME.primaryStrong }} />
              <span className="section-title">健康趋势分析</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={healthTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={THEME.border}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: THEME.textMuted, fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: THEME.textMuted, fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255, 255, 255, 0.96)",
                    border: `1px solid ${THEME.borderStrong}`,
                    borderRadius: 8,
                    fontSize: 11,
                    color: THEME.text,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="依从性"
                  stroke={THEME.primary}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="血糖"
                  stroke="#dc2626"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 mt-2">
              {[
                ["依从性", THEME.primary],
                ["血糖趋势", "#dc2626"],
              ].map(([name, color]) => (
                <div key={name} className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-0.5 rounded"
                    style={{ background: color }}
                  />
                  <span className="text-xs" style={{ color: THEME.textMuted }}>
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendation */}
          <div
            className="glass-card p-5"
            style={{
              background: THEME.focusRing,
              border: `1px solid ${THEME.borderStrong}`,
            }}
          >
            <div className="section-header">
              <AlertTriangle size={16} style={{ color: THEME.primaryStrong }} />
              <span className="section-title">AI干预建议</span>
            </div>
            <div className="space-y-2">
              {[
                "立即触发电话随访，了解近期用药情况",
                "推送个性化高血压管理内容包",
                "建议安排下周门诊复诊提醒",
                "启动慢病依从性干预自动化流程",
              ].map((rec, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs"
                  style={{ color: THEME.textMuted }}
                >
                  <span
                    className="font-bold shrink-0"
                    style={{ color: THEME.primaryStrong }}
                  >
                    {i + 1}.
                  </span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
