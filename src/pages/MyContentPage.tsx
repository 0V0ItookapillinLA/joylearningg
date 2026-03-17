import { ArrowLeft, Heart, Play, Share2, MessageCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import practiceComplaint from "@/assets/practice-complaint.jpg";
import practicePhone from "@/assets/practice-phone.jpg";
import practiceNegotiation from "@/assets/practice-negotiation.jpg";
import practiceDemo from "@/assets/practice-demo.jpg";
import coverObjection from "@/assets/cover-objection.jpg";
import coverPhoneSales from "@/assets/cover-phone-sales.jpg";
import coverProduct from "@/assets/cover-product.jpg";
import coverNegotiation from "@/assets/cover-negotiation.jpg";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";
import banner3 from "@/assets/banner3.jpg";

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
  author: string;
  avatar: string;
  score?: number;
  likes: number;
  desc: string;
}

const likedItems: ContentItem[] = [
  { id: 1, title: "3分钟学会FABE法则", type: "fragment", cover: banner1, author: "张老师", avatar: "张", likes: 342, desc: "销售中最实用的话术框架" },
  { id: 2, title: "客户投诉处理实战", type: "practice", cover: practiceComplaint, author: "张明", avatar: "张", score: 92, likes: 128, desc: "LAST原则处理客户投诉" },
  { id: 3, title: "电话销售黄金开场白", type: "fragment", cover: coverPhoneSales, author: "王教练", avatar: "王", likes: 567, desc: "前15秒决定成败" },
  { id: 4, title: "高效谈判技巧演练", type: "practice", cover: practiceNegotiation, author: "李华", avatar: "李", score: 88, likes: 76, desc: "价格谈判与让步策略" },
  { id: 5, title: "客户说'太贵了'怎么办", type: "fragment", cover: banner2, author: "李讲师", avatar: "李", likes: 891, desc: "价格异议三步法" },
  { id: 6, title: "产品卖点提炼方法", type: "fragment", cover: coverProduct, author: "陈老师", avatar: "陈", likes: 445, desc: "FABE法则实战应用" },
];

const favoriteItems: ContentItem[] = [
  { id: 1, title: "客户投诉处理实战", type: "practice", cover: practiceComplaint, author: "张明", avatar: "张", score: 92, likes: 128, desc: "LAST原则处理客户投诉" },
  { id: 2, title: "产品演示的5个技巧", type: "fragment", cover: coverProduct, author: "陈老师", avatar: "陈", likes: 445, desc: "产品演示不是功能罗列" },
  { id: 3, title: "高效谈判技巧演练", type: "practice", cover: coverNegotiation, author: "李华", avatar: "李", score: 88, likes: 76, desc: "价格谈判与让步策略" },
  { id: 4, title: "如何有效处理客户投诉", type: "fragment", cover: banner3, author: "赵导师", avatar: "赵", likes: 1203, desc: "投诉的客户是最好的客户" },
  { id: 5, title: "电话销售首次沟通", type: "practice", cover: practicePhone, author: "王芳", avatar: "王", score: 85, likes: 52, desc: "新客户首次电话沟通流程" },
];

const publishedItems: ContentItem[] = [
  { id: 1, title: "首次电话沟通", type: "practice", cover: practicePhone, author: "我", avatar: "我", score: 85, likes: 12, desc: "新客户首次电话沟通标准流程" },
  { id: 2, title: "价格谈判实战", type: "practice", cover: practiceNegotiation, author: "我", avatar: "我", score: 91, likes: 28, desc: "价格谈判与让步策略演练" },
  { id: 3, title: "客户跟进回访", type: "practice", cover: practiceDemo, author: "我", avatar: "我", score: 78, likes: 5, desc: "提升客户满意度的回访技巧" },
  { id: 4, title: "产品演示模拟", type: "practice", cover: coverObjection, author: "我", avatar: "我", score: 82, likes: 18, desc: "用FABE法则进行产品演示" },
];

const ContentCard = ({ item, onClick }: { item: ContentItem; onClick: () => void }) => (
  <div className="cursor-pointer overflow-hidden rounded-xl bg-card shadow-sm border border-border" onClick={onClick}>
    <div className="relative">
      <img src={item.cover} alt={item.title} className="w-full aspect-[4/3] object-cover" />
      {item.type === "fragment" && (
        <div className="absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground/30 backdrop-blur-sm">
          <Play className="h-3 w-3 text-white fill-white" />
        </div>
      )}
      {item.type === "practice" && item.score && (
        <div className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {item.score}
        </div>
      )}
      {item.type === "practice" && (
        <div className="absolute bottom-2 left-2 rounded-full bg-foreground/30 backdrop-blur-sm px-2 py-0.5 text-[9px] text-white font-medium">
          对练
        </div>
      )}
    </div>
    <div className="p-2.5">
      <h4 className="text-[11px] font-semibold leading-tight line-clamp-2 mb-1">{item.title}</h4>
      {item.desc && <p className="text-[10px] text-muted-foreground line-clamp-1 mb-1.5">{item.desc}</p>}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-muted text-[8px] font-bold text-muted-foreground">
            {item.avatar}
          </div>
          <span className="text-[10px] text-muted-foreground">{item.author}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <Heart className="h-3 w-3 text-red-400 fill-red-400" />
          <span className="text-[10px] text-muted-foreground">{item.likes}</span>
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

  const currentItems = activeTab === "likes" ? likedItems : activeTab === "favorites" ? favoriteItems : publishedItems;

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

        <div className="columns-2 gap-3 space-y-3">
          {currentItems.map((item) => (
            <div key={`${activeTab}-${item.id}`} className="break-inside-avoid">
              <ContentCard item={item} onClick={() => handleItemClick(item)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyContentPage;
