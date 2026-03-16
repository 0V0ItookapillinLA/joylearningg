import { useState } from "react";
import { ArrowLeft, Search, Play, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import coverObjection from "@/assets/cover-objection.jpg";
import coverPhoneSales from "@/assets/cover-phone-sales.jpg";
import coverProduct from "@/assets/cover-product.jpg";
import coverNegotiation from "@/assets/cover-negotiation.jpg";

const filterTags = ["全部", "销售话术", "产品手册", "行动指导", "谈判技巧", "客户服务"];

type ContentItem = {
  id: number;
  title: string;
  type: "video" | "doc";
  author: string;
  duration: string;
  learners: number;
  cover: string;
  tags: string[];
};

const allContent: ContentItem[] = [
  { id: 1, title: "客户异议处理技巧", type: "video", author: "张老师", duration: "2h30m", learners: 2341, cover: coverObjection, tags: ["销售话术", "客户服务"] },
  { id: 2, title: "电话销售开场白训练", type: "video", author: "李讲师", duration: "1h45m", learners: 1856, cover: coverPhoneSales, tags: ["销售话术"] },
  { id: 5, title: "FABE法则实战应用", type: "video", author: "陈老师", duration: "1h20m", learners: 2100, cover: coverObjection, tags: ["销售话术", "产品手册"] },
  { id: 6, title: "大客户管理策略", type: "video", author: "孙总监", duration: "2h", learners: 1567, cover: coverNegotiation, tags: ["谈判技巧"] },
  { id: 7, title: "销售心理学基础", type: "video", author: "周教授", duration: "1h50m", learners: 3200, cover: coverProduct, tags: ["销售话术"] },
  { id: 3, title: "产品卖点提炼方法论", type: "doc", author: "王教练", duration: "45min", learners: 1203, cover: coverProduct, tags: ["产品手册"] },
  { id: 4, title: "高效谈判策略", type: "doc", author: "赵导师", duration: "60min", learners: 987, cover: coverNegotiation, tags: ["谈判技巧"] },
  { id: 8, title: "CRM系统操作指南", type: "doc", author: "刘助教", duration: "30min", learners: 890, cover: coverProduct, tags: ["行动指导"] },
  { id: 9, title: "销售心理学入门", type: "doc", author: "周教授", duration: "50min", learners: 3200, cover: coverNegotiation, tags: ["销售话术"] },
  { id: 10, title: "客户服务标准手册", type: "doc", author: "马主管", duration: "40min", learners: 1450, cover: coverObjection, tags: ["客户服务", "行动指导"] },
];

const KnowledgeBasePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"video" | "doc">("video");
  const [activeFilter, setActiveFilter] = useState("全部");

  const filtered = allContent.filter((item) => {
    const matchType = item.type === activeTab;
    const matchTag = activeFilter === "全部" || item.tags.includes(activeFilter);
    return matchType && matchTag;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
          <h1 className="text-sm font-semibold">知识库</h1>
          <button className="ml-auto"><Search className="h-4.5 w-4.5 text-muted-foreground" /></button>
        </div>

        {/* Tabs */}
        <div className="flex px-4 gap-6 border-b border-border">
          {(["video", "doc"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2.5 text-sm font-medium transition-colors relative ${
                activeTab === tab ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {tab === "video" ? "视频" : "文档"}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 py-2.5">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeFilter === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Content list */}
      <div className="p-4 space-y-2.5">
        {filtered.map((item) => (
          <Card
            key={item.id}
            className="flex gap-3 p-3 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(item.type === "video" ? `/video/${item.id}` : `/doc/${item.id}`)}
          >
            <div className="relative h-20 w-28 shrink-0 rounded-xl overflow-hidden">
              <img src={item.cover} alt={item.title} className="h-full w-full object-cover" />
              {item.type === "video" && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80">
                    <Play className="h-3.5 w-3.5 text-primary ml-0.5" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div>
                <h3 className="text-xs font-semibold leading-tight line-clamp-2">{item.title}</h3>
                <div className="mt-1 flex flex-wrap gap-1">
                  {item.tags.map((t) => (
                    <span key={t} className="rounded bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span>{item.author}</span>
                <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" />{item.duration}</span>
                <span className="flex items-center gap-0.5"><Users className="h-3 w-3" />{item.learners}</span>
              </div>
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-muted-foreground">暂无相关内容</div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBasePage;
