/*
 * process-mo-photos.cjs — 处理桌面「嬷」文件夹图片：
 * 1. 复制到 assets/images/hero-mo/
 * 2. 去除右下角小红书水印（sharp 像素覆盖法）
 * 3. 统一缩放到合适宽度
 *
 * 水印处理策略：小红书水印在右下角，约 12% 宽 × 6% 高 区域。
 * 用该区域左侧相邻列的像素向右平铺覆盖（水平拉伸），视觉上融入背景。
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = "C:/Users/leecl/Desktop/C罗 嬷";
const DST = path.resolve(__dirname, "..", "assets", "images", "hero-mo");
fs.mkdirSync(DST, { recursive: true });

const files = fs.readdirSync(SRC).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
console.log("源文件:", files.length, "张");

(async () => {
  let ok = 0, skip = 0;
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const src = path.join(SRC, f);
    // 输出名: mo-01.jpg ...
    const out = path.join(DST, `mo-${String(i + 1).padStart(2, "0")}.jpg`);
    try {
      const img = sharp(src);
      const meta = await img.metadata();
      const W = meta.width, H = meta.height;
      // 右下角水印区域（小红书水印通常在右下，约占右下 14%宽 × 7%高）
      const wmW = Math.round(W * 0.14);
      const wmH = Math.round(H * 0.07);
      const wmX = W - wmW - Math.round(W * 0.01);  // 留一点右边距
      const wmY = H - wmH - Math.round(H * 0.01);

      // 取水印区域左侧相邻的窄条（宽 wmW 的一小部分），水平拉伸覆盖水印
      // 取 watermark 左边 8px 宽、整高的区域，拉伸到 wmW 宽
      const stripX = wmX - 10;
      const stripW = 8;
      const strip = sharp(src).extract({ left: Math.max(0, stripX), top: wmY, width: stripW, height: wmH });

      // 用原图作底，把拉伸后的条覆盖到水印区，再整体缩放到 800px 宽
      const buf = await src; // placeholder
      // sharp composite 需要 overlay buffer
      const overlay = await sharp(await sharp(src)
        .extract({ left: Math.max(0, stripX), top: wmY, width: stripW, height: wmH })
        .resize(wmW, wmH, { fit: "fill" })
        .jpeg().toBuffer());

      await sharp(src)
        .composite([{ input: await overlay.toBuffer(), left: wmX, top: wmY }])
        .resize({ width: 800, withoutEnlargement: true })
        .jpeg({ quality: 82 })
        .toFile(out);
      ok++;
      if (i < 3 || i === files.length - 1) console.log(`✓ mo-${String(i+1).padStart(2,"0")}.jpg  ${W}×${H}`);
    } catch (e) {
      console.log(`✗ ${f}: ${e.message.slice(0, 70)}`);
      skip++;
    }
  }
  console.log(`\n完成: ${ok} 成功, ${skip} 失败`);
  console.log("输出目录:", DST);
  const out = fs.readdirSync(DST).filter(f => f.endsWith(".jpg"));
  console.log("生成图片:", out.length, "张");
})();
