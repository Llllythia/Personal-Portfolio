export const bi = (zh, en) => ({ zh, en });
export const skills = [
  { id: 'insight', name: bi('研究与洞察', 'Research & insight'), desc: bi('把分散的资源、现状与观察，组织成值得解决的问题。', 'Turn resources, context and observations into questions worth solving.'), words: ['调研','研究','分析','洞察','资源','research','insight','analysis'] },
  { id: 'people', name: bi('需求理解与转译', 'Understanding people'), desc: bi('从人的行为与诉求出发，形成具体的体验与功能需求。', 'Translate people’s behaviours and needs into experience and functional requirements.'), words: ['用户','需求','访谈','沟通','服务','体验','user','interview','service','experience'] },
  { id: 'strategy', name: bi('策划与系统思考', 'Strategy & systems'), desc: bi('连接场地条件、人群需求与文化内容，形成完整方案。', 'Connect context, people and cultural content into a coherent proposal.'), words: ['策划','规划','文旅','文化','整合','战略','运营','strategy','planning','tourism','culture','operation'] },
  { id: 'experiment', name: bi('创意与迭代', 'Creative experimentation'), desc: bi('把空间知识迁移到新问题，用规则、原型与迭代探索可能。', 'Transfer spatial thinking to new challenges through rules, prototypes and iteration.'), words: ['创新','创意','学习','跨界','科技','数字','游戏','迭代','innovation','creative','learning','digital','game','iteration'] },
  { id: 'communication', name: bi('可视化与表达', 'Visual communication'), desc: bi('用地图、模型与叙事，把复杂的思考表达清楚。', 'Make complex thinking legible through maps, models and narratives.'), words: ['表达','可视化','设计','叙事','内容','审美','visual','design','story','communication'] }
];
export const projects = [
  {
    id: 'transit', no: '01', title: bi('让换乘，成为可停留的城市体验', 'Making transit a place to pause, connect and stay'),
    original: bi('The Intersection · 东涌综合交通枢纽 · Smart TOD Design', 'The Intersection · Tung Chung integrated transit hub · Smart TOD Design'),
    type: bi('综合策划 · 交通与体验设计', 'Integrated strategy · Transit experience'), location: bi('中国 · 香港东涌', 'Tung Chung, Hong Kong'),
    role: null,
    cover: 'studio2', pages: ['studio2-01','studio2-02','studio2-03','studio2-04','studio2-05','studio2-06'],
    skills: ['insight','people','strategy','communication'],
    background: bi('东涌的轨道、巴士与缆车站点相邻，但步行联系、换乘体验与周边空间仍存在断点。团队结合区域交通与产业背景，探索如何将交通枢纽与办公、住宿、商业及公共活动整合，让场地同时服务短时换乘与长期生活。', 'Rail, bus and cable-car stations sit close together in Tung Chung, yet pedestrian links, transfers and surrounding spaces remain fragmented. Drawing on the regional transport and industry context, the team explores a hub that integrates mobility, work, accommodation, retail and public life for both brief transfers and longer stays.'),
    question: bi('当人们停留一小时、几天或更久，同一个枢纽如何回应不同的需要？', 'How can one hub respond to people staying for an hour, a few days or much longer?'),
    steps: [
      [bi('理解人群与任务', 'Understand people & tasks'), bi('按停留时长区分居民、商务访客与换乘旅客，将生活、工作、社交和通行需求转译为不同的功能组合。', 'Segment residents, business visitors and transit passengers by length of stay, translating living, working, social and mobility needs into different programme combinations.')],
      [bi('诊断体验断点', 'Diagnose experience gaps'), bi('沿港铁、巴士与缆车之间的具体路线，梳理遮阴不足、绕行、层间转换和人车冲突，定位影响连续体验的关键节点。', 'Trace routes between MTR, bus and cable-car services to identify exposure, detours, level changes and pedestrian–vehicle conflicts that interrupt the journey.')],
      [bi('组织方案并对照', 'Integrate & compare'), bi('通过交通整合、立体步行连接、复合开发与公共空间设计组织方案，再以流线及 JLOS 图对照设计前后的路径和活动。', 'Combine transport consolidation, multi-level walking links, mixed-use development and public space, then compare proposed routes and activities with the existing condition through circulation and JLOS diagrams.')]
    ],
    highlights: [
      { image: 'studio2-users.jpg', title: bi('同一场地，不同的停留需求', 'One place, different lengths of stay'), text: bi('用户分层不是简单罗列年龄职业，而是将停留时长与任务联系起来：换乘补给、短期商务、长期生活，分别需要什么？', 'The segmentation connects time with tasks: what do transit and refreshment, short business stays and everyday life each require?'), source: bi('Studio 2 · 第 2 页 · 人群与需求分析', 'Studio 2 · p. 2 · Users and needs') },
      { image: 'studio2-journeys.jpg', title: bi('顺着人的路径，找到体验问题', 'Follow the route to find the friction'), text: bi('把换乘拆成可观察的连续环节，标出暴晒、车辆干扰与楼层转换，让“体验不好”变成可以回应的具体问题。', 'Break a transfer into observable stages and identify exposure, traffic interference and level changes, turning a broad complaint into specific design questions.'), source: bi('Studio 2 · 第 1 页 · 现状路径分析', 'Studio 2 · p. 1 · Existing journeys') },
      { image: 'studio2-comparison.jpg', title: bi('让设计回应，可以被看见', 'Make the design response visible'), text: bi('用同一路径的前后对照，说明立体连接与活动节点如何改变空间组织。图中表达的是方案预期，尚非建成后的效果测量。', 'Compare the same journey before and after the proposal to explain the role of level connections and activity nodes. These are proposed conditions, not measured post-construction results.'), source: bi('Studio 2 · 第 5 页 · JLOS 前后对照', 'Studio 2 · p. 5 · JLOS comparison') }
    ],
    evidence: bi('Studio 2 第 1 页：区域、现状与路径；第 2 页：人群分层与概念；第 3 页：策略与鸟瞰；第 4–5 页：流线、分层功能及 JLOS 前后对照；第 6 页：节点与生态策略。', 'Studio 2 p. 1: regional context and existing journeys; p. 2: user segmentation and concept; p. 3: strategy and aerial view; pp. 4–5: circulation, layered programmes and JLOS comparisons; p. 6: detail and ecological strategies.'),
    outcome: bi('形成从区域定位、用户分层、体验诊断到综合布局和路径对照的设计提案，体现需求转译、系统整合与方案论证。前后对照属于设计层面的预期分析，未提供建成效果或换乘效率的实测数据；AI 相关内容为项目定位与概念，不据此声称 AI 系统开发。', 'The proposal connects regional positioning, user segmentation and journey diagnosis with an integrated layout and route comparisons. It demonstrates needs translation, systems integration and design reasoning. Comparisons describe proposed conditions rather than measured built outcomes or transfer-time improvements. AI references concern positioning and concept, not evidence of AI system development.')
  },
  {
    id: 'coking', no: '02', title: bi('让工业遗存，重新连接日常', 'Giving industrial heritage a new everyday life'),
    original: bi('北京焦化厂更新', 'Revitalisation of the Beijing Coking Plant'),
    type: bi('城市更新 · 场地策划', 'Urban regeneration · Spatial strategy'), location: bi('中国 · 北京', 'Beijing, China'),
    role: bi('小组课程项目', 'Team academic project'), cover: 7, pages: [7,8,9,10,11,12], skills: ['insight','people','strategy','communication'],
    background: bi('工业外迁后，旧厂区留下闲置设施与割裂的空间。项目探索如何保留工业记忆，同时回应周边居民、原工人、年轻访客与商户的不同诉求。', 'Industrial relocation left idle facilities and disconnected spaces. This proposal explores how industrial memory can coexist with the needs of residents, former workers, young visitors and local businesses.'),
    question: bi('如何把一片被遗忘的厂区，转化为有归属感、可进入的公共场所？', 'How can an overlooked industrial site become an accessible place of belonging?'),
    steps: [
      [bi('识别条件', 'Read the context'), bi('结合产业变迁、工业用地与周边功能分析，梳理场地的限制和更新机会。', 'Read industrial change, land-use patterns and neighbouring functions to identify constraints and opportunities.')],
      [bi('转译需求', 'Translate needs'), bi('把原工人的记忆、儿童的游憩、年轻人的互动与商户的客流诉求，对应到空间功能。', 'Relate workers’ memories, children’s play, young visitors’ interaction and businesses’ footfall needs to proposed functions.')],
      [bi('组织策略', 'Build a strategy'), bi('以设施补足、公共通道、生态修复和工业遗存保留，组织总体布局与节点方案。', 'Combine public amenities, pedestrian connections, ecological restoration and retained industrial structures in a masterplan and node designs.')]
    ],
    evidence: bi('PDF 第 8–9 页：背景、功能分析与四类人群诉求；第 10–12 页：策略、总图和节点。', 'PDF pp. 8–9: context, functions and four stakeholder groups; pp. 10–12: strategies, masterplan and nodes.'),
    outcome: bi('形成总体规划、分层策略及节点设计，体现从问题定义到方案表达的完整链条。属于设计提案，未提供建成、运营或客流验证。', 'A masterplan, layered strategies and node designs demonstrate the chain from problem definition to proposal. This is a design proposal; built outcomes, operations and footfall effects are not documented.')
  },
  {
    id: 'hutong', no: '03', title: bi('从游客走过的路，发现文化的入口', 'Finding cultural entry points in the paths people take'),
    original: bi('南锣鼓巷：步行视角下的历史文化研究', 'Nanluoguxiang: heritage from a pedestrian perspective'),
    type: bi('实地研究 · 文化体验设计', 'Field research · Cultural experience'), location: bi('中国 · 北京东城', 'Dongcheng, Beijing'),
    role: bi('小组课程项目', 'Team academic project'), cover: 19, pages: [19,20], skills: ['insight','people','strategy','communication'],
    background: bi('商业活动集中在南北主轴，历史文化资源更多藏在东西向胡同。项目从步行者视角，研究文化资源为何难以被发现，以及如何改善停留和探索体验。', 'Commercial activity clusters on the north–south axis, while heritage lies in the east–west hutongs. The project asks why cultural resources are overlooked and how walking, discovery and rest can be improved.'),
    question: bi('有文化资源，为什么游客仍然只走商业主街？', 'Why do visitors remain on the commercial spine when heritage is close by?'),
    steps: [
      [bi('观察与访谈', 'Observe & interview'), bi('通过实地研究与访谈，并邀请 12 位游客描绘偏好的步行路线，理解实际游览行为。', 'Use field research and interviews, including preferred walking routes traced by 12 tourists, to understand visitor behaviour.')],
      [bi('识别体验断点', 'Find experience gaps'), bi('对比商业、历史文化资源与游客路线分布，识别资源可见性和可进入性之间的落差。', 'Compare commerce, heritage locations and visitor routes to identify gaps in visibility and access.')],
      [bi('提出触点方案', 'Design touchpoints'), bi('提出可组合的休憩、文化介绍和照明设施，在紧凑胡同中兼顾探索、停留与居民使用。', 'Propose modular seating, cultural interpretation and lighting to support discovery, rest and residents’ use in compact hutongs.')]
    ],
    evidence: bi('PDF 第 19 页：实地研究、访谈、12 位游客路线及小组分工；第 20 页：模块、标识与照明策略。', 'PDF p. 19: field research, interviews, 12 visitor routes and contributions; p. 20: modular design, interpretation and lighting.'),
    outcome: bi('形成游客行为与资源分布的对照分析，并提出模块化体验设施。小样本支持探索性洞察，不代表全部游客；未提供实施后体验测试。', 'A comparison of visitor behaviour and resource distribution informs modular experience facilities. The small sample supports exploratory insight, rather than claims about all visitors. Post-implementation testing is not documented.')
  },
  {
    id: 'maze', no: '04', title: bi('把城市的规则，写进一座虚拟迷宫', 'Turning spatial rules into a virtual maze'),
    original: bi('Healing Maze · 疗愈迷宫', 'Healing Maze'),
    type: bi('生成式设计 · 游戏概念', 'Generative design · Game concept'), location: bi('虚拟世界', 'Digital world'),
    role: bi('小组课程项目 · 2024.04–06', 'Team academic project · Apr–Jun 2024'), cover: 13, pages: [13,14,15,16,17,18], skills: ['experiment','strategy','communication'],
    background: bi('基于 WFC（波函数坍缩）算法探索虚拟城市形态，将空间模块、邻接规则、人物叙事与游戏任务结合。PDF 列出的工具包括 Rhino、Grasshopper 与 Midjourney。', 'An exploration of virtual urban morphology using Wave Function Collapse (WFC), connecting spatial modules, adjacency rules, character narratives and game tasks. Listed tools include Rhino, Grasshopper and Midjourney.'),
    question: bi('如何让生成式空间既有变化，也能支持连贯的探索体验？', 'How can generated spaces remain varied while supporting coherent exploration?'),
    steps: [
      [bi('拆解模块', 'Define modules'), bi('将空间拆解为二维模块及相邻关系，形成可以组合的规则系统。', 'Break space into 2D modules and adjacency relationships to form a combinable rule system.')],
      [bi('诊断与修正', 'Diagnose & refine'), bi('针对楼梯路径不清、自连接死路与楼梯平台中断等问题，添加约束并比较多轮生成。', 'Add constraints and compare generation rounds to address unclear stair routes, self-connected dead ends and interrupted landings.')],
      [bi('连接体验', 'Connect to experience'), bi('将二维结果映射为三维场景，加入任务节点、路径探索与叙事设定。', 'Map 2D results into 3D scenes with mission nodes, exploration routes and narrative settings.')]
    ],
    evidence: bi('PDF 第 13 页：项目与工具（项目性质依本人确认更正为小组）；第 16 页：多轮规则修正；第 17–18 页：三维映射与任务场景。部分概念图注明由 Midjourney 生成。', 'PDF p. 13: project and tools (team status corrected by the author); p. 16: rule refinement; pp. 17–18: 3D mapping and task scenes. Some concept images are credited to Midjourney.'),
    outcome: bi('形成规则迭代、空间生成与游戏叙事概念，支持创新、系统拆解和跨领域迁移的表述。未提供可运行游戏、算法源码或用户测试，不据此声称游戏开发或算法研发能力。', 'Rule iterations, spatial generation and a game narrative concept support creative experimentation, systems thinking and cross-domain transfer. A playable build, algorithm source and user testing are not provided, so game engineering or original algorithm research is not claimed.')
  },
  {
    id: 'railway', no: '05', title: bi('让场地的资源，形成新的连接', 'Connecting overlooked resources into a new place'),
    original: bi('环铁艺术家自给型物流社区', 'Huantie artists’ self-sufficient logistics community'),
    type: bi('城市设计 · 资源整合', 'Urban design · Resource integration'), location: bi('中国 · 北京环铁', 'Huantie, Beijing'),
    role: bi('独立课程项目', 'Individual academic project'), cover: 2, pages: [2,3,4,5,6], skills: ['insight','strategy','communication'],
    background: bi('铁路环线内部的闲置地，临近艺术聚落、农地与铁路遗存。项目尝试通过艺术家社区与复合空间，探索资源之间的互补关系。', 'An underused site within a railway loop sits close to artist communities, farmland and railway heritage. The proposal explores complementary uses through an artists’ community and mixed spatial programmes.'),
    question: bi('铁路、农地和艺术人群，能否共同构成场地的新价值？', 'Can rail infrastructure, farmland and an artist community create shared value for a site?'),
    steps: [
      [bi('资源梳理', 'Map resources'), bi('梳理艺术聚落、人口构成、农地和铁路特征，提炼可被重新利用的基础条件。', 'Map artist communities, population characteristics, farmland and railway features to identify reusable assets.')],
      [bi('策划定位', 'Frame a proposition'), bi('将艺术家居住、物流、研究与商业等功能组织为自给社区的设计构想。', 'Organise artist housing, logistics, research and commerce into a self-sufficient community concept.')],
      [bi('空间转化', 'Translate into space'), bi('通过总体规划、功能节点和形态推演，将资源组合转化为可讨论的空间方案。', 'Translate the resource mix into a spatial proposition through masterplanning, programme nodes and form studies.')]
    ],
    evidence: bi('PDF 第 3 页：资源与人群分析；第 4 页：形态生成与总体规划；第 5–6 页：功能节点。', 'PDF p. 3: resource and population analysis; p. 4: form generation and masterplan; pp. 5–6: programme nodes.'),
    outcome: bi('形成多功能社区与空间系统的设计提案，体现资源识别、组合策划和可视化表达。未提供财务测算，不能将“自给”概念视为经验证的商业模式。', 'A mixed-use community and spatial system proposal demonstrates resource assessment, programme strategy and visual communication. Financial modelling is not provided; self-sufficiency remains a design concept.')
  }
];
export const profiles = {
  general: { label: bi('综合作品集', 'Selected portfolio'), title: bi('理解人与场所，\n让洞察成为体验。', 'Understand people & place.\nTurn insight into experience.'), intro: bi('我是陆雨甜。以城市与空间设计为起点，关注研究、文化策划与体验设计；把复杂的场地条件和人的需求，转化为有逻辑、有温度的方案。', 'I’m Yutian Lu. With a foundation in urban and spatial design, I explore research, cultural strategy and experience design—turning complex contexts and people’s needs into thoughtful proposals.'), priority: ['insight','people','strategy','experiment','communication'], order: ['transit','hutong','coking','maze','railway'] },
  culture: { label: bi('文旅与文化策划', 'Culture & tourism'), title: bi('发现文化的价值，\n设计人与场所的相遇。', 'Discover cultural value.\nCreate encounters with place.'), intro: bi('从工业遗存到历史街区，我关注文化资源如何被理解、被体验。通过场地研究、人群需求分析与触点设计，探索连接文化、社区与游客的策划方案。', 'From industrial heritage to historic streets, I explore how cultural resources are understood and experienced through site research, stakeholder needs and visitor touchpoints.'), priority: ['strategy','people','insight','communication','experiment'], order: ['hutong','transit','coking','railway','maze'] },
  experience: { label: bi('用户研究与体验', 'Research & experience'), title: bi('从人的行为出发，\n找到体验的下一步。', 'Start with people.\nFind the next step in experience.'), intro: bi('通过实地观察、访谈与路线分析，理解行为背后的需求；将发现转化为功能、路径和服务触点，探索更易进入、更愿停留的体验。', 'I use field observation, interviews and route analysis to understand needs, then translate findings into functions, journeys and service touchpoints.'), priority: ['people','insight','strategy','communication','experiment'], order: ['transit','hutong','coking','maze','railway'] },
  creative: { label: bi('数字创意与创新', 'Digital & creative'), title: bi('在空间与规则之间，\n探索体验的新可能。', 'Between space and rules,\nexplore new experiences.'), intro: bi('把城市设计中的空间思维迁移到虚拟场景，结合模块、生成规则与叙事，探索从创意构想到规则迭代的设计过程。', 'I transfer spatial thinking into virtual worlds, combining modules, generative rules and narrative to explore a design process from concept to iteration.'), priority: ['experiment','strategy','communication','insight','people'], order: ['maze','transit','railway','hutong','coking'] }
};
