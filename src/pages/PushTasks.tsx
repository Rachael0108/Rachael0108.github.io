import { useState } from "react";
import {
  Plus,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Users,
  FileText,
  Zap,
} from "lucide-react";

const tasks = [
  {
    id: "T001",
    name: "心内科高血压患者复诊提醒",
    type: "复诊提醒",
    status: "running",
    target: 312,
    sent: 285,
    opened: 198,
    channel: "微信公众号",
    time: "2025-06-12 10:00",
    createdBy: "AI推荐",
  },
  {
    id: "T002",
    name: "糖尿病患者夏季用药宣教",
    type: "健康宣教",
    status: "pending",
    target: 127,
    sent: 0,
    opened: 0,
    channel: "短信+微信",
    time: "2025-06-14 09:00",
    createdBy: "运营人员",
  },
  {
    id: "T003",
    name: "骨科术后7天随访",
    type: "出院随访",
    status: "completed",
    target: 89,
    sent: 89,
    opened: 76,
    channel: "企业微信",
    time: "2025-06-10 14:00",
    createdBy: "自动化",
  },
  {
    id: "T004",
    name: "慢病患者依从性干预",
    type: "慢病管理",
    status: "failed",
    target: 63,
    sent: 31,
    opened: 18,
    channel: "短信",
    time: "2025-06-11 16:00",
    createdBy: "AI推荐",
  },
  {
    id: "T005",
    name: "新患者入院引导包",
    type: "健康宣教",
    status: "running",
    target: 456,
    sent: 320,
    opened: 240,
    channel: "小程序",
    time: "2025-06-12 08:00",
    createdBy: "运营人员",
  },
];

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; icon: any }
> = {
  running: {
    label: "推送中",
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    icon: Send,
  },
  pending: {
    label: "待推送",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    icon: Clock,
  },
  completed: {
    label: "已完成",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.1)",
    icon: CheckCircle,
  },
  failed: {
    label: "部分失败",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    icon: XCircle,
  },
};

const typeColors: Record<string, string> = {
  复诊提醒: "tag-blue",
  健康宣教: "tag-green",
  出院随访: "tag-purple",
  慢病管理: "tag-yellow",
};

const aiRecommended = [
  {
    title: "心内科高风险患者紧急随访",
    reason: "发现 48 名患者血压异常，建议立即干预",
    urgency: "紧急",
    count: 48,
  },
  {
    title: "糖尿病患者复诊黄金期触达",
    reason: "312 名患者进入复诊最佳时间窗",
    urgency: "建议",
    count: 312,
  },
  {
    title: "术后7天康复提醒推送",
    reason: "89 名患者明日进入术后第7天",
    urgency: "定时",
    count: 89,
  },
];

export default function PushTasks() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="p-6 space-y-5 fade-in">
      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "今日推送量", value: "1,847", color: "#6366f1", icon: Send },
          { label: "进行中任务", value: "8", color: "#10b981", icon: Clock },
          {
            label: "平均打开率",
            value: "68.2%",
            color: "#0891b2",
            icon: CheckCircle,
          },
          {
            label: "推送失败率",
            value: "2.1%",
            color: "#dc2626",
            icon: AlertCircle,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="metric-card p-4 flex items-center gap-4"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${item.color}20` }}
            >
              <item.icon size={18} style={{ color: item.color }} />
            </div>
            <div>
              <p
                className="text-xs"
                style={{ color: "var(--medical-text-muted)" }}
              >
                {item.label}
              </p>
              <p
                className="text-xl font-bold"
                style={{ color: "var(--medical-text)" }}
              >
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommended */}
      <div className="glass-card p-5">
        <div className="section-header">
          <Zap size={16} className="text-yellow-400" />
          <span className="section-title">AI推荐推送任务</span>
          <span className="ai-badge">智能推荐</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {aiRecommended.map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl"
              style={{
                background: "var(--medical-focus-ring)",
                border: "1px solid var(--medical-border)",
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--medical-text)" }}
                >
                  {item.title}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full ml-2 shrink-0"
                  style={{
                    background:
                      item.urgency === "紧急"
                        ? "var(--medical-danger-bg)"
                        : item.urgency === "建议"
                          ? "var(--medical-focus-ring)"
                          : "var(--medical-warning-bg)",
                    color:
                      item.urgency === "紧急"
                        ? "var(--medical-danger)"
                        : item.urgency === "建议"
                          ? "var(--medical-button-dark)"
                          : "var(--medical-warning)",
                  }}
                >
                  {item.urgency}
                </span>
              </div>
              <p
                className="text-xs mb-3"
                style={{ color: "var(--medical-text-muted)" }}
              >
                {item.reason}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className="text-xs"
                  style={{ color: "var(--medical-button-dark)" }}
                >
                  目标 {item.count} 人
                </span>
                <button className="btn-primary text-xs px-3 py-1.5">
                  立即创建
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="glass-card overflow-hidden">
        <div
          className="p-4 flex items-center gap-3"
          style={{ borderBottom: "1px solid var(--medical-border)" }}
        >
          <FileText size={16} style={{ color: "var(--medical-button)" }} />
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--medical-text)" }}
          >
            推送任务列表
          </span>
          <div className="ml-auto flex gap-2">
            {["全部", "推送中", "待推送", "已完成"].map((f) => (
              <button
                key={f}
                className="text-xs px-2.5 py-1 rounded-lg"
                style={{
                  background:
                    f === "全部"
                      ? "var(--medical-focus-ring)"
                      : "color-mix(in srgb, var(--medical-bg-soft) 70%, transparent)",
                  color:
                    f === "全部"
                      ? "var(--medical-button-dark)"
                      : "var(--medical-text-muted)",
                  border: `1px solid ${f === "全部" ? "var(--medical-border-strong)" : "var(--medical-border)"}`,
                }}
              >
                {f}
              </button>
            ))}
            <button
              onClick={() => setShowCreate(!showCreate)}
              className="btn-primary text-xs flex items-center gap-1.5 ml-2"
            >
              <Plus size={13} />
              新建任务
            </button>
          </div>
        </div>

        {showCreate && (
          <div
            className="p-5"
            style={{
              borderBottom: "1px solid var(--medical-border)",
              background:
                "color-mix(in srgb, var(--medical-bg-soft) 60%, transparent)",
            }}
          >
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label
                  className="text-xs mb-1 block"
                  style={{ color: "var(--medical-text-muted)" }}
                >
                  任务名称
                </label>
                <input
                  className="input-field text-sm px-2"
                  style={{ height: 34 }}
                  placeholder="输入任务名称"
                />
              </div>
              <div>
                <label
                  className="text-xs mb-1 block"
                  style={{ color: "var(--medical-text-muted)" }}
                >
                  推送类型
                </label>
                <select
                  className="input-field text-sm  px-2"
                  style={{ height: 34 }}
                >
                  {[
                    "复诊提醒",
                    "健康宣教",
                    "出院随访",
                    "慢病管理",
                    "检查提醒",
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="text-xs mb-1 block"
                  style={{ color: "var(--medical-text-muted)" }}
                >
                  推送渠道
                </label>
                <select
                  className="input-field text-sm  px-2"
                  style={{ height: 34 }}
                >
                  {[
                    "AI电话",
                    "微信公众号",
                    "短信",
                    "企业微信",
                    "小程序",
                    "全渠道",
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="text-xs mb-1 block"
                  style={{ color: "var(--medical-text-muted)" }}
                >
                  发送时间
                </label>
                <select
                  className="input-field text-sm  px-2"
                  style={{ height: 34 }}
                >
                  {["立即发送", "定时发送", "AI推荐时间"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{
                  background: "var(--medical-focus-ring)",
                  border: "1px solid var(--medical-border)",
                }}
              >
                <Users size={14} style={{ color: "var(--medical-button)" }} />
                <span
                  className="text-xs"
                  style={{ color: "var(--medical-button-dark)" }}
                >
                  已选人群：高血压未复诊30天 (312人)
                </span>
              </div>
              <div
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{
                  background: "var(--medical-focus-ring)",
                  border: "1px solid var(--medical-border)",
                }}
              >
                <Zap size={14} style={{ color: "var(--medical-button)" }} />
                <span
                  className="text-xs"
                  style={{ color: "var(--medical-button-dark)" }}
                >
                  AI推荐发送时间：明天 10:00
                </span>
              </div>
              <div className="ml-auto flex gap-2">
                <button
                  className="btn-secondary text-xs"
                  onClick={() => setShowCreate(false)}
                >
                  取消
                </button>
                <button className="btn-primary text-xs">提交审核</button>
              </div>
            </div>
          </div>
        )}

        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--medical-border)" }}>
              {[
                "任务名称",
                "类型",
                "状态",
                "目标/发送/打开",
                "渠道",
                "计划时间",
                "创建来源",
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
            {tasks.map((task) => {
              const s = statusConfig[task.status];
              const openRate =
                task.sent > 0 ? Math.round((task.opened / task.sent) * 100) : 0;
              return (
                <tr
                  key={task.id}
                  className="table-row-hover"
                  style={{ borderBottom: "1px solid var(--medical-border)" }}
                >
                  <td className="px-4 py-3">
                    <div
                      className="text-sm font-medium"
                      style={{ color: "var(--medical-text)" }}
                    >
                      {task.name}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "var(--medical-text-muted)" }}
                    >
                      {task.id}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`${typeColors[task.type] || "tag-gray"} text-xs px-2 py-0.5 rounded`}
                    >
                      {task.type}
                    </span>
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
                  <td className="px-4 py-3">
                    <div
                      className="text-xs"
                      style={{ color: "var(--medical-text-muted)" }}
                    >
                      <span style={{ color: "var(--medical-text-muted)" }}>
                        目标
                      </span>{" "}
                      {task.target} /
                      <span style={{ color: "var(--medical-text-muted)" }}>
                        {" "}
                        发送
                      </span>{" "}
                      {task.sent} /
                      <span style={{ color: "#059669" }}>
                        {" "}
                        打开 {openRate}%
                      </span>
                    </div>
                    {task.sent > 0 && (
                      <div className="progress-bar mt-1" style={{ width: 100 }}>
                        <div
                          className="progress-fill"
                          style={{
                            width: `${openRate}%`,
                            background: "var(--medical-button)",
                          }}
                        />
                      </div>
                    )}
                  </td>
                  <td
                    className="px-4 py-3 text-xs"
                    style={{ color: "var(--medical-text-muted)" }}
                  >
                    {task.channel}
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "var(--medical-text-muted)" }}
                    >
                      <Calendar size={11} />
                      {task.time}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${task.createdBy === "AI推荐" ? "tag-purple" : task.createdBy === "自动化" ? "tag-green" : "tag-gray"}`}
                    >
                      {task.createdBy}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        className="text-xs"
                        style={{ color: "var(--medical-button-dark)" }}
                      >
                        详情
                      </button>
                      <button
                        className="text-xs"
                        style={{ color: "var(--medical-text-muted)" }}
                      >
                        日志
                      </button>
                    </div>
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
