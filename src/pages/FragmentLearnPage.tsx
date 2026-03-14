import { ArrowLeft, Heart, MessageCircle, Share2, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const videos = [
  { id: 1, title: "3分钟学会FABE法则", author: "张老师", likes: 342, comments: 56, duration: "3:20" },
  { id: 2, title: "客户说太贵了怎么办？", author: "李讲师", likes: 891, comments: 123, duration: "2:45" },
  { id: 3, title: "电话销售黄金开场白", author: "王教练", likes: 567, comments: 89, duration: "4:10" },
  { id: 4, title: "如何有效处理客户投诉", author: "赵导师", likes: 1203, comments: 234, duration: "3:55" },
  { id: 5, title: "产品演示的5个技巧", author: "陈老师", likes: 445, comments: 67, duration: "5:00" },
];

const FragmentLearnPage = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState<number[]>([]);

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)} className="text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-sm font-semibold">碎片化学习</h1>
      </div>

      {/* Video Feed */}
      <div className="space-y-3 p-4">
        {videos.map((video) => (
          <div key={video.id} className="rounded-2xl overflow-hidden border border-border bg-card">
            {/* Video Placeholder */}
            <div className="relative h-52 bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg">
                <Play className="h-6 w-6 ml-0.5" />
              </div>
              <span className="absolute bottom-2 right-2 rounded-md bg-foreground/70 px-1.5 py-0.5 text-[10px] text-primary-foreground">
                {video.duration}
              </span>
            </div>
            {/* Info */}
            <div className="p-3">
              <h3 className="text-sm font-medium">{video.title}</h3>
              <p className="mt-1 text-[11px] text-muted-foreground">{video.author}</p>
              <div className="mt-2.5 flex items-center gap-4">
                <button
                  onClick={() =>
                    setLiked((prev) =>
                      prev.includes(video.id) ? prev.filter((id) => id !== video.id) : [...prev, video.id]
                    )
                  }
                  className="flex items-center gap-1 text-[11px] text-muted-foreground"
                >
                  <Heart
                    className={`h-4 w-4 ${liked.includes(video.id) ? "fill-destructive text-destructive" : ""}`}
                  />
                  {video.likes + (liked.includes(video.id) ? 1 : 0)}
                </button>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  {video.comments}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Share2 className="h-4 w-4" />
                  分享
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FragmentLearnPage;
