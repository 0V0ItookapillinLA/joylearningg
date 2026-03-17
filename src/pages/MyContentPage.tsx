import { ArrowLeft, Heart, Bookmark, Play, Share2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const tabs = [
  { key: "likes", label: "我的点赞" },
  { key: "favorites", label: "我的收藏" },
  { key: "published", label: "我的发布" },
];

interface ContentItem {
  id: number;
  title: string;
  type: "fragment" | "practice";
  cover: string;
  author?: string;
  score?: number;
  likes?: number;
  date: string;
  desc?: string;
}

const likedItems: ContentItem[] = [
  { id: 1, title: "3分钟学会FABE法则", type: "fragment", cover: "from-blue-900 to-indigo-800", author: "张老师", likes: 342, date: "2026-03-15", desc: "销售中最实用的话术框架" },
  { id: 2, title: "客户投诉处理实战", type: "practice", cover: "from-orange-900 to-red-800", author: "张明", score: 92, date: "2026-03-14", desc: "LAST原则处理客户投诉" },
  { id: 3, title: "电话销售黄金开场白", type: "fragment", cover: "from-teal-900 to-cyan-800", author: "王教练", likes: 567, date: "2026-03-12", desc: "前15秒决定成败" },
  { id: 4, title: "高效谈判技巧演练", type: "practice", cover: "from-purple-900 to-pink-800", author: "李华", score: 88, date: "2026-03-10", desc: "价格谈判与让步策略" },
  { id: 5, title: "客户说'太贵了'怎么办", type: "fragment", cover: "from-purple-900 to-pink-800", author: "李讲师", likes: 891, date: "2026-03-08", desc: "价格异议三步法" },
];

const favoriteItems: ContentItem[] = [
  { id: 1, title: "客户投诉处理实战", type: "practice", cover: "from-orange-900 to-red-800", author: "张明", score: 92, date: "2026-03-14", desc: "LAST原则处理客户投诉" },
  { id: 2, title: "产品演示的5个技巧", type: "fragment", cover: "from-emerald-900 to-green-800", author: "陈老师", likes: 445, date: "2026-03-11", desc: "产品演示不是功能罗列" },
  { id: 3, title: "高效谈判技巧演练", type: "practice", cover: "from-purple-900 to-pink-800", author: "李华", score: 88, date: "2026-03-10", desc: "价格谈判与让步策略" },
  { id: 4, title: "如何有效处理客户投诉", type: "fragment", cover: "from-orange-900 to-red-800", author: "赵导师", likes: 1203, date: "2026-03-08", desc: "投诉的客户是最好的客户" },
];

const publishedItems = [
  { id: 1, title: "首次电话沟通", score: 85, likes: 12, date: "2026-03-13" },
  { id: 2, title: "价格谈判实战", score: 91, likes: 28, date: "2026-03-10" },
  { id: 3, title: "客户跟进回访", score: 78, likes: 5, date: "2026-03-05" },
];

const ContentCard = ({ item, onClick }: { item: ContentItem; onClick: () => void }) => (
  <div className="cursor-pointer overflow-hidden rounded-xl bg-card shadow-sm border border-border" onClick={onClick}>
    {/* Cover */}
    <div className={`relative aspect-[4/3] bg-gradient-to-br ${item.cover} flex items-end p-2.5`}>
      {item.type === "fragment" && (
        <div className="absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <Play className="h-3 w-3 text-white fill-white" />
        </div>
      )}
      {item.type === "practice" && item.score && (
        <div className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {item.score}
        </div>
      )}
    </div>
    {/* Info */}
    <div className="p-2.5">
      <h4 className="text-[11px] font-semibold leading-tight line-clamp-2 mb-1">{item.title}</h4>
      {item.desc && <p className="text-[10px] text-muted-foreground line-clamp-1 mb-1.5">{item.desc}</p>}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-muted text-[8px] font-bold text-muted-foreground">
            {item.author?.charAt(0)}
          </div>
          <span className="text-[10px] text-muted-foreground">{item.author}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <Heart className="h-3 w-3 text-red-400 fill-red-400" />
          <span className="text-[10px] text-muted-foreground">{item.likes || item.score}</span>
        </div>
      </div>
    </div>
  </div>
);

const MyContentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "likes";
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleItemClick = (item: ContentItem) => {
    if (item.type === "fragment") navigate("/fragment-learn");
    else navigate(`/shared-practice/${item.id}`);
  };

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

        {/* Xiaohongshu-style 2-column masonry for likes & favorites */}
        {(activeTab === "likes" || activeTab === "favorites") && (
          <div className="columns-2 gap-3 space-y-3">
            {(activeTab === "likes" ? likedItems : favoriteItems).map((item) => (
              <div key={item.id} className="break-inside-avoid">
                <ContentCard item={item} onClick={() => handleItemClick(item)} />
              </div>
            ))}
          </div>
        )}

        {/* Published list */}
        {activeTab === "published" && (
          <div className="space-y-2">
            {publishedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/shared-practice/${item.id}`)}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                  <Share2 className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold truncate">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-primary font-medium">{item.score}分</span>
                    <span className="text-[10px] text-muted-foreground">❤️ {item.likes}</span>
                    <span className="text-[10px] text-muted-foreground">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyContentPage;
