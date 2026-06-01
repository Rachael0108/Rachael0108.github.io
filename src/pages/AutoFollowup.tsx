import { useState } from "react";
import {
  GitBranch,
  Play,
  Pause,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  ArrowRight,
} from "lucide-react";

const flows = [
  {
    id: "F001",
    name: "心内科出院随访流程",
    status: "active",
    patients: 156,
    completed: 89,
    dept: "心内科",
    trigger: "出院后触发",
    nodes: 5,
  },
  {
    id: "F002",
    name: "糖尿病慢病管理流程",
    status: "active",
    patients: 312,
    completed: 234,
    dept: "内分泌科",
    trigger: "入组慢病",
    nodes: 8,
  },
  {
    id: "F003",
    name: "骨科术后康复随访",
    status: "paused",
    patients: 89,
    completed: 45,
    dept: "骨科",
    trigger: "手术后触发",
    nodes: 6,
  },
  {
    id: "F004",
    name: "肿瘤化疗随访流程",
    status: "active",
    patients: 67,
    completed: 38,
    dept: "肿瘤科",
    trigger: "化疗开始",
    nodes: 10,
  },
];

const flowNodes = [
  {
    step: 1,
    label: "触发条件",
    desc: "出院当天",
    type: "trigger",
    color: "var(--medical-blue-600)",
    done: true,
  },
  {
    step: 2,
    label: "出院第3天",
    desc: "AI生成康复提醒并推送",
    type: "ai",
    color: "var(--medical-blue-500)",
    done: true,
  },
  {
    step: 3,
    label: "出院第7天",
    desc: "随访问卷推送，采集症状",
    type: "push",
    color: "var(--medical-blue-400)",
    done: true,
  },
  {
    step: 4,
    label: "风险评估",
    desc: "AI分析问卷结果，识别风险",
    type: "ai",
    color: "#d97706",
    done: false,
    current: true,
  },
  {
    step: 5,
    label: "出院第14天",
    desc: "复诊提醒推送",
    type: "push",
    color: "#10b981",
    done: false,
  },
  {
    step: 6,
    label: "出院第30天",
    desc: "满意度调查+下次预约提醒",
    type: "end",
    color: "var(--medical-blue-700)",
    done: false,
  },
];

const statusData = [
  {
    name: "张建国",
    flow: "心内科出院随访",
    stage: "出院第14天",
    status: "waiting",
    nextAction: "明天推送复诊提醒",
    risk: "低",
  },
  {
    name: "李秀英",
    flow: "糖尿病慢病管理",
    stage: "第3次随访",
    status: "active",
    nextAction: "AI分析问卷中",
    risk: "中",
  },
  {
    name: "陈美华",
    flow: "心内科出院随访",
    stage: "出院第3天",
    status: "risk",
    nextAction: "建议立即人工干预",
    risk: "高",
  },
  {
    name: "刘志远",
    flow: "肿瘤化疗随访",
    stage: "化疗第2周",
    status: "active",
    nextAction: "明日推送用药提醒",
    risk: "中",
  },
];

const nodeTypeIcon: Record<string, any> = {
  trigger: Zap,
  ai: GitBranch,
  push: ArrowRight,
  end: CheckCircle,
};

export default function AutoFollowup() {
  const [selectedFlow, setSelectedFlow] = useState(flows[0]);

  return (
    <div className="p-6 space-y-5 fade-in">
      <div className="grid grid-cols-3 gap-5">
        {/* Left - Flow List */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <div className="section-header">
              <GitBranch
                size={16}
                style={{ color: "var(--medical-blue-500)" }}
              />
              <span className="section-title">随访流程列表</span>
              <button
                className="ml-auto text-xs flex items-center gap-1 px-2 py-1 rounded-lg"
                style={{
                  background: "var(--medical-focus-ring)",
                  color: "var(--medical-blue-700)",
                  border: "1px solid var(--medical-border)",
                }}
              >
                <Plus size={11} />
                新建
              </button>
            </div>
            <div className="space-y-2">
              {flows.map((flow) => (
                <button
                  key={flow.id}
                  onClick={() => setSelectedFlow(flow)}
                  className="w-full text-left p-4 rounded-xl transition-all duration-200"
                  style={{
                    background:
                      selectedFlow.id === flow.id
                        ? "var(--medical-focus-ring)"
                        : "rgba(255,255,255,0.68)",
                    border: `1px solid ${selectedFlow.id === flow.id ? "var(--medical-border-strong)" : "var(--medical-border)"}`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--medical-text)" }}
                    >
                      {flow.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          background:
                            flow.status === "active" ? "#10b981" : "#f59e0b",
                          boxShadow: `0 0 5px ${flow.status === "active" ? "#10b981" : "#f59e0b"}`,
                        }}
                      />
                      <span
                        className="text-xs"
                        style={{
                          color:
                            flow.status === "active" ? "#10b981" : "#f59e0b",
                        }}
                      >
                        {flow.status === "active" ? "运行中" : "已暂停"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span
                      className="text-xs"
                      style={{ color: "var(--medical-text-muted)" }}
                    >
                      {flow.dept}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--medical-text-muted)" }}
                    >
                      {flow.patients} 人在跑
                    </span>
                  </div>
                  <div className="mt-2 progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${Math.round((flow.completed / flow.patients) * 100)}%`,
                        background:
                          flow.status === "active"
                            ? "var(--medical-blue-600)"
                            : "var(--medical-blue-300)",
                      }}
                    />
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: "var(--medical-text-muted)" }}
                  >
                    完成率 {Math.round((flow.completed / flow.patients) * 100)}%
                    ({flow.completed}/{flow.patients})
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="glass-card p-5">
            <div className="section-header">
              <CheckCircle size={16} className="text-emerald-400" />
              <span className="section-title">随访统计</span>
            </div>
            <div className="space-y-3">
              {[
                { label: "今日随访完成", value: "89", color: "#10b981" },
                { label: "随访中断预警", value: "12", color: "#f59e0b" },
                { label: "高风险需干预", value: "8", color: "#ef4444" },
                { label: "平均随访完成率", value: "76.3%", color: "#6366f1" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-1.5"
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
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Flow Detail */}
        <div className="col-span-2 space-y-4">
          {/* Flow Header */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3
                    className="text-lg font-bold"
                    style={{ color: "var(--medical-text)" }}
                  >
                    {selectedFlow.name}
                  </h3>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5"
                    style={{
                      background:
                        selectedFlow.status === "active"
                          ? "rgba(16,185,129,0.15)"
                          : "rgba(245,158,11,0.15)",
                      color:
                        selectedFlow.status === "active"
                          ? "#10b981"
                          : "#f59e0b",
                      border: `1px solid ${selectedFlow.status === "active" ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full pulse-dot"
                      style={{
                        background:
                          selectedFlow.status === "active"
                            ? "#10b981"
                            : "#f59e0b",
                      }}
                    />
                    {selectedFlow.status === "active" ? "自动运行中" : "已暂停"}
                  </span>
                </div>
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--medical-text-muted)" }}
                >
                  触发方式：{selectedFlow.trigger} · {selectedFlow.nodes} 个节点
                  · {selectedFlow.dept}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary text-xs flex items-center gap-1.5">
                  <Pause size={12} />
                  暂停
                </button>
                <button className="btn-primary text-xs flex items-center gap-1.5">
                  <Play size={12} />
                  编辑流程
                </button>
              </div>
            </div>
          </div>

          {/* Flow Visualization */}
          <div className="glass-card p-5">
            <div className="section-header">
              <GitBranch
                size={16}
                style={{ color: "var(--medical-blue-500)" }}
              />
              <span className="section-title">流程节点可视化</span>
            </div>
            <div className="flex items-start gap-0 overflow-x-auto pb-4 pt-2">
              {flowNodes.map((node, i) => {
                const Icon = nodeTypeIcon[node.type] || Clock;
                return (
                  <div key={i} className="flex items-center shrink-0">
                    <div
                      className="flex flex-col items-center"
                      style={{ minWidth: 120 }}
                    >
                      {/* Node */}
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2 relative"
                        style={{
                          background: node.done
                            ? `${node.color}20`
                            : node.current
                              ? `${node.color}15`
                              : "rgba(30,41,59,0.8)",
                          border: `2px solid ${node.done || node.current ? node.color : "rgba(71,85,105,0.3)"}`,
                          opacity: node.done || node.current ? 1 : 0.5,
                        }}
                      >
                        <Icon
                          size={24}
                          style={{
                            color:
                              node.done || node.current
                                ? node.color
                                : "var(--medical-blue-300)",
                          }}
                        />
                        {node.done && (
                          <div
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{
                              background: "#10b981",
                              fontSize: 10,
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            ✓
                          </div>
                        )}
                        {node.current && (
                          <div
                            className="absolute -top-1 -right-1 w-3 h-3 rounded-full pulse-dot"
                            style={{ background: node.color }}
                          />
                        )}
                      </div>
                      <span
                        className="text-xs font-medium text-center"
                        style={{
                          color:
                            node.done || node.current
                              ? "var(--medical-text)"
                              : "var(--medical-text-muted)",
                        }}
                      >
                        {node.label}
                      </span>
                      <span
                        className="text-xs text-center mt-0.5 max-w-24 leading-tight"
                        style={{ color: "var(--medical-text-muted)" }}
                      >
                        {node.desc}
                      </span>
                      {node.type === "ai" && (
                        <span className="ai-badge mt-1">AI</span>
                      )}
                    </div>
                    {i < flowNodes.length - 1 && (
                      <div className="shrink-0 mx-1 mb-8">
                        <ArrowRight
                          size={20}
                          style={{
                            color: node.done
                              ? "var(--medical-blue-600)"
                              : "var(--medical-blue-300)",
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Patient Status Table */}
          <div className="glass-card overflow-hidden">
            <div
              className="p-4"
              style={{ borderBottom: "1px solid var(--medical-border)" }}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle size={15} style={{ color: "#f59e0b" }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--medical-text)" }}
                >
                  随访中患者状态
                </span>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--medical-border)" }}>
                  {[
                    "患者姓名",
                    "随访流程",
                    "当前阶段",
                    "风险",
                    "下一步操作",
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
                {statusData.map((row, i) => (
                  <tr
                    key={i}
                    className="table-row-hover"
                    style={{ borderBottom: "1px solid var(--medical-border)" }}
                  >
                    <td
                      className="px-4 py-3 text-sm font-medium"
                      style={{ color: "var(--medical-text)" }}
                    >
                      {row.name}
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--medical-text-muted)" }}
                    >
                      {row.flow}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Clock
                          size={11}
                          style={{ color: "var(--medical-blue-500)" }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: "var(--medical-text)" }}
                        >
                          {row.stage}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background:
                            row.risk === "高"
                              ? "rgba(220,38,38,0.15)"
                              : row.risk === "中"
                                ? "rgba(217,119,6,0.15)"
                                : "rgba(16,185,129,0.15)",
                          color:
                            row.risk === "高"
                              ? "#f87171"
                              : row.risk === "中"
                                ? "#fcd34d"
                                : "#6ee7b7",
                        }}
                      >
                        {row.risk}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--medical-text-muted)" }}
                    >
                      {row.nextAction}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        className="text-xs"
                        style={{ color: "var(--medical-blue-600)" }}
                      >
                        干预
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
