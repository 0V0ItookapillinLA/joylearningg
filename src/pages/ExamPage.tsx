import { useState } from "react";
import { ArrowLeft, CheckCircle, Video, Play } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const objectiveQuestions = [
  { id: 1, q: "FABE法则中的B代表什么？", options: ["Feature", "Benefit", "Best", "Bridge"], answer: 1 },
  { id: 2, q: "处理客户投诉的第一步应该是？", options: ["解释原因", "道歉并共情", "提供方案", "转接主管"], answer: 1 },
  { id: 3, q: "电话销售的黄金时间段是？", options: ["8-9点", "10-11:30", "12-13点", "17-18点"], answer: 1 },
];

const aiExamQuestions = [
  { id: 1, videoTitle: "场景：客户要求退款", q: "请回答你会如何处理这个客户的退款要求？" },
  { id: 2, videoTitle: "场景：客户对比竞品", q: "客户说竞品价格更低，你怎么回应？" },
];

const ExamPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAI = searchParams.get("type") === "ai";
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);

  if (score !== null) {
    return (
      <div>
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
          <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
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
          <Button onClick={() => navigate(-1)} className="w-full max-w-xs">返回</Button>
        </div>
      </div>
    );
  }

  const questions = isAI ? aiExamQuestions : objectiveQuestions;
  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">{isAI ? "AI实战考试" : "客观题考试"}</h1>
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
