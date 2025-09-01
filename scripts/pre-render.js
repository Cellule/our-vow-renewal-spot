import fs from "fs";
import path from "path";
import { render } from "../dist/server/entry-server.js";

async function preRender() {
  try {
    // Read the template HTML
    const templatePath = path.join(import.meta.dirname, "../dist/index.html");
    const template = fs.readFileSync(templatePath, "utf-8");

    // Render the React app to HTML
    const { html } = await render("/");

    // Insert the rendered HTML into the template
    const finalHtml = template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    );

    // Write the pre-rendered HTML back to the file
    fs.writeFileSync(templatePath, finalHtml);

    console.log("✅ Pre-rendering completed successfully!");
    console.log("📄 index.html now contains server-rendered content");
  } catch (error) {
    console.error("❌ Pre-rendering failed:", error);
    process.exit(1);
  }
}

preRender();
