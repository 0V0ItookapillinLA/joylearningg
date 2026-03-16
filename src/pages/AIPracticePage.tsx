import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import roleCustomerService from "@/assets/role-customer-service.png";
import roleSalesManager from "@/assets/role-sales-manager.png";
import roleAngryCustomer from "@/assets/role-angry-customer.png";
import roleNegotiator from "@/assets/role-negotiator.png";

const viewTabs = ["按实操练习", "按角色练习"];
const filterTabs = ["全部练习", "基本功", "自由练习", "客户服务", "谈判技巧"];

const practices = [
  { id: 1, tag: "#识别并表达情绪", title: "因觉得不被需要和孤独的忧郁老年人", avatar: roleAngryCustomer, mode: "自由对话", times: 22800, featured: true },
  { id: 2, tag: "#建构良好的咨访关系", title: "完美主义高二女生的社交自救计划", avatar: roleCustomerService, mode: "固定剧本", times: 7100, featured: true },
  { id: 3, tag: "#设定咨询目标", title: "恐惧突围：完美主义高二女生的社交自救", avatar: roleSalesManager, mode: "自由对话", times: 1000, featured: false },
  { id: 4, tag: "#建立咨访关系", title: "处于瓶颈期的家庭事业双重压力人", avatar: roleNegotiator, mode: "文本对练", times: 4200, featured: false },
  { id: 5, tag: "#尊重", title: "离婚后陷入绝望的工厂主管", avatar: roleAngryCustomer, mode: "固定剧本", times: 2500, featured: false },
  { id: 6, tag: "#面质", title: "在职场压力下寻找自我价值的产品经理", avatar: roleCustomerService, mode: "自由对话", times: 2000, featured: false },
  { id: 7, tag: "#心理危机状态评估", title: "丧妻后情感崩溃的退休工人", avatar: roleSalesManager, mode: "文本对练", times: 1900, featured: false },
  { id: 8, tag: "#尊重", title: "因学业压力与社交孤立的中度焦虑高一男生", avatar: roleNegotiator, mode: "固定剧本", times: 1600, featured: false },
];

const tagColor: Record<string, string> = {
  "自由对话": "bg-primary/10 text-primary",
  "固定剧本": "bg-accent text-accent-foreground",
  "文本对练": "bg-muted text-muted-foreground",
};

const AIPracticePage = () => {
  const navigate = useNavigate();
  const [viewTab, setViewTab] = useState(0);
  const [filterTab, setFilterTab] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
          <h1 className="text-sm font-semibold">AI 对练</h1>
          <button className="ml-auto"><Search className="h-4.5 w-4.5 text-muted-foreground" /></button>
        </div>
        {/* View tabs */}
        <div className="flex gap-4 px-4 pb-1">
          {viewTabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setViewTab(i)}
              className={`pb-2 text-sm font-bold transition-colors ${
                viewTab === i ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Filter tabs */}
        <div className="flex gap-1 px-4 pb-2 overflow-x-auto hide-scrollbar">
          {filterTabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setFilterTab(i)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filterTab === i ? "bg-foreground text-background" : "text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Practice grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {practices.map((p) => (
            <Card
              key={p.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/practice-detail/${p.id}`)}
            >
              <div className="relative bg-gradient-to-br from-primary/5 to-accent/30 p-3 pb-2">
                <span className="text-[10px] text-primary font-medium">{p.tag}</span>
                {p.featured && (
                  <span className="absolute top-2 right-2 rounded bg-destructive px-1.5 py-0.5 text-[9px] font-bold text-white">大咖出题</span>
                )}
              </div>
              <div className="flex items-start gap-2 p-3 pt-1">
                <img src={p.avatar} alt="" className="h-10 w-10 rounded-full object-cover shrink-0 bg-muted" />
                <h4 className="text-xs font-semibold leading-tight line-clamp-2">{p.title}</h4>
              </div>
              <div className="px-3 pb-3 flex items-center justify-between">
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${tagColor[p.mode] || "bg-muted text-muted-foreground"}`}>
                  {p.mode}
                </span>
                <span className="text-[10px] text-muted-foreground">{p.times.toLocaleString()}+人次练过</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIPracticePage;
