import { ArrowLeft, Search, BookOpen, FileText, MessageSquare, CheckSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const categories = [
  { title: "销售话术", icon: MessageSquare, color: "from-orange-100 to-orange-50", iconColor: "text-orange-500", count: 86 },
  { title: "产品手册", icon: FileText, color: "from-purple-100 to-purple-50", iconColor: "text-purple-500", count: 42 },
  { title: "行动指导", icon: CheckSquare, color: "from-teal-100 to-teal-50", iconColor: "text-teal-500", count: 35 },
];

const hotTools = [
  { title: "重新认识一线管理者", desc: "新手快速入门", views: 2203 },
  { title: "运用SMART原则制定目标", desc: "目标管理", views: 1036 },
  { title: "客户画像构建指南", desc: "客户管理", views: 892 },
  { title: "异议处理话术大全", desc: "销售必备", views: 1567 },
];

const hotCases = [
  { title: "如何给自视高的低绩效员工反馈？", score: 8.4, type: "示范案例", views: 25 },
  { title: "如何给迷茫的低绩效员工反馈？", score: 7.8, type: "示范案例", views: 18 },
  { title: "客户投诉升级处理全流程", score: 9.1, type: "优秀案例", views: 156 },
  { title: "大客户谈判成功复盘", score: 8.7, type: "优秀案例", views: 89 },
];

const KnowledgeBasePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">知识库</h1>
        <button className="ml-auto"><Search className="h-4.5 w-4.5 text-muted-foreground" /></button>
      </div>

      <div className="p-4 space-y-5">
        {/* Category cards */}
        <div className="grid grid-cols-3 gap-2.5">
          {categories.map((cat) => (
            <div key={cat.title} className={`rounded-xl bg-gradient-to-b ${cat.color} p-3 cursor-pointer`}>
              <cat.icon className={`h-5 w-5 ${cat.iconColor} mb-2`} />
              <h4 className="text-xs font-semibold">{cat.title}</h4>
              <p className="text-[10px] text-muted-foreground">{cat.count}篇</p>
            </div>
          ))}
        </div>

        {/* Hot tools */}
        <div>
          <h3 className="text-sm font-semibold mb-3">热门工具</h3>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
            {hotTools.map((tool, i) => (
              <Card key={i} className="w-48 shrink-0 p-3.5 cursor-pointer hover:shadow-md transition-shadow">
                <h4 className="text-xs font-semibold leading-tight line-clamp-2 mb-2">{tool.title}</h4>
                <p className="text-[10px] text-muted-foreground mb-1.5">{tool.desc}</p>
                <span className="text-[10px] text-muted-foreground">{tool.views}浏览</span>
              </Card>
            ))}
          </div>
        </div>

        {/* Hot cases */}
        <div>
          <h3 className="text-sm font-semibold mb-3">优秀案例</h3>
          <div className="space-y-2.5">
            {hotCases.map((c, i) => (
              <Card key={i} className="p-3.5 cursor-pointer hover:shadow-md transition-shadow">
                <h4 className="text-xs font-semibold leading-tight mb-1.5">{c.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">{c.score}分</span>
                  <span className="text-[10px] text-muted-foreground">| {c.type}</span>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{c.views}浏览</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBasePage;
