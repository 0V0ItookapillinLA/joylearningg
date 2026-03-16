import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const docData: Record<string, { title: string; author: string; readTime: string; content: string[] }> = {
  "3": {
    title: "产品卖点提炼方法论",
    author: "王教练",
    readTime: "约45分钟",
    content: [
      "一、什么是产品卖点？\n\n产品卖点是指能够打动客户、促成购买决策的产品特征或优势。好的卖点不是简单罗列功能，而是将产品特性转化为客户能感知到的价值。\n\n一个有效的卖点应该具备三个特征：\n• 独特性：竞品没有或做不到\n• 价值性：能解决客户的实际问题\n• 可感知：客户能直观理解和体验",
      "二、FABE法则详解\n\nFABE法则是最经典的产品卖点表达框架：\n\nF（Feature）特征：产品是什么\n\"我们的CRM系统采用了AI智能分析引擎\"\n\nA（Advantage）优势：比别人好在哪\n\"相比传统CRM，能自动识别高价值客户\"\n\nB（Benefit）利益：对客户有什么好处\n\"帮助您的销售团队将转化率提升30%以上\"\n\nE（Evidence）证据：凭什么相信\n\"已有200+企业客户验证，平均ROI达到5倍\"",
      "三、USP提炼技巧\n\nUSP（Unique Selling Proposition）独特销售主张的提炼步骤：\n\n1. 列出产品所有功能和特性\n2. 调研竞品的卖点和宣传\n3. 收集客户反馈中的高频关键词\n4. 找到竞品没有但客户需要的交集\n5. 用一句话概括核心价值\n\n实用模板：\n\"对于[目标客户]来说，[产品名]是唯一能[核心价值]的[品类]，因为[差异化理由]\"",
      "四、行业案例分析\n\n案例1：某SaaS企业\n原始卖点：\"功能强大的项目管理工具\"\n优化后：\"让远程团队像面对面一样高效协作，任务完成率提升45%\"\n\n案例2：某教育培训机构\n原始卖点：\"专业的英语培训\"\n优化后：\"90天突破英语口语，学不会全额退款\"\n\n案例3：某智能硬件\n原始卖点：\"搭载最新AI芯片\"\n优化后：\"一句话就能控制全屋家电，老人小孩都会用\"",
      "五、实操练习\n\n练习1：选择你负责的一款产品，用FABE法则写出3个卖点\n\n练习2：针对不同客户角色（决策者/使用者/技术评估者），分别准备一版卖点话术\n\n练习3：用USP模板，为产品提炼一句核心价值主张\n\n提示：好的卖点需要反复打磨和验证，建议在实际销售场景中测试效果并持续优化。",
    ],
  },
  "4": {
    title: "高效谈判策略",
    author: "赵导师",
    readTime: "约60分钟",
    content: [
      "一、谈判的基本原则\n\n商务谈判不是零和博弈，而是寻找双方都能接受的最优解。成功的谈判者需要掌握以下核心原则：\n\n• 知己知彼：充分了解对方的需求、底线和替代方案\n• 创造价值：寻找能扩大整体利益的方案\n• 适度让步：每次让步都要有对等回报\n• 控制节奏：不被对方的压力左右决策",
      "二、BATNA分析\n\nBATNA（Best Alternative to a Negotiated Agreement）是谈判中最重要的概念之一。\n\n你的BATNA越强，谈判地位越有利。评估BATNA的步骤：\n1. 列出谈判不成时的所有替代方案\n2. 评估每个替代方案的价值\n3. 选择最优替代方案作为你的BATNA\n4. 据此设定谈判底线\n\n同时要评估对方的BATNA，对方的替代方案越少，你的议价能力越强。",
      "三、锚定与让步策略\n\n锚定效应：第一个报价会影响最终结果。建议先出价，设定有利的谈判锚点。\n\n让步策略的黄金法则：\n• 逐步递减：每次让步幅度递减，暗示接近底线\n• 有条件让步：\"如果您能承诺年度合同，我可以额外优惠5%\"\n• 包装让步：将多个小让步打包成一个大让步\n• 虚拟让步：让出你不在意但对方看重的条件",
      "四、实战案例\n\n案例：某软件公司与大型企业的采购谈判\n\n背景：客户要求在标准价基础上打7折\n\n谈判过程：\n1. 第一轮：坚持标准价，展示ROI分析\n2. 第二轮：提供95折+免费培训（虚拟让步）\n3. 第三轮：92折+延长服务期至2年\n4. 最终：88折+年度合同+推荐客户条款\n\n结果：比客户初始要求多收了18%，客户仍然满意。\n关键：始终围绕价值而非价格进行讨论。",
    ],
  },
  "8": {
    title: "CRM系统操作指南",
    author: "刘助教",
    readTime: "约30分钟",
    content: [
      "一、CRM系统概述\n\nCRM（Customer Relationship Management）是企业管理客户关系的核心工具。本指南将帮助你快速上手系统操作。\n\n主要功能模块：\n• 客户管理：录入、查询、分类客户信息\n• 商机管理：跟踪销售机会和转化进度\n• 联系记录：记录每次客户沟通的内容\n• 数据报表：自动生成业绩和活动报告",
      "二、日常操作流程\n\n1. 每日登录系统查看待办事项\n2. 记录客户拜访和电话沟通内容\n3. 更新商机阶段和预计成交时间\n4. 设置下次跟进提醒\n5. 周末前完成本周工作总结\n\n操作技巧：善用标签功能对客户进行分类，便于后续批量营销和精准跟进。",
    ],
  },
  "9": {
    title: "销售心理学入门",
    author: "周教授",
    readTime: "约50分钟",
    content: [
      "一、销售心理学基础\n\n销售的本质是影响客户的决策过程。理解客户的心理机制，能让你的销售更加高效。\n\n六大影响力法则（罗伯特·西奥迪尼）：\n• 互惠：先给予，再索取\n• 承诺一致：让客户做出小承诺\n• 社会认同：展示其他客户的选择\n• 权威：建立专业形象\n• 稀缺：创造紧迫感\n• 喜好：建立个人好感",
      "二、客户决策心理\n\n客户购买决策的五个阶段：\n1. 需求认知：意识到问题存在\n2. 信息搜索：主动寻找解决方案\n3. 方案评估：比较不同选项\n4. 购买决策：最终选择\n5. 购后行为：使用体验和口碑\n\n针对每个阶段，销售人员需要采取不同的策略。",
    ],
  },
  "10": {
    title: "客户服务标准手册",
    author: "马主管",
    readTime: "约40分钟",
    content: [
      "一、服务理念\n\n以客户为中心，超越客户期望。优质的客户服务不仅能解决问题，更能创造客户忠诚度和口碑传播。\n\n服务标准：\n• 响应时间：电话30秒内接听，在线咨询1分钟内回复\n• 解决效率：首次解决率达到80%以上\n• 服务态度：始终保持专业、耐心、积极\n• 跟进闭环：每个问题都有明确的解决结果",
      "二、常见场景处理\n\n投诉处理五步法：\n1. 倾听：让客户充分表达不满\n2. 共情：表示理解客户的感受\n3. 确认：复述问题确保理解准确\n4. 方案：提供具体解决方案\n5. 跟进：确认客户满意度\n\n记住：处理投诉的关键是先处理情绪，再处理问题。",
    ],
  },
};

const DocViewerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const doc = docData[id || "3"] || docData["3"];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 bg-card/95 backdrop-blur-md border-b border-border">
        <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-sm font-semibold truncate flex-1">{doc.title}</h1>
      </div>

      {/* Doc info */}
      <div className="px-4 py-4 border-b border-border">
        <h2 className="text-lg font-bold">{doc.title}</h2>
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{doc.author}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{doc.readTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {doc.content.map((section, i) => (
          <div key={i} className="text-xs leading-relaxed text-foreground whitespace-pre-line">
            {section}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocViewerPage;
