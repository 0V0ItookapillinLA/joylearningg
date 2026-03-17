import { useState } from "react";
import { ArrowLeft, ThumbsUp, Star, MessageCircle, Send, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const practiceDetail = {
  id: 1,
  user: "销售冠军小李",
  avatar: "🏆",
  role: "难缠客户王先生",
  roleDesc: "模拟客户因产品质量问题进行投诉的场景，考验异议处理和情绪管理能力",
  tag: "自由对话",
  practiceId: 1,
  caseIntro: "客户王先生购买产品后发现存在噪音问题，情绪激动要求退货退款，需要安抚客户情绪并提供解决方案。",
  conversation: [
    { role: "ai" as const, text: "你好，我是客户王先生。你们的产品噪音太大了，我要退货！" },
    { role: "user" as const, text: "王先生您好，非常抱歉给您带来不好的体验。我完全理解您的心情，噪音问题确实会影响使用。" },
    { role: "ai" as const, text: "你们这个产品质量也太差了吧，我花了这么多钱买的！" },
    { role: "user" as const, text: "您说得对，您花了不少钱，肯定期望有好的体验。请问您方便告诉我具体是在什么场景下出现的噪音吗？" },
    { role: "ai" as const, text: "就是晚上睡觉的时候，嗡嗡响根本没法睡！" },
    { role: "user" as const, text: "完全理解，晚间噪音确实很影响休息。我这边有两个方案可以帮您：第一是免费上门检测调试，第二是为您更换同型号新品，您看哪个方案更合适？" },
    { role: "ai" as const, text: "你们能保证换了之后就没有噪音了吗？" },
    { role: "user" as const, text: "当然可以。我们的新批次产品已经升级了静音模块，噪音值降低了60%以上。如果您选择更换，我们还会赠送一年延保服务。" },
    { role: "ai" as const, text: "那换货需要多长时间？我可不想等太久。" },
    { role: "user" as const, text: "王先生放心，我们会在48小时内安排送货上门，同时回收旧机。期间如果您有任何问题，可以随时联系我，我是您的专属客服小李。" },
    { role: "ai" as const, text: "嗯，那行吧，先试试看。" },
    { role: "user" as const, text: "感谢您的信任！我现在就为您提交换货申请，稍后会发短信通知您物流进度。祝您生活愉快，再见！" },
  ],
  comments: [
    { id: 1, user: "销售达人", avatar: "🔥", text: "开场的共情处理得很好，值得学习！", likes: 32, time: "2026-03-15" },
    { id: 2, user: "培训师老张", avatar: "👨‍🏫", text: "第三句的需求确认做得很专业，但建议在提供方案前可以多了解一些使用细节", likes: 28, time: "2026-03-14" },
    { id: 3, user: "新人小白", avatar: "🌱", text: "学到了，原来异议处理要先共情再解决问题", likes: 15, time: "2026-03-13" },
    { id: 4, user: "客服主管李姐", avatar: "👩‍💼", text: "提供两个方案让客户选择这个技巧很实用，给了客户掌控感", likes: 42, time: "2026-03-12" },
    { id: 5, user: "资深销售老王", avatar: "💼", text: "最后主动告知后续跟进流程很加分，客户体验闭环做得好", likes: 19, time: "2026-03-11" },
    { id: 6, user: "培训新人小陈", avatar: "📚", text: "这个对练记录收藏了，准备背下来当话术模板", likes: 8, time: "2026-03-10" },
  ],
  likes: 342,
  stars: 89,
};

const tagColor: Record<string, string> = {
  "自由对话": "bg-primary/10 text-primary",
  "固定剧本": "bg-accent text-accent-foreground",
  "文本对练": "bg-muted text-muted-foreground",
};

const SharedPracticeDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [starred, setStarred] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(practiceDetail.comments);

  const handleSendComment = () => {
    if (!commentInput.trim()) return;
    setComments([
      { id: Date.now(), user: "我", avatar: "😊", text: commentInput, likes: 0, time: "刚刚" },
      ...comments,
    ]);
    setCommentInput("");
  };

  return (
    <div className="fixed inset-0 mx-auto max-w-[430px] flex flex-col bg-background">
      {/* Fixed header */}
      <div className="shrink-0 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">对练分享详情</h1>
      </div>

      {/* Fixed info section */}
      <div className="shrink-0 px-4 pt-4 bg-background">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{practiceDetail.avatar}</span>
          <span className="text-sm font-medium">{practiceDetail.user}</span>
          <span className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-medium ${tagColor[practiceDetail.tag]}`}>{practiceDetail.tag}</span>
        </div>

        <Card className="mb-3 p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-medium">{practiceDetail.role}</span>
              <span className="ml-2 text-[10px] text-muted-foreground">AI角色</span>
            </div>
            <button
              className="rounded-full bg-primary px-3 py-1 text-[11px] text-primary-foreground font-medium"
              onClick={() => navigate(`/practice-detail/${practiceDetail.practiceId}`)}
            >
              去对练 &gt;
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground line-clamp-2">{practiceDetail.roleDesc}</p>
        </Card>

        <Card className="mb-3 border-l-2 border-l-primary p-3">
          <h4 className="text-xs font-semibold text-primary mb-1">📋 案例简介</h4>
          <p className="text-[11px] text-muted-foreground">{practiceDetail.caseIntro}</p>
        </Card>

        {/* Like + collect + comment */}
        <div className="flex items-center justify-around py-3 border-y border-border">
          <button
            className={`flex flex-col items-center gap-0.5 ${liked ? "text-destructive" : "text-muted-foreground"}`}
            onClick={() => setLiked(!liked)}
          >
            <ThumbsUp className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
            <span className="text-[10px]">点赞</span>
          </button>
          <button
            className={`flex flex-col items-center gap-0.5 ${starred ? "text-yellow-500" : "text-muted-foreground"}`}
            onClick={() => setStarred(!starred)}
          >
            <Star className={`h-5 w-5 ${starred ? "fill-current" : ""}`} />
            <span className="text-[10px]">收藏</span>
          </button>
          <button
            className="flex flex-col items-center gap-0.5 text-muted-foreground"
            onClick={() => setCommentOpen(true)}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-[10px]">评论</span>
          </button>
        </div>
      </div>

      {/* Scrollable conversation only */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <h3 className="text-xs font-semibold mb-3">对练记录</h3>
        <p className="text-center text-[10px] text-muted-foreground mb-3">角色由AI扮演，仅作练习参考</p>
        <div className="space-y-3">
          {practiceDetail.conversation.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary/10 text-foreground"
                  : "bg-muted text-foreground"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment panel */}
      <AnimatePresence>
        {commentOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setCommentOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-card rounded-t-2xl"
              style={{ height: "55vh" }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                <span className="text-sm font-semibold">{comments.length} 条评论</span>
                <button onClick={() => setCommentOpen(false)}>
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm">
                      {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">{c.user}</span>
                        <span className="text-[10px] text-muted-foreground">{c.time}</span>
                      </div>
                      <p className="mt-1 text-xs text-foreground">{c.text}</p>
                      <button className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                        <ThumbsUp className="h-3 w-3" />{c.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border bg-card p-3 flex items-center gap-2 shrink-0">
                <Input
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="写下你的评论..."
                  className="h-9 text-xs"
                  onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
                />
                <Button size="icon" className="h-9 w-9 shrink-0" onClick={handleSendComment}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SharedPracticeDetailPage;
