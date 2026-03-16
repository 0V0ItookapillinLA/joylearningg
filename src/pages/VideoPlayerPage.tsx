import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Maximize } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import coverObjection from "@/assets/cover-objection.jpg";
import coverPhoneSales from "@/assets/cover-phone-sales.jpg";
import coverProduct from "@/assets/cover-product.jpg";
import coverNegotiation from "@/assets/cover-negotiation.jpg";

const videoData: Record<string, { title: string; author: string; cover: string; chapters: { title: string; time: string }[] }> = {
  "1": { title: "客户异议处理技巧", author: "张老师", cover: coverObjection, chapters: [
    { title: "异议处理概述", time: "00:00" }, { title: "价格异议应对", time: "15:00" },
    { title: "质量异议处理", time: "35:00" }, { title: "竞品比较应对", time: "53:00" },
    { title: "综合演练", time: "1:15:00" },
  ]},
  "2": { title: "电话销售开场白训练", author: "李讲师", cover: coverPhoneSales, chapters: [
    { title: "电话销售心态建设", time: "00:00" }, { title: "开场白核心要素", time: "12:00" },
    { title: "不同场景开场白", time: "30:00" }, { title: "实战演练", time: "55:00" },
  ]},
  "5": { title: "FABE法则实战应用", author: "陈老师", cover: coverObjection, chapters: [
    { title: "FABE法则介绍", time: "00:00" }, { title: "实战案例分析", time: "20:00" },
  ]},
  "6": { title: "大客户管理策略", author: "孙总监", cover: coverNegotiation, chapters: [
    { title: "大客户特征识别", time: "00:00" }, { title: "管理策略", time: "25:00" },
  ]},
  "7": { title: "销售心理学基础", author: "周教授", cover: coverProduct, chapters: [
    { title: "心理学基础概念", time: "00:00" }, { title: "应用实践", time: "30:00" },
  ]},
};

const VideoPlayerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [playing, setPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const video = videoData[id || "1"] || videoData["1"];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 bg-black/80 backdrop-blur-sm">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5 text-white" /></button>
        <h1 className="text-sm font-medium text-white truncate">{video.title}</h1>
      </div>

      {/* Video area */}
      <div className="relative w-full aspect-video bg-neutral-900 shrink-0">
        <img src={video.cover} alt={video.title} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setPlaying(!playing)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
          >
            {playing ? <Pause className="h-7 w-7 text-white" /> : <Play className="h-7 w-7 text-white ml-1" />}
          </button>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/3 rounded-full" />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] text-white/60">12:34</span>
            <div className="flex items-center gap-4">
              <button><SkipBack className="h-4 w-4 text-white/60" /></button>
              <button><SkipForward className="h-4 w-4 text-white/60" /></button>
              <button><Maximize className="h-4 w-4 text-white/60" /></button>
            </div>
            <span className="text-[10px] text-white/60">45:00</span>
          </div>
        </div>
      </div>

      {/* Chapter list */}
      <div className="flex-1 bg-background rounded-t-2xl -mt-3 relative z-10">
        <div className="p-4">
          <h3 className="text-sm font-semibold mb-1">{video.title}</h3>
          <p className="text-[10px] text-muted-foreground mb-4">{video.author}</p>

          <h4 className="text-xs font-semibold text-muted-foreground mb-3">课程目录</h4>
          <div className="space-y-1">
            {video.chapters.map((ch, i) => (
              <button
                key={i}
                onClick={() => setActiveChapter(i)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                  activeChapter === i ? "bg-primary/10" : "hover:bg-muted/50"
                }`}
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold ${
                  activeChapter === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-medium ${activeChapter === i ? "text-primary" : "text-foreground"}`}>{ch.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{ch.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
