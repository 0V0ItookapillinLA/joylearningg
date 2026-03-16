import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Heart, MessageCircle, X, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const videos = [
  { id: 1, title: "3分钟学会FABE法则", author: "张老师", likes: 342, comments: 56, color: "from-blue-900 to-indigo-800", content: "FABE法则是销售中最实用的话术框架：\n\nF（Feature）特征 - 产品有什么\nA（Advantage）优势 - 比别人好在哪\nB（Benefit）利益 - 能给客户带来什么\nE（Evidence）证据 - 用什么证明\n\n举例：这款CRM系统（F）支持AI智能分析客户画像（A），帮您节省50%的客户跟进时间（B），已有500+企业验证效果（E）。" },
  { id: 2, title: "客户说'太贵了'怎么办？", author: "李讲师", likes: 891, comments: 123, color: "from-purple-900 to-pink-800", content: "价格异议是销售中最常见的问题。记住三步法：\n\n1️⃣ 认同感受\n\"我理解您的顾虑，价格确实是重要的考量因素。\"\n\n2️⃣ 转移焦点到价值\n\"不过让我帮您算一笔账...\"\n\n3️⃣ 提供对比\n\"和同类产品相比，我们的性价比其实是最高的。\"\n\n关键：永远不要第一时间降价！" },
  { id: 3, title: "电话销售黄金开场白", author: "王教练", likes: 567, comments: 89, color: "from-teal-900 to-cyan-800", content: "电话销售的前15秒决定成败！\n\n❌ 错误示范：\n\"您好，我是XX公司的小王，我们公司是做...\"\n\n✅ 正确示范：\n\"张总您好，我是小王。我注意到贵公司最近在扩展华东市场，我们刚好帮助了3家类似企业提升了30%的获客效率，想用2分钟跟您分享一下。\"\n\n核心原则：先给价值，再介绍自己。" },
  { id: 4, title: "如何有效处理客户投诉", author: "赵导师", likes: 1203, comments: 234, color: "from-orange-900 to-red-800", content: "LAST原则处理客户投诉：\n\nL（Listen）倾听\n让客户把话说完，不要打断\n\nA（Apologize）道歉\n\"非常抱歉给您带来了不好的体验\"\n\nS（Solve）解决\n提供具体的解决方案，最好给2-3个选项\n\nT（Thank）感谢\n\"感谢您的反馈，帮助我们改进服务\"\n\n记住：投诉的客户是最好的客户！" },
  { id: 5, title: "产品演示的5个技巧", author: "陈老师", likes: 445, comments: 67, color: "from-emerald-900 to-green-800", content: "产品演示不是功能罗列！\n\n技巧1：先问需求再演示\n技巧2：用客户的语言描述功能\n技巧3：每个功能都关联一个客户痛点\n技巧4：准备好'哇'时刻\n技巧5：演示结束时总结3个核心价值\n\n黄金比例：\n30% 提问互动\n50% 针对性演示\n20% 总结与下一步" },
];

const mockComments = [
  { id: 1, user: "销售小李", avatar: "李", date: "2026-03-15", text: "讲得太好了，FABE法则在实际工作中特别好用！" },
  { id: 2, user: "新人小张", avatar: "张", date: "2026-03-14", text: "请问有更多案例吗？想多练习一下。" },
  { id: 3, user: "王经理", avatar: "王", date: "2026-03-14", text: "已经推荐给团队了，大家都觉得很实用。" },
  { id: 4, user: "陈顾问", avatar: "陈", date: "2026-03-13", text: "建议可以加一些B2B场景的案例。" },
  { id: 5, user: "赵主管", avatar: "赵", date: "2026-03-12", text: "这个系列做得很好，期待更新！" },
];

const FragmentLearnPage = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(mockComments);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight);
      setCurrentIdx(idx);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const video = videos[currentIdx];

  const sendComment = () => {
    if (!commentInput.trim()) return;
    setComments(prev => [
      { id: Date.now(), user: "我", avatar: "我", date: "2026-03-16", text: commentInput },
      ...prev,
    ]);
    setCommentInput("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3">
        <button onClick={() => navigate(-1)} className="text-white/90">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-xs font-medium text-white/80">碎片化学习</span>
        <div className="w-5" />
      </div>

      {/* Video feed - snap scroll */}
      <div ref={containerRef} className="h-full w-full overflow-y-auto snap-y snap-mandatory hide-scrollbar">
        {videos.map((v) => (
          <div key={v.id} className={`relative h-full w-full snap-start flex items-center justify-center bg-gradient-to-b ${v.color}`}>
            {/* Content display */}
            <div className="px-8 pr-16 w-full max-h-[70vh] overflow-y-auto hide-scrollbar">
              <h2 className="text-lg font-bold text-white mb-4">{v.title}</h2>
              <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">{v.content}</p>
            </div>

            {/* Right side actions - only like and comment */}
            <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5">
              <button
                onClick={() => setLiked(prev => prev.includes(v.id) ? prev.filter(id => id !== v.id) : [...prev, v.id])}
                className="flex flex-col items-center gap-1"
              >
                <Heart className={`h-7 w-7 ${liked.includes(v.id) ? "fill-red-500 text-red-500" : "text-white"}`} />
                <span className="text-[10px] text-white">{v.likes + (liked.includes(v.id) ? 1 : 0)}</span>
              </button>
              <button
                onClick={() => setShowComments(true)}
                className="flex flex-col items-center gap-1"
              >
                <MessageCircle className="h-7 w-7 text-white" />
                <span className="text-[10px] text-white">{v.comments}</span>
              </button>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-8 left-4 right-16">
              <p className="text-sm font-semibold text-white mb-1">{v.title}</p>
              <p className="text-xs text-white/60">@{v.author} · 知识分享</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comment half-screen modal */}
      <AnimatePresence>
        {showComments && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/50"
              onClick={() => setShowComments(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[70] mx-auto max-w-[430px] flex flex-col rounded-t-[20px] bg-card"
              style={{ height: "55vh" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="text-sm font-semibold">{comments.length} 条评论</span>
                <button onClick={() => setShowComments(false)}>
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              {/* Comments list */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                      {c.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold">{c.user}</span>
                        <span className="text-[10px] text-muted-foreground">{c.date}</span>
                      </div>
                      <p className="text-[12px] text-foreground/80 mt-1 leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fixed input at bottom */}
              <div className="flex items-center gap-2 border-t border-border p-3 bg-card">
                <input
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendComment()}
                  placeholder="写下你的评论..."
                  className="flex-1 h-9 rounded-full bg-muted px-4 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={sendComment}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FragmentLearnPage;
