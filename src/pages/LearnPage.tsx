import { useState } from "react";
import { BookOpen, ChevronRight, Target, Heart, MessageCircle, Eye, Clock, Flame, Award, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const tagColor: Record<string, string> = {
  "自由对话": "bg-primary/10 text-primary",
  "固定剧本": "bg-accent text-accent-foreground",
  "文本对练": "bg-muted text-muted-foreground",
};

const sharedPractices = [
  { id: 1, user: "销售冠军小李", avatar: "🏆", role: "难缠客户王先生", title: "处理客户投诉的5个关键步骤", tag: "自由对话", likes: 245, comments: 52, views: 1342 },
  { id: 2, user: "金牌顾问Amy", avatar: "👩‍💼", role: "采购经理陈总", title: "B2B大客户谈判实录分享", tag: "固定剧本", likes: 189, comments: 43, views: 1091 },
  { id: 3, user: "培训师老张", avatar: "👨‍🏫", role: "销售经理张总", title: "新人首次电话销售话术拆解", tag: "文本对练", likes: 134, comments: 28, views: 867 },
  { id: 4, user: "实习生小王", avatar: "🧑‍💼", role: "客服小美", title: "售后回访中的情绪管理心得", tag: "自由对话", likes: 98, comments: 15, views: 523 },
  { id: 5, user: "区域经理赵哥", avatar: "💼", role: "谈判专家李总", title: "价格谈判中的底线设定技巧", tag: "固定剧本", likes: 312, comments: 78, views: 2145 },
];

const weeklyHot = [
  { id: 7, user: "销售达人", avatar: "🔥", role: "难缠客户王先生", title: "如何把投诉客户变成忠实客户", tag: "自由对话", likes: 530, comments: 189, views: 4341 },
  { id: 8, user: "话术专家", avatar: "💬", role: "新客户赵小姐", title: "首次接触客户的黄金30秒", tag: "固定剧本", likes: 487, comments: 145, views: 3856 },
  { id: 9, user: "谈判高手", avatar: "🤝", role: "谈判专家李总", title: "竞品对比时的3个反转话术", tag: "文本对练", likes: 456, comments: 167, views: 3543 },
  { id: 10, user: "销冠小陈", avatar: "👑", role: "采购经理陈总", title: "年度大单促成的完整复盘", tag: "自由对话", likes: 398, comments: 152, views: 2789 },
];

const topRated = [
  { id: 12, user: "王总监", avatar: "👨‍💼", role: "销售经理张总", title: "95分高分案例：完美异议处理", tag: "固定剧本", likes: 656, comments: 223, views: 6678 },
  { id: 13, user: "赵经理", avatar: "👔", role: "难缠客户王先生", title: "从愤怒到满意：满分客诉处理", tag: "自由对话", likes: 589, comments: 198, views: 5567 },
  { id: 14, user: "陈老师", avatar: "📖", role: "谈判专家李总", title: "教科书级别的价格谈判录", tag: "文本对练", likes: 478, comments: 167, views: 4456 },
];

const newbiePicks = [
  { id: 16, user: "新人小白", avatar: "🌱", role: "客服小美", title: "新手第一次AI对练感悟", tag: "文本对练", likes: 67, comments: 25, views: 456 },
  { id: 17, user: "入职新人", avatar: "🎓", role: "销售经理张总", title: "入职一周的电话销售体验", tag: "固定剧本", likes: 89, comments: 32, views: 678 },
  { id: 18, user: "转岗小刘", avatar: "🔄", role: "新客户赵小姐", title: "从技术转销售的第一课", tag: "自由对话", likes: 112, comments: 41, views: 789 },
];

const plans = [
  { id: 1, title: "新人应知应会计划", chapters: 12, completed: 5, desc: "从零开始掌握销售核心技能", status: "进行中", hours: 4 },
  { id: 2, title: "全量零售采销AI陪练", chapters: 10, completed: 3, desc: "提升客户满意度的必修课", status: "进行中", hours: 3 },
  { id: 3, title: "高级谈判技巧", chapters: 15, completed: 0, desc: "掌握复杂场景谈判策略", status: "未开始", hours: 6 },
];

type TabType = "public" | "plans";

const PracticeCard = ({ item, onClick }: { item: typeof sharedPractices[0]; onClick: () => void }) => (
  <Card className="w-56 shrink-0 cursor-pointer p-3.5 transition-shadow hover:shadow-md" onClick={onClick}>
    <div className="flex items-center gap-2 mb-2">
      <span className="text-lg">{item.avatar}</span>
      <span className="text-[11px] text-muted-foreground truncate">{item.user}</span>
    </div>
    <div className="rounded-lg bg-muted p-2.5 mb-2">
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-1">
        <span>和</span>
        <span className="font-medium text-foreground">{item.role}</span>
        <span>的对练</span>
      </div>
      <p className="text-xs font-medium line-clamp-2">{item.title}</p>
    </div>
    <div className="flex items-center gap-2 mb-2">
      <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${tagColor[item.tag] || "bg-muted text-muted-foreground"}`}>{item.tag}</span>
    </div>
    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
      <span className="flex items-center gap-0.5"><Heart className="h-3 w-3" />{item.likes}</span>
      <span className="flex items-center gap-0.5"><MessageCircle className="h-3 w-3" />{item.comments}</span>
      <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" />{item.views}</span>
    </div>
  </Card>
);

const LearnPage = () => {
  const navigate = useNavigate();
  const [mainTab, setMainTab] = useState<TabType>("public");

  return (
    <div className="pb-4">
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-1 px-4 pt-4 pb-0">
          <button
            onClick={() => setMainTab("public")}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${mainTab === "public" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          >
            公开对练
          </button>
          <button
            onClick={() => setMainTab("plans")}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${mainTab === "plans" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          >
            练习计划
          </button>
        </div>
      </div>

      {mainTab === "public" && (
        <div className="space-y-5 px-4 pt-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold flex items-center gap-1.5"><Target className="h-4 w-4 text-primary" />为你推荐</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
              {sharedPractices.map((item) => (
                <PracticeCard key={item.id} item={item} onClick={() => navigate(`/shared-practice/${item.id}`)} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold flex items-center gap-1.5"><Flame className="h-4 w-4 text-destructive" />本周浏览最多</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
              {weeklyHot.map((item) => (
                <PracticeCard key={item.id} item={item} onClick={() => navigate(`/shared-practice/${item.id}`)} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold flex items-center gap-1.5"><Award className="h-4 w-4 text-amber-500" />高分优秀案例</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
              {topRated.map((item) => (
                <PracticeCard key={item.id} item={item} onClick={() => navigate(`/shared-practice/${item.id}`)} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" />新人必看</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
              {newbiePicks.map((item) => (
                <PracticeCard key={item.id} item={item} onClick={() => navigate(`/shared-practice/${item.id}`)} />
              ))}
            </div>
          </div>
        </div>
      )}

      {mainTab === "plans" && (
        <div className="px-4 pt-4">
          <Card className="mb-4 bg-gradient-to-r from-primary/5 to-accent p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🤖</span>
              <h3 className="text-sm font-bold">AI 赋能学习</h3>
            </div>
            <p className="text-[11px] text-muted-foreground">智能陪练 · 实时点评 · 个性化提升</p>
          </Card>

          <div className="space-y-3">
            {plans.map((plan) => {
              const pct = Math.round((plan.completed / plan.chapters) * 100);
              return (
                <Card
                  key={plan.id}
                  className="cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
                  onClick={() => navigate(`/plan/${plan.id}`)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className={`inline-block mb-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          plan.status === "进行中" ? "bg-green-50 text-green-600" : "bg-muted text-muted-foreground"
                        }`}>{plan.status}</span>
                        <h3 className="text-sm font-bold">{plan.title}</h3>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {plan.chapters} 章节 · 预计 {plan.hours} 小时
                        </p>
                      </div>
                    </div>
                    {pct > 0 && (
                      <div className="mt-3 flex items-center gap-3">
                        <Progress value={pct} className="h-1.5 flex-1" />
                        <span className="text-[11px] font-medium text-primary">{pct}%</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-border px-4 py-2.5 flex items-center justify-between bg-muted/30">
                    <p className="text-[11px] text-muted-foreground line-clamp-1">{plan.desc}</p>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnPage;
