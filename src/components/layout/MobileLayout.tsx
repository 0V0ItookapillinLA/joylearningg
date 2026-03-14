import { NavLink, Outlet } from "react-router-dom";
import { Home, BookOpen, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";
import AIChatFab from "@/components/AIChatFab";

const tabs = [
  { to: "/", icon: Home, label: "首页" },
  { to: "/learn", icon: BookOpen, label: "学习" },
  { to: "/community", icon: Users, label: "社区" },
  { to: "/profile", icon: User, label: "我的" },
];

const MobileLayout = () => {
  return (
    <div className="mx-auto flex h-[100dvh] max-w-[430px] flex-col bg-background shadow-xl relative">
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-16">
        <Outlet />
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-card/95 backdrop-blur-md">
        <div className="flex items-center justify-around py-1.5">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <tab.icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
                  <span>{tab.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <AIChatFab />
    </div>
  );
};

export default MobileLayout;
