import { ChevronRight, BarChart3, History, Map, Compass, Heart, MessageSquare, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const menuItems = [
  { icon: BarChart3, label: "综合评价", desc: "综合能力评分 82.7/100", path: "/comprehensive-eval" },
  { icon: History, label: "练习复盘", desc: "共完成24次AI对练", path: "/practice-review" },
  { icon: Map, label: "成长地图", desc: "查看岗位晋升路径与胜任力评估", path: "/growth-map" },
  { icon: Compass, label: "学习地图", desc: "游戏化学习闯关", path: "/learning-map" },
];

const myCollectionTabs = [
  { key: "likes", label: "我的点赞" },
  { key: "favorites", label: "我的收藏" },
  { key: "published", label: "我的发布" },
];

const likedItems = [
  { id: 1, title: "如何快速建立客户信任", type: "碎片学习", date: "2026-03-15" },
  { id: 2, title: "电话销售的黄金30秒", type: "碎片学习", date: "2026-03-12" },
];

const favoriteItems = [
  { id: 1, title: "客户投诉处理实战", type: "公开对练", author: "张明", score: 92, date: "2026-03-14" },
  { id: 2, title: "高效谈判技巧演练", type: "公开对练", author: "李华", score: 88, date: "2026-03-10" },
  { id: 3, title: "产品卖点提炼方法论", type: "碎片学习", date: "2026-03-08" },
];

const publishedItems = [
  { id: 1, title: "首次电话沟通", score: 85, likes: 12, date: "2026-03-13" },
  { id: 2, title: "价格谈判实战", score: 91, likes: 28, date: "2026-03-10" },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("likes");

  return (
    <div className="px-4 pb-4">
      <Card className="mt-4 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary/70 px-5 py-6 text-primary-foreground">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/20 text-xl font-bold">
              李
            </div>
            <div>
              <h2 className="text-base font-bold">李明</h2>
              <p className="text-xs opacity-90">销售顾问 · 华东区</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border py-4">
          {[
            { value: "128", label: "学习天数" },
            { value: "24", label: "练习次数" },
            { value: "6", label: "勋章数" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-lg font-bold text-primary">{stat.value}</span>
              <span className="text-[10px] text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-4 space-y-2">
        {menuItems.map((item) => (
          <Card
            key={item.label}
            className="flex cursor-pointer items-center gap-3 p-4 transition-shadow hover:shadow-md"
            onClick={() => navigate(item.path)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
              <item.icon className="h-4.5 w-4.5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium">{item.label}</h3>
              <p className="text-[10px] text-muted-foreground">{item.desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Card>
        ))}
      </div>

      {/* My Collection Section */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-3">我的内容</h3>
        <div className="flex gap-1 bg-muted rounded-xl p-1 mb-3">
          {myCollectionTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 rounded-lg py-2 text-[11px] font-medium transition-colors ${
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
            <Card key={item.id} className="p-3 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 shrink-0">
                <Heart className="h-4 w-4 text-red-400 fill-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-medium truncate">{item.title}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] rounded-full bg-primary/10 text-primary px-1.5 py-0.5">{item.type}</span>
                  <span className="text-[10px] text-muted-foreground">{item.date}</span>
                </div>
              </div>
            </Card>
          ))}

          {activeTab === "favorites" && favoriteItems.map((item) => (
            <Card key={item.id} className="p-3 flex items-center gap-3">
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
            <Card key={item.id} className="p-3 flex items-center gap-3">
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

export default ProfilePage;
