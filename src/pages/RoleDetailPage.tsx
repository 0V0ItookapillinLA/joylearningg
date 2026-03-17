import { ArrowLeft, MessageSquare, Star, Users, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import roleCustomerService from "@/assets/role-customer-service.png";
import roleSalesManager from "@/assets/role-sales-manager.png";
import roleAngryCustomer from "@/assets/role-angry-customer.png";
import roleNegotiator from "@/assets/role-negotiator.png";

const roleData: Record<string, {
  name: string; avatar: string; tag: string; desc: string;
  personality: string; background: string; style: string;
  practices: number; users: number; rating: number;
  scenarios: { title: string; desc: string }[];
}> = {
  "1": {
    name: "客服小美", avatar: roleCustomerService, tag: "客户服务",
    desc: "耐心温柔的客服代表，擅长倾听和安抚客户情绪",
    personality: "性格温和、有耐心，善于站在客户角度思考问题。即使面对情绪激动的客户，也能保持专业和冷静。",
    background: "5年客服经验，曾获公司年度最佳客服奖。熟悉各类产品问题和售后流程，擅长将投诉转化为满意。",
    style: "语气温柔但不失专业，善于用共情话术化解矛盾，会主动提供解决方案。",
    practices: 12, users: 3420, rating: 4.9,
    scenarios: [
      { title: "售后退换货处理", desc: "客户要求退换货时的标准应对流程" },
      { title: "产品使用问题咨询", desc: "耐心指导客户解决产品使用问题" },
      { title: "服务态度投诉", desc: "处理客户对服务不满的情况" },
    ],
  },
  "2": {
    name: "销售经理张总", avatar: roleSalesManager, tag: "销售培训",
    desc: "经验丰富的销售导师，了解各种成交技巧",
    personality: "自信专业、思维敏捷，善于捕捉客户需求信号。谈吐间展现丰富的行业经验。",
    background: "15年销售管理经验，带过多个百万级销售团队。精通SPIN、FABE等各类销售方法论。",
    style: "沟通直接高效，善于用数据和案例说话，会适时施加紧迫感推动成交。",
    practices: 8, users: 2180, rating: 4.8,
    scenarios: [
      { title: "大客户首次拜访", desc: "如何在首次见面建立信任" },
      { title: "方案汇报演练", desc: "向客户团队汇报解决方案" },
      { title: "成交逼单技巧", desc: "识别购买信号并推动签约" },
    ],
  },
  "3": {
    name: "难缠客户王先生", avatar: roleAngryCustomer, tag: "投诉处理",
    desc: "挑剔易怒的投诉客户，考验你的情绪管理能力",
    personality: "性格急躁、要求高，对产品和服务有极高期望。一旦不满意就会情绪激动，言辞犀利。",
    background: "公司VIP客户，消费金额高但投诉频率也高。之前有过多次不愉快的服务体验，对品牌信任度下降。",
    style: "开场往往情绪激动，会打断你的话。需要先安抚情绪再解决问题，不接受敷衍的回答。",
    practices: 15, users: 4560, rating: 4.7,
    scenarios: [
      { title: "产品质量投诉", desc: "产品出现质量问题，客户要求赔偿" },
      { title: "物流延误投诉", desc: "订单延误导致客户项目受影响" },
      { title: "重复投诉处理", desc: "之前的问题未完全解决，再次投诉" },
    ],
  },
  "4": {
    name: "谈判专家李总", avatar: roleNegotiator, tag: "商务谈判",
    desc: "精明的商务谈判对手，在价格上寸步不让",
    personality: "精于算计、逻辑严密，善于利用信息不对称获取优势。不轻易做出让步。",
    background: "20年采购谈判经验，管理数亿采购预算。对市场价格了如指掌，擅长比价和压价。",
    style: "谈判风格强硬，善于使用沉默和最后通牒。会不断试探你的底线，寻找价格突破口。",
    practices: 10, users: 1890, rating: 4.9,
    scenarios: [
      { title: "首轮报价谈判", desc: "客户对首次报价提出异议" },
      { title: "竞品比价压价", desc: "客户拿竞品价格来压价" },
      { title: "合同条款博弈", desc: "在付款和交付条款上的谈判" },
    ],
  },
  "5": {
    name: "新客户赵小姐", avatar: roleCustomerService, tag: "新客开发",
    desc: "首次接触产品的潜在客户，需要专业引导",
    personality: "礼貌但谨慎，对新产品持观望态度。会提出很多基础问题，需要耐心解答。",
    background: "某中型企业市场部主管，正在为团队寻找合适的工具。之前没有使用过类似产品。",
    style: "问题多但态度友好，关注产品能解决的具体问题。需要看到明确的价值才会考虑购买。",
    practices: 6, users: 1230, rating: 4.6,
    scenarios: [
      { title: "产品初次介绍", desc: "向完全不了解产品的客户介绍" },
      { title: "需求摸底沟通", desc: "了解客户的核心需求和痛点" },
    ],
  },
  "6": {
    name: "采购经理陈总", avatar: roleSalesManager, tag: "B2B销售",
    desc: "注重性价比的企业采购决策者",
    personality: "务实理性、注重ROI，决策前会充分比较各家方案。对供应商有严格的评估标准。",
    background: "负责公司所有IT采购，年度预算500万。与多家供应商保持合作关系，了解市场行情。",
    style: "沟通高效，不喜欢废话。关注数据和案例，需要看到可量化的价值回报。",
    practices: 9, users: 1560, rating: 4.7,
    scenarios: [
      { title: "方案选型对比", desc: "客户在多家方案中做对比" },
      { title: "预算审批推动", desc: "帮助客户内部推动预算审批" },
      { title: "续约谈判", desc: "合同到期时的续约沟通" },
    ],
  },
};

const RoleDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const role = roleData[id || "1"] || roleData["1"];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card/95 backdrop-blur-md px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold">角色详情</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Role header */}
        <div className="flex flex-col items-center pt-6 pb-4 px-4">
          <img src={role.avatar} alt={role.name} className="h-20 w-20 rounded-full object-cover bg-muted shadow-lg" />
          <h2 className="mt-3 text-lg font-bold">{role.name}</h2>
          <span className="mt-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] text-primary font-medium">{role.tag}</span>
          <p className="mt-2 text-xs text-muted-foreground text-center max-w-[280px]">{role.desc}</p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Users className="h-3.5 w-3.5" />{role.users.toLocaleString()}人练过
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />{role.rating}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5" />{role.practices}个场景
            </div>
          </div>
        </div>

        <div className="px-4 space-y-4">
          {/* Personality */}
          <Card className="p-3.5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">性格特点</h3>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{role.personality}</p>
          </Card>

          {/* Background */}
          <Card className="p-3.5">
            <h3 className="text-sm font-semibold mb-2">角色背景</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{role.background}</p>
          </Card>

          {/* Communication style */}
          <Card className="p-3.5">
            <h3 className="text-sm font-semibold mb-2">沟通风格</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{role.style}</p>
          </Card>

          {/* Scenarios */}
          <div>
            <h3 className="text-sm font-semibold mb-2">练习场景</h3>
            <div className="space-y-2">
              {role.scenarios.map((s, i) => (
                <Card key={i} className="flex items-center gap-3 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold">{s.title}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{s.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 mx-auto max-w-[430px] bg-card border-t border-border px-4 py-3">
        <Button className="w-full rounded-xl h-11 text-xs" onClick={() => navigate(`/practice-session/${id}?mode=text`)}>
          <MessageSquare className="h-4 w-4 mr-2" />
          开始文本对练
        </Button>
      </div>
    </div>
  );
};

export default RoleDetailPage;
