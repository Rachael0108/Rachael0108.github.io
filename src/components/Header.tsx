import { Bell, Search, RefreshCw, Cpu } from "lucide-react";
import type { PageType } from "./Sidebar";

const pageTitles: Record<PageType, { title: string; subtitle: string }> = {
  dashboard: { title: "工作台", subtitle: "医院运营总驾驶舱" },
  "push-tasks": { title: "推送任务中心", subtitle: "推送任务调度与执行中心" },

  patients: { title: "患者中心", subtitle: "患者全量信息管理中心" },
  "ai-portrait": {
    title: "AI患者画像",
    subtitle: "动态患者画像与运营状态中心",
  },
  "smart-crowd": { title: "智能人群", subtitle: "自动化运营分群引擎" },
  "ai-content": { title: "推文管理", subtitle: "AI医疗内容生成与知识库中心" },
  "auto-followup": {
    title: "自动化随访",
    subtitle: "患者生命周期自动运营引擎",
  },
  "message-channels": { title: "消息与渠道中心", subtitle: "统一消息触达平台" },
  "data-analysis": { title: "数据分析中心", subtitle: "患者运营数据分析平台" },
  "risk-warning": { title: "风险预警中心", subtitle: "患者风险识别与干预平台" },
  "audit-compliance": {
    title: "审核与合规中心",
    subtitle: "医疗内容合规与权限管理中心",
  },
  "system-config": {
    title: "系统配置中心",
    subtitle: "系统基础配置与数据字典中心",
  },
};

interface HeaderProps {
  currentPage: PageType;
}

export default function Header({ currentPage }: HeaderProps) {
  const { title, subtitle } = pageTitles[currentPage];
  const now = new Date();
  const timeStr = now.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header
      className="flex items-center justify-between px-6 py-3 flex-shrink-0"
      style={{
        background: "rgba(15, 23, 42, 0.95)",
        borderBottom: "1px solid rgba(71, 85, 105, 0.3)",
        height: "64px",
      }}
    >
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white">{title}</h1>
            <span className="ai-badge flex items-center gap-1">
              <Cpu size={9} />
              AI 驱动
            </span>
          </div>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            placeholder="搜索患者、任务..."
            className="input-field pl-9 text-xs"
            style={{ width: "220px", height: "34px" }}
          />
        </div>

        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400"
          style={{
            background: "rgba(71, 85, 105, 0.2)",
            border: "1px solid rgba(71, 85, 105, 0.3)",
          }}
        >
          <RefreshCw size={13} />
          <span className="text-slate-500">{timeStr}</span>
        </button>

        <button
          className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-400"
          style={{
            background: "rgba(71, 85, 105, 0.2)",
            border: "1px solid rgba(71, 85, 105, 0.3)",
          }}
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full status-dot-red" />
        </button>
      </div>
    </header>
  );
}
