import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Brain,
  Filter,
  FileText,
  Send,
  GitBranch,
  MessageSquare,
  BarChart3,
  AlertTriangle,
  ShieldCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Activity,
} from "lucide-react";

export type PageType =
  | "dashboard"
  | "patients"
  | "ai-portrait"
  | "smart-crowd"
  | "ai-content"
  | "push-tasks"
  | "auto-followup"
  | "message-channels"
  | "data-analysis"
  | "risk-warning"
  | "audit-compliance"
  | "system-config";

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const menuItems = [
  {
    id: "dashboard" as PageType,
    label: "工作台",
    icon: LayoutDashboard,
    desc: "运营总驾驶舱",
  },
  {
    id: "ai-content" as PageType,
    label: "推文管理",
    icon: FileText,
    desc: "内容生成与管理",
  },
  {
    id: "push-tasks" as PageType,
    label: "推送任务中心",
    icon: Send,
    desc: "任务调度执行",
  },
  {
    id: "patients" as PageType,
    label: "患者中心",
    icon: Users,
    desc: "患者360视图",
  },
  {
    id: "ai-portrait" as PageType,
    label: "AI患者画像",
    icon: Brain,
    desc: "动态画像分析",
  },
  {
    id: "smart-crowd" as PageType,
    label: "智能人群",
    icon: Filter,
    desc: "自动化分群引擎",
  },

  {
    id: "auto-followup" as PageType,
    label: "自动化随访",
    icon: GitBranch,
    desc: "生命周期自动运营",
  },
  {
    id: "message-channels" as PageType,
    label: "消息与渠道中心",
    icon: MessageSquare,
    desc: "统一触达平台",
  },
  {
    id: "data-analysis" as PageType,
    label: "数据分析中心",
    icon: BarChart3,
    desc: "运营数据分析",
  },
  {
    id: "risk-warning" as PageType,
    label: "风险预警中心",
    icon: AlertTriangle,
    desc: "风险识别干预",
  },
  {
    id: "audit-compliance" as PageType,
    label: "审核与合规中心",
    icon: ShieldCheck,
    desc: "合规审核管理",
  },
  {
    id: "system-config" as PageType,
    label: "系统配置中心",
    icon: Settings,
    desc: "基础配置字典",
  },
];

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col h-screen transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}
      style={{
        background: "linear-gradient(180deg, #0d1929 0%, #0a1628 100%)",
        borderRight: "1px solid rgba(71, 85, 105, 0.3)",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-5"
        style={{ borderBottom: "1px solid rgba(71, 85, 105, 0.2)" }}
      >
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          <Activity size={18} color="white" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-sm font-bold text-white leading-tight">
              医院精准推送平台
            </div>
            <div className="text-xs text-indigo-400">精准触达平台</div>
          </div>
        )}
      </div>

      {/* AI Status */}
      {!collapsed && (
        <div
          className="mx-3 my-3 px-3 py-2 rounded-lg"
          style={{
            background: "rgba(99, 102, 241, 0.1)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full pulse-dot"
              style={{ background: "#10b981", boxShadow: "0 0 6px #10b981" }}
            />
            <span className="text-xs text-emerald-400 font-medium">
              AI引擎运行中
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Zap size={10} className="text-yellow-400" />
            <span className="text-xs text-slate-400">今日生成内容 247 条</span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-left nav-item ${isActive ? "nav-item-active" : ""}`}
              title={collapsed ? item.label : ""}
            >
              <Icon
                size={18}
                className={`flex-shrink-0 ${isActive ? "text-indigo-400" : "text-slate-400"}`}
              />
              {!collapsed && (
                <div className="overflow-hidden">
                  <div
                    className={`text-sm font-medium truncate ${isActive ? "text-indigo-300" : "text-slate-300"}`}
                  >
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {item.desc}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      {!collapsed && (
        <div
          className="px-3 py-3"
          style={{ borderTop: "1px solid rgba(71, 85, 105, 0.2)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              }}
            >
              王
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-medium text-slate-200 truncate">
                王医生
              </div>
              <div className="text-xs text-slate-500 truncate">运营管理员</div>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center z-10"
        style={{
          background: "#1e293b",
          border: "1px solid rgba(71, 85, 105, 0.5)",
          color: "#94a3b8",
        }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
