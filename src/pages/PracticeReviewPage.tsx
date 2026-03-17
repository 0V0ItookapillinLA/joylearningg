import { ArrowLeft, ChevronDown, ChevronUp, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

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

type DialogueLabel = "excellent" | "improvable" | "error";

interface DialogueSegment {
  messages: { role: "ai" | "user"; text: string }[];
  label: DialogueLabel;
  labelText: string;
  analysis?: string;
  suggestion?: string;
}

const dialogueSegments: DialogueSegment[] = [
  {
    messages: [
      { role: "ai", text: "您好，我是来自XX公司的采购专员小王。请问您最近有考虑过扩大供货渠道吗？" },
      { role: "user", text: "我们公司目前用的系统还行吧，暂时没有换的打算。" },
      { role: "ai", text: "理解您的想法。不过我想了解一下，您目前的系统在处理大批量数据时，响应速度怎么样？" },
      { role: "user", text: "这个我不太清楚，反正我们用着没什么问题。" },
    ],
    label: "error",
    labelText: "需要改进",
    analysis: "未能有效引导客户认识到现有系统的痛点，提问方式过于直接，容易让客户产生防御心理。",
    suggestion: "建议采用SPIN法则，先通过情境性问题建立信任，再逐步引导客户发现问题：\"您平时处理订单高峰期的体验如何？有没有遇到过系统卡顿的情况？\"",
  },
  {
    messages: [
      { role: "ai", text: "好的，那您方便告诉我，贵公司目前团队规模大概有多少人在使用这个系统呢？" },
      { role: "user", text: "大概有50多人吧，但这个跟你们的产品有什么关系呢？" },
      { role: "ai", text: "非常感谢您的信息。50人规模的团队，如果能提升10%的工作效率，一年能节省不少成本呢。" },
      { role: "user", text: "你们的产品价格是多少？我先看看再说。" },
    ],
    label: "improvable",
    labelText: "可以优化",
    analysis: "能够提供基本信息并提出合理反问，但在价值讨论阶段过早转向价格，显得急躁。",
    suggestion: "建议先了解更多价值信息：\"在讨论价格之前，我想先了解一下贵公司具体的需求点，这样才能给您推荐最合适的方案。\"",
  },
  {
    messages: [
      { role: "ai", text: "当然可以。不过在报价之前，我想先确认一下您最看重系统的哪些功能？" },
      { role: "user", text: "主要是数据统计和报表生成的速度，还有就是多人协作的稳定性。" },
      { role: "ai", text: "明白了。这两个恰好是我们产品的核心优势。我可以给您安排一次免费的系统演示。" },
      { role: "user", text: "可以，你发个时间过来，我看看下周有没有空。" },
    ],
    label: "excellent",
    labelText: "表现优秀",
  },
  {
    messages: [
      { role: "user", text: "对了，你们的售后服务怎么样？之前用的系统售后太差了。" },
      { role: "ai", text: "我们提供7x24小时技术支持，还有专属客户经理一对一服务。" },
      { role: "user", text: "听起来不错，那就先约个演示看看吧。" },
    ],
    label: "excellent",
    labelText: "表现优秀",
  },
];

const labelConfig: Record<DialogueLabel, { border: string; bg: string; text: string; icon: typeof AlertCircle; badgeBg: string; badgeText: string }> = {
  error: { border: "border-l-red-500", bg: "bg-red-50", text: "text-red-600", icon: AlertCircle, badgeBg: "bg-red-100", badgeText: "text-red-600" },
  improvable: { border: "border-l-yellow-500", bg: "bg-yellow-50", text: "text-yellow-600", icon: Lightbulb, badgeBg: "bg-yellow-100", badgeText: "text-yellow-600" },
  excellent: { border: "border-l-green-500", bg: "bg-green-50", text: "text-green-600", icon: CheckCircle2, badgeBg: "bg-green-100", badgeText: "text-green-600" },
};

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
  { name: "团队合作", score: 85, desc: "良好的倾听和回应技巧" },
];

const weaknesses = [
  { name: "抗压能力", score: 50, desc: "面对强势客户时容易妥协" },
  { name: "责任心", score: 60, desc: "在压力下语言组织能力下降" },
];

const PracticeReviewPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const detailParam = searchParams.get("detail");
  const [selectedId, setSelectedId] = useState<number | null>(detailParam ? Number(detailParam) : null);
  const [expandedSegment, setExpandedSegment] = useState<number | null>(null);
  const selected = practiceList.find((p) => p.id === selectedId);

  const errorCount = dialogueSegments.filter(s => s.label === "error").length;
  const improvableCount = dialogueSegments.filter(s => s.label === "improvable").length;
  const excellentCount = dialogueSegments.filter(s => s.label === "excellent").length;

  if (selected) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
          <button onClick={() => { setSelectedId(null); }}><ArrowLeft className="h-5 w-5" /></button>
          <h1 className="text-sm font-semibold">复盘报告</h1>
        </div>

        <div className="p-4 space-y-5">
          {/* Top card: tags + title + buttons + score */}
          <Card className="p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">考试</span>
                  <span className="rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">{selected.mode}</span>
                </div>
                <h2 className="text-sm font-bold">{selected.scenario}</h2>
                <p className="text-[11px] text-muted-foreground mt-1">⏱ 时长 {selected.duration}</p>
              </div>
              <button
                onClick={() => navigate("/practice")}
                className="shrink-0 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-primary/80 px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm"
              >
                🎯 再次练习
              </button>
            </div>

            {/* Score section */}
            <div className="flex items-center gap-4 rounded-xl bg-muted/50 p-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shrink-0">
                <span className="text-xl font-bold text-primary-foreground">{selected.score}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold">AI 综合评分</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">沟通能力强，有团队领导力</p>
              </div>
            </div>

            {/* Publish button */}
            <button
              onClick={() => alert("已发布到公开对练！")}
              className="w-full rounded-xl border border-primary/30 bg-primary/5 py-2.5 text-xs font-medium text-primary"
            >
              📤 发布到公开对练
            </button>
          </Card>

          <Card className="p-4">
            <h3 className="text-xs font-bold flex items-center gap-1.5 mb-3">📋 本次练习评价</h3>
            <div className="space-y-3">
              {evalText.map((text, i) => (
                <p key={i} className="text-[11px] text-foreground leading-relaxed">{text}</p>
              ))}
            </div>
          </Card>

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

          {/* Dialogue Review - matching screenshot style */}
          <Card className="p-4">
            <h3 className="text-xs font-bold flex items-center gap-1.5 mb-3">💬 会话记录分析</h3>
            
            {/* Summary chips */}
            <div className="flex gap-2 mb-4">
              <span className="rounded-full border border-border px-3 py-1 text-[11px] font-medium">{errorCount} 处错误</span>
              <span className="rounded-full border border-border px-3 py-1 text-[11px] font-medium">{improvableCount} 处可优化</span>
              <span className="rounded-full border border-border px-3 py-1 text-[11px] font-medium">{excellentCount} 处表现良好</span>
            </div>

            <div className="space-y-4">
              {dialogueSegments.map((segment, si) => {
                const config = labelConfig[segment.label];
                const isClickable = segment.label !== "excellent";
                const isExpanded = expandedSegment === si;
                const Icon = config.icon;

                return (
                  <div key={si}>
                    {/* Segment card with left border */}
                    <div
                      className={`rounded-xl border-l-4 ${config.border} bg-card shadow-sm p-4 ${isClickable ? "cursor-pointer" : ""}`}
                      onClick={() => {
                        if (isClickable) setExpandedSegment(isExpanded ? null : si);
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-muted-foreground font-medium">片段 {si + 1}</span>
                          <span className={`inline-flex items-center gap-1 rounded-full ${config.badgeBg} px-2.5 py-0.5`}>
                            <Icon className={`h-3 w-3 ${config.badgeText}`} />
                            <span className={`text-[10px] font-semibold ${config.badgeText}`}>{segment.labelText}</span>
                          </span>
                        </div>
                        {isClickable && (
                          isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>

                      {/* Messages - flat style with role prefix */}
                      <div className="space-y-3">
                        {segment.messages.map((msg, mi) => (
                          <div key={mi} className="flex gap-2.5">
                            <span className={`text-[11px] font-bold shrink-0 mt-0.5 ${msg.role === "user" ? "text-primary" : "text-muted-foreground"}`}>
                              {msg.role === "user" ? "我" : "AI"}
                            </span>
                            <p className="text-[12px] text-foreground/80 leading-relaxed">{msg.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expandable analysis below the card */}
                    <AnimatePresence>
                      {isExpanded && segment.analysis && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 space-y-2 pl-2">
                            {/* Problem analysis */}
                            <div className="rounded-xl bg-red-50 border border-red-100 p-3.5">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                                <span className="text-[11px] font-semibold text-red-600">问题分析</span>
                              </div>
                              <p className="text-[12px] text-foreground/80 leading-relaxed">{segment.analysis}</p>
                            </div>
                            {/* Suggestion */}
                            {segment.suggestion && (
                              <div className="rounded-xl bg-blue-50 border border-blue-100 p-3.5">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <Lightbulb className="h-3.5 w-3.5 text-blue-500" />
                                  <span className="text-[11px] font-semibold text-blue-600">改进建议</span>
                                </div>
                                <p className="text-[12px] text-foreground/80 leading-relaxed">{segment.suggestion}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Card>

          <button
            onClick={() => setSelectedId(null)}
            className="w-full rounded-xl border border-border py-3 text-xs font-medium text-muted-foreground"
          >
            返回列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate("/profile")}><ArrowLeft className="h-5 w-5" /></button>
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
