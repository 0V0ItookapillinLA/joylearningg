import { BookOpen, ChevronRight, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: 1,
    title: "销售新人30天成长计划",
    chapters: 12,
    completed: 5,
    desc: "从零开始掌握销售核心技能",
  },
  {
    id: 2,
    title: "客服话术精进训练",
    chapters: 8,
    completed: 3,
    desc: "提升客户满意度的必修课",
  },
  {
    id: 3,
    title: "高级谈判技巧",
    chapters: 15,
    completed: 0,
    desc: "掌握复杂场景谈判策略",
  },
  {
    id: 4,
    title: "产品知识百科全书",
    chapters: 20,
    completed: 12,
    desc: "全面了解产品功能与卖点",
  },
];

const LearnPage = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between pt-4 pb-3">
        <h1 className="text-lg font-bold">学习路径</h1>
        <button
          onClick={() => navigate("/practice")}
          className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
        >
          <Target className="h-3.5 w-3.5" />
          AI陪练
        </button>
      </div>

      <div className="space-y-3">
        {plans.map((plan) => {
          const pct = Math.round((plan.completed / plan.chapters) * 100);
          return (
            <Card
              key={plan.id}
              className="cursor-pointer p-4 transition-shadow hover:shadow-md"
              onClick={() => navigate(`/chapter/${plan.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{plan.title}</h3>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{plan.desc}</p>
                </div>
                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <Progress value={pct} className="h-1.5 flex-1" />
                <span className="text-[11px] font-medium text-primary">{pct}%</span>
              </div>
              <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {plan.completed}/{plan.chapters} 章节
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LearnPage;
