import { useState } from "react";
import { ArrowLeft, Play, FileText, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const tabs = ["全部", "视频课程", "文档资料", "热门推荐"];

const courses = [
  { id: 1, title: "客户异议处理技巧", type: "video", author: "张老师", date: "03-15", learners: 2341, duration: "2h30m", chapters: 12, tag: "销售技巧" },
  { id: 2, title: "电话销售开场白训练", type: "video", author: "李讲师", date: "03-14", learners: 1856, duration: "1h45m", chapters: 8, tag: "电话销售" },
  { id: 3, title: "产品卖点提炼方法论", type: "pdf", author: "王教练", date: "03-13", learners: 1203, duration: "45min", chapters: 10, tag: "产品知识" },
  { id: 4, title: "高效谈判策略", type: "pdf", author: "赵导师", date: "03-12", learners: 987, duration: "60min", chapters: 15, tag: "谈判技巧" },
  { id: 5, title: "FABE法则实战应用", type: "video", author: "陈老师", date: "03-11", learners: 2100, duration: "1h20m", chapters: 6, tag: "销售技巧" },
  { id: 6, title: "CRM系统操作指南", type: "pdf", author: "刘助教", date: "03-10", learners: 890, duration: "30min", chapters: 5, tag: "工具使用" },
  { id: 7, title: "大客户管理策略", type: "video", author: "孙总监", date: "03-09", learners: 1567, duration: "2h", chapters: 10, tag: "客户管理" },
  { id: 8, title: "销售心理学入门", type: "pdf", author: "周教授", date: "03-08", learners: 3200, duration: "50min", chapters: 8, tag: "心理学" },
];

const CourseLibraryPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("全部");

  const filtered = courses.filter((c) => {
    if (activeTab === "全部") return true;
    if (activeTab === "视频课程") return c.type === "video";
    if (activeTab === "文档资料") return c.type === "pdf";
    if (activeTab === "热门推荐") return c.learners > 1500;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
          <h1 className="text-sm font-semibold">课程库</h1>
        </div>
        <div className="flex gap-1 px-4 pb-2 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === tab ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {filtered.map((course) => (
          <Card
            key={course.id}
            className="flex gap-3 p-3 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/course/${course.id}?type=${course.type}`)}
          >
            <div className={`flex h-20 w-24 shrink-0 items-center justify-center rounded-xl ${
              course.type === "video" ? "bg-gradient-to-br from-primary/15 to-accent" : "bg-gradient-to-br from-accent to-primary/10"
            }`}>
              {course.type === "video" ? <Play className="h-6 w-6 text-primary/50" /> : <FileText className="h-6 w-6 text-primary/50" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${
                  course.type === "video" ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"
                }`}>
                  {course.type === "video" ? "视频" : "文档"}
                </span>
                <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">{course.tag}</span>
              </div>
              <h3 className="text-xs font-semibold leading-tight line-clamp-2">{course.title}</h3>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{course.author} · {course.date}</p>
              <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-0.5"><Users className="h-3 w-3" />{course.learners}</span>
                <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" />{course.duration}</span>
                <span>{course.chapters}章节</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseLibraryPage;
