import { useState } from "react";
import { ArrowLeft, CheckCircle, Video, Play, FileText, Clock, ChevronRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const examList = [
  { id: 1, title: "FABE销售法则考核", type: "objective", questionCount: 20, duration: "30分钟", status: "未开始", difficulty: "初级", desc: "考核FABE法则在实际销售中的运用" },
  { id: 2, title: "客户投诉处理实战", type: "ai", questionCount: 5, duration: "45分钟", status: "未开始", difficulty: "中级", desc: "AI模拟真实投诉场景，考察应变能力" },
  { id: 3, title: "电话销售技巧测试", type: "objective", questionCount: 15, duration: "20分钟", status: "已完成", score: 92, difficulty: "初级", desc: "电话销售开场白与话术技巧考核" },
  { id: 4, title: "大客户谈判能力评估", type: "ai", questionCount: 3, duration: "60分钟", status: "未开始", difficulty: "高级", desc: "模拟大客户商务谈判全流程" },
  { id: 5, title: "产品知识综合考试", type: "objective", questionCount: 30, duration: "45分钟", status: "已完成", score: 78, difficulty: "中级", desc: "全产品线知识掌握情况测试" },
  { id: 6, title: "新人入职综合测评", type: "objective", questionCount: 25, duration: "40分钟", status: "未开始", difficulty: "初级", desc: "新员工入职基础知识与技能测评" },
];

const objectiveQuestions = [
  { id: 1, q: "FABE法则中的B代表什么？", options: ["Feature", "Benefit", "Best", "Bridge"], answer: 1 },
  { id: 2, q: "处理客户投诉的第一步应该是？", options: ["解释原因", "道歉并共情", "提供方案", "转接主管"], answer: 1 },
  { id: 3, q: "电话销售的黄金时间段是？", options: ["8-9点", "10-11:30", "12-13点", "17-18点"], answer: 1 },
];

const aiExamQuestions = [
  { id: 1, videoTitle: "场景：客户要求退款", q: "请回答你会如何处理这个客户的退款要求？" },
  { id: 2, videoTitle: "场景：客户对比竞品", q: "客户说竞品价格更低，你怎么回应？" },
];

const diffColor: Record<string, string> = {
  "初级": "bg-green-50 text-green-600",
  "中级": "bg-yellow-50 text-yellow-600",
  "高级": "bg-red-50 text-red-600",
};

const ExamPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const examIdParam = searchParams.get("examId");
  const [activeExamId, setActiveExamId] = useState<number | null>(examIdParam ? Number(examIdParam) : null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const activeExam = examList.find(e => e.id === activeExamId);

  // Exam list view
  if (!activeExam) {
    return (
      <div>
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
          <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
          <h1 className="text-sm font-semibold">考试中心</h1>
        </div>
        <div className="p-4 space-y-3">
          {examList.map((exam) => (
            <Card
              key={exam.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                if (exam.status !== "已完成") {
                  setActiveExamId(exam.id);
                  setCurrentQ(0);
                  setSelected(null);
                  setScore(null);
                }
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold">{exam.title}</h4>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-[11px] text-muted-foreground mb-2">{exam.desc}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${diffColor[exam.difficulty]}`}>{exam.difficulty}</span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                  <FileText className="h-3 w-3" />{exam.questionCount}题
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                  <Clock className="h-3 w-3" />{exam.duration}
                </span>
                <span className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-medium ${
                  exam.status === "已完成" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {exam.status === "已完成" ? `已完成 ${(exam as any).score}分` : exam.type === "ai" ? "AI实战" : "客观题"}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const isAI = activeExam.type === "ai";

  if (score !== null) {
    return (
      <div>
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
          <button onClick={() => setActiveExamId(null)}><ArrowLeft className="h-5 w-5" /></button>
          <h1 className="text-sm font-semibold">考核结果</h1>
        </div>
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 mb-4">
            <span className="text-4xl font-bold text-primary">{score}</span>
          </div>
          <p className="text-sm font-semibold mb-1">{score >= 80 ? "恭喜通过！🎉" : "继续加油！💪"}</p>
          <p className="text-xs text-muted-foreground mb-6">
            {score >= 80 ? "你已掌握本章节核心知识" : "建议复习后重新考核"}
          </p>
          <Button onClick={() => setActiveExamId(null)} className="w-full max-w-xs">返回考试列表</Button>
        </div>
      </div>
    );
  }

  const questions = isAI ? aiExamQuestions : objectiveQuestions;
  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => setActiveExamId(null)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">{activeExam.title}</h1>
        <span className="ml-auto text-xs text-muted-foreground">{currentQ + 1}/{questions.length}</span>
      </div>

      <div className="p-4 space-y-4">
        <Progress value={progress} className="h-1.5" />

        {isAI ? (
          <div className="space-y-4">
            <div className="rounded-xl bg-foreground/5 h-44 flex items-center justify-center">
              <div className="text-center">
                <Play className="h-10 w-10 mx-auto text-primary mb-2" />
                <p className="text-xs text-muted-foreground">{aiExamQuestions[currentQ].videoTitle}</p>
              </div>
            </div>
            <Card className="p-4">
              <p className="text-sm font-medium mb-3">{aiExamQuestions[currentQ].q}</p>
              <textarea
                className="w-full rounded-lg border border-input bg-background p-3 text-xs min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="输入你的回答..."
              />
            </Card>
            <Button
              className="w-full"
              onClick={() => {
                if (currentQ < aiExamQuestions.length - 1) setCurrentQ((c) => c + 1);
                else setScore(85);
              }}
            >
              {currentQ < aiExamQuestions.length - 1 ? "下一题" : "提交考试"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Card className="p-4">
              <p className="text-sm font-medium mb-4">{objectiveQuestions[currentQ].q}</p>
              <div className="space-y-2">
                {objectiveQuestions[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`w-full rounded-xl border p-3 text-left text-xs transition-all ${
                      selected === i
                        ? "border-primary bg-primary/5 text-primary font-medium"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <span className="mr-2 font-medium">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            </Card>
            <Button
              className="w-full"
              disabled={selected === null}
              onClick={() => {
                if (currentQ < objectiveQuestions.length - 1) {
                  setCurrentQ((c) => c + 1);
                  setSelected(null);
                } else {
                  setScore(90);
                }
              }}
            >
              {currentQ < objectiveQuestions.length - 1 ? "下一题" : "提交考试"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamPage;
