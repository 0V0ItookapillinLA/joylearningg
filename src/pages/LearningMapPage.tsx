import { useState } from "react";
import { ArrowLeft, Check, Lock, Play, FileText, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CourseItem = {
  title: string;
  type: "video" | "doc" | "practice";
  completed: boolean;
  linkId: string;
};

type LevelNode = {
  level: string;
  title: string;
  status: "completed" | "current" | "locked";
  progress: number;
  courses: CourseItem[];
};

const levels: LevelNode[] = [
  {
    level: "P1", title: "初级销售", status: "completed", progress: 100,
    courses: [
      { title: "产品知识入门", type: "video", completed: true, linkId: "v1" },
      { title: "销售礼仪手册", type: "doc", completed: true, linkId: "d1" },
      { title: "基础话术练习", type: "practice", completed: true, linkId: "p1" },
    ],
  },
  {
    level: "P2", title: "销售顾问", status: "completed", progress: 100,
    courses: [
      { title: "FABE法则精讲", type: "video", completed: true, linkId: "v2" },
      { title: "CRM操作指南", type: "doc", completed: true, linkId: "d2" },
      { title: "需求分析对练", type: "practice", completed: true, linkId: "p2" },
    ],
  },
  {
    level: "P3", title: "高级销售顾问", status: "current", progress: 40,
    courses: [
      { title: "异议处理技巧", type: "video", completed: true, linkId: "v3" },
      { title: "竞品分析报告", type: "doc", completed: false, linkId: "d3" },
      { title: "价格谈判对练", type: "practice", completed: false, linkId: "p3" },
      { title: "大客户开发策略", type: "video", completed: false, linkId: "v4" },
    ],
  },
  {
    level: "P4", title: "资深销售顾问", status: "locked", progress: 0,
    courses: [
      { title: "复杂谈判实战", type: "video", completed: false, linkId: "v5" },
      { title: "方案式销售手册", type: "doc", completed: false, linkId: "d4" },
      { title: "行业洞察对练", type: "practice", completed: false, linkId: "p4" },
    ],
  },
  {
    level: "P5", title: "销售主管", status: "locked", progress: 0,
    courses: [
      { title: "团队管理基础", type: "video", completed: false, linkId: "v6" },
      { title: "绩效辅导手册", type: "doc", completed: false, linkId: "d5" },
      { title: "绩效面谈对练", type: "practice", completed: false, linkId: "p5" },
    ],
  },
  {
    level: "P6", title: "高级销售主管", status: "locked", progress: 0,
    courses: [
      { title: "区域市场策略", type: "video", completed: false, linkId: "v7" },
      { title: "KA管理指南", type: "doc", completed: false, linkId: "d6" },
      { title: "渠道拓展对练", type: "practice", completed: false, linkId: "p6" },
    ],
  },
  {
    level: "P7", title: "销售经理", status: "locked", progress: 0,
    courses: [
      { title: "P&L管理精讲", type: "video", completed: false, linkId: "v8" },
      { title: "年度规划模板", type: "doc", completed: false, linkId: "d7" },
      { title: "团队建设对练", type: "practice", completed: false, linkId: "p7" },
    ],
  },
  {
    level: "P8", title: "高级销售经理", status: "locked", progress: 0,
    courses: [
      { title: "多区域管理", type: "video", completed: false, linkId: "v9" },
      { title: "合作伙伴指南", type: "doc", completed: false, linkId: "d8" },
      { title: "危机处理对练", type: "practice", completed: false, linkId: "p8" },
    ],
  },
  {
    level: "P9", title: "区域总监", status: "locked", progress: 0,
    courses: [
      { title: "组织发展战略", type: "video", completed: false, linkId: "v10" },
      { title: "竞争战略分析", type: "doc", completed: false, linkId: "d9" },
      { title: "战略谈判对练", type: "practice", completed: false, linkId: "p9" },
    ],
  },
  {
    level: "P10", title: "高级区域总监", status: "locked", progress: 0,
    courses: [
      { title: "人才梯队建设", type: "video", completed: false, linkId: "v11" },
      { title: "品牌建设手册", type: "doc", completed: false, linkId: "d10" },
    ],
  },
  {
    level: "P11", title: "销售副总裁", status: "locked", progress: 0,
    courses: [
      { title: "全国战略规划", type: "video", completed: false, linkId: "v12" },
      { title: "商业模式创新", type: "doc", completed: false, linkId: "d11" },
    ],
  },
  {
    level: "P12", title: "高级副总裁", status: "locked", progress: 0,
    courses: [
      { title: "并购整合实务", type: "video", completed: false, linkId: "v13" },
      { title: "国际化战略", type: "doc", completed: false, linkId: "d12" },
    ],
  },
  {
    level: "P13", title: "执行副总裁", status: "locked", progress: 0,
    courses: [
      { title: "资本运作", type: "video", completed: false, linkId: "v14" },
      { title: "生态构建指南", type: "doc", completed: false, linkId: "d13" },
    ],
  },
  {
    level: "P14", title: "首席营收官", status: "locked", progress: 0,
    courses: [
      { title: "数字化转型", type: "video", completed: false, linkId: "v15" },
      { title: "全球营收战略", type: "doc", completed: false, linkId: "d14" },
    ],
  },
  {
    level: "P15", title: "首席执行官", status: "locked", progress: 0,
    courses: [
      { title: "企业愿景规划", type: "video", completed: false, linkId: "v16" },
      { title: "战略联盟", type: "doc", completed: false, linkId: "d15" },
    ],
  },
];

const typeIcon = {
  video: Play,
  doc: FileText,
  practice: MessageSquare,
};
const typeLabel = {
  video: "视频课程",
  doc: "文档资料",
  practice: "AI对练",
};
const typeColor = {
  video: "text-blue-500 bg-blue-50",
  doc: "text-amber-600 bg-amber-50",
  practice: "text-green-600 bg-green-50",
};

const LearningMapPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<LevelNode | null>(null);

  const handleCourseClick = (course: CourseItem) => {
    if (course.type === "video") navigate(`/course/${course.linkId}`);
    else if (course.type === "doc") navigate(`/course/${course.linkId}`);
    else navigate(`/practice-detail/${course.linkId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-background">
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">学习地图</h1>
      </div>

      {/* Progress summary */}
      <div className="p-4">
        <Card className="p-4 bg-gradient-to-r from-blue-500/10 to-primary/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold">学习进度</span>
            <span className="text-xs font-bold text-primary">P3 · 高级销售顾问</span>
          </div>
          <Progress value={18} className="h-2 mb-1" />
          <p className="text-[10px] text-muted-foreground">已完成 2/15 阶段，当前阶段进度 40%</p>
        </Card>
      </div>

      {/* Path timeline */}
      <div className="px-4 pb-8">
        <div className="relative pl-8">
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-3">
            {levels.map((level) => {
              const isCompleted = level.status === "completed";
              const isCurrent = level.status === "current";
              const isLocked = level.status === "locked";

              return (
                <div key={level.level} className="relative">
                  {/* Timeline node */}
                  <div className={`absolute -left-8 top-3 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold border-2 ${
                    isCompleted ? "bg-green-500 border-green-500 text-white" :
                    isCurrent ? "bg-primary border-primary text-primary-foreground" :
                    "bg-muted border-border text-muted-foreground"
                  }`}>
                    {isCompleted ? <Check className="h-3.5 w-3.5" /> : level.level}
                  </div>

                  <Card
                    className={`p-3.5 cursor-pointer transition-all ${isLocked ? "opacity-40" : "hover:shadow-md"} ${isCurrent ? "border-primary/40 shadow-sm" : ""}`}
                    onClick={() => !isLocked && setSelected(level)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-muted-foreground">{level.level}</span>
                        <h4 className="text-xs font-bold">{level.title}</h4>
                        {isCurrent && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[8px] font-semibold text-primary">当前</span>}
                      </div>
                      {isLocked ? (
                        <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                      ) : (
                        <span className="text-[10px] text-primary font-medium">{level.courses.length}门课程 ›</span>
                      )}
                    </div>
                    {!isLocked && level.progress > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={level.progress} className="h-1 flex-1" />
                        <span className="text-[9px] text-muted-foreground">{level.progress}%</span>
                      </div>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Course detail dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-[360px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-[10px] font-bold">
                {selected?.level}
              </span>
              {selected?.title}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-2 mt-1">
              {selected.progress > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <Progress value={selected.progress} className="h-1.5 flex-1" />
                  <span className="text-xs font-medium text-primary">{selected.progress}%</span>
                </div>
              )}
              {selected.courses.map((course, i) => {
                const Icon = typeIcon[course.type];
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => { setSelected(null); handleCourseClick(course); }}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${typeColor[course.type]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{course.title}</p>
                      <p className="text-[9px] text-muted-foreground">{typeLabel[course.type]}</p>
                    </div>
                    {course.completed ? (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[8px] font-medium text-green-600">已学</span>
                    ) : (
                      <span className="text-[10px] text-primary font-medium">去学习 ›</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LearningMapPage;
