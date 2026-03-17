import { useState } from "react";
import { Search, Play, Library, Target, Brain, ChevronRight, Star, Users, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";
import banner3 from "@/assets/banner3.jpg";
import roleCustomerService from "@/assets/role-customer-service.png";
import roleSalesManager from "@/assets/role-sales-manager.png";
import roleAngryCustomer from "@/assets/role-angry-customer.png";
import roleNegotiator from "@/assets/role-negotiator.png";
import coverObjection from "@/assets/cover-objection.jpg";
import coverPhoneSales from "@/assets/cover-phone-sales.jpg";
import coverProduct from "@/assets/cover-product.jpg";
import coverNegotiation from "@/assets/cover-negotiation.jpg";
import practiceComplaint from "@/assets/practice-complaint.jpg";
import practicePhone from "@/assets/practice-phone.jpg";
import practiceNegotiation from "@/assets/practice-negotiation.jpg";
import practiceDemo from "@/assets/practice-demo.jpg";

const banners = [
  { id: 1, title: "销售技巧提升训练营", subtitle: "AI实战陪练·限时免费", image: banner1 },
  { id: 2, title: "客户服务金牌话术", subtitle: "30天打卡挑战赛", image: banner2 },
  { id: 3, title: "新人入职必修课", subtitle: "系统化学习路径", image: banner3 },
];

const quickActions = [
  { icon: Library, label: "知识库", path: "/knowledge-base" },
  { icon: Target, label: "AI对练", path: "/practice" },
  { icon: Brain, label: "考试中心", path: "/exam" },
  { icon: Trophy, label: "排行榜", path: "/community?tab=leaderboard" },
];

const courses = [
  { id: 1, title: "客户异议处理技巧", type: "video", learners: 2341, rating: 4.8, cover: coverObjection },
  { id: 2, title: "电话销售开场白训练", type: "video", learners: 1856, rating: 4.9, cover: coverPhoneSales },
  { id: 3, title: "产品卖点提炼方法论", type: "pdf", learners: 1203, rating: 4.7, cover: coverProduct },
  { id: 4, title: "高效谈判策略", type: "pdf", learners: 987, rating: 4.6, cover: coverNegotiation },
];

const practices = [
  { id: 1, title: "客户投诉处理", tag: "自由对话", difficulty: "中级", times: 1234, cover: practiceComplaint },
  { id: 2, title: "首次电话沟通", tag: "固定剧本", difficulty: "初级", times: 892, cover: practicePhone },
  { id: 3, title: "价格谈判实战", tag: "文本对练", difficulty: "高级", times: 567, cover: practiceNegotiation },
  { id: 4, title: "产品演示模拟", tag: "自由对话", difficulty: "中级", times: 345, cover: practiceDemo },
];

const roles = [
  { id: 1, name: "客服小美", desc: "耐心温柔的客服代表", avatar: roleCustomerService, tag: "客户服务" },
  { id: 2, name: "销售经理张总", desc: "经验丰富的销售导师", avatar: roleSalesManager, tag: "销售培训" },
  { id: 3, name: "难缠客户王先生", desc: "挑剔易怒的投诉客户", avatar: roleAngryCustomer, tag: "投诉处理" },
  { id: 4, name: "谈判专家李总", desc: "精明的商务谈判对手", avatar: roleNegotiator, tag: "商务谈判" },
];

const tagColor: Record<string, string> = {
  "自由对话": "bg-primary/10 text-primary",
  "固定剧本": "bg-accent text-accent-foreground",
  "文本对练": "bg-muted text-muted-foreground",
};

const HomePage = () => {
  const navigate = useNavigate();
  const [bannerIdx, setBannerIdx] = useState(0);

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div className="px-4 pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-9 w-full rounded-full bg-muted pl-9 pr-4 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="搜索课程、知识点..."
          />
        </div>
      </div>

      {/* Banner */}
      <div className="relative mx-4 overflow-hidden rounded-2xl">
        <motion.div key={bannerIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="relative h-36">
          <img src={banners[bannerIdx].image} alt={banners[bannerIdx].title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 to-transparent" />
          <div className="absolute bottom-4 left-5">
            <h2 className="text-base font-bold text-white">{banners[bannerIdx].title}</h2>
            <p className="mt-0.5 text-[11px] text-white/80">{banners[bannerIdx].subtitle}</p>
          </div>
        </motion.div>
        <div className="absolute bottom-2 right-3 flex gap-1.5">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setBannerIdx(i)} className={`h-1.5 rounded-full transition-all ${i === bannerIdx ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} />
          ))}
        </div>
      </div>

      {/* Fragment Learning Entry */}
      <motion.div whileTap={{ scale: 0.98 }} className="px-4">
        <Card className="flex cursor-pointer items-center gap-4 border-primary/20 bg-gradient-to-r from-accent to-card p-4" onClick={() => navigate("/fragment-learn")}>
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
      <div className="grid grid-cols-4 gap-2 px-4">
        {quickActions.map((action) => (
          <button key={action.label} onClick={() => navigate(action.path)} className="flex flex-col items-center gap-1.5 rounded-xl py-3 transition-colors hover:bg-muted">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
              <action.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-[11px] font-medium text-foreground">{action.label}</span>
          </button>
        ))}
      </div>

      {/* 推荐课程 */}
      <div className="px-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">推荐课程</h3>
          <button className="text-xs text-primary" onClick={() => navigate("/knowledge-base")}>更多</button>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="w-44 shrink-0 cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
              onClick={() => navigate(course.type === "video" ? `/video/${course.id}` : `/doc/${course.id}`)}
            >
              <div className="relative h-24 overflow-hidden">
                <img src={course.cover} alt={course.title} className="h-full w-full object-cover" />
                {course.type === "video" && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80">
                      <Play className="h-3.5 w-3.5 text-primary ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="mb-1">
                  <span className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-medium ${course.type === "video" ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"}`}>
                    {course.type === "video" ? "视频课程" : "PDF资料"}
                  </span>
                </div>
                <h4 className="text-xs font-medium leading-tight line-clamp-2">{course.title}</h4>
                <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-0.5"><Users className="h-3 w-3" />{course.learners}</span>
                  <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />{course.rating}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 推荐练习 */}
      <div className="px-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">推荐练习</h3>
          <button className="text-xs text-primary" onClick={() => navigate("/practice?tab=0")}>更多</button>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
          {practices.map((p) => (
            <Card
              key={p.id}
              className="w-44 shrink-0 cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
              onClick={() => navigate(`/practice-detail/${p.id}`)}
            >
              <div className="relative h-24 overflow-hidden">
                <img src={p.cover} alt={p.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-3">
                <div className="mb-1 flex items-center gap-1.5">
                  <span className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-medium ${tagColor[p.tag] || "bg-muted text-muted-foreground"}`}>{p.tag}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                    p.difficulty === "初级" ? "bg-green-50 text-green-600" : p.difficulty === "中级" ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"
                  }`}>{p.difficulty}</span>
                </div>
                <h4 className="text-xs font-medium leading-tight line-clamp-2">{p.title}</h4>
                <p className="mt-1.5 text-[10px] text-muted-foreground">{p.times}人已练</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI陪练角色推荐 */}
      <div className="px-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">AI陪练角色</h3>
          <button className="text-xs text-primary" onClick={() => navigate("/practice?tab=1")}>更多</button>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
          {roles.map((role) => (
            <div
              key={role.id}
              className="flex w-28 shrink-0 cursor-pointer flex-col items-center rounded-2xl bg-card p-3 shadow-sm border border-border transition-shadow hover:shadow-md"
              onClick={() => navigate(`/practice-session/${role.id}?mode=text`)}
            >
              <img src={role.avatar} alt={role.name} className="h-14 w-14 rounded-full object-cover bg-accent" />
              <h4 className="mt-2 text-xs font-medium text-center leading-tight">{role.name}</h4>
              <span className="mt-1 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] text-primary">{role.tag}</span>
              <p className="mt-1 text-[10px] text-muted-foreground text-center line-clamp-1">{role.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
