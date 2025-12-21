import fs from "fs";
import path from "path";

try {
  const htmlPath = path.join(import.meta.dirname, "../dist/index.html");
  let html = fs.readFileSync(htmlPath, "utf-8");

  // Find the actual built hero image filename from the assets folder
  const assetsPath = path.join(import.meta.dirname, "../dist/assets");
  const files = fs.readdirSync(assetsPath);
  const heroImageFile = files.find((file) => file.startsWith("hero-image-") && file.endsWith(".jpg"));

  if (heroImageFile) {
    console.log(`🖼️  Found built hero image: ${heroImageFile}`);

    // Replace the placeholder URL with the actual built filename
    // Handle both relative and absolute URLs
    const oldUrlRelative = "/assets/hero-image.jpg";
    const oldUrlAbsolute = "https://wedding.dd-mike.ca/assets/hero-image.jpg";
    const newUrlRelative = `/assets/${heroImageFile}`;
    const newUrlAbsolute = `https://wedding.dd-mike.ca/assets/${heroImageFile}`;

    // Replace relative URLs
    html = html.replace(new RegExp(oldUrlRelative.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), newUrlRelative);

    // Replace absolute URLs
    html = html.replace(new RegExp(oldUrlAbsolute.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), newUrlAbsolute);

    console.log(`✅ Updated hero image URL: ${oldUrlRelative} → ${newUrlRelative}`);
    console.log(`✅ Updated hero image URL: ${oldUrlAbsolute} → ${newUrlAbsolute}`);
  } else {
    console.log("⚠️  No built hero image found in assets folder");
  }

  // Write the updated HTML back
  fs.writeFileSync(htmlPath, html);
  console.log("💾 HTML file updated successfully!");
} catch (error) {
  console.error("❌ Failed to update meta tags:", error.message);
}
