import { ArrowLeft, Play, Target, FileText, CheckCircle, Lock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const chapters = [
  { id: 1, title: "了解客户需求", type: "video", duration: "15:00", completed: true },
  { id: 2, title: "FABE法则讲解", type: "video", duration: "20:00", completed: true },
  { id: 3, title: "场景对练：首次电话沟通", type: "practice", completed: true },
  { id: 4, title: "异议处理技巧", type: "video", duration: "18:00", completed: false },
  { id: 5, title: "实战对练：客户说太贵了", type: "practice", completed: false },
  { id: 6, title: "阶段考核", type: "exam", completed: false },
  { id: 7, title: "高级谈判策略", type: "video", duration: "25:00", locked: true },
  { id: 8, title: "AI实战考试", type: "ai-exam", locked: true },
];

const ChapterDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const completedCount = chapters.filter((c) => c.completed).length;

  const getIcon = (type: string, completed?: boolean, locked?: boolean) => {
    if (locked) return <Lock className="h-4 w-4 text-muted-foreground" />;
    if (completed) return <CheckCircle className="h-4 w-4 text-success" />;
    switch (type) {
      case "video": return <Play className="h-4 w-4 text-primary" />;
      case "practice": return <Target className="h-4 w-4 text-warning" />;
      case "exam": return <FileText className="h-4 w-4 text-destructive" />;
      case "ai-exam": return <Target className="h-4 w-4 text-destructive" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  const handleClick = (ch: typeof chapters[0]) => {
    if (ch.locked) return;
    if (ch.type === "practice") navigate("/practice");
    else if (ch.type === "exam") navigate("/exam");
    else if (ch.type === "ai-exam") navigate("/exam?type=ai");
  };

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">销售新人30天成长计划</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Progress */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium">学习进度</span>
            <span className="text-xs text-primary font-semibold">{completedCount}/{chapters.length}</span>
          </div>
          <Progress value={(completedCount / chapters.length) * 100} className="h-2" />
        </Card>

        {/* Chapter List */}
        <div className="space-y-2">
          {chapters.map((ch, i) => (
            <Card
              key={ch.id}
              className={`flex cursor-pointer items-center gap-3 p-3.5 transition-all ${
                ch.locked ? "opacity-50" : "hover:shadow-md"
              }`}
              onClick={() => handleClick(ch)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                {getIcon(ch.type, ch.completed, ch.locked)}
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-medium">{ch.title}</h4>
                <div className="mt-0.5 flex items-center gap-2 text-[10px] text-muted-foreground">
                  {ch.type === "video" && <span>{ch.duration}</span>}
                  {ch.type === "practice" && <span className="text-warning">AI对练</span>}
                  {ch.type === "exam" && <span className="text-destructive">客观题考试</span>}
                  {ch.type === "ai-exam" && <span className="text-destructive">AI实战考试</span>}
                </div>
              </div>
              {ch.completed && (
                <span className="text-[10px] text-success font-medium">已完成</span>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChapterDetailPage;
