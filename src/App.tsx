import { useState } from "react";
import Sidebar, { type PageType } from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import AIPortrait from "./pages/AIPortrait";
import SmartCrowd from "./pages/SmartCrowd";
import AIContent from "./pages/AIContent";
import PushTasks from "./pages/PushTasks";
import AutoFollowup from "./pages/AutoFollowup";
import MessageChannels from "./pages/MessageChannels";
import DataAnalysis from "./pages/DataAnalysis";
import RiskWarning from "./pages/RiskWarning";
import AuditCompliance from "./pages/AuditCompliance";
import SystemConfig from "./pages/SystemConfig";

const ACCESS_PASSWORD =
  (globalThis as { __APP_ACCESS_PASSWORD__?: string }).__APP_ACCESS_PASSWORD__ || "micare123456";

const pageComponents: Record<PageType, React.ComponentType> = {
  dashboard: Dashboard,
  patients: Patients,
  "ai-portrait": AIPortrait,
  "smart-crowd": SmartCrowd,
  "ai-content": AIContent,
  "push-tasks": PushTasks,
  "auto-followup": AutoFollowup,
  "message-channels": MessageChannels,
  "data-analysis": DataAnalysis,
  "risk-warning": RiskWarning,
  "audit-compliance": AuditCompliance,
  "system-config": SystemConfig,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState("");

  const PageComponent = pageComponents[currentPage];

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordInput === ACCESS_PASSWORD) {
      setIsAuthorized(true);
      setAuthError("");
      return;
    }

    setAuthError("访问密码错误，请重试。");
  };

  if (!isAuthorized) {
    return (
      <div
        className="flex min-h-screen items-center justify-center p-6"
        style={{
          background:
            "linear-gradient(180deg, var(--medical-bg) 0%, var(--medical-bg-soft) 100%)",
        }}
      >
        <form
          className="w-full max-w-sm rounded-2xl border p-6 shadow-lg"
          style={{
            borderColor: "var(--medical-border)",
            background: "var(--medical-bg)",
          }}
          onSubmit={handlePasswordSubmit}
        >
          <h1 className="mb-2 text-xl font-semibold">访问验证</h1>
          <p
            className="mb-4 text-sm"
            style={{ color: "var(--medical-text-secondary)" }}
          >
            请输入访问密码后继续使用系统
          </p>

          <input
            type="password"
            value={passwordInput}
            onChange={(event) => {
              setPasswordInput(event.target.value);
              if (authError) {
                setAuthError("");
              }
            }}
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
            style={{ borderColor: "var(--medical-border)" }}
            placeholder="请输入访问密码"
            autoFocus
          />

          {authError ? (
            <p className="mt-2 text-sm text-red-500">{authError}</p>
          ) : null}

          <button
            type="submit"
            className="mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium text-white"
            style={{ background: "var(--medical-primary)" }}
          >
            进入系统
          </button>
        </form>
      </div>
    );
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--medical-bg)" }}
    >
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header currentPage={currentPage} />

        <main
          className="flex-1 overflow-y-auto"
          style={{
            background:
              "linear-gradient(180deg, var(--medical-bg) 0%, var(--medical-bg-soft) 100%)",
          }}
        >
          <PageComponent />
        </main>
      </div>
    </div>
  );
}


