import { useState } from "react";
import { ArrowLeft, Heart, MessageCircle, Star, Share2, BookmarkPlus, ThumbsUp, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const practiceDetail = {
  id: 1,
  user: "用户3829_8wq",
  avatar: "🧑",
  role: "舍不得扔东西的女孩",
  roleDesc: "AI当事人 — 习惯把几乎所有可能"以后会用到"的...",
  caseIntro: "来访者：大概两周前吧。咨询师：你在这里租房有多久了？",
  conversation: [
    { role: "user" as const, text: "你好，有什么可以帮到你？" },
    { role: "ai" as const, text: "嗯，我叫林若溪，其实也没什么特别的事，就是最近有点烦。" },
    { role: "user" as const, text: "你好，若溪，我是咨询师黄素，你可以叫我黄老师。" },
    { role: "ai" as const, text: "好的，黄老师。" },
    { role: "user" as const, text: "那你可以跟我说说最近有什么让你烦心的事情吗？" },
    { role: "ai" as const, text: "就是...我家里东西太多了，我妈总说我，但我就是舍不得扔。" },
  ],
  comments: [
    { id: 1, user: "学习达人", avatar: "👨‍🎓", text: "这个案例分析得很好，学到了共情技巧！", likes: 12, time: "2小时前" },
    { id: 2, user: "新手小白", avatar: "🧑‍💻", text: "请问开场白应该怎么说比较好？", likes: 5, time: "5小时前" },
    { id: 3, user: "资深培训师", avatar: "👩‍🏫", text: "建议在第三句时可以更深入一些", likes: 23, time: "1天前" },
  ],
  likes: 342,
  stars: 89,
  shares: 45,
};

const SharedPracticeDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tab, setTab] = useState<"chat" | "comments">("chat");
  const [liked, setLiked] = useState(false);
  const [starred, setStarred] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">首次咨询</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* User info */}
        <div className="px-4 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{practiceDetail.avatar}</span>
            <span className="text-sm font-medium">{practiceDetail.user}</span>
          </div>

          {/* Case card */}
          <Card className="mb-3 p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-medium">{practiceDetail.role}</span>
                <span className="ml-2 text-[10px] text-muted-foreground">AI当事人</span>
              </div>
              <button className="rounded-full bg-primary/10 px-3 py-1 text-[11px] text-primary font-medium">
                去对练 &gt;
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground line-clamp-2">{practiceDetail.roleDesc}</p>
          </Card>

          {/* Case intro */}
          <Card className="mb-4 border-l-2 border-l-primary p-3">
            <h4 className="text-xs font-semibold text-primary mb-1">📋 案例简介</h4>
            <p className="text-[11px] text-muted-foreground">{practiceDetail.caseIntro}</p>
          </Card>

          {/* Action bar */}
          <div className="flex items-center justify-around py-3 border-y border-border mb-3">
            <button className="flex flex-col items-center gap-0.5 text-muted-foreground">
              <MessageCircle className="h-5 w-5" />
              <span className="text-[10px]">讨论</span>
            </button>
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
            <button className="flex flex-col items-center gap-0.5 text-muted-foreground">
              <Share2 className="h-5 w-5" />
              <span className="text-[10px]">分享</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-4">
          <button
            onClick={() => setTab("chat")}
            className={`flex-1 pb-2 text-center text-xs font-semibold ${tab === "chat" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          >
            第1次
          </button>
          <button
            onClick={() => setTab("comments")}
            className={`flex-1 pb-2 text-center text-xs font-semibold ${tab === "comments" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          >
            评论 ({practiceDetail.comments.length})
          </button>
        </div>

        {tab === "chat" && (
          <div className="p-4 space-y-3">
            <p className="text-center text-[10px] text-muted-foreground mb-3">当事人由AI扮演，仅作练习</p>
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
        )}

        {tab === "comments" && (
          <div className="p-4 space-y-4">
            {practiceDetail.comments.map((c) => (
              <div key={c.id} className="flex gap-2.5">
                <span className="text-lg shrink-0">{c.avatar}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
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
        )}
      </div>

      {/* Comment input */}
      {tab === "comments" && (
        <div className="border-t border-border bg-card p-3 flex items-center gap-2">
          <Input
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="写下你的评论..."
            className="h-9 text-xs"
          />
          <Button size="icon" className="h-9 w-9 shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SharedPracticeDetailPage;
