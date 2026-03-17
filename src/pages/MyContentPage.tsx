import { ArrowLeft, Heart, MessageSquare, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const tabs = [
  { key: "likes", label: "我的点赞" },
  { key: "favorites", label: "我的收藏" },
  { key: "published", label: "我的发布" },
];

const likedItems = [
  { id: 1, title: "如何快速建立客户信任", type: "碎片学习", category: "fragment", date: "2026-03-15" },
  { id: 2, title: "电话销售的黄金30秒", type: "碎片学习", category: "fragment", date: "2026-03-12" },
  { id: 3, title: "客户投诉处理实战", type: "公开对练", category: "practice", author: "张明", score: 92, date: "2026-03-14" },
];

const favoriteItems = [
  { id: 1, title: "客户投诉处理实战", type: "公开对练", category: "practice", author: "张明", score: 92, date: "2026-03-14" },
  { id: 2, title: "高效谈判技巧演练", type: "公开对练", category: "practice", author: "李华", score: 88, date: "2026-03-10" },
  { id: 3, title: "产品卖点提炼方法论", type: "碎片学习", category: "fragment", date: "2026-03-08" },
];

const publishedItems = [
  { id: 1, title: "首次电话沟通", score: 85, likes: 12, date: "2026-03-13" },
  { id: 2, title: "价格谈判实战", score: 91, likes: 28, date: "2026-03-10" },
];

const MyContentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "likes";
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate("/profile")}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">我的内容</h1>
      </div>

      <div className="p-4">
        <div className="flex gap-1 bg-muted rounded-xl p-1 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 rounded-lg py-2.5 text-[11px] font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {activeTab === "likes" && likedItems.map((item) => (
            <Card
              key={item.id}
              className="p-3 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                if (item.category === "fragment") navigate("/fragment-learn");
                else navigate(`/shared-practice/${item.id}`);
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 shrink-0">
                <Heart className="h-4 w-4 text-red-400 fill-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-medium truncate">{item.title}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] rounded-full bg-primary/10 text-primary px-1.5 py-0.5">{item.type}</span>
                  {item.author && <span className="text-[10px] text-muted-foreground">by {item.author}</span>}
                  <span className="text-[10px] text-muted-foreground">{item.date}</span>
                </div>
              </div>
            </Card>
          ))}

          {activeTab === "favorites" && favoriteItems.map((item) => (
            <Card
              key={item.id}
              className="p-3 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                if (item.category === "fragment") navigate("/fragment-learn");
                else navigate(`/shared-practice/${item.id}`);
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-50 shrink-0">
                <MessageSquare className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-medium truncate">{item.title}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] rounded-full bg-primary/10 text-primary px-1.5 py-0.5">{item.type}</span>
                  {item.author && <span className="text-[10px] text-muted-foreground">by {item.author}</span>}
                  {item.score && <span className="text-[10px] text-primary font-medium">{item.score}分</span>}
                </div>
              </div>
            </Card>
          ))}

          {activeTab === "published" && publishedItems.map((item) => (
            <Card
              key={item.id}
              className="p-3 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/shared-practice/${item.id}`)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <Share2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-medium truncate">{item.title}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-primary font-medium">{item.score}分</span>
                  <span className="text-[10px] text-muted-foreground">❤️ {item.likes}</span>
                  <span className="text-[10px] text-muted-foreground">{item.date}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyContentPage;
