import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, Trophy, Medal, Flame, Star, Crown } from "lucide-react";

const today = new Date();
const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
const checkedDays = [1, 2, 3, 5]; // mock: which days of this week are checked

const medals = [
  { icon: Flame, label: "连续打卡7天", earned: true },
  { icon: Trophy, label: "AI对练达人", earned: true },
  { icon: Star, label: "高分学员", earned: false },
  { icon: Medal, label: "百次练习", earned: true },
  { icon: Crown, label: "排行榜冠军", earned: false },
  { icon: Star, label: "完美通关", earned: false },
];

const leaderboard = [
  { rank: 1, name: "张三丰", score: 9850, medals: 12, avatar: "Z" },
  { rank: 2, name: "李小龙", score: 9620, medals: 10, avatar: "L" },
  { rank: 3, name: "王大明", score: 9480, medals: 9, avatar: "W" },
  { rank: 4, name: "赵小花", score: 9200, medals: 8, avatar: "Z" },
  { rank: 5, name: "陈志强", score: 8900, medals: 7, avatar: "C" },
  { rank: 6, name: "你", score: 8750, medals: 6, avatar: "我" },
];

const CommunityPage = () => {
  const [checkedToday, setCheckedToday] = useState(false);
  const dayOfWeek = today.getDay();

  return (
    <div className="px-4 pb-4 space-y-5">
      <h1 className="pt-4 text-lg font-bold">社区</h1>

      {/* Check-in Calendar */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">本周打卡</h3>
          <button
            onClick={() => setCheckedToday(true)}
            disabled={checkedToday}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              checkedToday
                ? "bg-muted text-muted-foreground"
                : "bg-primary text-primary-foreground active:scale-95"
            }`}
          >
            {checkedToday ? "已打卡 ✓" : "立即打卡"}
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day, i) => {
            const isChecked = checkedDays.includes(i) || (i === dayOfWeek && checkedToday);
            const isToday = i === dayOfWeek;
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground">{day}</span>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                    isChecked
                      ? "bg-primary text-primary-foreground"
                      : isToday
                      ? "border-2 border-primary text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isChecked ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Medals */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3">勋章墙</h3>
        <div className="grid grid-cols-3 gap-3">
          {medals.map((medal, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-1.5 rounded-xl py-3 ${
                medal.earned ? "bg-accent" : "bg-muted opacity-50"
              }`}
            >
              <medal.icon className={`h-6 w-6 ${medal.earned ? "text-warning" : "text-muted-foreground"}`} />
              <span className="text-[10px] font-medium text-center px-1">{medal.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Leaderboard */}
      <Card className="p-4">
        <Tabs defaultValue="total">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">排行榜</h3>
            <TabsList className="h-7">
              <TabsTrigger value="total" className="text-[10px] px-2 py-0.5">总榜</TabsTrigger>
              <TabsTrigger value="position" className="text-[10px] px-2 py-0.5">同岗位</TabsTrigger>
              <TabsTrigger value="week" className="text-[10px] px-2 py-0.5">周榜</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="total" className="mt-0">
            <div className="space-y-2">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 ${
                    user.name === "你" ? "bg-primary/10 border border-primary/20" : ""
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                      user.rank <= 3
                        ? "bg-warning text-warning-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {user.rank}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium">{user.name}</span>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <span>{user.score}分</span>
                      <span>·</span>
                      <span>{user.medals}枚勋章</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="position" className="mt-0">
            <p className="text-xs text-muted-foreground text-center py-6">同岗位排行榜数据加载中...</p>
          </TabsContent>
          <TabsContent value="week" className="mt-0">
            <p className="text-xs text-muted-foreground text-center py-6">周榜数据加载中...</p>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default CommunityPage;
