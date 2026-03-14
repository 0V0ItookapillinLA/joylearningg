import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

const practiceList = [
  { id: 1, scenario: "客户投诉处理", date: "2026-03-13", score: 85, mode: "文本" },
  { id: 2, scenario: "首次电话沟通", date: "2026-03-12", score: 72, mode: "语音" },
  { id: 3, scenario: "价格谈判", date: "2026-03-10", score: 91, mode: "视频" },
  { id: 4, scenario: "客户跟进回访", date: "2026-03-08", score: 68, mode: "文本" },
];

const radarData = [
  { skill: "表达能力", value: 85 },
  { skill: "共情能力", value: 78 },
  { skill: "问题解决", value: 90 },
  { skill: "专业知识", value: 72 },
  { skill: "应变能力", value: 80 },
  { skill: "沟通技巧", value: 88 },
];

const dialogueReview = [
  {
    role: "ai" as const,
    text: "你好，我是客户王先生。你们的产品噪音太大了，我要退货！",
    comment: null,
  },
  {
    role: "user" as const,
    text: "王先生您好，非常抱歉给您带来不好的体验。我理解您的心情。",
    comment: { type: "good" as const, text: "✓ 及时表达歉意和共情，开局良好" },
  },
  {
    role: "user" as const,
    text: "请问具体是在什么使用场景下出现的噪音呢？",
    comment: { type: "good" as const, text: "✓ 主动了解具体情况，专业表现" },
  },
  {
    role: "ai" as const,
    text: "就是晚上睡觉的时候，嗡嗡响根本没法睡！",
    comment: null,
  },
  {
    role: "user" as const,
    text: "这个确实会影响您的休息。我建议您先试试调到静音模式。",
    comment: { type: "improve" as const, text: "⚠ 建议先确认客户是否知道静音模式的操作方法" },
  },
];

const improvements = [
  "在提供解决方案前，先充分了解客户的使用场景",
  "可以主动提供上门检测服务，展示服务诚意",
  "结尾可以确认客户满意度，并告知后续跟进安排",
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
          {/* Score */}
          <div className="text-center">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 mb-2">
              <span className="text-3xl font-bold text-primary">{selected.score}</span>
            </div>
            <p className="text-sm font-semibold">{selected.scenario}</p>
            <p className="text-[11px] text-muted-foreground">{selected.date} · {selected.mode}模式</p>
          </div>

          {/* Radar Chart */}
          <Card className="p-4">
            <h3 className="text-xs font-semibold mb-2">能力分析</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <Radar dataKey="value" fill="hsl(var(--primary))" fillOpacity={0.2} stroke="hsl(var(--primary))" strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Dialogue Review */}
          <Card className="p-4">
            <h3 className="text-xs font-semibold mb-3">对话还原与点评</h3>
            <div className="space-y-3">
              {dialogueReview.map((msg, i) => (
                <div key={i}>
                  <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  {msg.comment && (
                    <div
                      className={`mt-1 ml-2 rounded-lg px-2.5 py-1.5 text-[10px] ${
                        msg.comment.type === "good"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                      }`}
                    >
                      {msg.comment.text}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Improvements */}
          <Card className="p-4">
            <h3 className="text-xs font-semibold mb-3">改进建议</h3>
            <div className="space-y-2">
              {improvements.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-foreground">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    {i + 1}
                  </span>
                  {item}
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
            className="flex cursor-pointer items-center gap-3 p-4 hover:shadow-md transition-shadow"
            onClick={() => setSelectedId(p.id)}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
              p.score >= 80 ? "bg-green-100 text-green-700" : p.score >= 60 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
            }`}>
              {p.score}
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-medium">{p.scenario}</h4>
              <p className="text-[10px] text-muted-foreground">{p.date} · {p.mode}模式</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PracticeReviewPage;
