import { useState } from "react";
import { ArrowLeft, Play, MapPin, CheckSquare, Target, Clock, Users, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import coverObjection from "@/assets/cover-objection.jpg";
import coverPhoneSales from "@/assets/cover-phone-sales.jpg";
import coverProduct from "@/assets/cover-product.jpg";
import coverNegotiation from "@/assets/cover-negotiation.jpg";

const practiceData: Record<string, {
  title: string; tag: string; duration: string; remaining: number;
  scenario: string; task: string; cover: string;
  focuses: { name: string; weight: string; desc: string }[];
  times: number;
}> = {
  "1": {
    title: "客户投诉处理", tag: "自由对话", duration: "15分钟", remaining: 30, cover: coverObjection,
    scenario: "客户对产品质量不满，情绪激动要求退货退款。你需要通过三幕对话（安抚情绪→了解问题→提供方案），让客户接受解决方案。",
    task: "安抚客户情绪并引导客户接受解决方案，需要完成情绪安抚、问题诊断、方案推荐三个环节。",
    focuses: [
      { name: "共情能力", weight: "25%", desc: "及时回应客户情绪，表达理解" },
      { name: "问题诊断", weight: "25%", desc: "精准定位问题根源，逻辑清晰" },
      { name: "方案推荐", weight: "20%", desc: "针对性提供解决方案，表达专业" },
      { name: "异议处理", weight: "15%", desc: "不硬怼，先理解再回应" },
      { name: "沟通表达", weight: "15%", desc: "语气专业、结构清晰、控制节奏" },
    ],
    times: 1234,
  },
  "2": {
    title: "首次电话沟通", tag: "固定剧本", duration: "10分钟", remaining: 50, cover: coverPhoneSales,
    scenario: "你是一名销售代表，需要对新客户进行首次电话沟通。客户是某公司采购负责人，对你的产品有初步兴趣但还在比较其他方案。",
    task: "建立良好的第一印象，了解客户需求，约定下一步（如上门拜访或发送方案）。",
    focuses: [
      { name: "开场白", weight: "20%", desc: "自我介绍简洁有力，引起兴趣" },
      { name: "需求挖掘", weight: "25%", desc: "通过提问了解客户真实需求" },
      { name: "价值传递", weight: "25%", desc: "简明扼要传达产品核心价值" },
      { name: "推进结果", weight: "15%", desc: "自然推动下一步行动" },
      { name: "沟通表达", weight: "15%", desc: "语气友好、节奏适当" },
    ],
    times: 892,
  },
  "3": {
    title: "价格谈判实战", tag: "文本对练", duration: "20分钟", remaining: 20, cover: coverNegotiation,
    scenario: "客户已经对产品表示认可，但在价格环节提出大幅折扣要求。你需要在保证合理利润的前提下达成交易。",
    task: "在不大幅降价的情况下，通过价值重塑和灵活的方案组合，让客户接受报价。",
    focuses: [
      { name: "价值锚定", weight: "25%", desc: "强化产品价值，避免单纯比价" },
      { name: "方案灵活", weight: "25%", desc: "提供替代方案，创造双赢" },
      { name: "底线把控", weight: "20%", desc: "有原则地让步，守住底线" },
      { name: "节奏控制", weight: "15%", desc: "掌握谈判节奏，不被牵着走" },
      { name: "成交推动", weight: "15%", desc: "识别成交信号并果断推进" },
    ],
    times: 567,
  },
  "4": {
    title: "产品演示模拟", tag: "自由对话", duration: "15分钟", remaining: 40, cover: coverProduct,
    scenario: "你需要向客户团队进行产品演示。客户包括技术负责人和业务负责人，他们关注的重点不同。",
    task: "针对不同角色的关注点进行有针对性的演示，解答技术和业务疑问，推动客户进入试用阶段。",
    focuses: [
      { name: "需求匹配", weight: "25%", desc: "针对不同角色调整演示重点" },
      { name: "专业展示", weight: "25%", desc: "演示流畅，重点突出" },
      { name: "问答应对", weight: "20%", desc: "回答准确，有理有据" },
      { name: "互动引导", weight: "15%", desc: "引导客户参与，激发兴趣" },
      { name: "推进落地", weight: "15%", desc: "自然推动试用或下一步" },
    ],
    times: 345,
  },
};

const tagColor: Record<string, string> = {
  "自由对话": "bg-primary/10 text-primary",
  "固定剧本": "bg-accent text-accent-foreground",
  "文本对练": "bg-muted text-muted-foreground",
};

const PracticeDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const practice = practiceData[id || "1"] || practiceData["1"];
  const [showGuide, setShowGuide] = useState(false);

  const getModeRoute = () => {
    const isScript = practice.tag === "固定剧本";
    if (practice.tag === "文本对练") return `/practice-session/${id}?mode=text`;
    return `/practice-session/${id}?mode=video${isScript ? "&script=true" : ""}`;
  };

  const guideContent = `本练习模拟${practice.title}场景。\n\n🎯 练习目标：\n${practice.focuses.map(f => "• " + f.desc).join("\n")}\n\n⚠️ 注意事项：\n• 注意控制沟通节奏\n• 保持专业态度\n• 灵活应对各种情况`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed back button */}
      <div className="fixed top-0 left-0 right-0 z-20 mx-auto max-w-[430px]">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow">
          <ArrowLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Cover with image */}
      <div className="relative h-52 shrink-0">
        <img src={practice.cover} alt={practice.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto -mt-6 relative z-[1] pb-24">
        <div className="p-4 space-y-5">
          <div>
            <h2 className="text-lg font-bold">{practice.title}</h2>
            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />建议：{practice.duration}</span>
              <span>剩余：{practice.remaining}次</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tagColor[practice.tag] || "bg-muted text-muted-foreground"}`}>{practice.tag}</span>
              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Users className="h-3 w-3" />{practice.times}人已练</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">场景说明</h3>
            </div>
            <Card className="p-3.5 bg-muted/30">
              <p className="text-xs leading-relaxed text-foreground">{practice.scenario}</p>
            </Card>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckSquare className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">任务说明</h3>
            </div>
            <Card className="p-3.5 bg-muted/30">
              <p className="text-xs leading-relaxed text-foreground">{practice.task}</p>
            </Card>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">练习重点</h3>
            </div>
            <Card className="p-3.5 bg-muted/30 space-y-3">
              {practice.focuses.map((f) => (
                <div key={f.name}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">{f.name}</span>
                    <span className="text-[10px] text-muted-foreground">({f.weight})</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{f.desc}</p>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>

      {/* Fixed bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-20 mx-auto max-w-[430px] bg-card border-t border-border px-4 py-3 flex gap-3">
        <Button variant="outline" className="flex-1 rounded-xl h-11 text-xs" onClick={() => setShowGuide(true)}>
          练前指导
        </Button>
        <Button className="flex-1 rounded-xl h-11 text-xs" onClick={() => navigate(getModeRoute())}>
          进入场景练习
        </Button>
      </div>

      {/* Guide bottom sheet */}
      <AnimatePresence>
        {showGuide && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm"
              onClick={() => setShowGuide(false)}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[70] mx-auto max-w-[430px] rounded-t-[24px] bg-card shadow-2xl"
              style={{ maxHeight: "60vh" }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold">练前指导</h3>
                <button onClick={() => setShowGuide(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
              </div>
              <div className="overflow-y-auto p-4" style={{ maxHeight: "calc(60vh - 56px)" }}>
                <p className="text-xs leading-relaxed text-foreground whitespace-pre-line">{guideContent}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PracticeDetailPage;
