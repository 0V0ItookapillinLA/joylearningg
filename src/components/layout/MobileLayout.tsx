import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Home, BookOpen, Users, User, MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Message = { role: "ai" | "user"; text: string };

const tabs = [
  { to: "/", icon: Home, label: "首页" },
  { to: "/learn", icon: BookOpen, label: "学习" },
  { to: "/__ai__", icon: MessageCircle, label: "AI助手", isAI: true },
  { to: "/community", icon: Users, label: "社区" },
  { to: "/profile", icon: User, label: "我的" },
];

const MobileLayout = () => {
  const [aiOpen, setAiOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "你好！我是AI助手，有什么业务问题可以帮你解答？" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: input },
      { role: "ai", text: "这是一个模拟回复。在实际产品中，AI会根据业务知识库给出专业解答。" },
    ]);
    setInput("");
  };

  return (
    <div className="mx-auto flex h-[100dvh] max-w-[430px] flex-col bg-background shadow-xl relative">
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-20">
        <Outlet />
      </main>

      {/* AI Chat Panel - 2/3 screen */}
      <AnimatePresence>
        {aiOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 rounded-t-3xl border-t border-border bg-card shadow-2xl"
            style={{ height: "66dvh" }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <span className="text-sm font-semibold">AI 问答助手</span>
              <button onClick={() => setAiOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ height: "calc(66dvh - 120px)" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-border p-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="输入你的问题..."
                className="h-10 text-sm rounded-full"
              />
              <Button size="icon" className="h-10 w-10 shrink-0 rounded-full" onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Glass Bottom Nav */}
      <div className="fixed bottom-4 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 px-4">
        <nav className="rounded-full border border-border/50 bg-card/70 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-around py-2">
            {tabs.map((tab) =>
              tab.isAI ? (
                <button
                  key={tab.label}
                  onClick={() => setAiOpen(true)}
                  className="flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium text-muted-foreground transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                    <tab.icon className="h-4 w-4" />
                  </div>
                  <span className="mt-0.5">{tab.label}</span>
                </button>
              ) : (
                <NavLink
                  key={tab.to}
                  to={tab.to}
                  end={tab.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <tab.icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
                      <span>{tab.label}</span>
                    </>
                  )}
                </NavLink>
              )
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileLayout;
