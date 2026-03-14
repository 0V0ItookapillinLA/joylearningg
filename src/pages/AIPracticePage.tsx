import { useState } from "react";
import { ArrowLeft, Send, Mic, Video, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "text" | "voice" | "video";

const scenarios = [
  { id: 1, title: "客户投诉处理", desc: "客户对产品质量不满，要求退货", difficulty: "中级" },
  { id: 2, title: "首次电话沟通", desc: "新客户首次接触，建立信任", difficulty: "初级" },
  { id: 3, title: "价格谈判", desc: "客户要求大幅折扣", difficulty: "高级" },
];

const mockConversation = [
  { role: "system" as const, text: "场景：你是一名销售顾问，客户来电投诉产品质量问题并要求退货。请尝试安抚客户并解决问题。" },
  { role: "ai" as const, text: "你好，我是客户王先生。你们上周卖给我的空气净化器根本不好用，噪音特别大，我要退货！", hint: null },
  { role: "user" as const, text: "王先生您好，非常抱歉给您带来了不好的体验。我完全理解您的心情，请问您方便详细描述一下噪音的情况吗？", hint: "表达共情 ✓" },
  { role: "ai" as const, text: "就是一开机就嗡嗡响，睡觉根本没法用！我花了三千多买的，这质量对得起这个价格吗？", hint: null },
];

const AIPracticePage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("text");
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState(mockConversation);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user" as const, text: input, hint: "语气恰当 ✓" },
      {
        role: "ai" as const,
        text: "嗯，你说得对，那你们能怎么解决？我可不想再跑一趟你们店里。",
        hint: null,
      },
    ]);
    setInput("");
  };

  if (!started) {
    return (
      <div>
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
          <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
          <h1 className="text-sm font-semibold">AI 陪练</h1>
        </div>
        <div className="p-4 space-y-4">
          {/* Mode Selection */}
          <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
            <TabsList className="w-full">
              <TabsTrigger value="text" className="flex-1 gap-1 text-xs">
                <MessageSquare className="h-3.5 w-3.5" />文本
              </TabsTrigger>
              <TabsTrigger value="voice" className="flex-1 gap-1 text-xs">
                <Mic className="h-3.5 w-3.5" />语音
              </TabsTrigger>
              <TabsTrigger value="video" className="flex-1 gap-1 text-xs">
                <Video className="h-3.5 w-3.5" />视频
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Scenario Selection */}
          <h3 className="text-sm font-semibold">选择练习场景</h3>
          <div className="space-y-2">
            {scenarios.map((s) => (
              <Card
                key={s.id}
                className="cursor-pointer p-4 hover:shadow-md transition-shadow"
                onClick={() => setStarted(true)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">{s.title}</h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{s.desc}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    s.difficulty === "初级" ? "bg-green-100 text-green-700" :
                    s.difficulty === "中级" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {s.difficulty}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <button onClick={() => setStarted(false)}><ArrowLeft className="h-5 w-5" /></button>
          <div>
            <h1 className="text-sm font-semibold">客户投诉处理</h1>
            <p className="text-[10px] text-muted-foreground">
              {mode === "text" ? "文本对话" : mode === "voice" ? "语音对话" : "视频模拟"}
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="destructive"
          className="h-7 text-xs"
          onClick={() => navigate("/practice-review")}
        >
          结束对练
        </Button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mode === "video" && (
          <div className="rounded-xl bg-foreground/5 h-40 flex items-center justify-center mb-3">
            <div className="text-center">
              <Video className="h-8 w-8 mx-auto text-muted-foreground mb-1" />
              <p className="text-[11px] text-muted-foreground">视频模拟画面</p>
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {msg.role === "system" ? (
                <div className="rounded-xl bg-accent p-3 text-xs text-accent-foreground">{msg.text}</div>
              ) : (
                <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[85%]">
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {msg.role === "ai" && <span className="text-[10px] font-medium text-muted-foreground block mb-1">客户 · 王先生</span>}
                      {msg.text}
                    </div>
                    {msg.hint && (
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-success">
                        <CheckCircle className="h-3 w-3" />
                        {msg.hint}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-3">
        {mode === "voice" ? (
          <div className="flex flex-col items-center gap-2">
            <button
              onMouseDown={() => setRecording(true)}
              onMouseUp={() => setRecording(false)}
              className={`flex h-14 w-14 items-center justify-center rounded-full transition-all ${
                recording ? "bg-destructive scale-110" : "bg-primary"
              } text-primary-foreground`}
            >
              <Mic className="h-6 w-6" />
            </button>
            <p className="text-[10px] text-muted-foreground">
              {recording ? "松开发送" : "按住说话"}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="输入你的回复..."
              className="h-9 text-xs"
            />
            <Button size="icon" className="h-9 w-9 shrink-0" onClick={sendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPracticePage;
