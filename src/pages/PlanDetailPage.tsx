import { useState } from "react";
import { ArrowLeft, Play, Headphones, MessageSquare, CheckCircle, Circle, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const planData = {
  id: 1,
  title: "新人应知应会计划",
  mentor: "方昭沐",
  period: "2024-01-01 至 2024-03-31",
  totalChapters: 13,
  completedChapters: 5,
  points: 2,
  status: "进行中",
  phases: [
    {
      id: 1,
      title: "第一阶段 项目管理的核心理念",
      expanded: true,
      items: [
        { id: 1, title: "越是艰苦的环节，越需要保持状态", type: "video", status: "completed", duration: "至少学习8分钟" },
        { id: 2, title: "项目的组织结构", type: "audio", status: "not_started", duration: "可跳过" },
        { id: 3, title: "十大领域与六重约束", type: "practice", status: "in_progress", duration: "需学习" },
      ],
    },
    {
      id: 2,
      title: "第二阶段 管理困惑",
      expanded: true,
      items: [
        { id: 4, title: "重新梳理自己的任务", type: "video", status: "not_started", duration: "至少学习10分钟" },
        { id: 5, title: "如何高效沟通", type: "practice", status: "not_started", duration: "需学习" },
        { id: 6, title: "团队协作的艺术", type: "audio", status: "not_started", duration: "至少学习5分钟" },
      ],
    },
    {
      id: 3,
      title: "第三阶段 实战演练",
      expanded: false,
      items: [
        { id: 7, title: "模拟客户沟通场景", type: "practice", status: "not_started", duration: "需完成对练" },
        { id: 8, title: "产品介绍实操", type: "video", status: "not_started", duration: "至少学习15分钟" },
        { id: 9, title: "异议处理模拟", type: "practice", status: "not_started", duration: "需完成对练" },
        { id: 10, title: "综合考核", type: "practice", status: "not_started", duration: "必须通过" },
      ],
    },
  ],
};

const typeIcon = {
  video: Play,
  audio: Headphones,
  practice: MessageSquare,
};

const statusColors = {
  completed: "text-green-500",
  in_progress: "text-primary",
  not_started: "text-muted-foreground",
};

const PlanDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1, 2]);
  const pct = Math.round((planData.completedChapters / planData.totalChapters) * 100);

  const togglePhase = (phaseId: number) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseId) ? prev.filter((p) => p !== phaseId) : [...prev, phaseId]
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">师徒带教</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Plan header card */}
        <div className="bg-gradient-to-br from-primary to-primary/80 px-4 py-5 text-white">
          <h2 className="text-base font-bold">服务区带训计划</h2>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-white/80">
            <span>👤 导师：{planData.mentor}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-white/80">
            <span>📅 辅导周期：{planData.period}</span>
          </div>
        </div>

        {/* Progress card */}
        <div className="px-4 -mt-3">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">出师可获得：<span className="text-primary font-medium">积分+{planData.points}</span></span>
            </div>
            <Progress value={pct} className="h-2 mb-2" />
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>已完成/必修任务数</span>
              <span className="font-medium text-foreground">{planData.completedChapters}/{planData.totalChapters}</span>
            </div>
          </Card>
        </div>

        {/* Phases */}
        <div className="px-4 py-4 space-y-3">
          {planData.phases.map((phase) => (
            <div key={phase.id}>
              <button
                onClick={() => togglePhase(phase.id)}
                className="flex w-full items-center justify-between py-2"
              >
                <h3 className="text-sm font-bold">{phase.title}</h3>
                {expandedPhases.includes(phase.id) ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {expandedPhases.includes(phase.id) && (
                <div className="space-y-2 pl-2">
                  {phase.items.map((item) => {
                    const Icon = typeIcon[item.type as keyof typeof typeIcon];
                    return (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => {
                          if (item.type === "practice") navigate("/practice");
                          else navigate(`/chapter/${planData.id}`);
                        }}
                      >
                        <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent ${
                          item.status === "in_progress" ? "bg-primary/10" : ""
                        }`}>
                          <Icon className={`h-4 w-4 ${statusColors[item.status as keyof typeof statusColors]}`} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-xs font-medium ${item.status === "in_progress" ? "text-primary" : ""}`}>
                            {item.title}
                          </p>
                          <div className="mt-0.5 flex items-center gap-3 text-[10px] text-muted-foreground">
                            <span className="flex items-center gap-0.5">
                              {item.status === "completed" ? (
                                <><CheckCircle className="h-3 w-3 text-green-500" /> 已学完</>
                              ) : item.status === "in_progress" ? (
                                <><Circle className="h-3 w-3 text-primary fill-primary" /> 正在学</>
                              ) : (
                                <><Circle className="h-3 w-3" /> 未学</>
                              )}
                            </span>
                            <span className="flex items-center gap-0.5">
                              <Clock className="h-3 w-3" /> {item.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom action */}
      <div className="border-t border-border bg-card p-3 flex gap-3">
        <Button className="flex-1" size="sm">继续当前任务</Button>
        <Button variant="outline" className="flex-1" size="sm">下一任务</Button>
      </div>
    </div>
  );
};

export default PlanDetailPage;
