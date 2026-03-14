import { ArrowLeft, CheckCircle, Circle, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const stages = [
  {
    title: "销售新人",
    status: "completed" as const,
    skills: ["产品基础知识", "电话礼仪", "CRM系统操作"],
  },
  {
    title: "初级销售",
    status: "current" as const,
    skills: ["客户需求分析", "异议处理", "FABE法则"],
  },
  {
    title: "中级销售",
    status: "locked" as const,
    skills: ["复杂谈判技巧", "大客户管理", "方案定制"],
  },
  {
    title: "高级销售",
    status: "locked" as const,
    skills: ["战略客户开发", "团队管理", "市场分析"],
  },
  {
    title: "销售经理",
    status: "locked" as const,
    skills: ["团队绩效管理", "销售策略制定", "跨部门协作"],
  },
];

const GrowthMapPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">成长地图</h1>
      </div>

      <div className="p-4">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-border" />

          <div className="space-y-4">
            {stages.map((stage, i) => (
              <div key={i} className="relative flex gap-4">
                {/* Node */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card border-2 border-border">
                  {stage.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : stage.status === "current" ? (
                    <div className="h-4 w-4 rounded-full bg-primary animate-pulse" />
                  ) : (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>

                {/* Content */}
                <Card className={`flex-1 p-3.5 ${stage.status === "locked" ? "opacity-50" : ""}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xs font-semibold">{stage.title}</h3>
                    {stage.status === "current" && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        当前阶段
                      </span>
                    )}
                    {stage.status === "completed" && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
                        已完成
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {stage.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthMapPage;
