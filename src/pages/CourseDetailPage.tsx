import { ArrowLeft, Play, Clock, Users, Star, BookOpen, FileText } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import coverObjection from "@/assets/cover-objection.jpg";
import coverPhoneSales from "@/assets/cover-phone-sales.jpg";
import coverProduct from "@/assets/cover-product.jpg";
import coverNegotiation from "@/assets/cover-negotiation.jpg";

const courseCovers: Record<string, string> = {
  "1": coverObjection,
  "2": coverPhoneSales,
  "3": coverProduct,
  "4": coverNegotiation,
  "5": coverObjection,
  "6": coverNegotiation,
  "7": coverProduct,
  "8": coverProduct,
  "9": coverNegotiation,
  "10": coverObjection,
};

const courseData: Record<string, { title: string; type: string; desc: string; author: string; duration: string; learners: number; rating: number; chapters: { title: string; duration: string }[] }> = {
  "1": {
    title: "客户异议处理技巧", type: "video", desc: "系统学习客户常见异议的分类、应对策略及话术模板，通过大量真实案例演练，掌握高效的异议处理方法。适合一线销售人员和客服人员。",
    author: "张老师", duration: "2小时30分", learners: 2341, rating: 4.8,
    chapters: [
      { title: "第1章：异议处理概述", duration: "15:00" },
      { title: "第2章：价格异议应对", duration: "20:00" },
      { title: "第3章：质量异议处理", duration: "18:00" },
      { title: "第4章：竞品比较应对", duration: "22:00" },
      { title: "第5章：服务异议处理", duration: "16:00" },
      { title: "第6章：综合演练", duration: "25:00" },
    ],
  },
  "2": {
    title: "电话销售开场白训练", type: "video", desc: "掌握电话销售的黄金30秒开场白技巧，学习如何在短时间内引起客户兴趣，建立信任感，提升电话接通率和转化率。",
    author: "李讲师", duration: "1小时45分", learners: 1856, rating: 4.9,
    chapters: [
      { title: "第1章：电话销售心态建设", duration: "12:00" },
      { title: "第2章：开场白核心要素", duration: "18:00" },
      { title: "第3章：不同场景开场白", duration: "25:00" },
      { title: "第4章：实战演练", duration: "20:00" },
    ],
  },
  "3": {
    title: "产品卖点提炼方法论", type: "pdf", desc: "从FABE法则到USP提炼，系统学习产品卖点挖掘与表达的完整方法论。包含大量行业案例和实操模板。",
    author: "王教练", duration: "阅读约45分钟", learners: 1203, rating: 4.7,
    chapters: [
      { title: "第1节：什么是产品卖点", duration: "5页" },
      { title: "第2节：FABE法则详解", duration: "8页" },
      { title: "第3节：USP提炼技巧", duration: "6页" },
      { title: "第4节：行业案例分析", duration: "12页" },
      { title: "第5节：实操练习模板", duration: "4页" },
    ],
  },
  "4": {
    title: "高效谈判策略", type: "pdf", desc: "掌握商务谈判的核心策略，包括BATNA分析、锚定效应、让步策略等，帮助你在谈判中占据有利位置。",
    author: "赵导师", duration: "阅读约60分钟", learners: 987, rating: 4.6,
    chapters: [
      { title: "第1节：谈判的基本原则", duration: "6页" },
      { title: "第2节：BATNA分析", duration: "8页" },
      { title: "第3节：锚定与让步", duration: "10页" },
      { title: "第4节：实战案例", duration: "15页" },
    ],
  },
};

const CourseDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "video";
  const course = courseData[id || "1"] || courseData["1"];
  const isVideo = type === "video";
  const cover = courseCovers[id || "1"] || coverObjection;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Cover with image */}
      <div className="relative h-52 shrink-0">
        <img src={cover} alt={course.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm">
          <ArrowLeft className="h-4 w-4" />
        </button>
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg cursor-pointer">
              <Play className="h-6 w-6 text-primary ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto -mt-6 relative z-[1] pb-20">
        <div className="p-4 space-y-4">
          <div>
            <div className="mb-1.5">
              <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-medium ${isVideo ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"}`}>
                {isVideo ? "视频课程" : "PDF资料"}
              </span>
            </div>
            <h1 className="text-lg font-bold">{course.title}</h1>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{course.author}</span>
              <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" />{course.duration}</span>
              <span className="flex items-center gap-0.5"><Users className="h-3 w-3" />{course.learners}人学过</span>
              <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />{course.rating}</span>
            </div>
          </div>

          <Card className="p-3.5 bg-muted/30">
            <p className="text-xs leading-relaxed text-foreground">{course.desc}</p>
          </Card>

          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              {isVideo ? "课程目录" : "文档目录"}
            </h3>
            <div className="space-y-2">
              {course.chapters.map((ch, i) => (
                <Card key={i} className="flex items-center gap-3 p-3 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    {isVideo ? <Play className="h-3.5 w-3.5 text-primary" /> : <FileText className="h-3.5 w-3.5 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-medium">{ch.title}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{ch.duration}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom */}
      <div className="sticky bottom-0 z-10 bg-card border-t border-border px-4 py-3">
        <Button className="w-full rounded-xl h-11 text-sm">
          {isVideo ? "开始学习" : "阅读全文"}
        </Button>
      </div>
    </div>
  );
};

export default CourseDetailPage;
