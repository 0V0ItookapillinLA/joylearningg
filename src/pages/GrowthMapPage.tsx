import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

interface Level {
  level: string;
  title: string;
  status: "completed" | "current" | "locked";
  professional: string[];
  general: string[];
  competency: { name: string; score: number; target: number }[];
}

const levels: Level[] = [
  {
    level: "P1", title: "初级销售", status: "completed",
    professional: ["产品基础知识", "销售话术入门", "客户接待流程"],
    general: ["职业素养", "时间管理", "沟通基础"],
    competency: [
      { name: "产品知识", score: 92, target: 80 }, { name: "沟通技巧", score: 85, target: 75 },
      { name: "客户接待", score: 88, target: 80 }, { name: "基础话术", score: 90, target: 75 },
      { name: "时间管理", score: 82, target: 70 }, { name: "职业素养", score: 86, target: 80 },
    ],
  },
  {
    level: "P2", title: "销售顾问", status: "completed",
    professional: ["需求分析技巧", "FABE法则", "CRM系统操作"],
    general: ["团队协作", "情绪管理", "目标设定"],
    competency: [
      { name: "需求分析", score: 88, target: 85 }, { name: "FABE法则", score: 85, target: 80 },
      { name: "CRM操作", score: 90, target: 85 }, { name: "团队协作", score: 82, target: 80 },
      { name: "情绪管理", score: 78, target: 75 }, { name: "目标设定", score: 80, target: 80 },
    ],
  },
  {
    level: "P3", title: "高级销售顾问", status: "current",
    professional: ["异议处理策略", "竞品分析", "大客户开发"],
    general: ["项目管理", "演讲表达", "批判思维"],
    competency: [
      { name: "异议处理", score: 72, target: 85 }, { name: "竞品分析", score: 68, target: 80 },
      { name: "大客户开发", score: 65, target: 85 }, { name: "项目管理", score: 70, target: 80 },
      { name: "演讲表达", score: 75, target: 80 }, { name: "批判思维", score: 60, target: 75 },
    ],
  },
  {
    level: "P4", title: "资深销售顾问", status: "locked",
    professional: ["复杂谈判技巧", "方案式销售", "行业洞察"],
    general: ["领导力基础", "跨部门协作", "商业思维"],
    competency: [
      { name: "谈判技巧", score: 0, target: 85 }, { name: "方案销售", score: 0, target: 85 },
      { name: "行业洞察", score: 0, target: 80 }, { name: "领导力", score: 0, target: 80 },
      { name: "跨部门协作", score: 0, target: 80 }, { name: "商业思维", score: 0, target: 85 },
    ],
  },
  {
    level: "P5", title: "销售主管", status: "locked",
    professional: ["团队销售管理", "销售漏斗优化", "绩效辅导"],
    general: ["人才选拔", "冲突管理", "教练技术"],
    competency: [
      { name: "团队管理", score: 0, target: 90 }, { name: "漏斗优化", score: 0, target: 85 },
      { name: "绩效辅导", score: 0, target: 85 }, { name: "人才选拔", score: 0, target: 80 },
      { name: "冲突管理", score: 0, target: 80 }, { name: "教练技术", score: 0, target: 85 },
    ],
  },
];

const currentIndex = levels.findIndex((l) => l.status === "current");

const GrowthMapPage = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">成长地图</h1>
      </div>

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

      <div className="px-4 pb-8">
        <div className="relative pl-8">
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-4">
            {levels.map((level) => {
              const isCompleted = level.status === "completed";
              const isCurrent = level.status === "current";
              const isLocked = level.status === "locked";

              return (
                <div key={level.level} className="relative">
                  <div className={`absolute -left-8 top-3 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold border-2 ${
                    isCompleted ? "bg-green-500 border-green-500 text-white" :
                    isCurrent ? "bg-primary border-primary text-primary-foreground animate-pulse" :
                    "bg-muted border-border text-muted-foreground"
                  }`}>
                    {level.level}
                  </div>

                  <Card
                    className={`p-3.5 transition-all cursor-pointer ${isLocked ? "opacity-40" : ""} ${isCurrent ? "border-primary/40 shadow-md" : ""}`}
                    onClick={() => !isLocked && setSelectedLevel(level)}
                  >
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
                      {!isLocked && (
                        <span className="text-[9px] text-primary font-medium">查看评估 →</span>
                      )}
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

      {/* Competency Modal */}
      <AnimatePresence>
        {selectedLevel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm"
              onClick={() => setSelectedLevel(null)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[70] mx-auto max-w-[430px] rounded-t-[24px] bg-card shadow-2xl overflow-hidden"
              style={{ maxHeight: "80vh" }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold">{selectedLevel.level} · {selectedLevel.title} 胜任力评估</h3>
                <button onClick={() => setSelectedLevel(null)}>
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <div className="overflow-y-auto p-4 space-y-4" style={{ maxHeight: "calc(80vh - 56px)" }}>
                {/* Overall score */}
                <div className="text-center">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary/20 mb-2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-xl font-bold text-primary">
                        {selectedLevel.competency.length > 0
                          ? Math.round(selectedLevel.competency.reduce((sum, c) => sum + c.score, 0) / selectedLevel.competency.length)
                          : 0}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold">综合胜任力评分</p>
                </div>

                {/* Radar */}
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={selectedLevel.competency.map(c => ({ skill: c.name, current: c.score, target: c.target }))}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
                    <Radar dataKey="target" fill="hsl(var(--muted))" fillOpacity={0.3} stroke="hsl(var(--muted-foreground))" strokeWidth={1} strokeDasharray="4 4" />
                    <Radar dataKey="current" fill="hsl(var(--primary))" fillOpacity={0.2} stroke="hsl(var(--primary))" strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 text-[10px]">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" />当前水平</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-muted-foreground" />目标水平</span>
                </div>

                {/* Dimension bars */}
                <div className="space-y-3">
                  {selectedLevel.competency.map((d) => (
                    <div key={d.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-medium">{d.name}</span>
                        <span className="text-[10px] text-muted-foreground">{d.score}/{d.target}</span>
                      </div>
                      <Progress value={d.target > 0 ? (d.score / d.target) * 100 : 0} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GrowthMapPage;
