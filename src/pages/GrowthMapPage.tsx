import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

// Island path positions (zigzag pattern)
const nodePositions = [
  { left: "20%", align: "left" },
  { left: "55%", align: "right" },
  { left: "15%", align: "left" },
  { left: "60%", align: "right" },
  { left: "25%", align: "left" },
];

const GrowthMapPage = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(199 89% 70%) 0%, hsl(199 89% 60%) 30%, hsl(45 80% 75%) 70%, hsl(45 60% 65%) 100%)"
    }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <h1 className="text-sm font-semibold text-white">成长地图</h1>
      </div>

      {/* Current progress card */}
      <div className="px-4 pt-2 pb-4">
        <div className="rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-black shadow-md">
              {levels[currentIndex].level}
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">{levels[currentIndex].title}</h3>
              <p className="text-[10px] text-muted-foreground">晋升进度 45%</p>
            </div>
          </div>
          <Progress value={45} className="h-2" />
        </div>
      </div>

      {/* Map area with nodes */}
      <div className="relative px-4 pb-20" style={{ minHeight: levels.length * 160 }}>
        {/* Winding path SVG */}
        <svg className="absolute inset-0 w-full h-full" style={{ minHeight: levels.length * 160 }}>
          <defs>
            <linearGradient id="pathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
            </linearGradient>
          </defs>
          {levels.map((_, i) => {
            if (i === levels.length - 1) return null;
            const y1 = i * 160 + 80;
            const y2 = (i + 1) * 160 + 80;
            const x1 = nodePositions[i % nodePositions.length].align === "left" ? 100 : 250;
            const x2 = nodePositions[(i + 1) % nodePositions.length].align === "left" ? 100 : 250;
            const midY = (y1 + y2) / 2;
            return (
              <path
                key={i}
                d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
                fill="none"
                stroke="url(#pathGrad)"
                strokeWidth="4"
                strokeDasharray={levels[i + 1].status === "locked" ? "8 8" : "none"}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {levels.map((level, i) => {
          const isCompleted = level.status === "completed";
          const isCurrent = level.status === "current";
          const isLocked = level.status === "locked";
          const pos = nodePositions[i % nodePositions.length];

          return (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="relative"
              style={{ height: 160, paddingTop: 30 }}
            >
              <div
                className={`absolute cursor-pointer transition-transform hover:scale-105 ${isLocked ? "opacity-50" : ""}`}
                style={{ left: pos.left, transform: "translateX(-50%)" }}
                onClick={() => !isLocked && setSelectedLevel(level)}
              >
                {/* Node circle */}
                <div className={`relative flex h-16 w-16 items-center justify-center rounded-full shadow-xl border-4 ${
                  isCompleted ? "bg-gradient-to-br from-green-400 to-green-600 border-green-300" :
                  isCurrent ? "bg-gradient-to-br from-primary to-blue-600 border-blue-300" :
                  "bg-gradient-to-br from-gray-300 to-gray-400 border-gray-200"
                }`}>
                  <span className="text-white font-black text-sm">{level.level}</span>
                  {isCompleted && (
                    <div className="absolute -top-2 -right-2 flex items-center justify-center">
                      <span className="text-lg">⭐</span>
                    </div>
                  )}
                  {isCurrent && (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -inset-2 rounded-full border-2 border-primary/40"
                    />
                  )}
                </div>

                {/* Label card */}
                <div className={`mt-2 rounded-xl px-3 py-2 shadow-md min-w-[120px] text-center ${
                  isCompleted ? "bg-green-50 border border-green-200" :
                  isCurrent ? "bg-white border border-primary/30" :
                  "bg-white/60 border border-gray-200"
                }`}>
                  <p className="text-xs font-bold text-foreground">{level.title}</p>
                  {isCurrent && (
                    <div className="mt-1">
                      <Progress value={45} className="h-1" />
                      <p className="text-[9px] text-primary mt-0.5">45%</p>
                    </div>
                  )}
                  {isCompleted && (
                    <p className="text-[9px] text-green-600 font-medium mt-0.5">✅ 已通关</p>
                  )}
                  {isLocked && (
                    <p className="text-[9px] text-muted-foreground mt-0.5">🔒 未解锁</p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Decorative elements */}
      <div className="fixed bottom-4 right-4 text-2xl opacity-60">🌴</div>
      <div className="fixed bottom-20 left-2 text-xl opacity-40">🌊</div>

      {/* Competency Modal */}
      <AnimatePresence>
        {selectedLevel && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm"
              onClick={() => setSelectedLevel(null)}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
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

                {/* Skills section */}
                <div className="space-y-3 pt-2">
                  <div>
                    <p className="text-[10px] font-semibold text-primary mb-1.5">专业能力</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedLevel.professional.map((s) => (
                        <span key={s} className="rounded-lg bg-primary/8 px-2 py-1 text-[10px] text-primary font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">通用能力</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedLevel.general.map((s) => (
                        <span key={s} className="rounded-lg bg-muted px-2 py-1 text-[10px] text-muted-foreground">{s}</span>
                      ))}
                    </div>
                  </div>
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
