import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";

const practiceList = [
  { id: 1, scenario: "客户投诉处理", date: "2026-03-13", score: 85, mode: "自由对话", duration: "36:00min", plan: "新人应知应会" },
  { id: 2, scenario: "首次电话沟通", date: "2026-03-12", score: 72, mode: "固定剧本", duration: "28:00min", plan: "新人应知应会" },
  { id: 3, scenario: "价格谈判", date: "2026-03-10", score: 91, mode: "自由对话", duration: "42:00min", plan: "全量零售采销AI陪练" },
  { id: 4, scenario: "客户跟进回访", date: "2026-03-08", score: 68, mode: "文本对练", duration: "25:00min", plan: "全量零售采销AI陪练" },
  { id: 5, scenario: "产品演示模拟", date: "2026-03-05", score: 88, mode: "固定剧本", duration: "35:00min", plan: "新人应知应会" },
];

const tagColor: Record<string, string> = {
  "自由对话": "bg-primary/10 text-primary",
  "固定剧本": "bg-accent text-accent-foreground",
  "文本对练": "bg-muted text-muted-foreground",
};

const radarData = [
  { skill: "候选人挖掘", value: 90 },
  { skill: "抗压能力", value: 76 },
  { skill: "责任心", value: 50 },
  { skill: "高招经验", value: 40 },
  { skill: "团队合作", value: 90 },
  { skill: "数据分析", value: 90 },
  { skill: "业务理解", value: 90 },
  { skill: "沟通能力", value: 90 },
];

const dialogueReview = [
  { role: "ai" as const, text: "你好，我是客户王先生。你们的产品噪音太大了，我要退货！", comment: null },
  { role: "user" as const, text: "王先生您好，非常抱歉给您带来不好的体验。我理解您的心情。", comment: { type: "good" as const, text: "✓ 及时表达歉意和共情，开局良好" } },
  { role: "user" as const, text: "请问具体是在什么使用场景下出现的噪音呢？", comment: { type: "good" as const, text: "✓ 主动了解具体情况，专业表现" } },
  { role: "ai" as const, text: "就是晚上睡觉的时候，嗡嗡响根本没法睡！", comment: null },
  { role: "user" as const, text: "这个确实会影响您的休息。我建议您先试试调到静音模式。", comment: { type: "improve" as const, text: "⚠ 建议先确认客户是否知道静音模式的操作方法" } },
];

const evalText = [
  "1、设计思维与用户洞察：重点考察其解决问题的思路是否以用户为中心。",
  "2、协作与沟通能力：评估其如何与产品、开发等角色合作。",
  "3、项目ownership与成长潜力：不仅看执行，更关注其是否主动挖掘问题。",
];

const improvements = [
  "建议在提供方案前先深入SPIN法则引导客户自述需求",
  "可以主动提供上门检测服务，展示服务诚意",
  "结尾确认客户满意度，并告知后续跟进安排",
];

const relatedCourses = [
  { title: "客户异议处理技巧", tag: "开始学习" },
  { title: "SPIN销售法实践", tag: "开始学习" },
];

const strengths = [
  { name: "数据分析", score: 90, desc: "善于运用数据支撑论点" },
  { name: "沟通能力", score: 90, desc: "表达清晰，善于引导对话" },
  { name: "沟通能力", score: 85, desc: "良好的倾听和回应技巧" },
];

const weaknesses = [
  { name: "抗压能力", score: 50, desc: "面对强势客户时容易妥协" },
  { name: "沟通能力", score: 60, desc: "在压力下语言组织能力下降" },
];

const PracticeReviewPage = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = practiceList.find((p) => p.id === selectedId);

  if (selected) {
    return (
      <div>
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
          <button onClick={() => setSelectedId(null)}><ArrowLeft className="h-5 w-5" /></button>
          <h1 className="text-sm font-semibold">复盘报告</h1>
        </div>

        <div className="p-4 space-y-5">
          {/* Header info */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-muted-foreground">⏱ 耗时 {selected.duration}</span>
          </div>

          {/* Score */}
          <Card className="p-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 shrink-0">
              <span className="text-2xl font-bold text-primary">{selected.score}</span>
            </div>
            <div>
              <h3 className="text-sm font-bold">AI 综合评分</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">沟通能力强，但抗压能力有待提升</p>
            </div>
          </Card>

          {/* Practice Eval */}
          <Card className="p-4">
            <h3 className="text-xs font-bold flex items-center gap-1.5 mb-3">📋 本次练习评价</h3>
            <div className="space-y-3">
              {evalText.map((text, i) => (
                <p key={i} className="text-[11px] text-foreground leading-relaxed">{text}</p>
              ))}
            </div>
          </Card>

          {/* Improvement Suggestions */}
          <Card className="p-4">
            <h3 className="text-xs font-bold flex items-center gap-1.5 mb-3">✏️ 改进建议</h3>
            <div className="space-y-2">
              {improvements.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px] text-foreground">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    {i + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </Card>

          {/* Related Courses */}
          <Card className="p-4">
            <h3 className="text-xs font-bold flex items-center gap-1.5 mb-3">📚 关联知识</h3>
            <div className="space-y-2">
              {relatedCourses.map((c, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-muted p-3">
                  <span className="text-xs font-medium">{c.title}</span>
                  <button className="rounded-full bg-primary/10 px-3 py-1 text-[10px] text-primary font-medium">{c.tag}</button>
                </div>
              ))}
            </div>
          </Card>

          {/* Radar Chart */}
          <Card className="p-4">
            <h3 className="text-xs font-bold flex items-center gap-1.5 mb-2">⚙️ 综合能力模型</h3>
            <p className="text-[10px] text-muted-foreground mb-2">单维度统计满分100分</p>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={({ x, y, payload }) => (
                    <g transform={`translate(${x},${y})`}>
                      <text x={0} y={0} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize={9}>
                        {payload.value}
                      </text>
                      <text x={0} y={12} textAnchor="middle" fill="hsl(var(--primary))" fontSize={9} fontWeight="bold">
                        得分{radarData.find(d => d.skill === payload.value)?.value}
                      </text>
                    </g>
                  )}
                />
                <Radar dataKey="value" fill="hsl(var(--primary))" fillOpacity={0.2} stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Strengths */}
          <Card className="p-4">
            <h3 className="text-xs font-bold flex items-center gap-1.5 mb-3">✅ 优势维度</h3>
            <div className="space-y-2">
              {strengths.map((s, i) => (
                <div key={i} className="rounded-xl bg-green-50 p-3">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[11px] font-semibold text-green-700">{s.name}</span>
                    <span className="text-[10px] font-bold text-green-600">{s.score}分</span>
                  </div>
                  <p className="text-[10px] text-green-600/80">{s.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Weaknesses */}
          <Card className="p-4">
            <h3 className="text-xs font-bold flex items-center gap-1.5 mb-3">⚠️ 劣势维度</h3>
            <div className="space-y-2">
              {weaknesses.map((w, i) => (
                <div key={i} className="rounded-xl bg-red-50 p-3">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[11px] font-semibold text-red-700">{w.name}</span>
                    <span className="text-[10px] font-bold text-red-600">{w.score}分</span>
                  </div>
                  <p className="text-[10px] text-red-600/80">{w.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Dialogue Review */}
          <Card className="p-4">
            <h3 className="text-xs font-bold flex items-center gap-1.5 mb-3">💬 会话记录分析</h3>
            <div className="space-y-3">
              {dialogueReview.map((msg, i) => (
                <div key={i}>
                  <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs ${
                      msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                  {msg.comment && (
                    <div className={`mt-1 ml-2 rounded-lg px-2.5 py-1.5 text-[10px] ${
                      msg.comment.type === "good"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                    }`}>
                      {msg.comment.text}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/practice")}
              className="flex-1 rounded-xl bg-primary py-3 text-xs font-medium text-primary-foreground"
            >
              再练一次
            </button>
            <button
              onClick={() => setSelectedId(null)}
              className="flex-1 rounded-xl border border-border py-3 text-xs font-medium"
            >
              返回列表
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">练习复盘</h1>
      </div>
      <div className="p-4 space-y-2">
        {practiceList.map((p) => (
          <Card
            key={p.id}
            className="cursor-pointer p-4 hover:shadow-md transition-shadow"
            onClick={() => setSelectedId(p.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">📄</span>
                <h4 className="text-xs font-semibold">{p.scenario}</h4>
              </div>
              <span className="text-[10px] text-muted-foreground rounded-full border border-border px-2 py-0.5">查 看</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${tagColor[p.mode] || "bg-muted text-muted-foreground"}`}>{p.mode}</span>
              <span className="text-[10px] text-muted-foreground">{p.duration}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">{p.date}</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{p.plan}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PracticeReviewPage;
