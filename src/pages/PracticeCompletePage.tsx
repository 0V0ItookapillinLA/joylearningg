import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Star, X, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const PracticeCompletePage = () => {
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReportReady(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmitFeedback = () => {
    setSubmitted(true);
    setTimeout(() => {
      setShowFeedback(false);
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative">
      {/* Fixed back button */}
      <div className="fixed top-0 left-0 right-0 z-20 mx-auto max-w-[430px]">
        <button onClick={() => navigate("/")} className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted/80 backdrop-blur-sm shadow">
          <ArrowLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Check icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
      >
        <CheckCircle2 className="h-10 w-10 text-primary" />
      </motion.div>

      {/* Congrats text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-center"
      >
        <h1 className="text-lg font-bold">恭喜完成练习 🎉</h1>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          AI已为您生成详细的练习报告
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-10 w-full flex gap-3"
      >
        <Button
          variant="outline"
          className="flex-1 h-12 rounded-full text-sm font-medium"
          onClick={() => setShowFeedback(true)}
        >
          满意度反馈
        </Button>
        <Button
          className="flex-1 h-12 rounded-full text-sm font-medium bg-gradient-to-r from-primary to-primary/80"
          disabled={!reportReady}
          onClick={() => navigate("/practice-review?detail=1", { replace: true })}
        >
          {reportReady ? (
            "查看报告"
          ) : (
            <span className="flex items-center gap-1.5">
              <Loader2 className="h-4 w-4 animate-spin" />
              报告生成中
            </span>
          )}
        </Button>
      </motion.div>

      {/* Feedback bottom sheet */}
      <AnimatePresence>
        {showFeedback && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm"
              onClick={() => setShowFeedback(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[70] mx-auto max-w-[430px] rounded-t-[24px] bg-card shadow-2xl"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold">打分评价</h3>
                  <button onClick={() => setShowFeedback(false)}>
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                {submitted ? (
                  <div className="py-8 text-center">
                    <p className="text-sm font-medium text-primary">感谢您的反馈！</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-1">
                      <p className="text-xs text-muted-foreground mt-0.5">请为本次练习体验打分吧~</p>
                    </div>

                    {/* Star rating */}
                    <div className="flex justify-center gap-2 my-5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} onClick={() => setRating(s)}>
                          <Star
                            className={`h-8 w-8 transition-colors ${
                              s <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-muted text-muted"
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    {/* Feedback text */}
                    <div className="mb-2">
                      <h4 className="text-sm font-bold mb-2">我要反馈</h4>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value.slice(0, 200))}
                        placeholder="告诉我们您的其他想法？（选填）"
                        className="w-full h-28 rounded-xl border border-border bg-muted/30 p-3 text-xs leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                      />
                      <p className="text-right text-[10px] text-muted-foreground mt-1">{feedback.length} / 200</p>
                    </div>

                    <Button
                      className="w-full h-11 rounded-xl text-sm font-medium bg-gradient-to-r from-primary to-primary/80"
                      onClick={handleSubmitFeedback}
                    >
                      提 交
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PracticeCompletePage;
