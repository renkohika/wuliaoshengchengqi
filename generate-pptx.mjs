import pptxgen from "pptxgenjs";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 inches
pptx.author = "千岛·吧唧无料生成器";
pptx.subject = "产品介绍";

// Theme colors
const C = {
  black: "1A1A1A",
  dark: "333333",
  mid: "6B6B6B",
  light: "999999",
  border: "E8E8E8",
  bg: "FAFAFA",
  white: "FFFFFF",
};

const TOTAL_SLIDES = 13;

// Helper: add consistent footer
function addFooter(slide, pageNum) {
  slide.addText(`${String(pageNum).padStart(2, "0")} / ${TOTAL_SLIDES}`, {
    x: 0.5, y: 6.9, w: 2, h: 0.4,
    fontSize: 9, color: C.light, fontFace: "Microsoft YaHei",
  });
}

// =============== SLIDE 1: Cover ===============
let slide = pptx.addSlide();
slide.background = { color: C.white };
slide.addText("千岛 × 创作者工具", {
  x: 1, y: 2.0, w: 11.33, h: 0.4,
  fontSize: 12, color: C.light, fontFace: "Microsoft YaHei",
  align: "center", letterSpacing: 3,
});
slide.addText("吧唧无料生成器", {
  x: 1, y: 2.6, w: 11.33, h: 1.2,
  fontSize: 48, bold: true, color: C.black, fontFace: "Microsoft YaHei",
  align: "center",
});
slide.addText("让每一位创作者，3分钟做出专业级吧唧设计", {
  x: 1, y: 3.9, w: 11.33, h: 0.6,
  fontSize: 16, color: C.mid, fontFace: "Microsoft YaHei",
  align: "center",
});
slide.addText("千岛小程序  ·  零门槛设计  ·  AI智能抠图  ·  多图层编辑", {
  x: 1, y: 5.0, w: 11.33, h: 0.5,
  fontSize: 11, color: C.light, fontFace: "Microsoft YaHei",
  align: "center",
});
slide.addText("产品介绍 · 2026", {
  x: 1, y: 6.2, w: 11.33, h: 0.4,
  fontSize: 10, color: C.light, fontFace: "Microsoft YaHei",
  align: "center",
});

// =============== SLIDE 2: Market ===============
slide = pptx.addSlide();
slide.background = { color: C.bg };
slide.addText("市场洞察", {
  x: 0.8, y: 0.5, w: 3, h: 0.35,
  fontSize: 9, color: C.light, fontFace: "Microsoft YaHei", bold: true,
});
slide.addText("背景与机会", {
  x: 0.8, y: 0.9, w: 11.5, h: 0.7,
  fontSize: 28, bold: true, color: C.black, fontFace: "Microsoft YaHei",
});
slide.addText("二次元同人经济蓬勃发展，吧唧是最核心的无料/周边品类，市场缺乏专业工具", {
  x: 0.8, y: 1.6, w: 10, h: 0.5,
  fontSize: 12, color: C.mid, fontFace: "Microsoft YaHei",
});

const metrics = [
  { val: "4.9亿", label: "中国泛二次元用户" },
  { val: "80%", label: "吧唧占同人周边首选" },
  { val: "0", label: "专业吧唧设计工具" },
];
metrics.forEach((m, i) => {
  const x = 0.8 + i * 4;
  slide.addShape(pptx.ShapeType.roundRect, { x, y: 2.5, w: 3.6, h: 2.8, fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.08 });
  slide.addText(m.val, { x, y: 2.9, w: 3.6, h: 1.2, fontSize: 36, bold: true, color: C.black, fontFace: "Microsoft YaHei", align: "center" });
  slide.addText(m.label, { x, y: 4.1, w: 3.6, h: 0.5, fontSize: 11, color: C.mid, fontFace: "Microsoft YaHei", align: "center" });
});
addFooter(slide, 2);

// =============== SLIDE 3: Pain Points ===============
slide = pptx.addSlide();
slide.background = { color: C.bg };
slide.addText("用户研究", { x: 0.8, y: 0.5, w: 3, h: 0.35, fontSize: 9, color: C.light, fontFace: "Microsoft YaHei", bold: true });
slide.addText("痛点分析", { x: 0.8, y: 0.9, w: 11.5, h: 0.7, fontSize: 28, bold: true, color: C.black, fontFace: "Microsoft YaHei" });

const pains = [
  { title: "技能门槛高", items: "需要PS等专业软件\n抠图调色排版需设计经验\n大量创作者望而却步" },
  { title: "流程耗时", items: "手动抠图+找素材 = 2-3小时\n调尺寸反复试错\n多款式需重复劳动" },
  { title: "素材难寻", items: "边框素材质量参差不齐\n可爱风装饰散落各处\n版权问题模糊" },
  { title: "工具不适配", items: "通用工具不懂吧唧规格\n无圆形预览+印刷标准\n手机端体验差" },
];
pains.forEach((p, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = 0.8 + col * 6;
  const y = 2.0 + row * 2.6;
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w: 5.6, h: 2.3, fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.08 });
  slide.addText(p.title, { x: x + 0.4, y: y + 0.25, w: 4.8, h: 0.4, fontSize: 12, bold: true, color: C.black, fontFace: "Microsoft YaHei" });
  slide.addText(p.items, { x: x + 0.4, y: y + 0.7, w: 4.8, h: 1.5, fontSize: 10, color: C.mid, fontFace: "Microsoft YaHei", lineSpacingMultiple: 1.6, valign: "top" });
});
addFooter(slide, 3);

// =============== SLIDE 4: Positioning ===============
slide = pptx.addSlide();
slide.background = { color: C.bg };
slide.addText("产品定位", { x: 0.8, y: 0.5, w: 3, h: 0.35, fontSize: 9, color: C.light, fontFace: "Microsoft YaHei", bold: true });
slide.addText("千岛生态内的一站式吧唧设计工具", { x: 0.8, y: 0.9, w: 11.5, h: 0.7, fontSize: 28, bold: true, color: C.black, fontFace: "Microsoft YaHei" });
slide.addText("无需下载安装 · 无需设计技能 · 无需离开千岛", { x: 0.8, y: 1.6, w: 10, h: 0.5, fontSize: 12, color: C.mid, fontFace: "Microsoft YaHei" });

slide.addShape(pptx.ShapeType.roundRect, { x: 2.5, y: 2.5, w: 8.33, h: 2.0, fill: { color: C.black }, line: { type: "none" }, rectRadius: 0.08 });
slide.addText('"打开即用，所见即所得"', { x: 2.5, y: 2.7, w: 8.33, h: 1.0, fontSize: 22, bold: true, color: C.white, fontFace: "Microsoft YaHei", align: "center" });
slide.addText("在熟悉的社区环境中，完成从灵感到成品的全流程", { x: 2.5, y: 3.6, w: 8.33, h: 0.6, fontSize: 11, color: "AAAAAA", fontFace: "Microsoft YaHei", align: "center" });

const steps = ["千岛内打开", "选底图/边框", "上传·AI抠图", "叠加装饰", "导出/下单"];
steps.forEach((s, i) => {
  const x = 1.2 + i * 2.4;
  slide.addShape(pptx.ShapeType.roundRect, { x, y: 5.2, w: 2.0, h: 0.7, fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.05 });
  slide.addText(s, { x, y: 5.2, w: 2.0, h: 0.7, fontSize: 9, color: C.black, fontFace: "Microsoft YaHei", align: "center", valign: "middle" });
  if (i < steps.length - 1) {
    slide.addText("→", { x: x + 2.0, y: 5.2, w: 0.4, h: 0.7, fontSize: 12, color: C.light, align: "center", valign: "middle" });
  }
});
addFooter(slide, 4);

// =============== SLIDE 5: Product Demo (Screenshots) ===============
slide = pptx.addSlide();
slide.background = { color: C.bg };
slide.addText("产品演示", { x: 0.8, y: 0.5, w: 3, h: 0.35, fontSize: 9, color: C.light, fontFace: "Microsoft YaHei", bold: true });
slide.addText("界面展示", { x: 0.8, y: 0.9, w: 11.5, h: 0.7, fontSize: 28, bold: true, color: C.black, fontFace: "Microsoft YaHei" });
slide.addText("简洁直观的操作界面，所见即所得的实时预览", { x: 0.8, y: 1.6, w: 10, h: 0.5, fontSize: 12, color: C.mid, fontFace: "Microsoft YaHei" });

// Main screenshot (large)
slide.addImage({ path: "screenshot_1_main.png", x: 0.5, y: 2.2, w: 7.0, h: 4.5, rounding: true });
// Side screenshots (smaller, stacked)
slide.addImage({ path: "screenshot_2_borders.png", x: 7.8, y: 2.2, w: 5.0, h: 2.1, rounding: true });
slide.addImage({ path: "screenshot_3_decorations.png", x: 7.8, y: 4.5, w: 5.0, h: 2.1, rounding: true });

// Labels
slide.addText("主界面 — 实时圆形预览", { x: 0.5, y: 6.8, w: 7.0, h: 0.3, fontSize: 8, color: C.light, fontFace: "Microsoft YaHei", align: "center" });
slide.addText("边框选择", { x: 7.8, y: 4.35, w: 5.0, h: 0.3, fontSize: 8, color: C.light, fontFace: "Microsoft YaHei", align: "center" });
slide.addText("装饰素材", { x: 7.8, y: 6.65, w: 5.0, h: 0.3, fontSize: 8, color: C.light, fontFace: "Microsoft YaHei", align: "center" });
addFooter(slide, 5);

// =============== SLIDE 6: Features (was 5) ===============
slide = pptx.addSlide();
slide.background = { color: C.bg };
slide.addText("产品能力", { x: 0.8, y: 0.5, w: 3, h: 0.35, fontSize: 9, color: C.light, fontFace: "Microsoft YaHei", bold: true });
slide.addText("核心功能", { x: 0.8, y: 0.9, w: 11.5, h: 0.7, fontSize: 28, bold: true, color: C.black, fontFace: "Microsoft YaHei" });


const features = [
  { title: "丰富底图库", desc: "20+精选底图，支持自定义渐变色和上传" },
  { title: "多样化边框", desc: "SVG矢量+PNG图片边框，可自定义颜色" },
  { title: "AI 智能抠图", desc: "本地端AI推理，一键去背景，隐私零泄露" },
  { title: "装饰叠加", desc: "预设+自定义素材，可选图层位置" },
  { title: "自由变换", desc: "每层独立拖拽、双指缩放，精准调整" },
  { title: "标准尺寸", desc: "44/58/75mm行业规格，圆形预览，导出即印" },
];
features.forEach((f, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = 0.8 + col * 4;
  const y = 2.0 + row * 2.6;
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w: 3.7, h: 2.3, fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.08 });
  slide.addText(f.title, { x: x + 0.4, y: y + 0.4, w: 3, h: 0.4, fontSize: 12, bold: true, color: C.black, fontFace: "Microsoft YaHei" });
  slide.addText(f.desc, { x: x + 0.4, y: y + 0.9, w: 3, h: 1.2, fontSize: 10, color: C.mid, fontFace: "Microsoft YaHei", lineSpacingMultiple: 1.5, valign: "top" });
});
addFooter(slide, 6);

// =============== SLIDE 6: Tech ===============
slide = pptx.addSlide();
slide.background = { color: C.bg };
slide.addText("技术架构", { x: 0.8, y: 0.5, w: 3, h: 0.35, fontSize: 9, color: C.light, fontFace: "Microsoft YaHei", bold: true });
slide.addText("技术亮点", { x: 0.8, y: 0.9, w: 11.5, h: 0.7, fontSize: 28, bold: true, color: C.black, fontFace: "Microsoft YaHei" });

const techs = [
  { title: "纯前端·零后端", items: "React + TypeScript + Vite\n所有计算本地完成\n图片永不上传\n运营成本趋零" },
  { title: "端侧AI推理", items: "WebAssembly + ONNX Runtime\n无网络延迟，离线可用\n隐私零泄露" },
  { title: "小程序适配", items: "响应式全端适配\n触屏手势原生支持\n千岛WebView无缝嵌入\n秒开无等待" },
  { title: "极致体验", items: "Canvas智能裁剪透明边距\n多图层Transform引擎\n实时圆形预览\n3x高清导出" },
];
techs.forEach((t, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = 0.8 + col * 6;
  const y = 2.0 + row * 2.6;
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w: 5.6, h: 2.3, fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.08 });
  slide.addText(t.title, { x: x + 0.4, y: y + 0.25, w: 4.8, h: 0.4, fontSize: 12, bold: true, color: C.black, fontFace: "Microsoft YaHei" });
  slide.addText(t.items, { x: x + 0.4, y: y + 0.7, w: 4.8, h: 1.5, fontSize: 10, color: C.mid, fontFace: "Microsoft YaHei", lineSpacingMultiple: 1.6, valign: "top" });
});
addFooter(slide, 7);

// =============== SLIDE 8: Users ===============
slide = pptx.addSlide();
slide.background = { color: C.bg };
slide.addText("目标受众", { x: 0.8, y: 0.5, w: 3, h: 0.35, fontSize: 9, color: C.light, fontFace: "Microsoft YaHei", bold: true });
slide.addText("用户画像", { x: 0.8, y: 0.9, w: 11.5, h: 0.7, fontSize: 28, bold: true, color: C.black, fontFace: "Microsoft YaHei" });

const users = [
  { title: "同人画手", desc: "作品做成吧唧送粉丝/出摊" },
  { title: "追星/谷圈", desc: "推图做应援吧唧，漫展交换" },
  { title: "新手创作者", desc: "无PS技能，有创作热情" },
  { title: "漫展摊主", desc: "批量快速出多款设计稿" },
];
users.forEach((u, i) => {
  const x = 0.8 + i * 3.1;
  slide.addShape(pptx.ShapeType.roundRect, { x, y: 2.2, w: 2.8, h: 2.4, fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.08 });
  slide.addText(u.title, { x, y: 2.8, w: 2.8, h: 0.5, fontSize: 12, bold: true, color: C.black, fontFace: "Microsoft YaHei", align: "center" });
  slide.addText(u.desc, { x, y: 3.4, w: 2.8, h: 0.8, fontSize: 10, color: C.mid, fontFace: "Microsoft YaHei", align: "center", lineSpacingMultiple: 1.4 });
});

slide.addShape(pptx.ShapeType.roundRect, { x: 2, y: 5.2, w: 9.33, h: 1.0, fill: { color: C.black }, line: { type: "none" }, rectRadius: 0.06 });
slide.addText("核心共性：千岛活跃用户 · 有表达欲 · 愿为爱好付费 · 社交分享意愿强", {
  x: 2, y: 5.2, w: 9.33, h: 1.0, fontSize: 11, color: C.white, fontFace: "Microsoft YaHei", align: "center", valign: "middle",
});
addFooter(slide, 8);

// =============== SLIDE 9: Ecosystem ===============
slide = pptx.addSlide();
slide.background = { color: C.bg };
slide.addText("生态价值", { x: 0.8, y: 0.5, w: 3, h: 0.35, fontSize: 9, color: C.light, fontFace: "Microsoft YaHei", bold: true });
slide.addText("千岛协同", { x: 0.8, y: 0.9, w: 11.5, h: 0.7, fontSize: 28, bold: true, color: C.black, fontFace: "Microsoft YaHei" });

const ecoLeft = "提升停留时长和活跃度\n创作工具→内容产出→互动闭环\n差异化竞争壁垒\n电商/印刷变现入口";
const ecoRight = "不离开千岛完成全流程\n社区内直接分享成果\n发现他人设计灵感\n未来可社区内交易/交换";

slide.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 2.0, w: 5.6, h: 2.8, fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.08 });
slide.addText("平台价值", { x: 1.2, y: 2.3, w: 4.8, h: 0.4, fontSize: 12, bold: true, color: C.black, fontFace: "Microsoft YaHei" });
slide.addText(ecoLeft, { x: 1.2, y: 2.8, w: 4.8, h: 1.8, fontSize: 10, color: C.mid, fontFace: "Microsoft YaHei", lineSpacingMultiple: 1.7, valign: "top" });

slide.addShape(pptx.ShapeType.roundRect, { x: 6.8, y: 2.0, w: 5.6, h: 2.8, fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.08 });
slide.addText("用户价值", { x: 7.2, y: 2.3, w: 4.8, h: 0.4, fontSize: 12, bold: true, color: C.black, fontFace: "Microsoft YaHei" });
slide.addText(ecoRight, { x: 7.2, y: 2.8, w: 4.8, h: 1.8, fontSize: 10, color: C.mid, fontFace: "Microsoft YaHei", lineSpacingMultiple: 1.7, valign: "top" });

const ecoSteps = ["社区看到美图", "打开小程序制作", "分享到动态", "引发更多使用"];
ecoSteps.forEach((s, i) => {
  const x = 1.5 + i * 2.8;
  slide.addShape(pptx.ShapeType.roundRect, { x, y: 5.5, w: 2.4, h: 0.7, fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.05 });
  slide.addText(s, { x, y: 5.5, w: 2.4, h: 0.7, fontSize: 9, color: C.black, fontFace: "Microsoft YaHei", align: "center", valign: "middle" });
  if (i < ecoSteps.length - 1) {
    slide.addText("→", { x: x + 2.4, y: 5.5, w: 0.4, h: 0.7, fontSize: 12, color: C.light, align: "center", valign: "middle" });
  }
});
addFooter(slide, 9);

// =============== SLIDE 10: Growth ===============
slide = pptx.addSlide();
slide.background = { color: C.bg };
slide.addText("增长策略", { x: 0.8, y: 0.5, w: 3, h: 0.35, fontSize: 9, color: C.light, fontFace: "Microsoft YaHei", bold: true });
slide.addText("推广路径", { x: 0.8, y: 0.9, w: 11.5, h: 0.7, fontSize: 28, bold: true, color: C.black, fontFace: "Microsoft YaHei" });

const phases = [
  { title: "Phase 1 · 冷启动", items: "千岛站内Banner推荐位\n邀请50位头部太太内测\n使用教程短视频\n「晒出第一个吧唧」活动" },
  { title: "Phase 2 · 增长", items: "作品水印→自然裂变\n千岛话题挑战赛\n小红书：教程笔记投放\nB站：联动UP主测评\n微博/LOFTER/抖音引流" },
  { title: "Phase 3 · 留存", items: "每周更新主题素材包\n创作者素材投稿计划\n等级体系+专属素材解锁\n社区内交换/赠送功能" },
  { title: "Phase 4 · 变现", items: "「一键购买」对接印厂\n高级素材包付费(¥9.9起)\nIP联名限定素材\n创作者素材商店(抽成)" },
];
phases.forEach((p, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = 0.8 + col * 6;
  const y = 1.9 + row * 2.7;
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w: 5.6, h: 2.4, fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.08 });
  slide.addText(p.title, { x: x + 0.4, y: y + 0.2, w: 4.8, h: 0.4, fontSize: 11, bold: true, color: C.black, fontFace: "Microsoft YaHei" });
  slide.addText(p.items, { x: x + 0.4, y: y + 0.65, w: 4.8, h: 1.7, fontSize: 9.5, color: C.mid, fontFace: "Microsoft YaHei", lineSpacingMultiple: 1.6, valign: "top" });
});
addFooter(slide, 10);

// =============== SLIDE 11: Metrics ===============
slide = pptx.addSlide();
slide.background = { color: C.bg };
slide.addText("里程碑", { x: 0.8, y: 0.5, w: 3, h: 0.35, fontSize: 9, color: C.light, fontFace: "Microsoft YaHei", bold: true });
slide.addText("阶段目标", { x: 0.8, y: 0.9, w: 11.5, h: 0.7, fontSize: 28, bold: true, color: C.black, fontFace: "Microsoft YaHei" });

const targets = [
  { period: "上线 1 个月", val: "5,000", label: "累计用户", sub: "日活 500+" },
  { period: "上线 3 个月", val: "30,000", label: "累计用户", sub: "日活 2,000+" },
  { period: "上线 6 个月", val: "100,000+", label: "累计用户", sub: "月活 3万+ · 付费率 3%" },
];
targets.forEach((t, i) => {
  const x = 0.8 + i * 4;
  slide.addShape(pptx.ShapeType.roundRect, { x, y: 2.2, w: 3.7, h: 3.0, fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.08 });
  slide.addText(t.period, { x, y: 2.5, w: 3.7, h: 0.4, fontSize: 9, color: C.light, fontFace: "Microsoft YaHei", align: "center" });
  slide.addText(t.val, { x, y: 3.0, w: 3.7, h: 1.0, fontSize: 32, bold: true, color: C.black, fontFace: "Microsoft YaHei", align: "center" });
  slide.addText(t.label, { x, y: 3.9, w: 3.7, h: 0.4, fontSize: 11, color: C.mid, fontFace: "Microsoft YaHei", align: "center" });
  slide.addText(t.sub, { x, y: 4.3, w: 3.7, h: 0.4, fontSize: 9, color: C.light, fontFace: "Microsoft YaHei", align: "center" });
});

slide.addShape(pptx.ShapeType.roundRect, { x: 2.5, y: 5.8, w: 8.33, h: 0.9, fill: { color: C.black }, line: { type: "none" }, rectRadius: 0.06 });
slide.addText("设计完成率 > 60%  ·  7日留存 > 35%  ·  分享率 > 20%", {
  x: 2.5, y: 5.8, w: 8.33, h: 0.9, fontSize: 11, color: C.white, fontFace: "Microsoft YaHei", align: "center", valign: "middle",
});
addFooter(slide, 11);

// =============== SLIDE 12: Competition ===============
slide = pptx.addSlide();
slide.background = { color: C.bg };
slide.addText("竞争分析", { x: 0.8, y: 0.5, w: 3, h: 0.35, fontSize: 9, color: C.light, fontFace: "Microsoft YaHei", bold: true });
slide.addText("竞品对比", { x: 0.8, y: 0.9, w: 11.5, h: 0.7, fontSize: 28, bold: true, color: C.black, fontFace: "Microsoft YaHei" });

const tableRows = [
  [{ text: "", options: { bold: true } }, { text: "本产品", options: { bold: true } }, { text: "Canva" }, { text: "美图秀秀" }, { text: "Photoshop" }],
  [{ text: "吧唧专用模板" }, { text: "✓" }, { text: "—" }, { text: "—" }, { text: "—" }],
  [{ text: "圆形实时预览" }, { text: "✓" }, { text: "—" }, { text: "—" }, { text: "手动" }],
  [{ text: "AI本地抠图" }, { text: "✓" }, { text: "云端" }, { text: "云端" }, { text: "—" }],
  [{ text: "隐私保护" }, { text: "✓ 纯本地" }, { text: "上传云端" }, { text: "上传云端" }, { text: "✓" }],
  [{ text: "学习成本" }, { text: "零" }, { text: "低" }, { text: "低" }, { text: "极高" }],
  [{ text: "千岛生态集成" }, { text: "✓" }, { text: "—" }, { text: "—" }, { text: "—" }],
  [{ text: "手机操作体验" }, { text: "优秀" }, { text: "一般" }, { text: "好" }, { text: "不可用" }],
];

slide.addTable(tableRows, {
  x: 0.8, y: 1.8, w: 11.7,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: C.mid,
  border: { type: "solid", pt: 0.5, color: C.border },
  colW: [2.5, 2.3, 2.3, 2.3, 2.3],
  rowH: [0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55],
  align: "center",
  valign: "middle",
});
addFooter(slide, 12);

// =============== SLIDE 13: End ===============
slide = pptx.addSlide();
slide.background = { color: C.white };
slide.addText("Thank You", { x: 1, y: 1.8, w: 11.33, h: 0.4, fontSize: 10, color: C.light, fontFace: "Microsoft YaHei", align: "center", letterSpacing: 3 });
slide.addText("吧唧无料生成器", { x: 1, y: 2.4, w: 11.33, h: 1.0, fontSize: 40, bold: true, color: C.black, fontFace: "Microsoft YaHei", align: "center" });
slide.addText("让创作没有门槛，让热爱触手可及", { x: 1, y: 3.5, w: 11.33, h: 0.6, fontSize: 14, color: C.mid, fontFace: "Microsoft YaHei", align: "center" });
slide.addText("产品已上线 MVP  ·  纯前端零运维  ·  千岛生态独家", { x: 1, y: 4.5, w: 11.33, h: 0.5, fontSize: 11, color: C.light, fontFace: "Microsoft YaHei", align: "center" });

slide.addShape(pptx.ShapeType.roundRect, { x: 3.5, y: 5.3, w: 6.33, h: 1.4, fill: { color: C.bg }, line: { color: C.border, width: 1 }, rectRadius: 0.08 });
slide.addText("期待与千岛团队深度合作", { x: 3.5, y: 5.5, w: 6.33, h: 0.6, fontSize: 13, bold: true, color: C.black, fontFace: "Microsoft YaHei", align: "center" });
slide.addText("共同打造二次元创作者最爱的工具生态", { x: 3.5, y: 6.0, w: 6.33, h: 0.5, fontSize: 10, color: C.mid, fontFace: "Microsoft YaHei", align: "center" });

// Write file
pptx.writeFile({ fileName: "product-intro.pptx" }).then(() => {
  console.log("✓ product-intro.pptx generated successfully");
});
