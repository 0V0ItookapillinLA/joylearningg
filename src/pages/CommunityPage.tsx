import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Crown, TrendingUp, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import medalPersistence from "@/assets/medal-persistence.png";
import medalHighscore from "@/assets/medal-highscore.png";
import medalPractice from "@/assets/medal-practice.png";
import medalKnowledge from "@/assets/medal-knowledge.png";

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

const checkedDates = [1, 2, 3, 5, 6, 8, 9, 10, 12, 13, 15, 16];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

const medalImages: Record<string, string> = {
  "坚持达人": medalPersistence,
  "高水平选手": medalHighscore,
  "练习狂魔": medalPractice,
  "求知达人": medalKnowledge,
};

const medalCategories = [
  {
    name: "坚持达人",
    medals: [
      { days: 3, title: "坚持达人", desc: "连续3天保持登录", earned: true, date: "2026-01-05" },
      { days: 7, title: "坚持达人", desc: "坚持一周", earned: true, date: "2026-01-12" },
      { days: 14, title: "坚持达人", desc: "两周不间断", earned: false, date: null },
      { days: 30, title: "坚持达人", desc: "明确定量的月度投入", earned: false, date: null },
      { days: 50, title: "坚持达人", desc: "跨越50日，纪律性与自律", earned: false, date: null },
    ],
  },
  {
    name: "高水平选手",
    medals: [
      { days: 1, title: "高水平选手", desc: "首次获得90分以上", earned: true, date: "2026-02-10" },
      { days: 5, title: "高水平选手", desc: "累计5次90分以上", earned: true, date: "2026-02-28" },
      { days: 10, title: "高水平选手", desc: "累计10次90分以上", earned: false, date: null },
    ],
  },
  {
    name: "练习狂魔",
    medals: [
      { days: 10, title: "练习狂魔", desc: "完成10次练习", earned: true, date: "2026-01-20" },
      { days: 50, title: "练习狂魔", desc: "完成50次练习", earned: true, date: "2026-02-15" },
      { days: 100, title: "练习狂魔", desc: "完成100次练习", earned: false, date: null },
      { days: 200, title: "练习狂魔", desc: "完成200次练习", earned: false, date: null },
    ],
  },
  {
    name: "求知达人",
    medals: [
      { days: 10, title: "求知达人", desc: "完成10门课程", earned: true, date: "2026-02-01" },
      { days: 20, title: "求知达人", desc: "扩展至20门", earned: true, date: "2026-03-01" },
      { days: 30, title: "求知达人", desc: "30门体系化学习", earned: false, date: null },
    ],
  },
];

const departments = ["全部部门", "华东区", "华南区", "华北区", "西南区", "华中区"];

const leaderboard = [
  { rank: 1, name: "李明", initial: "李", score: 95.2, medals: 12, dept: "华东区" },
  { rank: 2, name: "王芳", initial: "王", score: 92.8, medals: 10, dept: "华南区" },
  { rank: 3, name: "张伟", initial: "张", score: 90.5, medals: 9, dept: "华东区" },
  { rank: 4, name: "刘洋", initial: "刘", score: 89.3, medals: 8, dept: "华北区" },
  { rank: 5, name: "陈静", initial: "陈", score: 87.1, medals: 7, dept: "华东区" },
  { rank: 6, name: "张清", initial: "清", score: 82.7, medals: 6, dept: "华东区", isMe: true },
  { rank: 7, name: "赵磊", initial: "赵", score: 80.5, medals: 5, dept: "西南区" },
  { rank: 8, name: "孙丽", initial: "孙", score: 78.2, medals: 4, dept: "华中区" },
];

type Tab = "leaderboard" | "medals" | "calendar";
type LeaderboardTab = "total" | "position" | "week";

const CommunityPage = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as Tab | null;
  const [activeTab, setActiveTab] = useState<Tab>(tabParam && ["leaderboard", "medals", "calendar"].includes(tabParam) ? tabParam : "leaderboard");
  const [viewYear, setViewYear] = useState(currentYear);
  const [viewMonth, setViewMonth] = useState(currentMonth);
  const [lbTab, setLbTab] = useState<LeaderboardTab>("total");
  const [selectedMedal, setSelectedMedal] = useState<typeof medalCategories[0]["medals"][0] | null>(null);
  const [selectedDept, setSelectedDept] = useState("全部部门");
  const [deptOpen, setDeptOpen] = useState(false);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const isCurrentMonth = viewYear === currentYear && viewMonth === currentMonth;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(viewYear - 1); setViewMonth(11); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (isCurrentMonth) return;
    if (viewMonth === 11) { setViewYear(viewYear + 1); setViewMonth(0); }
    else setViewMonth(viewMonth + 1);
  };

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const filteredLeaderboard = selectedDept === "全部部门"
    ? leaderboard
    : leaderboard.filter(u => u.dept === selectedDept);

  const topThree = filteredLeaderboard.filter((u) => u.rank <= 3);

  const tabLabels: Record<Tab, string> = {
    leaderboard: "排行榜",
    medals: "勋章墙",
    calendar: "打卡日志",
  };

  return (
    <div className="pb-4">
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center px-4 pt-3">
          {(["leaderboard", "medals", "calendar"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-2.5 text-center text-sm font-semibold transition-colors ${
                activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Tab */}
      {activeTab === "leaderboard" && (
        <div className="px-4 pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {([["total", "总榜"], ["position", "同岗位"], ["week", "周榜"]] as [LeaderboardTab, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setLbTab(key)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    lbTab === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="relative">
              <button
                onClick={() => setDeptOpen(!deptOpen)}
                className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
              >
                {selectedDept === "全部部门" ? "部门" : selectedDept}
                <ChevronDown className="h-3 w-3" />
              </button>
              {deptOpen && (
                <div className="absolute right-0 top-full mt-1 z-20 w-28 rounded-xl border border-border bg-card shadow-lg py-1">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => { setSelectedDept(dept); setDeptOpen(false); }}
                      className={`w-full px-3 py-2 text-left text-[11px] hover:bg-muted transition-colors ${
                        selectedDept === dept ? "text-primary font-medium" : "text-foreground"
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-end justify-center gap-3 pt-4 pb-2">
            {topThree[1] && (
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                  {topThree[1].initial}
                </div>
                <span className="mt-1 text-[11px] font-medium">{topThree[1].name}</span>
                <span className="text-[10px] text-muted-foreground">{topThree[1].score}分</span>
                <div className="mt-1 flex h-16 w-20 items-center justify-center rounded-t-xl bg-gradient-to-b from-slate-200 to-slate-300">
                  <span className="text-lg font-bold text-white">2</span>
                </div>
              </div>
            )}
            {topThree[0] && (
              <div className="flex flex-col items-center">
                <Crown className="h-5 w-5 text-amber-400 mb-1" />
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-base font-bold text-primary">
                  {topThree[0].initial}
                </div>
                <span className="mt-1 text-[11px] font-semibold">{topThree[0].name}</span>
                <span className="text-[10px] text-muted-foreground">{topThree[0].score}分</span>
                <div className="mt-1 flex h-20 w-20 items-center justify-center rounded-t-xl bg-gradient-to-b from-amber-300 to-amber-400">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
              </div>
            )}
            {topThree[2] && (
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                  {topThree[2].initial}
                </div>
                <span className="mt-1 text-[11px] font-medium">{topThree[2].name}</span>
                <span className="text-[10px] text-muted-foreground">{topThree[2].score}分</span>
                <div className="mt-1 flex h-12 w-20 items-center justify-center rounded-t-xl bg-gradient-to-b from-amber-600 to-amber-700">
                  <span className="text-lg font-bold text-white">3</span>
                </div>
              </div>
            )}
          </div>

          <Card className="divide-y divide-border">
            {filteredLeaderboard.filter((u) => u.rank > 3).map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-3 px-4 py-3 ${user.isMe ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}
              >
                <span className="w-6 text-center text-xs font-medium text-muted-foreground">{user.rank}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                  {user.initial}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium">{user.name}</span>
                    {user.isMe && <span className="rounded-full border border-primary/30 px-1.5 py-0.5 text-[9px] text-primary">我</span>}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{user.dept}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{user.score}</span>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 justify-end">
                    <TrendingUp className="h-3 w-3" />{user.medals}枚勋章
                  </p>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* Medals Tab */}
      {activeTab === "medals" && (
        <div className="px-4 pt-4 space-y-5">
          {medalCategories.map((cat) => (
            <Card key={cat.name} className="p-4">
              <h3 className="text-sm font-bold mb-3">{cat.name}</h3>
              <div className="grid grid-cols-3 gap-3">
                {cat.medals.map((medal, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedMedal(medal)}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl overflow-hidden ${
                      medal.earned ? "" : "opacity-30 grayscale"
                    }`}>
                      <img
                        src={medalImages[cat.name]}
                        alt={medal.title}
                        className="h-14 w-14 object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-medium text-center leading-tight">{medal.title}</span>
                    <span className="text-[9px] text-muted-foreground text-center leading-tight">{medal.desc}</span>
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === "calendar" && (
        <div className="px-4 pt-4 space-y-4">
          <Card className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-accent">
            <div>
              <h3 className="text-sm font-bold">今日打卡</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">坚持学习，养成好习惯 ✨</p>
            </div>
            <div className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
              已打卡 ✓
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth}><ChevronLeft className="h-4 w-4 text-muted-foreground" /></button>
              <span className="text-sm font-semibold">{viewYear}年 {monthNames[viewMonth]}</span>
              <button onClick={nextMonth} className={isCurrentMonth ? "opacity-30" : ""}>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-0 mb-2">
              {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
                <div key={d} className="text-center text-[10px] text-muted-foreground font-medium py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-0">
              {calendarDays.map((day, i) => {
                if (day === null) return <div key={`empty-${i}`} className="h-10" />;
                const isToday = isCurrentMonth && day === today.getDate();
                const isChecked = isCurrentMonth && checkedDates.includes(day);
                return (
                  <div key={i} className="flex h-10 items-center justify-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${
                      isToday ? "bg-primary text-primary-foreground font-bold" :
                      isChecked ? "bg-primary/15 text-primary font-medium" :
                      "text-foreground"
                    }`}>
                      {day}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="grid grid-cols-3 divide-x divide-border py-4">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-primary">9</span>
              <span className="text-[10px] text-muted-foreground">本月打卡 天</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-primary">5</span>
              <span className="text-[10px] text-muted-foreground">连续打卡 天</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-primary">100</span>
              <span className="text-[10px] text-muted-foreground">累计学习 小时</span>
            </div>
          </Card>
        </div>
      )}

      <Dialog open={!!selectedMedal} onOpenChange={() => setSelectedMedal(null)}>
        <DialogContent className="max-w-[320px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center">{selectedMedal?.title}</DialogTitle>
          </DialogHeader>
          {selectedMedal && (
            <div className="flex flex-col items-center gap-3 py-2">
              <div className={`flex h-20 w-20 items-center justify-center rounded-2xl overflow-hidden ${
                selectedMedal.earned ? "" : "opacity-40 grayscale"
              }`}>
                <img
                  src={medalImages[selectedMedal.title]}
                  alt={selectedMedal.title}
                  className="h-16 w-16 object-contain"
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">{selectedMedal.desc}</p>
              {selectedMedal.earned && selectedMedal.date ? (
                <p className="text-xs text-primary font-medium">获得日期：{selectedMedal.date}</p>
              ) : (
                <p className="text-xs text-muted-foreground">尚未获得</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityPage;
