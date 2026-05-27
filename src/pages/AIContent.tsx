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
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    label: "已审核",
    icon: CheckCircle,
  },
  pending: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    label: "待审核",
    icon: Clock,
  },
  rejected: {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
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
            style={{
              background:
                activeTab === tab
                  ? "rgba(99,102,241,0.2)"
                  : "rgba(71,85,105,0.2)",
              color: activeTab === tab ? "#a5b4fc" : "#64748b",
              border: `1px solid ${activeTab === tab ? "rgba(99,102,241,0.4)" : "rgba(71,85,105,0.3)"}`,
            }}
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
                    <label className="text-xs text-slate-400 mb-1 block">
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
                <label className="text-xs text-slate-400 mb-1 block">
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
                <label className="text-xs text-slate-400 mb-2 block">
                  选择Prompt模板
                </label>
                <div className="flex flex-wrap gap-2">
                  {templates.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => setSelectedTemplate(t.name)}
                      className="text-xs px-3 py-1.5 rounded-lg transition-all"
                      style={{
                        background:
                          selectedTemplate === t.name
                            ? "rgba(99,102,241,0.2)"
                            : "rgba(71,85,105,0.15)",
                        color:
                          selectedTemplate === t.name ? "#a5b4fc" : "#64748b",
                        border: `1px solid ${selectedTemplate === t.name ? "rgba(99,102,241,0.4)" : "rgba(71,85,105,0.3)"}`,
                      }}
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
                {generating ? "AI生成中..." : "🚀 一键生成内容"}
              </button>
            </div>

            {/* Generated Content */}
            {(generatedContent || generating) && (
              <div
                className="glass-card p-5"
                style={{ border: "1px solid rgba(99,102,241,0.3)" }}
              >
                <div className="section-header">
                  <Edit3 size={16} className="text-indigo-400" />
                  <span className="section-title">生成内容</span>
                  {generating && (
                    <div
                      className="w-2 h-2 rounded-full pulse-dot"
                      style={{ background: "#6366f1" }}
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
                  className="p-4 rounded-xl text-sm text-slate-300 leading-relaxed whitespace-pre-line"
                  style={{
                    background: "rgba(15,23,42,0.6)",
                    minHeight: 200,
                    fontFamily: "monospace",
                    fontSize: 13,
                  }}
                >
                  {generatedContent}
                  {generating && (
                    <span className="inline-block w-1 h-4 bg-indigo-400 ml-0.5 animate-pulse" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right - Templates & Stats */}
          <div className="space-y-4">
            <div className="glass-card p-5">
              <div className="section-header">
                <BookOpen size={16} className="text-cyan-400" />
                <span className="section-title">Prompt模板库</span>
              </div>
              <div className="space-y-3">
                {templates.map((t, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl cursor-pointer transition-all"
                    style={{
                      background: "rgba(15,23,42,0.6)",
                      border: "1px solid rgba(71,85,105,0.2)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(99,102,241,0.4)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(71,85,105,0.2)")
                    }
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-200">
                        {t.name}
                      </span>
                      <Star size={12} className="text-yellow-400" />
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-500">
                        场景：{t.scene}
                      </span>
                      <span className="text-xs text-slate-500">
                        用了{t.useCount}次
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      最近：{t.lastUsed}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <div className="section-header">
                <FileText size={16} className="text-emerald-400" />
                <span className="section-title">内容统计</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "今日生成", value: "47 条", color: "#6366f1" },
                  { label: "待审核", value: "23 条", color: "#f59e0b" },
                  { label: "已发布", value: "312 条", color: "#10b981" },
                  { label: "平均阅读率", value: "68.3%", color: "#0891b2" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2"
                    style={{ borderBottom: "1px solid rgba(71,85,105,0.15)" }}
                  >
                    <span className="text-xs text-slate-400">{item.label}</span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: item.color }}
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
            style={{ borderBottom: "1px solid rgba(71,85,105,0.2)" }}
          >
            <span className="text-sm font-medium text-slate-300">内容列表</span>
            <div className="ml-auto flex gap-2">
              {["全部", "已审核", "待审核", "已拒绝"].map((f) => (
                <button
                  key={f}
                  className="text-xs px-2.5 py-1 rounded-lg"
                  style={{
                    background:
                      f === "全部"
                        ? "rgba(99,102,241,0.2)"
                        : "rgba(71,85,105,0.15)",
                    color: f === "全部" ? "#a5b4fc" : "#64748b",
                    border: `1px solid ${f === "全部" ? "rgba(99,102,241,0.3)" : "rgba(71,85,105,0.2)"}`,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(71,85,105,0.2)" }}>
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
                    className="text-xs text-slate-500 font-medium text-left px-4 py-3"
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
                    style={{ borderBottom: "1px solid rgba(71,85,105,0.1)" }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {item.aiGenerated && (
                          <span className="ai-badge text-xs">AI</span>
                        )}
                        <span className="text-sm text-slate-200 max-w-xs truncate">
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
                    <td className="px-4 py-3 text-xs text-slate-400">
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
                    <td className="px-4 py-3 text-xs text-slate-400">
                      {item.reads.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {item.createdAt}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-xs text-indigo-400 hover:text-indigo-300">
                          编辑
                        </button>
                        <button className="text-xs text-slate-400 hover:text-slate-300">
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
