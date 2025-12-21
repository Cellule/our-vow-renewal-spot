import fs from "fs";
import path from "path";
import { render } from "../dist/server/entry-server.js";

async function preRender() {
  try {
    const distDir = path.join(import.meta.dirname, "../dist");

    // Read the template HTML
    const templatePath = path.join(distDir, "index.html");
    const template = fs.readFileSync(templatePath, "utf-8");

    // Render the root route
    console.log("🔄 Pre-rendering root route (/)...");
    const { html: rootHtml } = await render("/");
    const finalRootHtml = template.replace('<div id="root"></div>', `<div id="root">${rootHtml}</div>`);
    fs.writeFileSync(templatePath, finalRootHtml);
    console.log("✅ Root route pre-rendered");

    // Render the weekend route
    console.log("🔄 Pre-rendering weekend route (/weekend)...");
    const { html: weekendHtml } = await render("/weekend");

    // Create weekend directory if it doesn't exist
    const weekendDir = path.join(distDir, "weekend");
    if (!fs.existsSync(weekendDir)) {
      fs.mkdirSync(weekendDir, { recursive: true });
    }

    // Create weekend/index.html
    const finalWeekendHtml = template.replace('<div id="root"></div>', `<div id="root">${weekendHtml}</div>`);
    const weekendIndexPath = path.join(weekendDir, "index.html");
    fs.writeFileSync(weekendIndexPath, finalWeekendHtml);
    console.log("✅ Weekend route pre-rendered");

    console.log("✅ Pre-rendering completed successfully!");
    console.log("📄 index.html now contains server-rendered content");
    console.log("📄 weekend/index.html now contains server-rendered content");
  } catch (error) {
    console.error("❌ Pre-rendering failed:", error);
    process.exit(1);
  }
}

preRender();
