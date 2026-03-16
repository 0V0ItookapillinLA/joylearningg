import { useState } from "react";
import { ArrowLeft, Check, Lock, ChevronRight, BarChart3, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const islands = [
  {
    id: 1,
    title: "销售基础",
    status: "completed" as const,
    progress: 100,
    stars: 3,
    color: "from-green-400 to-emerald-500",
    courses: [
      { title: "产品知识入门", completed: true },
      { title: "销售流程概述", completed: true },
      { title: "CRM系统基础操作", completed: true },
    ],
  },
  {
    id: 2,
    title: "沟通技巧",
    status: "current" as const,
    progress: 33,
    stars: 1,
    color: "from-primary to-blue-500",
    courses: [
      { title: "电话销售技巧", completed: true },
      { title: "客户需求分析方法", completed: false },
      { title: "FABE法则实战", completed: false },
    ],
  },
  {
    id: 3,
    title: "异议处理",
    status: "locked" as const,
    progress: 0,
    stars: 0,
    color: "from-slate-300 to-slate-400",
    courses: [
      { title: "常见异议类型分析", completed: false },
      { title: "价格异议处理话术", completed: false },
      { title: "竞品对比策略", completed: false },
    ],
  },
  {
    id: 4,
    title: "谈判进阶",
    status: "locked" as const,
    progress: 0,
    stars: 0,
    color: "from-slate-300 to-slate-400",
    courses: [
      { title: "谈判心理学", completed: false },
      { title: "复杂场景谈判", completed: false },
      { title: "大客户谈判实战", completed: false },
    ],
  },
  {
    id: 5,
    title: "客户管理",
    status: "locked" as const,
    progress: 0,
    stars: 0,
    color: "from-slate-300 to-slate-400",
    courses: [
      { title: "客户分级管理", completed: false },
      { title: "客户关系维护", completed: false },
      { title: "客户生命周期管理", completed: false },
    ],
  },
];

const LearningMapPage = () => {
  const navigate = useNavigate();
  const [selectedIsland, setSelectedIsland] = useState<typeof islands[0] | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100/50 via-green-50/30 to-yellow-50/20">
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold flex-1 text-center">学习地图</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] text-primary font-medium">
            <BarChart3 className="h-3 w-3" />排行
          </button>
        </div>
      </div>

      <div className="px-4 pt-6 pb-8">
        {/* Winding path with islands */}
        <div className="relative">
          {/* Path connectors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            {islands.map((_, i) => {
              if (i === islands.length - 1) return null;
              const isLeft = i % 2 === 0;
              const y1 = i * 180 + 60;
              const y2 = (i + 1) * 180 + 60;
              const x1 = isLeft ? 100 : 280;
              const x2 = !isLeft ? 100 : 280;
              return (
                <path
                  key={i}
                  d={`M${x1},${y1} C${x1},${y1 + 60} ${x2},${y2 - 60} ${x2},${y2}`}
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="3"
                  strokeDasharray="8 4"
                />
              );
            })}
          </svg>

          <div className="relative" style={{ minHeight: islands.length * 180 }}>
            {islands.map((island, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={island.id}
                  className={`absolute w-40 ${isLeft ? "left-4" : "right-4"}`}
                  style={{ top: i * 180 }}
                >
                  {/* Island platform */}
                  <div
                    className={`relative cursor-pointer transition-transform hover:scale-105 ${island.status === "locked" ? "opacity-50" : ""}`}
                    onClick={() => island.status !== "locked" && setSelectedIsland(island)}
                  >
                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-1">
                      {[1, 2, 3].map((s) => (
                        <span key={s} className={`text-base ${s <= island.stars ? "text-amber-400" : "text-border"}`}>★</span>
                      ))}
                    </div>

                    {/* Island circle */}
                    <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b ${island.color} shadow-lg`}>
                      {island.status === "completed" ? (
                        <Check className="h-8 w-8 text-white" />
                      ) : island.status === "current" ? (
                        <span className="text-2xl font-bold text-white">{island.id}</span>
                      ) : (
                        <Lock className="h-6 w-6 text-white/60" />
                      )}
                    </div>

                    {/* Label */}
                    <div className="text-center mt-2">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        island.status === "completed" ? "bg-green-100 text-green-700" :
                        island.status === "current" ? "bg-primary/15 text-primary" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {island.title}
                      </span>
                    </div>

                    {/* Progress */}
                    {island.status !== "locked" && (
                      <div className="mt-1.5 flex items-center gap-1.5 justify-center">
                        <Progress value={island.progress} className="h-1 w-16" />
                        <span className="text-[9px] text-muted-foreground">{island.progress}%</span>
                      </div>
                    )}

                    {/* Current indicator */}
                    {island.status === "current" && (
                      <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary animate-pulse">
                        <span className="text-[8px] font-bold text-primary-foreground">📍</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Island detail dialog */}
      <Dialog open={!!selectedIsland} onOpenChange={() => setSelectedIsland(null)}>
        <DialogContent className="max-w-[340px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full bg-gradient-to-b ${selectedIsland?.color || ""} flex items-center justify-center`}>
                <span className="text-sm font-bold text-white">{selectedIsland?.id}</span>
              </div>
              {selectedIsland?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedIsland && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Progress value={selectedIsland.progress} className="h-1.5 flex-1" />
                <span className="text-xs font-medium text-primary">{selectedIsland.progress}%</span>
              </div>
              {selectedIsland.courses.map((course, i) => (
                <div key={i} className="flex items-center gap-2.5 rounded-xl bg-muted p-3">
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    course.completed ? "bg-green-100" : "border border-border"
                  }`}>
                    {course.completed && <Check className="h-3 w-3 text-green-600" />}
                  </div>
                  <span className="text-xs font-medium flex-1">{course.title}</span>
                  {!course.completed && (
                    <span className="text-[10px] text-primary font-medium">查看更多 ›</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LearningMapPage;
