import { useState } from "react";
import {
  Zap,
  FileText,
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
  Edit3,
  Copy,
  Send,
  Star,
} from "lucide-react";

const contentList = [
  {
    id: 1,
    title: "高血压患者夏季用药注意事项",
    status: "approved",
    type: "健康宣教",
    dept: "心内科",
    tags: ["高血压", "夏季", "用药"],
    reads: 1240,
    createdAt: "2025-06-10",
    aiGenerated: true,
  },
  {
    id: 2,
    title: "糖尿病患者饮食控制指南",
    status: "pending",
    type: "慢病管理",
    dept: "内分泌科",
    tags: ["糖尿病", "饮食", "控糖"],
    reads: 0,
    createdAt: "2025-06-12",
    aiGenerated: true,
  },
  {
    id: 3,
    title: "术后康复期注意事项——骨科",
    status: "approved",
    type: "术后随访",
    dept: "骨科",
    tags: ["术后", "康复", "注意事项"],
    reads: 567,
    createdAt: "2025-06-08",
    aiGenerated: true,
  },
  {
    id: 4,
    title: "复诊提醒：您的心血管检查到期啦",
    status: "rejected",
    type: "复诊提醒",
    dept: "心内科",
    tags: ["复诊", "检查"],
    reads: 0,
    createdAt: "2025-06-11",
    aiGenerated: true,
  },
  {
    id: 5,
    title: "脑梗患者康复锻炼方法",
    status: "approved",
    type: "康复指导",
    dept: "神经科",
    tags: ["脑梗", "康复", "锻炼"],
    reads: 890,
    createdAt: "2025-06-05",
    aiGenerated: false,
  },
];

const templates = [
  {
    name: "高血压随访模板",
    scene: "慢病管理",
    lastUsed: "1天前",
    useCount: 234,
  },
  { name: "术后康复通知", scene: "术后随访", lastUsed: "3天前", useCount: 156 },
  { name: "复诊提醒模板", scene: "复诊召回", lastUsed: "今天", useCount: 891 },
  { name: "健康宣教通用", scene: "健康教育", lastUsed: "2天前", useCount: 342 },
];

const statusStyle: Record<
  string,
  { color: string; bg: string; label: string; icon: any }
> = {
  approved: {
    color: "var(--medical-success)",
    bg: "var(--medical-success-bg)",
    label: "已审核",
    icon: CheckCircle,
  },
  pending: {
    color: "var(--medical-warning)",
    bg: "var(--medical-warning-bg)",
    label: "待审核",
    icon: Clock,
  },
  rejected: {
    color: "var(--medical-danger)",
    bg: "var(--medical-danger-bg)",
    label: "已拒绝",
    icon: XCircle,
  },
};

const typeColors: Record<string, string> = {
  健康宣教: "tag-blue",
  慢病管理: "tag-purple",
  术后随访: "tag-green",
  复诊提醒: "tag-yellow",
  康复指导: "tag-gray",
};

export default function AIContent() {
  const [activeTab, setActiveTab] = useState<"generate" | "library">(
    "generate",
  );
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const tabActiveStyle = {
    background: "var(--medical-focus-ring)",
    color: "var(--medical-text)",
    border: "1px solid var(--medical-border-strong)",
  };
  const tabInactiveStyle = {
    background: "color-mix(in srgb, var(--medical-bg-soft) 75%, white)",
    color: "var(--medical-text-muted)",
    border: "1px solid var(--medical-border)",
  };
  const contentCardHighlightStyle = {
    border: "1px solid var(--medical-border-strong)",
  };
  const statValueColors = [
    "var(--medical-button)",
    "var(--medical-warning)",
    "var(--medical-success)",
    "var(--medical-button-dark)",
  ];

  const handleGenerate = () => {
    setGenerating(true);
    setGeneratedContent("");
    const content = `# 高血压患者夏季用药注意事项

亲爱的患者朋友，随着夏季气温升高，血压管理需要特别注意以下几点：

**1. 定时测量血压**
每日早晚各测量一次，记录在血压日记中。夏季血压普遍偏低，如出现头晕症状请立即测量。

**2. 用药注意事项**
• 不要擅自停药或减量，如血压持续低于 90/60mmHg 请联系医生
• 某些降压药在高温下效果会增强，注意观察身体反应
• 利尿剂患者需注意补充水分，避免脱水

**3. 生活方式建议**
• 避免在高温时段（10:00-16:00）进行剧烈运动
• 保证充足睡眠，每日7-8小时
• 清淡饮食，减少钠盐摄入

**4. 复诊提醒**
建议每月复诊一次，如有不适请随时联系我们。

*本内容由 AI 辅助生成，已经医生审核，仅供参考。*`;

    let i = 0;
    const timer = setInterval(() => {
      if (i < content.length) {
        setGeneratedContent(content.slice(0, i + 3));
        i += 3;
      } else {
        clearInterval(timer);
        setGenerating(false);
      }
    }, 20);
  };

  return (
    <div className="p-6 space-y-5 fade-in">
      {/* Tabs */}
      <div className="flex gap-2">
        {(["generate", "library"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
            style={activeTab === tab ? tabActiveStyle : tabInactiveStyle}
          >
            {tab === "generate" ? "🤖 AI生成内容" : "📚 内容知识库"}
          </button>
        ))}
      </div>

      {activeTab === "generate" ? (
        <div className="grid grid-cols-3 gap-5">
          {/* Left - Generator */}
          <div className="col-span-2 space-y-4">
            <div className="glass-card p-5">
              <div className="section-header">
                <Zap size={16} className="text-yellow-400" />
                <span className="section-title">AI内容生成器</span>
                <span className="ai-badge">大模型驱动</span>
              </div>

              {/* Context Inputs */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  {
                    label: "目标人群",
                    options: [
                      "高血压患者",
                      "糖尿病患者",
                      "术后患者",
                      "慢病患者",
                    ],
                  },
                  {
                    label: "内容类型",
                    options: ["健康宣教", "复诊提醒", "用药指导", "康复指导"],
                  },
                  {
                    label: "生命周期",
                    options: [
                      "慢病管理期",
                      "术后康复期",
                      "新患引导期",
                      "随访期",
                    ],
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <label
                      className="text-xs mb-1 block"
                      style={{ color: "var(--medical-text-muted)" }}
                    >
                      {item.label}
                    </label>
                    <select
                      className="input-field text-xs"
                      style={{ height: "34px" }}
                    >
                      {item.options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label
                  className="text-xs mb-1 block"
                  style={{ color: "var(--medical-text-muted)" }}
                >
                  生成提示词（Prompt）
                </label>
                <textarea
                  className="input-field text-sm resize-none"
                  rows={3}
                  placeholder="例如：生成一篇适合高血压患者的夏季用药注意事项，语言温和专业，包含具体操作建议..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              {/* Template Selector */}
              <div className="mb-4">
                <label
                  className="text-xs mb-2 block"
                  style={{ color: "var(--medical-text-muted)" }}
                >
                  选择系统模板
                </label>
                <div className="flex flex-wrap gap-2">
                  {templates.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => setSelectedTemplate(t.name)}
                      className="text-xs px-3 py-1.5 rounded-lg transition-all"
                      style={
                        selectedTemplate === t.name
                          ? tabActiveStyle
                          : tabInactiveStyle
                      }
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={generating}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                style={{ opacity: generating ? 0.7 : 1 }}
              >
                <Zap size={16} />
                {generating ? "AI生成中..." : "一键生成内容"}
              </button>
            </div>

            {/* Generated Content */}
            {(generatedContent || generating) && (
              <div className="glass-card p-5" style={contentCardHighlightStyle}>
                <div className="section-header">
                  <Edit3 size={16} style={{ color: "var(--medical-button)" }} />
                  <span className="section-title">生成内容</span>
                  {generating && (
                    <div
                      className="w-2 h-2 rounded-full pulse-dot"
                      style={{ background: "var(--medical-button)" }}
                    />
                  )}
                  <div className="ml-auto flex gap-2">
                    <button className="btn-secondary text-xs flex items-center gap-1.5">
                      <Copy size={12} />
                      复制
                    </button>
                    <button className="btn-primary text-xs flex items-center gap-1.5">
                      <Send size={12} />
                      提交审核
                    </button>
                  </div>
                </div>
                <div
                  className="p-4 rounded-xl text-sm leading-relaxed whitespace-pre-line"
                  style={{
                    color: "var(--medical-text)",
                    background:
                      "color-mix(in srgb, var(--medical-bg-soft) 78%, white)",
                    border: "1px solid var(--medical-border)",
                    minHeight: 200,
                    fontFamily: "monospace",
                    fontSize: 13,
                  }}
                >
                  {generatedContent}
                  {generating && (
                    <span
                      className="inline-block w-1 h-4 ml-0.5 animate-pulse"
                      style={{ background: "var(--medical-button)" }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right - Templates & Stats */}
          <div className="space-y-4">
            <div className="glass-card p-5">
              <div className="section-header">
                <BookOpen
                  size={16}
                  style={{ color: "var(--medical-button-dark)" }}
                />
                <span className="section-title">系统模板库</span>
              </div>
              <div className="space-y-3">
                {templates.map((t, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl cursor-pointer transition-all"
                    style={{
                      background:
                        "color-mix(in srgb, var(--medical-bg-soft) 78%, white)",
                      border: "1px solid var(--medical-border)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor =
                        "var(--medical-border-strong)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor =
                        "var(--medical-border)")
                    }
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--medical-text)" }}
                      >
                        {t.name}
                      </span>
                      <Star
                        size={12}
                        style={{ color: "var(--medical-button-dark)" }}
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className="text-xs"
                        style={{ color: "var(--medical-text-muted)" }}
                      >
                        场景：{t.scene}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--medical-text-muted)" }}
                      >
                        用了{t.useCount}次
                      </span>
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "var(--medical-text-muted)" }}
                    >
                      最近：{t.lastUsed}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <div className="section-header">
                <FileText
                  size={16}
                  style={{ color: "var(--medical-button-dark)" }}
                />
                <span className="section-title">内容统计</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "今日生成", value: "47 条" },
                  { label: "待审核", value: "23 条" },
                  { label: "已发布", value: "312 条" },
                  { label: "平均阅读率", value: "68.3%" },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2"
                    style={{ borderBottom: "1px solid var(--medical-border)" }}
                  >
                    <span
                      className="text-xs"
                      style={{ color: "var(--medical-text-muted)" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: statValueColors[index] }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Content Library */
        <div className="glass-card overflow-hidden">
          <div
            className="p-4 flex items-center gap-3"
            style={{ borderBottom: "1px solid var(--medical-border)" }}
          >
            <span
              className="text-sm font-medium"
              style={{ color: "var(--medical-text)" }}
            >
              内容列表
            </span>
            <div className="ml-auto flex gap-2">
              {["全部", "已审核", "待审核", "已拒绝"].map((f) => (
                <button
                  key={f}
                  className="text-xs px-2.5 py-1 rounded-lg"
                  style={f === "全部" ? tabActiveStyle : tabInactiveStyle}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--medical-border)" }}>
                {[
                  "内容标题",
                  "类型",
                  "科室",
                  "状态",
                  "阅读量",
                  "生成时间",
                  "操作",
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
              {contentList.map((item) => {
                const s = statusStyle[item.status];
                return (
                  <tr
                    key={item.id}
                    className="table-row-hover"
                    style={{ borderBottom: "1px solid var(--medical-border)" }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {item.aiGenerated && (
                          <span className="ai-badge text-xs">AI</span>
                        )}
                        <span
                          className="text-sm max-w-xs truncate"
                          style={{ color: "var(--medical-text)" }}
                        >
                          {item.title}
                        </span>
                      </div>
                      <div className="flex gap-1 mt-1">
                        {item.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="tag-blue text-xs px-1.5 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`${typeColors[item.type] || "tag-gray"} text-xs px-2 py-0.5 rounded`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--medical-text-muted)" }}
                    >
                      {item.dept}
                    </td>
                    <td className="px-4 py-3">
                      <div
                        className="flex items-center gap-1.5 px-2 py-1 rounded-lg w-fit"
                        style={{ background: s.bg, color: s.color }}
                      >
                        <s.icon size={11} />
                        <span className="text-xs">{s.label}</span>
                      </div>
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--medical-text-muted)" }}
                    >
                      {item.reads.toLocaleString()}
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--medical-text-muted)" }}
                    >
                      {item.createdAt}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          className="text-xs"
                          style={{ color: "var(--medical-button-dark)" }}
                        >
                          编辑
                        </button>
                        <button
                          className="text-xs"
                          style={{ color: "var(--medical-text-muted)" }}
                        >
                          复制
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
