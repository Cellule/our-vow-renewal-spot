import fs from "fs";
import path from "path";

try {
  const htmlPath = path.join(import.meta.dirname, "../dist/index.html");
  let html = fs.readFileSync(htmlPath, "utf-8");

  // Find the actual built hero image filename from the assets folder
  const assetsPath = path.join(import.meta.dirname, "../dist/assets");
  const files = fs.readdirSync(assetsPath);
  const heroImageFile = files.find(
    (file) => file.startsWith("hero-image-") && file.endsWith(".jpg")
  );

  if (heroImageFile) {
    console.log(`🖼️  Found built hero image: ${heroImageFile}`);

    // Replace the placeholder URL with the actual built filename
    const oldUrl = "/assets/hero-image.jpg";
    const newUrl = `/assets/${heroImageFile}`;

    html = html.replace(
      new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
      newUrl
    );

    console.log(`✅ Updated hero image URL: ${oldUrl} → ${newUrl}`);
  } else {
    console.log("⚠️  No built hero image found in assets folder");
  }

  // Write the updated HTML back
  fs.writeFileSync(htmlPath, html);
  console.log("💾 HTML file updated successfully!");
} catch (error) {
  console.error("❌ Failed to update meta tags:", error.message);
}
