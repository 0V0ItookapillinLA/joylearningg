import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const levels = [
  {
    level: "P1",
    title: "初级销售",
    status: "completed" as const,
    professional: ["产品基础知识", "销售话术入门", "客户接待流程"],
    general: ["职业素养", "时间管理", "沟通基础"],
  },
  {
    level: "P2",
    title: "销售顾问",
    status: "completed" as const,
    professional: ["需求分析技巧", "FABE法则", "CRM系统操作"],
    general: ["团队协作", "情绪管理", "目标设定"],
  },
  {
    level: "P3",
    title: "高级销售顾问",
    status: "current" as const,
    professional: ["异议处理策略", "竞品分析", "大客户开发"],
    general: ["项目管理", "演讲表达", "批判思维"],
  },
  {
    level: "P4",
    title: "资深销售顾问",
    status: "locked" as const,
    professional: ["复杂谈判技巧", "方案式销售", "行业洞察"],
    general: ["领导力基础", "跨部门协作", "商业思维"],
  },
  {
    level: "P5",
    title: "销售主管",
    status: "locked" as const,
    professional: ["团队销售管理", "销售漏斗优化", "绩效辅导"],
    general: ["人才选拔", "冲突管理", "教练技术"],
  },
  {
    level: "P6",
    title: "高级销售主管",
    status: "locked" as const,
    professional: ["区域市场策略", "KA客户管理", "渠道拓展"],
    general: ["战略思维", "数据分析", "变革管理"],
  },
  {
    level: "P7",
    title: "销售经理",
    status: "locked" as const,
    professional: ["P&L管理", "年度销售规划", "团队建设"],
    general: ["组织设计", "文化塑造", "财务分析"],
  },
  {
    level: "P8",
    title: "高级销售经理",
    status: "locked" as const,
    professional: ["多区域管理", "大客户战略", "合作伙伴生态"],
    general: ["高管沟通", "危机管理", "创新思维"],
  },
  {
    level: "P9",
    title: "区域总监",
    status: "locked" as const,
    professional: ["区域P&L", "组织发展", "市场竞争战略"],
    general: ["影响力", "系统思维", "商业谈判"],
  },
  {
    level: "P10",
    title: "高级区域总监",
    status: "locked" as const,
    professional: ["多区战略协同", "人才梯队建设", "品牌建设"],
    general: ["战略规划", "公共演讲", "资源整合"],
  },
  {
    level: "P11",
    title: "销售副总裁",
    status: "locked" as const,
    professional: ["全国销售战略", "商业模式创新", "战略合作"],
    general: ["愿景领导", "董事会沟通", "投资决策"],
  },
  {
    level: "P12",
    title: "高级副总裁",
    status: "locked" as const,
    professional: ["集团业务规划", "并购整合", "国际化布局"],
    general: ["全球视野", "政商关系", "企业治理"],
  },
  {
    level: "P13",
    title: "执行副总裁",
    status: "locked" as const,
    professional: ["集团战略制定", "资本运作", "生态构建"],
    general: ["哲学思维", "社会责任", "行业引领"],
  },
  {
    level: "P14",
    title: "首席营收官",
    status: "locked" as const,
    professional: ["全球营收战略", "商业生态系统", "数字化转型"],
    general: ["前瞻思维", "组织变革", "价值创造"],
  },
  {
    level: "P15",
    title: "首席执行官",
    status: "locked" as const,
    professional: ["企业愿景规划", "资本市场运营", "战略联盟"],
    general: ["使命驱动", "全局领导", "传承与创新"],
  },
];

const currentIndex = levels.findIndex((l) => l.status === "current");

const GrowthMapPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">成长地图</h1>
      </div>

      {/* Current level summary */}
      <div className="p-4">
        <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-lg font-black">
              {levels[currentIndex].level}
            </div>
            <div>
              <h3 className="text-sm font-bold">{levels[currentIndex].title}</h3>
              <p className="text-[10px] text-muted-foreground">当前职级 · 晋升进度 45%</p>
            </div>
          </div>
          <Progress value={45} className="h-2" />
        </Card>
      </div>

      {/* Vertical timeline */}
      <div className="px-4 pb-8">
        <div className="relative pl-8">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-4">
            {levels.map((level, i) => {
              const isCompleted = level.status === "completed";
              const isCurrent = level.status === "current";
              const isLocked = level.status === "locked";

              return (
                <div key={level.level} className="relative">
                  {/* Node on timeline */}
                  <div className={`absolute -left-8 top-3 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold border-2 ${
                    isCompleted ? "bg-green-500 border-green-500 text-white" :
                    isCurrent ? "bg-primary border-primary text-primary-foreground animate-pulse" :
                    "bg-muted border-border text-muted-foreground"
                  }`}>
                    {level.level}
                  </div>

                  <Card className={`p-3.5 transition-all ${isLocked ? "opacity-40" : ""} ${isCurrent ? "border-primary/40 shadow-md" : ""}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold">{level.title}</h4>
                        {isCurrent && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[8px] font-semibold text-primary">当前</span>
                        )}
                        {isCompleted && (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[8px] font-semibold text-green-600">已达成</span>
                        )}
                      </div>
                      {/* No chevron - cards have no drill-down */}
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-[9px] font-semibold text-primary mb-1">专业能力</p>
                        <div className="flex flex-wrap gap-1">
                          {level.professional.map((s) => (
                            <span key={s} className="rounded-md bg-primary/8 px-1.5 py-0.5 text-[8px] text-primary font-medium">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[9px] font-semibold text-muted-foreground mb-1">通用能力</p>
                        <div className="flex flex-wrap gap-1">
                          {level.general.map((s) => (
                            <span key={s} className="rounded-md bg-muted px-1.5 py-0.5 text-[8px] text-muted-foreground">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
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
