import { useState } from "react";
import { ArrowLeft, Search, MessageSquare, FileText, CheckSquare, Play, Users, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import coverObjection from "@/assets/cover-objection.jpg";
import coverPhoneSales from "@/assets/cover-phone-sales.jpg";
import coverProduct from "@/assets/cover-product.jpg";
import coverNegotiation from "@/assets/cover-negotiation.jpg";

const categories = [
  { title: "销售话术", icon: MessageSquare, color: "from-orange-100 to-orange-50", iconColor: "text-orange-500", count: 86 },
  { title: "产品手册", icon: FileText, color: "from-purple-100 to-purple-50", iconColor: "text-purple-500", count: 42 },
  { title: "行动指导", icon: CheckSquare, color: "from-teal-100 to-teal-50", iconColor: "text-teal-500", count: 35 },
];

const hotVideos = [
  { id: 1, title: "客户异议处理技巧", author: "张老师", learners: 2341, duration: "2h30m", cover: coverObjection },
  { id: 2, title: "电话销售开场白训练", author: "李讲师", learners: 1856, duration: "1h45m", cover: coverPhoneSales },
  { id: 3, title: "FABE法则实战应用", author: "陈老师", learners: 2100, duration: "1h20m", cover: coverObjection },
  { id: 4, title: "大客户管理策略", author: "孙总监", learners: 1567, duration: "2h", cover: coverNegotiation },
];

const hotDocs = [
  { id: 3, title: "产品卖点提炼方法论", author: "王教练", learners: 1203, duration: "45min", chapters: 10, tag: "产品知识", cover: coverProduct },
  { id: 4, title: "高效谈判策略", author: "赵导师", learners: 987, duration: "60min", chapters: 15, tag: "谈判技巧", cover: coverNegotiation },
  { id: 6, title: "CRM系统操作指南", author: "刘助教", learners: 890, duration: "30min", chapters: 5, tag: "工具使用", cover: coverProduct },
  { id: 8, title: "销售心理学入门", author: "周教授", learners: 3200, duration: "50min", chapters: 8, tag: "心理学", cover: coverNegotiation },
];

const hotCases = [
  { title: "如何给自视高的低绩效员工反馈？", score: 8.4, type: "示范案例", views: 25 },
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

        {/* Hot Videos - horizontal scroll */}
        <div>
          <h3 className="text-sm font-semibold mb-3">🔥 热门视频</h3>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
            {hotVideos.map((v) => (
              <Card
                key={v.id}
                className="w-44 shrink-0 cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
                onClick={() => navigate(`/course/${v.id}?type=video`)}
              >
                <div className="relative h-24 overflow-hidden">
                  <img src={v.cover} alt={v.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80">
                      <Play className="h-4 w-4 text-primary ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-medium leading-tight line-clamp-2">{v.title}</h4>
                  <p className="mt-1 text-[10px] text-muted-foreground">{v.author} · {v.duration}</p>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Users className="h-3 w-3" />{v.learners}人学习
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Hot Docs */}
        <div>
          <h3 className="text-sm font-semibold mb-3">📄 热门文档</h3>
          <div className="space-y-2.5">
            {hotDocs.map((doc) => (
              <Card
                key={doc.id}
                className="flex gap-3 p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/course/${doc.id}?type=pdf`)}
              >
                <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-xl overflow-hidden">
                  <img src={doc.cover} alt={doc.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="rounded bg-accent px-1.5 py-0.5 text-[9px] text-accent-foreground font-medium">文档</span>
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">{doc.tag}</span>
                  </div>
                  <h3 className="text-xs font-semibold leading-tight line-clamp-1">{doc.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span>{doc.author}</span>
                    <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" />{doc.duration}</span>
                    <span className="flex items-center gap-0.5"><Users className="h-3 w-3" />{doc.learners}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Cases */}
        <div>
          <h3 className="text-sm font-semibold mb-3">⭐ 优秀案例</h3>
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
