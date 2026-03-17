import { ChevronRight, BarChart3, History, Map, Compass, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: BarChart3, label: "综合评价", desc: "综合能力评分 82.7/100", path: "/comprehensive-eval" },
  { icon: History, label: "练习复盘", desc: "共完成24次AI对练", path: "/practice-review" },
  { icon: Map, label: "成长地图", desc: "查看岗位晋升路径与胜任力评估", path: "/growth-map" },
  { icon: Compass, label: "学习地图", desc: "游戏化学习闯关", path: "/learning-map" },
  { icon: FileText, label: "我的内容", desc: "点赞、收藏与发布记录", path: "/my-content" },
];

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 pb-4">
      <Card className="mt-4 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary/70 px-5 py-6 text-primary-foreground">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/20 text-xl font-bold">
              李
            </div>
            <div>
              <h2 className="text-base font-bold">李明</h2>
              <p className="text-xs opacity-90">销售顾问 · 华东区</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border py-4">
          {[
            { value: "128", label: "学习天数" },
            { value: "24", label: "练习次数" },
            { value: "6", label: "勋章数" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-lg font-bold text-primary">{stat.value}</span>
              <span className="text-[10px] text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-4 space-y-2">
        {menuItems.map((item) => (
          <Card
            key={item.label}
            className="flex cursor-pointer items-center gap-3 p-4 transition-shadow hover:shadow-md"
            onClick={() => navigate(item.path)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
              <item.icon className="h-4.5 w-4.5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium">{item.label}</h3>
              <p className="text-[10px] text-muted-foreground">{item.desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
