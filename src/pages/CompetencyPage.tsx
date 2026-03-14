import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

const overallScore = 78;

const dimensions = [
  { name: "产品知识", score: 85, target: 90 },
  { name: "沟通技巧", score: 80, target: 85 },
  { name: "异议处理", score: 72, target: 80 },
  { name: "客户管理", score: 68, target: 85 },
  { name: "谈判能力", score: 75, target: 80 },
  { name: "团队协作", score: 82, target: 85 },
];

const radarData = dimensions.map((d) => ({ skill: d.name, current: d.score, target: d.target }));

const recommendedCourses = [
  { title: "客户管理高级技巧", reason: "提升客户管理能力", gap: 17 },
  { title: "异议处理实战训练", reason: "缩小异议处理差距", gap: 8 },
  { title: "高效沟通方法论", reason: "强化沟通表达", gap: 5 },
];

const CompetencyPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">岗位胜任力评估</h1>
      </div>

      <div className="p-4 space-y-5">
        {/* Overall Score */}
        <div className="text-center">
          <div className="inline-flex h-28 w-28 items-center justify-center rounded-full border-4 border-primary/20 mb-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <span className="text-3xl font-bold text-primary">{overallScore}</span>
            </div>
          </div>
          <p className="text-sm font-semibold">综合胜任力评分</p>
          <p className="text-[11px] text-muted-foreground">销售顾问 · 初级 → 中级</p>
        </div>

        {/* Radar */}
        <Card className="p-4">
          <h3 className="text-xs font-semibold mb-2">能力模型</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Radar dataKey="target" fill="hsl(var(--muted))" fillOpacity={0.3} stroke="hsl(var(--muted-foreground))" strokeWidth={1} strokeDasharray="4 4" />
              <Radar dataKey="current" fill="hsl(var(--primary))" fillOpacity={0.2} stroke="hsl(var(--primary))" strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 text-[10px]">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" />当前水平</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-muted-foreground" />目标水平</span>
          </div>
        </Card>

        {/* Dimension Bars */}
        <Card className="p-4">
          <h3 className="text-xs font-semibold mb-3">各维度得分</h3>
          <div className="space-y-3">
            {dimensions.map((d) => (
              <div key={d.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium">{d.name}</span>
                  <span className="text-[10px] text-muted-foreground">{d.score}/{d.target}</span>
                </div>
                <div className="relative">
                  <Progress value={(d.score / d.target) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommended Courses */}
        <Card className="p-4">
          <h3 className="text-xs font-semibold mb-3">推荐提升课程</h3>
          <div className="space-y-2">
            {recommendedCourses.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl bg-muted p-3 cursor-pointer"
                onClick={() => navigate("/learn")}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-medium">{c.title}</h4>
                  <p className="text-[10px] text-muted-foreground">{c.reason} · 差距{c.gap}分</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompetencyPage;
