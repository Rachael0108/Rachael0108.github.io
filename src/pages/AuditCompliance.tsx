import { useState } from "react";
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  User,
  Filter,
} from "lucide-react";

const auditItems = [
  {
    id: "A001",
    title: "高血压患者夏季用药注意事项",
    type: "AI生成内容",
    status: "pending",
    submitter: "张医生",
    submitTime: "2025-06-12 09:30",
    risk: "低",
    channel: "微信公众号",
    keywords: [],
  },
  {
    id: "A002",
    title: "糖尿病患者复诊提醒推送任务",
    type: "推送任务",
    status: "pending",
    submitter: "运营团队",
    submitTime: "2025-06-12 10:15",
    risk: "低",
    channel: "短信",
    keywords: [],
  },
  {
    id: "A003",
    title: "肿瘤患者化疗后生存建议",
    type: "AI生成内容",
    status: "reviewing",
    submitter: "AI系统",
    submitTime: "2025-06-12 08:00",
    risk: "高",
    channel: "企业微信",
    keywords: ["治愈", "癌症"],
  },
  {
    id: "A004",
    title: "出院患者大批量短信推送",
    type: "推送任务",
    status: "approved",
    submitter: "李护士长",
    submitTime: "2025-06-11 15:30",
    risk: "中",
    channel: "短信",
    keywords: [],
  },
  {
    id: "A005",
    title: "儿童疫苗接种宣传内容",
    type: "AI生成内容",
    status: "rejected",
    submitter: "AI系统",
    submitTime: "2025-06-11 11:00",
    risk: "高",
    channel: "公众号",
    keywords: ["不良反应", "副作用"],
  },
];

const operationLogs = [
  {
    user: "王管理员",
    action: "审核通过",
    target: "出院患者大批量短信推送",
    time: "2025-06-11 16:20",
    ip: "192.168.1.12",
  },
  {
    user: "AI系统",
    action: "内容生成",
    target: "高血压患者用药指南",
    time: "2025-06-12 09:25",
    ip: "system",
  },
  {
    user: "李护士长",
    action: "提交审核",
    target: "出院患者大批量短信推送",
    time: "2025-06-11 15:32",
    ip: "192.168.1.25",
  },
  {
    user: "张医生",
    action: "创建任务",
    target: "心内科随访流程",
    time: "2025-06-11 14:10",
    ip: "192.168.1.8",
  },
  {
    user: "王管理员",
    action: "敏感词检测",
    target: "肿瘤患者化疗建议",
    time: "2025-06-12 08:05",
    ip: "system",
  },
];

const roles = [
  { name: "超级管理员", users: 2, permissions: ["全部权限"], color: "#dc2626" },
  {
    name: "科室运营专员",
    users: 8,
    permissions: ["患者查看", "内容创建", "任务提交"],
    color: "#0284c7",
  },
  {
    name: "内容审核员",
    users: 4,
    permissions: ["内容审核", "任务审核"],
    color: "#0ea5e9",
  },
  {
    name: "医生",
    users: 45,
    permissions: ["患者查看", "随访记录"],
    color: "#059669",
  },
  {
    name: "护士",
    users: 89,
    permissions: ["患者查看", "随访执行"],
    color: "#d97706",
  },
];

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; icon: any }
> = {
  pending: {
    label: "待审核",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    icon: Clock,
  },
  reviewing: {
    label: "审核中",
    color: "#0284c7",
    bg: "rgba(14,165,233,0.12)",
    icon: Eye,
  },
  approved: {
    label: "已通过",
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    icon: CheckCircle,
  },
  rejected: {
    label: "已拒绝",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    icon: XCircle,
  },
};

export default function AuditCompliance() {
  const [activeTab, setActiveTab] = useState<"audit" | "logs" | "permissions">(
    "audit",
  );
  const [selectedItem, setSelectedItem] = useState<
    (typeof auditItems)[0] | null
  >(null);

  return (
    <div className="p-6 space-y-5 fade-in">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "待审核内容", value: 23, color: "#f59e0b", icon: Clock },
          {
            label: "今日审核通过",
            value: 18,
            color: "#10b981",
            icon: CheckCircle,
          },
          {
            label: "敏感词检出",
            value: 5,
            color: "#dc2626",
            icon: AlertTriangle,
          },
          {
            label: "合规通过率",
            value: "94.2%",
            color: "#0284c7",
            icon: ShieldCheck,
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
              <p className="text-xs text-slate-500">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          ["audit", " 内容审核"],
          ["logs", "操作日志"],
          ["permissions", "权限管理"],
        ].map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background:
                activeTab === tab
                  ? "var(--medical-focus-ring)"
                  : "color-mix(in srgb, var(--medical-bg-soft) 75%, transparent)",
              color:
                activeTab === tab
                  ? "var(--medical-text)"
                  : "var(--medical-text-muted)",
              border: `1px solid ${activeTab === tab ? "var(--medical-border-strong)" : "var(--medical-border)"}`,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "audit" && (
        <div className="grid grid-cols-3 gap-5">
          {/* Audit List */}
          <div className="col-span-2 glass-card overflow-hidden">
            <div
              className="p-4 flex items-center gap-3"
              style={{ borderBottom: "1px solid var(--medical-border)" }}
            >
              <FileText size={16} className="text-sky-600" />
              <span className="text-sm font-semibold text-(--medical-text)">
                审核队列
              </span>
              <div className="ml-auto flex gap-2">
                {["全部", "待审核", "已通过", "已拒绝"].map((f) => (
                  <button
                    key={f}
                    className="text-xs px-2.5 py-1 rounded-lg"
                    style={{
                      background:
                        f === "全部" ? "var(--medical-focus-ring)" : "white",
                      color:
                        f === "全部"
                          ? "var(--medical-text)"
                          : "var(--medical-text-muted)",
                      border: `1px solid ${f === "全部" ? "var(--medical-border-strong)" : "var(--medical-border)"}`,
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="divide-y"
              style={{ borderColor: "var(--medical-border)" }}
            >
              {auditItems.map((item) => {
                const s = statusConfig[item.status];
                return (
                  <div
                    key={item.id}
                    className="p-4 cursor-pointer transition-all table-row-hover"
                    onClick={() => setSelectedItem(item)}
                    style={{
                      background:
                        selectedItem?.id === item.id
                          ? "var(--medical-focus-ring)"
                          : undefined,
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-(--medical-text) truncate">
                            {item.title}
                          </span>
                          {item.keywords.length > 0 && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full shrink-0"
                              style={{
                                background: "rgba(220,38,38,0.15)",
                                color: "#f87171",
                                border: "1px solid rgba(220,38,38,0.3)",
                              }}
                            >
                              ⚠️ 敏感词
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="tag-gray text-xs px-2 py-0.5 rounded">
                            {item.type}
                          </span>
                          <span className="text-xs text-(--medical-text-muted)">
                            提交人：{item.submitter}
                          </span>
                          <span className="text-xs text-(--medical-text-muted)">
                            {item.submitTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <div
                          className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                          style={{ background: s.bg, color: s.color }}
                        >
                          <s.icon size={11} />
                          <span className="text-xs">{s.label}</span>
                        </div>
                      </div>
                    </div>
                    {item.status === "pending" && (
                      <div className="flex gap-2 mt-3">
                        <button
                          className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                          style={{
                            background: "rgba(16,185,129,0.15)",
                            color: "#10b981",
                            border: "1px solid rgba(16,185,129,0.3)",
                          }}
                        >
                          <CheckCircle size={11} />
                          通过
                        </button>
                        <button
                          className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                          style={{
                            background: "rgba(239,68,68,0.15)",
                            color: "#ef4444",
                            border: "1px solid rgba(239,68,68,0.3)",
                          }}
                        >
                          <XCircle size={11} />
                          拒绝
                        </button>
                        <button
                          className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                          style={{
                            background:
                              "color-mix(in srgb, var(--medical-bg-soft) 75%, transparent)",
                            color: "var(--medical-text-muted)",
                            border: "1px solid var(--medical-border)",
                          }}
                        >
                          <Eye size={11} />
                          预览
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            {/* Sensitive Words */}
            <div className="glass-card p-5">
              <div className="section-header">
                <AlertTriangle size={16} className="text-red-500" />
                <span className="section-title">敏感词检测</span>
              </div>
              <div className="space-y-2">
                {["治愈", "100%有效", "包治百病", "副作用严重", "癌症晚期"].map(
                  (word) => (
                    <div
                      key={word}
                      className="flex items-center justify-between py-1.5 px-3 rounded-lg"
                      style={{
                        background: "rgba(220,38,38,0.08)",
                        border: "1px solid rgba(220,38,38,0.2)",
                      }}
                    >
                      <span className="text-xs font-medium text-red-400">
                        "{word}"
                      </span>
                      <span className="text-xs text-(--medical-text-muted)">
                        高风险
                      </span>
                    </div>
                  ),
                )}
              </div>
              <button className="btn-secondary w-full text-xs mt-3 flex items-center justify-center gap-1.5">
                <Filter size={13} />
                管理敏感词库
              </button>
            </div>

            {/* Compliance Rate */}
            <div className="glass-card p-5">
              <div className="section-header">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span className="section-title">合规情况</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "内容合规率", value: 94, color: "#10b981" },
                  { label: "推送合规率", value: 98, color: "#0284c7" },
                  { label: "权限操作合规", value: 100, color: "#0ea5e9" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-(--medical-text-muted)">
                        {item.label}
                      </span>
                      <span className="font-bold" style={{ color: item.color }}>
                        {item.value}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${item.value}%`,
                          background: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "logs" && (
        <div className="glass-card overflow-hidden">
          <div
            className="p-4"
            style={{ borderBottom: "1px solid var(--medical-border)" }}
          >
            <span className="text-sm font-semibold text-(--medical-text)">
              操作日志记录
            </span>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--medical-border)" }}>
                {["操作人", "操作类型", "操作对象", "时间", "IP地址"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-xs text-(--medical-text-muted) font-medium text-left px-4 py-3"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {operationLogs.map((log, i) => (
                <tr
                  key={i}
                  className="table-row-hover"
                  style={{ borderBottom: "1px solid var(--medical-border)" }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-sky-600" />
                      <span className="text-sm text-(--medical-text)">
                        {log.user}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="tag-blue text-xs px-2 py-0.5 rounded">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-(--medical-text-muted)">
                    {log.target}
                  </td>
                  <td className="px-4 py-3 text-xs text-(--medical-text-muted)">
                    {log.time}
                  </td>
                  <td className="px-4 py-3 text-xs text-(--medical-text-muted) font-mono">
                    {log.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "permissions" && (
        <div className="grid grid-cols-2 gap-5">
          <div className="glass-card p-5">
            <div className="section-header">
              <User size={16} className="text-sky-600" />
              <span className="section-title">角色权限配置</span>
            </div>
            <div className="space-y-3">
              {roles.map((role, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl"
                  style={{
                    background:
                      "color-mix(in srgb, var(--medical-bg-soft) 70%, white)",
                    border: "1px solid var(--medical-border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: role.color }}
                      />
                      <span className="text-sm font-medium text-(--medical-text)">
                        {role.name}
                      </span>
                    </div>
                    <span className="text-xs text-(--medical-text-muted)">
                      {role.users} 人
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((p) => (
                      <span
                        key={p}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          background: `${role.color}15`,
                          color: role.color,
                          border: `1px solid ${role.color}30`,
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                  <button className="mt-2 text-xs text-sky-600 hover:text-sky-500">
                    编辑权限
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-5">
            <div className="section-header">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span className="section-title">权限说明</span>
            </div>
            <div className="space-y-3">
              {[
                {
                  perm: "患者查看",
                  desc: "查看患者基础信息和诊疗记录",
                  level: "基础",
                },
                {
                  perm: "内容创建",
                  desc: "创建和编辑AI生成内容",
                  level: "操作",
                },
                {
                  perm: "任务提交",
                  desc: "创建并提交推送任务审核",
                  level: "操作",
                },
                { perm: "内容审核", desc: "审核通过或拒绝内容", level: "管理" },
                { perm: "任务审核", desc: "审核并执行推送任务", level: "管理" },
                {
                  perm: "系统配置",
                  desc: "修改系统参数和全局配置",
                  level: "超级",
                },
                {
                  perm: "全部权限",
                  desc: "拥有所有系统操作权限",
                  level: "超级",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2"
                  style={{ borderBottom: "1px solid var(--medical-border)" }}
                >
                  <span className="text-xs font-medium text-(--medical-text) w-24 shrink-0">
                    {item.perm}
                  </span>
                  <span className="text-xs text-(--medical-text-muted) flex-1">
                    {item.desc}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      background:
                        item.level === "超级"
                          ? "rgba(220,38,38,0.1)"
                          : item.level === "管理"
                            ? "var(--medical-focus-ring)"
                            : "color-mix(in srgb, var(--medical-bg-soft) 75%, transparent)",
                      color:
                        item.level === "超级"
                          ? "#f87171"
                          : item.level === "管理"
                            ? "var(--medical-text)"
                            : "var(--medical-text-muted)",
                    }}
                  >
                    {item.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
