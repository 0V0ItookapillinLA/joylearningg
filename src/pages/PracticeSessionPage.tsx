import { useState } from "react";
import { ArrowLeft, Send, Mic, Lightbulb, Clock } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import avatarFemale from "@/assets/ai-avatar-female.jpg";
import avatarMale from "@/assets/ai-avatar-male.jpg";

const roleInfo: Record<string, { name: string; avatar: string }> = {
  "1": { name: "客户王先生", avatar: avatarMale },
  "2": { name: "采购负责人李经理", avatar: avatarFemale },
  "3": { name: "谈判对手张总", avatar: avatarMale },
  "4": { name: "技术负责人陈工", avatar: avatarFemale },
};

const guidanceText = "客户情绪激动，需要用具体事实指出问题，同时引导他承认差距并强调改进要求，内容可适度自由发挥";

const mockMessages = [
  { role: "ai" as const, text: "领导，有什么事吗？" },
  { role: "user" as const, text: "绩效有点不太好，想跟你沟通一下。", feedback: { type: "tip" as const, title: "实时点评", suggestion: "指导建议：避免直接否定，先肯定工作态度，再客观指出具体问题，引导他反思。", polished: "\"明哲，你一直很努力，想和你一起回顾一下工作中的表现，看看如何进一步提升。\"" } },
  { role: "ai" as const, text: "好的，您说。" },
];

const PracticeSessionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "text";
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const [showEndDialog, setShowEndDialog] = useState(false);

  const role = roleInfo[id || "1"] || roleInfo["1"];
  const isVideoMode = mode === "video";
  const isTextMode = mode === "text";

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { role: "user", text: input, feedback: undefined }, { role: "ai", text: "嗯，你说得对，那你们能怎么解决？我可不想再跑一趟你们店里。" }]);
    setInput("");
  };

  const handleEnd = () => {
    setShowEndDialog(false);
    navigate("/practice-review");
  };

  // Video/Voice mode: full-screen video with overlays
  if (isVideoMode) {
    return (
      <div className="fixed inset-0 z-50 bg-neutral-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 z-10">
          <button onClick={() => navigate(-1)} className="text-white/80"><ArrowLeft className="h-5 w-5" /></button>
          <span className="text-sm font-medium text-white">{role.name}</span>
          <button onClick={() => setShowEndDialog(true)} className="text-xs text-white/60">任务说明</button>
        </div>

        {/* Main video area */}
        <div className="flex-1 relative flex items-center justify-center">
          {/* AI avatar - large */}
          <img src={role.avatar} alt={role.name} className="w-full h-full object-cover opacity-80" />
          
          {/* User small preview */}
          <div className="absolute top-4 right-4 w-20 h-28 rounded-lg overflow-hidden border-2 border-white/30 shadow-lg">
            <div className="w-full h-full bg-primary/20 flex items-center justify-center">
              <span className="text-[10px] text-primary font-medium">🎤 你</span>
            </div>
          </div>

          {/* Guidance card */}
          <div className="absolute top-4 left-4 right-28 bg-white/95 rounded-xl p-3 shadow-md">
            <p className="text-[10px] font-medium text-muted-foreground mb-1">💬 沟通指南</p>
            <p className="text-[11px] leading-relaxed text-foreground">{guidanceText}</p>
          </div>

          {/* AI subtitle */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-xl p-3">
            <p className="text-[10px] text-white/60 mb-0.5">AI陪练：</p>
            <p className="text-xs text-white">{messages[messages.length - 1]?.role === "ai" ? messages[messages.length - 1].text : "等待对话中..."}</p>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="px-4 py-4 flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <Lightbulb className="h-5 w-5 text-white/60" />
          </button>
          <button onClick={() => setShowEndDialog(true)} className="text-sm text-red-400 font-medium px-4">结束</button>
          <div className="flex-1 flex items-center justify-center">
            <button
              onMouseDown={() => setRecording(true)}
              onMouseUp={() => setRecording(false)}
              onTouchStart={() => setRecording(true)}
              onTouchEnd={() => setRecording(false)}
              className={`flex-1 h-12 rounded-full flex items-center justify-center gap-2 transition-all ${
                recording ? "bg-red-500 scale-105" : "bg-gradient-to-r from-primary to-primary/80"
              }`}
            >
              <Mic className="h-5 w-5 text-white" />
              <span className="text-sm font-medium text-white">{recording ? "松开发送" : "点击说话"}</span>
            </button>
          </div>
          <button className="text-sm text-green-400 font-medium px-4">完成</button>
        </div>
        <p className="text-center text-[10px] text-white/40 pb-2">内容由AI生成</p>

        <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>是否确认结束本次AI练习</AlertDialogTitle>
              <AlertDialogDescription>结束后将生成练习复盘报告</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={handleEnd}>确定</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  // Text mode: avatar on top, text chat below
  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
          <div className="flex items-center gap-2">
            <img src={role.avatar} alt={role.name} className="h-8 w-8 rounded-full object-cover" />
            <div>
              <h1 className="text-sm font-semibold">{role.name}</h1>
              <p className="text-[10px] text-muted-foreground">文本对练</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="h-3 w-3" />15:00</span>
          <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => setShowEndDialog(true)}>结束</Button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {msg.role === "ai" && <img src={role.avatar} alt="" className="h-9 w-9 rounded-full object-cover shrink-0" />}
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}>
                  {msg.text}
                </div>
              </div>
              {msg.feedback && (
                <div className="ml-12 mt-2 rounded-xl border border-primary/20 bg-primary/5 p-3">
                  <p className="text-[10px] font-semibold text-primary mb-1.5">🔵 {msg.feedback.title}</p>
                  <p className="text-[11px] text-foreground leading-relaxed mb-2">{msg.feedback.suggestion}</p>
                  <p className="text-[11px] text-primary/80 leading-relaxed">润色表达：{msg.feedback.polished}</p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-3">
        <div className="flex items-center gap-2">
          <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="输入你的回复..." className="h-10 text-xs rounded-full" />
          <Button size="icon" className="h-10 w-10 rounded-full shrink-0" onClick={sendMessage}><Send className="h-4 w-4" /></Button>
        </div>
      </div>

      <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>是否确认结束本次AI练习</AlertDialogTitle>
            <AlertDialogDescription>结束后将生成练习复盘报告</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleEnd}>确定</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PracticeSessionPage;
