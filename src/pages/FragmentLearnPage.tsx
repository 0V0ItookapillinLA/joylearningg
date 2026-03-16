import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Heart, MessageCircle, Share2, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const videos = [
  { id: 1, title: "3分钟学会FABE法则", author: "张老师", likes: 342, comments: 56, color: "from-blue-900 to-indigo-800" },
  { id: 2, title: "客户说太贵了怎么办？", author: "李讲师", likes: 891, comments: 123, color: "from-purple-900 to-pink-800" },
  { id: 3, title: "电话销售黄金开场白", author: "王教练", likes: 567, comments: 89, color: "from-teal-900 to-cyan-800" },
  { id: 4, title: "如何有效处理客户投诉", author: "赵导师", likes: 1203, comments: 234, color: "from-orange-900 to-red-800" },
  { id: 5, title: "产品演示的5个技巧", author: "陈老师", likes: 445, comments: 67, color: "from-emerald-900 to-green-800" },
];

const FragmentLearnPage = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Snap scroll handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight);
      setCurrentIdx(idx);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const video = videos[currentIdx];

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3">
        <button onClick={() => navigate(-1)} className="text-white/90">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-xs font-medium text-white/80">碎片化学习</span>
        <div className="w-5" />
      </div>

      {/* Video feed - snap scroll */}
      <div ref={containerRef} className="h-full w-full overflow-y-auto snap-y snap-mandatory hide-scrollbar">
        {videos.map((v, i) => (
          <div key={v.id} className={`relative h-full w-full snap-start flex items-center justify-center bg-gradient-to-b ${v.color}`}>
            {/* Simulated video content */}
            <div className="text-center px-8">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                {playing && i === currentIdx ? (
                  <div className="flex items-center gap-1">
                    {[1,2,3,4].map(bar => (
                      <div key={bar} className="w-1 bg-white rounded-full animate-pulse" style={{ height: `${12 + Math.random() * 20}px`, animationDelay: `${bar * 0.15}s` }} />
                    ))}
                  </div>
                ) : (
                  <Play className="h-8 w-8 text-white ml-1" />
                )}
              </div>
              <h2 className="text-lg font-bold text-white mb-2">{v.title}</h2>
              <p className="text-sm text-white/60">@{v.author}</p>
            </div>

            {/* Right side actions */}
            <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5">
              <button
                onClick={() => setLiked(prev => prev.includes(v.id) ? prev.filter(id => id !== v.id) : [...prev, v.id])}
                className="flex flex-col items-center gap-1"
              >
                <Heart className={`h-7 w-7 ${liked.includes(v.id) ? "fill-red-500 text-red-500" : "text-white"}`} />
                <span className="text-[10px] text-white">{v.likes + (liked.includes(v.id) ? 1 : 0)}</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <MessageCircle className="h-7 w-7 text-white" />
                <span className="text-[10px] text-white">{v.comments}</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <Share2 className="h-7 w-7 text-white" />
                <span className="text-[10px] text-white">分享</span>
              </button>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-8 left-4 right-16">
              <p className="text-sm font-semibold text-white mb-1">{v.title}</p>
              <p className="text-xs text-white/60">@{v.author} · 知识分享</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 flex gap-3 z-20">
        <button onClick={() => setPlaying(!playing)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          {playing ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white ml-0.5" />}
        </button>
        <button onClick={() => setMuted(!muted)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          {muted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
        </button>
      </div>
    </div>
  );
};

export default FragmentLearnPage;
