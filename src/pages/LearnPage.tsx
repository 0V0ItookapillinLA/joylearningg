import { useState } from "react";
import { BookOpen, ChevronRight, Target, Heart, MessageCircle, Eye, Clock, Flame, Award, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const sharedPractices = [
  { id: 1, user: "用户1393_fvp", avatar: "🧑", role: "渴望真爱的自信男士", title: "期待这个案例被督导。", likes: 45, comments: 12, views: 342 },
  { id: 2, user: "用户6256_fv0", avatar: "👩", role: "投诉客户王先生", title: "一种说不出的感觉，是什么感觉？", likes: 89, comments: 23, views: 891 },
  { id: 3, user: "用户1094_j00", avatar: "👨", role: "销售经理张总", title: "首次面试模拟，感觉收获很大", likes: 34, comments: 8, views: 567 },
  { id: 4, user: "小明同学", avatar: "🧑‍💼", role: "客服小美", title: "客户服务场景对练心得", likes: 120, comments: 56, views: 1203 },
  { id: 5, user: "培训师阿杰", avatar: "👨‍🏫", role: "谈判对手", title: "谈判场景的5个关键话术", likes: 210, comments: 78, views: 2345 },
  { id: 6, user: "新人小白", avatar: "🧑‍🎓", role: "面试官", title: "模拟面试的正确打开方式", likes: 67, comments: 15, views: 456 },
];

const weeklyHot = [
  { id: 7, user: "用户3310_vq2", avatar: "👩‍💼", role: "单身母亲的抉择", title: "新手的第一次对练-单亲妈妈的抉择", likes: 230, comments: 89, views: 2341 },
  { id: 8, user: "乐宁", avatar: "🧑‍🎓", role: "难缠客户", title: "如何应对客户的无理要求", likes: 187, comments: 45, views: 1856 },
  { id: 9, user: "销售达人", avatar: "💼", role: "谈判专家", title: "价格谈判的3个关键技巧分享", likes: 156, comments: 67, views: 1543 },
  { id: 10, user: "职场老鸟", avatar: "🦅", role: "HR经理", title: "绩效面谈模拟复盘", likes: 198, comments: 52, views: 1789 },
  { id: 11, user: "学习达人", avatar: "📚", role: "产品专家", title: "产品演示中的常见陷阱", likes: 145, comments: 34, views: 1234 },
];

const topRated = [
  { id: 12, user: "王导师", avatar: "👨‍🏫", role: "资深培训师", title: "高分学员的共同特点分析", likes: 456, comments: 123, views: 5678 },
  { id: 13, user: "赵经理", avatar: "👔", role: "销售总监", title: "如何从新人快速成长为销售冠军", likes: 389, comments: 98, views: 4567 },
  { id: 14, user: "陈老师", avatar: "📖", role: "培训讲师", title: "客户心理分析实战案例", likes: 278, comments: 67, views: 3456 },
  { id: 15, user: "李同学", avatar: "🎓", role: "学员代表", title: "从零基础到90分的学习方法", likes: 567, comments: 156, views: 6789 },
];

const plans = [
  { id: 1, title: "新人应知应会计划", chapters: 12, completed: 5, desc: "从零开始掌握销售核心技能", status: "进行中", hours: 4 },
  { id: 2, title: "全量零售采销AI陪练", chapters: 10, completed: 3, desc: "提升客户满意度的必修课", status: "进行中", hours: 3 },
  { id: 3, title: "高级谈判技巧", chapters: 15, completed: 0, desc: "掌握复杂场景谈判策略", status: "未开始", hours: 6 },
];

type TabType = "public" | "plans";

const PracticeCard = ({ item, onClick }: { item: typeof sharedPractices[0]; onClick: () => void }) => (
  <Card className="w-56 shrink-0 cursor-pointer p-3.5 transition-shadow hover:shadow-md" onClick={onClick}>
    <div className="flex items-center gap-2 mb-2">
      <span className="text-lg">{item.avatar}</span>
      <span className="text-[11px] text-muted-foreground truncate">{item.user}的分享</span>
    </div>
    <div className="rounded-lg bg-muted p-2.5 mb-2">
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-1">
        <span>和</span>
        <span className="font-medium text-foreground">{item.role}</span>
        <span>的对练</span>
      </div>
      <p className="text-xs font-medium line-clamp-2">{item.title}</p>
    </div>
    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
      <span className="flex items-center gap-0.5"><Heart className="h-3 w-3" />{item.likes}</span>
      <span className="flex items-center gap-0.5"><MessageCircle className="h-3 w-3" />{item.comments}</span>
      <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" />{item.views}</span>
    </div>
  </Card>
);

const LearnPage = () => {
  const navigate = useNavigate();
  const [mainTab, setMainTab] = useState<TabType>("public");

  return (
    <div className="pb-4">
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-1 px-4 pt-4 pb-0">
          <button
            onClick={() => setMainTab("public")}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${mainTab === "public" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          >
            公开对练
          </button>
          <button
            onClick={() => setMainTab("plans")}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${mainTab === "plans" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          >
            练习计划
          </button>
        </div>
      </div>

      {mainTab === "public" && (
        <div className="space-y-5 px-4 pt-4">
          {/* 为你推荐 */}
          <div>
            <h3 className="mb-3 text-sm font-semibold flex items-center gap-1.5"><Target className="h-4 w-4 text-primary" />为你推荐</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
              {sharedPractices.map((item) => (
                <PracticeCard key={item.id} item={item} onClick={() => navigate(`/shared-practice/${item.id}`)} />
              ))}
            </div>
          </div>

          {/* 本周浏览最多 */}
          <div>
            <h3 className="mb-3 text-sm font-semibold flex items-center gap-1.5"><Flame className="h-4 w-4 text-destructive" />本周浏览最多</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
              {weeklyHot.map((item) => (
                <PracticeCard key={item.id} item={item} onClick={() => navigate(`/shared-practice/${item.id}`)} />
              ))}
            </div>
          </div>

          {/* 高分优秀案例 */}
          <div>
            <h3 className="mb-3 text-sm font-semibold flex items-center gap-1.5"><Award className="h-4 w-4 text-amber-500" />高分优秀案例</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
              {topRated.map((item) => (
                <PracticeCard key={item.id} item={item} onClick={() => navigate(`/shared-practice/${item.id}`)} />
              ))}
            </div>
          </div>

          {/* 新人必看 */}
          <div>
            <h3 className="mb-3 text-sm font-semibold flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" />新人必看</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
              {sharedPractices.slice(0, 4).map((item) => (
                <PracticeCard key={`newbie-${item.id}`} item={item} onClick={() => navigate(`/shared-practice/${item.id}`)} />
              ))}
            </div>
          </div>
        </div>
      )}

      {mainTab === "plans" && (
        <div className="px-4 pt-4">
          <Card className="mb-4 bg-gradient-to-r from-primary/5 to-accent p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🤖</span>
              <h3 className="text-sm font-bold">AI 赋能学习</h3>
            </div>
            <p className="text-[11px] text-muted-foreground">智能陪练 · 实时点评 · 个性化提升</p>
          </Card>

          <div className="space-y-3">
            {plans.map((plan) => {
              const pct = Math.round((plan.completed / plan.chapters) * 100);
              return (
                <Card
                  key={plan.id}
                  className="cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
                  onClick={() => navigate(`/plan/${plan.id}`)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className={`inline-block mb-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          plan.status === "进行中" ? "bg-green-50 text-green-600" : "bg-muted text-muted-foreground"
                        }`}>{plan.status}</span>
                        <h3 className="text-sm font-bold">{plan.title}</h3>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {plan.chapters} 章节 · 预计 {plan.hours} 小时
                        </p>
                      </div>
                    </div>
                    {pct > 0 && (
                      <div className="mt-3 flex items-center gap-3">
                        <Progress value={pct} className="h-1.5 flex-1" />
                        <span className="text-[11px] font-medium text-primary">{pct}%</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-border px-4 py-2.5 flex items-center justify-between bg-muted/30">
                    <p className="text-[11px] text-muted-foreground line-clamp-1">{plan.desc}</p>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnPage;
