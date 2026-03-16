import { useState, useRef, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Home, BookOpen, Users, User, MessageCircle, X, Send, Sparkles } from "lucide-react";
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

const TypingDots = () => (
  <div className="flex gap-1 items-center px-4 py-3">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="h-2 w-2 rounded-full bg-primary/50"
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

const MobileLayout = () => {
  const [aiOpen, setAiOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "你好！我是你的AI业务助手 ✨ 有任何销售技巧、产品知识或客户应对方面的问题，都可以问我～" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [
        ...m,
        { role: "ai", text: "这是一个模拟回复。在实际产品中，AI会根据业务知识库给出专业解答。" },
      ]);
    }, 1200);
  };

  return (
    <div className="mx-auto flex h-[100dvh] max-w-[430px] flex-col bg-background shadow-xl relative">
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-20">
        <Outlet />
      </main>

      {/* AI Chat Overlay - centered, 2/3 height */}
      <AnimatePresence>
        {aiOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm"
              onClick={() => setAiOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ y: "100%", opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
              className="fixed inset-x-0 bottom-0 z-[70] mx-auto w-full max-w-[430px] flex flex-col rounded-t-[28px] border-t border-border/50 bg-card shadow-2xl overflow-hidden"
              style={{ height: "66dvh" }}
            >
              {/* Header with AI glow */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/10">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: "2s" }} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold">AI 问答助手</span>
                    <p className="text-[10px] text-muted-foreground">基于业务知识库的智能问答</p>
                  </div>
                </div>
                <button
                  onClick={() => setAiOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/80 text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-90"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed transition-shadow duration-300",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md shadow-md shadow-primary/20"
                          : "bg-muted text-foreground rounded-bl-md"
                      )}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted rounded-2xl rounded-bl-md">
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 border-t border-border/50 p-3 bg-card">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="输入你的问题..."
                  className="h-10 text-sm rounded-full border-border/50 bg-muted/50 focus-visible:bg-background transition-colors duration-200"
                />
                <Button
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-full shadow-md shadow-primary/20 transition-all duration-200 active:scale-90"
                  onClick={sendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Glass Bottom Nav */}
      <div className="fixed bottom-4 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 px-4">
        <nav className="rounded-full border border-border/40 bg-card/60 backdrop-blur-2xl shadow-lg shadow-foreground/5">
          <div className="flex items-center justify-around py-2">
            {tabs.map((tab) =>
              tab.isAI ? (
                <button
                  key={tab.label}
                  onClick={() => setAiOpen(true)}
                  className="flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium text-muted-foreground transition-all duration-200 active:scale-90"
                >
                  <motion.div
                    className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/30"
                    whileTap={{ scale: 0.85 }}
                  >
                    <tab.icon className="h-4 w-4" />
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" style={{ animationDuration: "3s" }} />
                  </motion.div>
                  <span className="mt-0.5">{tab.label}</span>
                </button>
              ) : (
                <NavLink
                  key={tab.to}
                  to={tab.to}
                  end={tab.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-all duration-200 active:scale-90",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <motion.div whileTap={{ scale: 0.85 }}>
                        <tab.icon className={cn("h-5 w-5 transition-all duration-200", isActive && "stroke-[2.5]")} />
                      </motion.div>
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
