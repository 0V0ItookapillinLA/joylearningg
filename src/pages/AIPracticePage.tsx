import { useState, useEffect } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import practiceComplaint from "@/assets/practice-complaint.jpg";
import practicePhone from "@/assets/practice-phone.jpg";
import practiceNegotiation from "@/assets/practice-negotiation.jpg";
import practiceDemo from "@/assets/practice-demo.jpg";
import coverObjection from "@/assets/cover-objection.jpg";
import coverPhoneSales from "@/assets/cover-phone-sales.jpg";
import coverProduct from "@/assets/cover-product.jpg";
import coverNegotiation from "@/assets/cover-negotiation.jpg";
import roleCustomerService from "@/assets/role-customer-service.png";
import roleSalesManager from "@/assets/role-sales-manager.png";
import roleAngryCustomer from "@/assets/role-angry-customer.png";
import roleNegotiator from "@/assets/role-negotiator.png";

const viewTabs = ["按实操练习", "按角色练习"];

const practices = [
  { id: 1, title: "客户投诉处理实战", cover: practiceComplaint, mode: "自由对话", times: 22800, desc: "模拟客户因产品质量问题投诉的场景" },
  { id: 2, title: "首次电话销售沟通", cover: practicePhone, mode: "固定剧本", times: 7100, desc: "新客户首次电话沟通的标准流程训练" },
  { id: 3, title: "价格谈判攻防战", cover: practiceNegotiation, mode: "自由对话", times: 5200, desc: "应对客户压价的多种谈判策略演练" },
  { id: 4, title: "大客户需求挖掘", cover: practiceDemo, mode: "文本对练", times: 4200, desc: "运用SPIN法则深度挖掘客户需求" },
  { id: 5, title: "竞品对比应对话术", cover: coverObjection, mode: "固定剧本", times: 3500, desc: "当客户提到竞品优势时的专业回应" },
  { id: 6, title: "售后回访技巧", cover: coverPhoneSales, mode: "自由对话", times: 2800, desc: "提升客户满意度的售后回访话术训练" },
  { id: 7, title: "产品演示与讲解", cover: coverProduct, mode: "文本对练", times: 1900, desc: "用FABE法则进行产品优势演示" },
  { id: 8, title: "客户跟进与促单", cover: coverNegotiation, mode: "固定剧本", times: 1600, desc: "多次跟进后如何有效推动成交" },
];

const roleList = [
  { id: 1, name: "客服小美", desc: "耐心温柔的客服代表，擅长倾听和安抚客户情绪", avatar: roleCustomerService, tag: "客户服务", practices: 12 },
  { id: 2, name: "销售经理张总", desc: "经验丰富的销售导师，了解各种成交技巧", avatar: roleSalesManager, tag: "销售培训", practices: 8 },
  { id: 3, name: "难缠客户王先生", desc: "挑剔易怒的投诉客户，考验你的情绪管理能力", avatar: roleAngryCustomer, tag: "投诉处理", practices: 15 },
  { id: 4, name: "谈判专家李总", desc: "精明的商务谈判对手，在价格上寸步不让", avatar: roleNegotiator, tag: "商务谈判", practices: 10 },
  { id: 5, name: "新客户赵小姐", desc: "首次接触产品的潜在客户，需要专业引导", avatar: roleCustomerService, tag: "新客开发", practices: 6 },
  { id: 6, name: "采购经理陈总", desc: "注重性价比的企业采购决策者", avatar: roleSalesManager, tag: "B2B销售", practices: 9 },
];

const tagColor: Record<string, string> = {
  "自由对话": "bg-primary/10 text-primary",
  "固定剧本": "bg-accent text-accent-foreground",
  "文本对练": "bg-muted text-muted-foreground",
};

const AIPracticePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = parseInt(searchParams.get("tab") || "0");
  const [viewTab, setViewTab] = useState(initialTab);

  useEffect(() => {
    const t = parseInt(searchParams.get("tab") || "0");
    if (t === 0 || t === 1) setViewTab(t);
  }, [searchParams]);

  const handleTabChange = (i: number) => {
    setViewTab(i);
    setSearchParams({ tab: String(i) });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate("/")}><ArrowLeft className="h-5 w-5" /></button>
          <h1 className="text-sm font-semibold">AI 对练</h1>
          <button className="ml-auto"><Search className="h-4.5 w-4.5 text-muted-foreground" /></button>
        </div>
        <div className="flex gap-4 px-4 pb-2">
          {viewTabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => handleTabChange(i)}
              className={`pb-2 text-sm font-bold transition-colors ${
                viewTab === i ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {viewTab === 0 && (
        <div className="p-4 space-y-3">
          {practices.map((p) => (
            <Card
              key={p.id}
              className="flex gap-3 p-3 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/practice-detail/${p.id}?from=0`)}
            >
              <img src={p.cover} alt="" className="h-14 w-14 rounded-xl object-cover shrink-0 bg-muted" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${tagColor[p.mode] || "bg-muted text-muted-foreground"}`}>
                    {p.mode}
                  </span>
                </div>
                <h4 className="text-xs font-semibold leading-tight">{p.title}</h4>
                <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-1">{p.desc}</p>
                <span className="mt-1 text-[10px] text-muted-foreground">{p.times.toLocaleString()}人已练</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {viewTab === 1 && (
        <div className="p-4 space-y-3">
          {roleList.map((role) => (
            <Card
              key={role.id}
              className="flex gap-3 p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/role-detail/${role.id}`)}
            >
              <img src={role.avatar} alt={role.name} className="h-14 w-14 rounded-full object-cover shrink-0 bg-muted" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-xs font-semibold">{role.name}</h4>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] text-primary font-medium">{role.tag}</span>
                </div>
                <p className="text-[10px] text-muted-foreground line-clamp-2">{role.desc}</p>
                <span className="mt-1 inline-block text-[10px] text-muted-foreground">{role.practices}个练习场景</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIPracticePage;
