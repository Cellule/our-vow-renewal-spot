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

    // Generate photos redirect (static HTML for instant redirect + QR proxy)
    console.log("🔄 Generating photos redirect (/photos)...");
    const destination = process.env.VITE_PHOTOS_URL || "https://guests.camera/e/mariage-andreanne-michael";
    if (process.env.VITE_PHOTOS_URL) console.log("ℹ️  Using VITE_PHOTOS_URL from environment");
    const photosDir = path.join(distDir, "photos");
    if (!fs.existsSync(photosDir)) {
      fs.mkdirSync(photosDir, { recursive: true });
    }
    const photosHtml = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Photos - Andréanne & Michaël</title>
    <meta http-equiv="refresh" content="0; url=${destination}" />
    <link rel="canonical" href="${destination}" />
    <meta name="robots" content="noindex, nofollow" />
    <script>window.location.replace("${destination}");</script>
  </head>
  <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0;">
    <div style="text-align: center; padding: 2rem;">
      <p>Redirection en cours vers la galerie photo...</p>
      <p style="margin-top: 0.5rem; color: #666; font-size: 0.9rem;">Redirecting to photo gallery...</p>
      <p style="margin-top: 1rem;"><a href="${destination}">Cliquez ici si vous n'êtes pas redirigé / Click here if you are not redirected</a></p>
    </div>
  </body>
</html>`;
    fs.writeFileSync(path.join(photosDir, "index.html"), photosHtml);
    console.log("✅ Photos redirect generated" + (process.env.VITE_PHOTOS_URL ? " (env var)" : ""));

    console.log("🔄 Generating intro redirect (/intro)...");
    const introDestination = process.env.VITE_INTRO_URL || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    if (process.env.VITE_INTRO_URL) console.log("ℹ️  Using VITE_INTRO_URL from environment");
    const introDir = path.join(distDir, "intro");
    if (!fs.existsSync(introDir)) fs.mkdirSync(introDir, { recursive: true });
    const introHtml = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Redirection</title>
    <meta http-equiv="refresh" content="0; url=${introDestination}" />
    <link rel="canonical" href="${introDestination}" />
    <meta name="robots" content="noindex, nofollow" />
    <script>window.location.replace("${introDestination}");</script>
  </head>
  <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0;">
    <div style="text-align: center; padding: 2rem;">
      <p>Redirection en cours...</p>
      <p style="margin-top: 1rem;"><a href="${introDestination}">Cliquez ici si vous n'êtes pas redirigé</a></p>
    </div>
  </body>
</html>`;
    fs.writeFileSync(path.join(introDir, "index.html"), introHtml);
    console.log("✅ Intro redirect generated" + (process.env.VITE_INTRO_URL ? " (env var)" : ""));

    console.log("✅ Pre-rendering completed successfully!");
    console.log("📄 index.html now contains server-rendered content");
    console.log("📄 weekend/index.html now contains server-rendered content");
    console.log("📄 photos/index.html is a redirect" + (process.env.VITE_PHOTOS_URL ? " (target hidden)" : ` to ${destination}`));
    console.log("📄 intro/index.html is a redirect" + (process.env.VITE_INTRO_URL ? " (target hidden)" : ` to ${introDestination}`));
  } catch (error) {
    console.error("❌ Pre-rendering failed:", error);
    process.exit(1);
  }
}

preRender();
