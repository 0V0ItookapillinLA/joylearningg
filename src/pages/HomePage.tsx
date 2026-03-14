import { Search, Bell, Play, BookOpen, Target, Brain, Trophy, Library, ChevronRight, Star, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const banners = [
  { id: 1, title: "销售技巧提升训练营", subtitle: "AI实战陪练·限时免费", color: "from-primary/80 to-primary" },
  { id: 2, title: "客户服务金牌话术", subtitle: "30天打卡挑战赛", color: "from-blue-400 to-cyan-400" },
  { id: 3, title: "新人入职必修课", subtitle: "系统化学习路径", color: "from-indigo-400 to-primary" },
];

const quickActions = [
  { icon: BookOpen, label: "课程库", path: "/learn" },
  { icon: Target, label: "AI对练", path: "/practice" },
  { icon: Brain, label: "考试中心", path: "/learn" },
  { icon: Library, label: "知识库", path: "/learn" },
  { icon: Trophy, label: "排行榜", path: "/community" },
];

const courses = [
  { id: 1, title: "客户异议处理技巧", learners: 2341, rating: 4.8, chapters: 12 },
  { id: 2, title: "电话销售开场白训练", learners: 1856, rating: 4.9, chapters: 8 },
  { id: 3, title: "产品卖点提炼方法论", learners: 1203, rating: 4.7, chapters: 10 },
  { id: 4, title: "高效谈判策略", learners: 987, rating: 4.6, chapters: 15 },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [bannerIdx, setBannerIdx] = useState(0);

  return (
    <div className="space-y-5 px-4 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-9 w-full rounded-full bg-muted pl-9 pr-4 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="搜索课程、知识点..."
          />
        </div>
        <button className="relative text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-destructive" />
        </button>
      </div>

      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl">
        <motion.div
          className={`flex h-36 flex-col justify-center bg-gradient-to-r ${banners[bannerIdx].color} px-6 text-primary-foreground`}
          key={bannerIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-lg font-bold">{banners[bannerIdx].title}</h2>
          <p className="mt-1 text-xs opacity-90">{banners[bannerIdx].subtitle}</p>
        </motion.div>
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setBannerIdx(i)}
              className={`h-1.5 rounded-full transition-all ${i === bannerIdx ? "w-4 bg-primary-foreground" : "w-1.5 bg-primary-foreground/50"}`}
            />
          ))}
        </div>
      </div>

      {/* Fragment Learning Entry */}
      <motion.div whileTap={{ scale: 0.98 }}>
        <Card
          className="flex cursor-pointer items-center gap-4 border-primary/20 bg-gradient-to-r from-accent to-card p-4"
          onClick={() => navigate("/fragment-learn")}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Play className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold">碎片化学习</h3>
            <p className="mt-0.5 text-[11px] text-muted-foreground">利用零碎时间，看短视频学知识</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-5 gap-2">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center gap-1.5 rounded-xl py-3 transition-colors hover:bg-muted"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
              <action.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-[11px] font-medium text-foreground">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Recommended Courses */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">推荐课程</h3>
          <button className="text-xs text-primary" onClick={() => navigate("/learn")}>
            查看全部
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="w-40 shrink-0 cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
              onClick={() => navigate(`/chapter/${course.id}`)}
            >
              <div className="h-20 bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-primary/40" />
              </div>
              <div className="p-3">
                <h4 className="text-xs font-medium leading-tight line-clamp-2">{course.title}</h4>
                <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Users className="h-3 w-3" />
                    {course.learners}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    {course.rating}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Need useState import
import { useState } from "react";

export default HomePage;
