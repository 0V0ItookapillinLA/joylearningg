import { ArrowLeft, Lock, Check, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const userInfo = {
  name: "李明",
  currentRole: "销售顾问",
  nextRole: "高级销售顾问",
  overallProgress: 25,
  currentProgress: 100,
  nextProgress: 50,
};

const stages = [
  {
    title: "服务员",
    weeks: 32,
    status: "completed" as const,
    progress: 100,
    color: "from-green-400 to-green-500",
    skills: ["产品基础知识", "电话礼仪", "CRM系统操作"],
  },
  {
    title: "训练员",
    weeks: 24,
    status: "completed" as const,
    progress: 100,
    color: "from-green-400 to-green-500",
    skills: ["客户需求分析", "异议处理", "FABE法则"],
  },
  {
    title: "门店主管",
    weeks: 28,
    status: "current" as const,
    progress: 50,
    color: "from-primary to-blue-500",
    skills: ["团队管理基础", "绩效辅导", "日常运营"],
    currentTask: "高效工作--时间管理与效率提升",
    taskWeeks: 5,
    taskUsed: 3,
    taskProgress: 15,
  },
  {
    title: "门店店长",
    weeks: 28,
    status: "locked" as const,
    progress: 0,
    color: "from-slate-300 to-slate-400",
    skills: ["门店P&L管理", "人才培养", "客户体验优化"],
  },
  {
    title: "区域督导",
    weeks: 36,
    status: "locked" as const,
    progress: 0,
    color: "from-slate-300 to-slate-400",
    skills: ["多门店管理", "战略规划", "组织发展"],
  },
  {
    title: "大区经理",
    weeks: 28,
    status: "locked" as const,
    progress: 0,
    color: "from-slate-300 to-slate-400",
    skills: ["区域战略", "预算管理", "跨区协作"],
  },
  {
    title: "高级营运总监",
    weeks: 20,
    status: "locked" as const,
    progress: 0,
    color: "from-slate-300 to-slate-400",
    skills: ["全国运营", "商业模式", "战略投资"],
  },
];

const GrowthMapPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">成长路径</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* User Card */}
        <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary">李</div>
            <div>
              <h3 className="text-sm font-bold">{userInfo.name}</h3>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span>当前岗位：{userInfo.currentRole}</span>
                <span>上级岗位：{userInfo.nextRole}</span>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-medium text-primary">我的岗位成长进度</span>
              <span className="text-xs font-bold text-primary">{userInfo.overallProgress}%</span>
            </div>
            <Progress value={userInfo.overallProgress} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="rounded-xl bg-card p-2.5 text-center">
              <p className="text-[10px] text-muted-foreground mb-1">当前岗位地图进度</p>
              <Progress value={userInfo.currentProgress} className="h-1.5 mb-1" />
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[9px] font-medium text-green-600">已完成</span>
            </div>
            <div className="rounded-xl bg-card p-2.5 text-center">
              <p className="text-[10px] text-muted-foreground mb-1">上级岗位地图进度</p>
              <Progress value={userInfo.nextProgress} className="h-1.5 mb-1" />
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary">进入学习</span>
            </div>
          </div>
        </Card>

        {/* Growth Path - Visual pillars */}
        <div className="relative pt-4">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-8 bottom-0 w-0.5 bg-border -translate-x-1/2" />

          <div className="space-y-6">
            {stages.map((stage, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="relative">
                  {/* Center node */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 z-10">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 bg-card ${
                      stage.status === "completed" ? "border-green-400" :
                      stage.status === "current" ? "border-primary" : "border-border"
                    }`}>
                      {stage.status === "completed" ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : stage.status === "current" ? (
                        <MapPin className="h-5 w-5 text-primary" />
                      ) : (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="text-center mt-1">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary">{stage.weeks}周</span>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`${isLeft ? "pr-[55%]" : "pl-[55%]"} pt-1`}>
                    <Card className={`p-3 ${stage.status === "locked" ? "opacity-50" : ""}`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className={`h-3 w-3 rounded-full bg-gradient-to-b ${stage.color}`} />
                        <h4 className="text-xs font-bold">{stage.title}</h4>
                        {stage.status === "current" && (
                          <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[8px] font-medium text-primary">当前</span>
                        )}
                      </div>
                      {stage.progress > 0 && stage.status !== "locked" && (
                        <div className="flex items-center gap-2 mb-1.5">
                          <Progress value={stage.progress} className="h-1 flex-1" />
                          <span className="text-[9px] text-muted-foreground">{stage.progress}%</span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {stage.skills.map((skill) => (
                          <span key={skill} className="rounded bg-muted px-1.5 py-0.5 text-[8px] text-muted-foreground">{skill}</span>
                        ))}
                      </div>
                    </Card>

                    {/* Current task popup */}
                    {stage.currentTask && (
                      <Card className="mt-2 p-3 border-primary/30 bg-gradient-to-r from-primary/5 to-card">
                        <h5 className="text-[11px] font-semibold mb-1">{stage.currentTask}</h5>
                        <p className="text-[9px] text-muted-foreground mb-1.5">
                          建议完成周期：{stage.taskWeeks}周，当前已用{stage.taskUsed}周
                        </p>
                        <div className="flex items-center gap-2">
                          <Progress value={stage.taskProgress} className="h-1 flex-1" />
                          <span className="text-[9px] font-medium text-primary">{stage.taskProgress}%</span>
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthMapPage;
