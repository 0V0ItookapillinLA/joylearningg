import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Tooltip } from "recharts";

const overallScore = 82.7;

const evalPoints = [
  "1、设计思维与用户洞察：重点考察其解决问题的思路是否以用户为中心。是否清晰阐述设计决策背后的用户研究与数据支撑，而非主观偏好，这体现了专业深度。",
  "2、协作与沟通能力：评估其如何与产品、开发等角色合作。关注其如何阐述设计、接受反馈及推动落地，这能反映其团队融合度与项目推动力。",
  "3、项目ownership与成长潜力：不仅看执行，更关注其是否主动挖掘问题、承担责任并总结复盘。对行业趋势的思考能体现其自驱力与长期潜力。",
];

const radarData = [
  { skill: "候选人挖掘", current: 90 },
  { skill: "抗压能力", current: 76 },
  { skill: "责任心", current: 50 },
  { skill: "高招经验", current: 40 },
  { skill: "团队合作", current: 90 },
  { skill: "数据分析", current: 90 },
  { skill: "业务理解", current: 90 },
  { skill: "沟通能力", current: 90 },
];

const growthData = [
  { week: "第1周", score: 64 },
  { week: "第2周", score: 66 },
  { week: "第3周", score: 65 },
  { week: "第4周", score: 72 },
  { week: "第5周", score: 74 },
  { week: "第6周", score: 79 },
];

const studyTimeData = [
  { day: "周一", hours: 1.2 },
  { day: "周二", hours: 0.8 },
  { day: "周三", hours: 1.5 },
  { day: "周四", hours: 0.5 },
  { day: "周五", hours: 2.0 },
  { day: "周六", hours: 0 },
  { day: "周日", hours: 1.2 },
];

const strengths = [
  { name: "沟通能力", score: 90, desc: "能够清晰表达观点，善于倾听客户需求，具有优秀的语言组织能力" },
  { name: "候选人挖掘", score: 90, desc: "善于发现潜在客户需求，主动挖掘销售机会" },
  { name: "数据分析", score: 90, desc: "能够运用数据驱动决策，分析销售趋势和客户行为" },
];

const weaknesses = [
  { name: "责任心", score: 50, desc: "需要加强对项目的主动跟进意识，培养更强的结果导向思维" },
  { name: "高招经验", score: 40, desc: "大客户谈判经验不足，需要更多实战练习和方法论学习" },
];

const ComprehensiveEvalPage = () => {
  const navigate = useNavigate();
  const totalWeek = studyTimeData.reduce((s, d) => s + d.hours, 0).toFixed(1);

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">综合评价</h1>
      </div>

      <div className="p-4 space-y-5">
        {/* Overall Score */}
        <Card className="p-5">
          <h3 className="text-sm font-bold flex items-center gap-2 mb-3">📊 综合评价</h3>
          <div className="mb-4">
            <span className="text-muted-foreground text-xs">得分：</span>
            <span className="text-3xl font-bold text-primary">{overallScore}</span>
            <span className="text-xs text-muted-foreground">分/100分</span>
          </div>
          <div className="space-y-4">
            {evalPoints.map((point, i) => (
              <p key={i} className="text-xs text-foreground leading-relaxed">{point}</p>
            ))}
          </div>
        </Card>

        {/* Radar Chart */}
        <Card className="p-4">
          <h3 className="text-sm font-bold flex items-center gap-2 mb-1">⚙️ 综合能力模型</h3>
          <p className="text-[11px] text-muted-foreground mb-2">单维度统计满分100分</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="skill"
                tick={({ x, y, payload }) => (
                  <g transform={`translate(${x},${y})`}>
                    <text x={0} y={0} dy={0} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize={10}>
                      {payload.value}
                    </text>
                    <text x={0} y={14} textAnchor="middle" fill="hsl(var(--primary))" fontSize={10} fontWeight="bold">
                      得分{radarData.find(d => d.skill === payload.value)?.current}
                    </text>
                  </g>
                )}
              />
              <Radar dataKey="current" fill="hsl(var(--primary))" fillOpacity={0.2} stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Strengths */}
        <Card className="p-4">
          <h3 className="text-sm font-bold flex items-center gap-2 mb-3">✅ 优势维度</h3>
          <div className="space-y-3">
            {strengths.map((s) => (
              <div key={s.name} className="rounded-xl bg-green-50 p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-green-700">{s.name}</span>
                  <span className="text-xs font-bold text-green-600">{s.score}分</span>
                </div>
                <p className="text-[10px] text-green-600/80">{s.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Weaknesses */}
        <Card className="p-4">
          <h3 className="text-sm font-bold flex items-center gap-2 mb-3">⚠️ 劣势维度</h3>
          <div className="space-y-3">
            {weaknesses.map((w) => (
              <div key={w.name} className="rounded-xl bg-red-50 p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-red-700">{w.name}</span>
                  <span className="text-xs font-bold text-red-600">{w.score}分</span>
                </div>
                <p className="text-[10px] text-red-600/80">{w.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Growth Curve */}
        <Card className="p-4">
          <h3 className="text-sm font-bold flex items-center gap-2 mb-3">📈 成长曲线</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Study Time Stats */}
        <Card className="p-4">
          <h3 className="text-sm font-bold flex items-center gap-2 mb-3">⏰ 学习时长统计</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={studyTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>本周: {totalWeek}h</span>
            <span>上周: 5.8h</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComprehensiveEvalPage;
