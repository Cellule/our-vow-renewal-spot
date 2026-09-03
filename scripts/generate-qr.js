import fs from "fs";
import path from "path";
import QRCode from "qrcode";

const PHOTOS_URL = "https://wedding.dd-mike.ca/photos";
const outDir = path.join(import.meta.dirname, "../public");
const svgPath = path.join(outDir, "qr-photos.svg");
const pngPath = path.join(outDir, "qr-photos.png");

async function generate() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const svg = await QRCode.toString(PHOTOS_URL, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    color: { dark: "#8B2635", light: "#FFF8F0" },
  });
  fs.writeFileSync(svgPath, svg);
  console.log(`✅ QR SVG generated: ${svgPath}`);
  await QRCode.toFile(pngPath, PHOTOS_URL, {
    width: 400,
    errorCorrectionLevel: "M",
    margin: 1,
    color: { dark: "#8B2635", light: "#FFF8F0" },
  });
  console.log(`✅ QR PNG generated: ${pngPath}`);
}

generate().catch((e) => {
  console.error("❌ QR generation failed:", e);
  process.exit(1);
});
