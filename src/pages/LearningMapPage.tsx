import { useState } from "react";
import { ArrowLeft, Check, Lock, Play, FileText, MessageSquare, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

type CourseItem = {
  title: string;
  type: "video" | "doc" | "practice";
  completed: boolean;
  linkId: string;
};

type LevelNode = {
  level: string;
  title: string;
  status: "completed" | "current" | "locked";
  progress: number;
  courses: CourseItem[];
};

const levels: LevelNode[] = [
  {
    level: "P1", title: "初级销售", status: "completed", progress: 100,
    courses: [
      { title: "产品知识入门", type: "video", completed: true, linkId: "v1" },
      { title: "销售礼仪手册", type: "doc", completed: true, linkId: "d1" },
      { title: "基础话术练习", type: "practice", completed: true, linkId: "p1" },
    ],
  },
  {
    level: "P2", title: "销售顾问", status: "completed", progress: 100,
    courses: [
      { title: "FABE法则精讲", type: "video", completed: true, linkId: "v2" },
      { title: "CRM操作指南", type: "doc", completed: true, linkId: "d2" },
      { title: "需求分析对练", type: "practice", completed: true, linkId: "p2" },
    ],
  },
  {
    level: "P3", title: "高级销售顾问", status: "current", progress: 40,
    courses: [
      { title: "异议处理技巧", type: "video", completed: true, linkId: "v3" },
      { title: "竞品分析报告", type: "doc", completed: false, linkId: "d3" },
      { title: "价格谈判对练", type: "practice", completed: false, linkId: "p3" },
      { title: "大客户开发策略", type: "video", completed: false, linkId: "v4" },
    ],
  },
  {
    level: "P4", title: "资深销售顾问", status: "locked", progress: 0,
    courses: [
      { title: "复杂谈判实战", type: "video", completed: false, linkId: "v5" },
      { title: "方案式销售手册", type: "doc", completed: false, linkId: "d4" },
      { title: "行业洞察对练", type: "practice", completed: false, linkId: "p4" },
    ],
  },
  {
    level: "P5", title: "销售主管", status: "locked", progress: 0,
    courses: [
      { title: "团队管理基础", type: "video", completed: false, linkId: "v6" },
      { title: "绩效辅导手册", type: "doc", completed: false, linkId: "d5" },
      { title: "绩效面谈对练", type: "practice", completed: false, linkId: "p5" },
    ],
  },
];

const typeIcon = { video: Play, doc: FileText, practice: MessageSquare };
const typeLabel = { video: "视频课程", doc: "文档资料", practice: "AI对练" };
const typeColor = {
  video: "text-blue-500 bg-blue-50",
  doc: "text-amber-600 bg-amber-50",
  practice: "text-green-600 bg-green-50",
};

const nodePositions = [
  { left: "60%", align: "right" },
  { left: "25%", align: "left" },
  { left: "65%", align: "right" },
  { left: "20%", align: "left" },
  { left: "55%", align: "right" },
];

const LearningMapPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<LevelNode | null>(null);

  const handleCourseClick = (course: CourseItem) => {
    if (course.type === "video") navigate(`/course/${course.linkId}`);
    else if (course.type === "doc") navigate(`/course/${course.linkId}`);
    else navigate(`/practice-detail/${course.linkId}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(199 89% 70%) 0%, hsl(199 89% 55%) 25%, hsl(170 60% 60%) 50%, hsl(45 70% 70%) 80%, hsl(45 60% 65%) 100%)"
    }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <h1 className="text-sm font-semibold text-white">学习地图</h1>
      </div>

      {/* Progress card */}
      <div className="px-4 pt-2 pb-4">
        <div className="rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold">学习进度</span>
            <span className="text-xs font-bold text-primary">P3 · 高级销售顾问</span>
          </div>
          <Progress value={18} className="h-2 mb-1" />
          <p className="text-[10px] text-muted-foreground">已完成 2/5 阶段，当前阶段进度 40%</p>
        </div>
      </div>

      {/* Map with island nodes */}
      <div className="relative px-4 pb-20" style={{ minHeight: levels.length * 160 }}>
        {/* Path */}
        <svg className="absolute inset-0 w-full h-full" style={{ minHeight: levels.length * 160 }}>
          <defs>
            <linearGradient id="mapPath" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
            </linearGradient>
          </defs>
          {levels.map((_, i) => {
            if (i === levels.length - 1) return null;
            const y1 = i * 160 + 80;
            const y2 = (i + 1) * 160 + 80;
            const pos1 = nodePositions[i % nodePositions.length];
            const pos2 = nodePositions[(i + 1) % nodePositions.length];
            const x1 = pos1.align === "left" ? 90 : 260;
            const x2 = pos2.align === "left" ? 90 : 260;
            const midY = (y1 + y2) / 2;
            return (
              <path
                key={i}
                d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
                fill="none"
                stroke="url(#mapPath)"
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
                onClick={() => !isLocked && setSelected(level)}
              >
                <div className={`relative flex h-16 w-16 items-center justify-center rounded-full shadow-xl border-4 ${
                  isCompleted ? "bg-gradient-to-br from-green-400 to-green-600 border-green-300" :
                  isCurrent ? "bg-gradient-to-br from-primary to-blue-600 border-blue-300" :
                  "bg-gradient-to-br from-gray-300 to-gray-400 border-gray-200"
                }`}>
                  {isCompleted ? (
                    <Check className="h-6 w-6 text-white" />
                  ) : isLocked ? (
                    <Lock className="h-5 w-5 text-white/70" />
                  ) : (
                    <span className="text-white font-black text-sm">{level.level}</span>
                  )}
                  {isCompleted && (
                    <div className="absolute -top-2 -right-2">
                      <span className="text-lg">⭐</span>
                    </div>
                  )}
                  {isCurrent && (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -inset-2 rounded-full border-2 border-blue-300/50"
                    />
                  )}
                </div>

                <div className={`mt-2 rounded-xl px-3 py-2 shadow-md min-w-[120px] text-center ${
                  isCompleted ? "bg-green-50 border border-green-200" :
                  isCurrent ? "bg-white border border-primary/30" :
                  "bg-white/60 border border-gray-200"
                }`}>
                  <p className="text-[10px] font-bold text-muted-foreground">{level.level}</p>
                  <p className="text-xs font-bold text-foreground">{level.title}</p>
                  {isCurrent && (
                    <div className="mt-1">
                      <Progress value={level.progress} className="h-1" />
                      <p className="text-[9px] text-primary mt-0.5">{level.progress}% · {level.courses.length}门课程</p>
                    </div>
                  )}
                  {isCompleted && <p className="text-[9px] text-green-600 font-medium mt-0.5">✅ 已完成</p>}
                  {isLocked && <p className="text-[9px] text-muted-foreground mt-0.5">🔒 未解锁</p>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Decorative */}
      <div className="fixed bottom-4 left-3 text-2xl opacity-50">🌴</div>
      <div className="fixed bottom-16 right-4 text-xl opacity-40">🏝️</div>

      {/* Course detail sheet */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[70] mx-auto max-w-[430px] rounded-t-[24px] bg-card shadow-2xl"
              style={{ maxHeight: "70vh" }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-[10px] font-bold">
                    {selected.level}
                  </span>
                  <h3 className="text-sm font-semibold">{selected.title}</h3>
                </div>
                <button onClick={() => setSelected(null)}><X className="h-5 w-5 text-muted-foreground" /></button>
              </div>
              <div className="overflow-y-auto p-4 space-y-2" style={{ maxHeight: "calc(70vh - 56px)" }}>
                {selected.progress > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <Progress value={selected.progress} className="h-1.5 flex-1" />
                    <span className="text-xs font-medium text-primary">{selected.progress}%</span>
                  </div>
                )}
                {selected.courses.map((course, i) => {
                  const Icon = typeIcon[course.type];
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 cursor-pointer hover:bg-muted transition-colors"
                      onClick={() => { setSelected(null); handleCourseClick(course); }}
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${typeColor[course.type]}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{course.title}</p>
                        <p className="text-[9px] text-muted-foreground">{typeLabel[course.type]}</p>
                      </div>
                      {course.completed ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[8px] font-medium text-green-600">已学</span>
                      ) : (
                        <span className="text-[10px] text-primary font-medium">去学习 ›</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningMapPage;
