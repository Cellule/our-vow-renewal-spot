import fs from "fs";
import path from "path";

function updateMetaTags(htmlPath, isWeekend = false) {
  try {
    let html = fs.readFileSync(htmlPath, "utf-8");

    // Find the actual built hero image filename from the assets folder
    const distDir = path.dirname(htmlPath);
    const assetsPath = path.join(distDir, "assets");
    const files = fs.existsSync(assetsPath) ? fs.readdirSync(assetsPath) : [];
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

    // Update canonical URL and Open Graph URLs for weekend version
    if (isWeekend) {
      const baseUrl = "https://wedding.dd-mike.ca/weekend";
      html = html.replace(/<link rel="canonical" href="[^"]*" \/>/g, `<link rel="canonical" href="${baseUrl}" />`);
      html = html.replace(/<meta property="og:url" content="[^"]*" \/>/g, `<meta property="og:url" content="${baseUrl}" />`);
      html = html.replace(/<meta property="twitter:url" content="[^"]*" \/>/g, `<meta property="twitter:url" content="${baseUrl}" />`);
      console.log(`✅ Updated URLs for weekend version: ${baseUrl}`);
    }

    // Write the updated HTML back
    fs.writeFileSync(htmlPath, html);
    console.log(`💾 ${isWeekend ? "Weekend" : "Root"} HTML file updated successfully!`);
  } catch (error) {
    console.error(`❌ Failed to update meta tags for ${isWeekend ? "weekend" : "root"}:`, error.message);
  }
}

try {
  const distDir = path.join(import.meta.dirname, "../dist");

  // Update root index.html
  const rootHtmlPath = path.join(distDir, "index.html");
  if (fs.existsSync(rootHtmlPath)) {
    console.log("📝 Updating root index.html meta tags...");
    updateMetaTags(rootHtmlPath, false);
  }

  // Update weekend/index.html
  const weekendHtmlPath = path.join(distDir, "weekend", "index.html");
  if (fs.existsSync(weekendHtmlPath)) {
    console.log("📝 Updating weekend/index.html meta tags...");
    updateMetaTags(weekendHtmlPath, true);
  }
} catch (error) {
  console.error("❌ Failed to update meta tags:", error.message);
}
