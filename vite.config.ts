import fs from "node:fs";
import { ServerResponse } from "node:http";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

function utf8CharsetPlugin(): Plugin {
  const addUtf8Charset = (setHeader: typeof ServerResponse.prototype.setHeader) =>
    function patchedSetHeader(this: ServerResponse, name: string, value: number | string | readonly string[]) {
      if (name.toLowerCase() === "content-type" && typeof value === "string") {
        const isText = value.startsWith("text/") || value.includes("javascript") || value.includes("json");
        if (isText && !value.toLowerCase().includes("charset=")) {
          return setHeader.call(this, name, `${value}; charset=utf-8`);
        }
      }

      return setHeader.call(this, name, value);
    };

  return {
    name: "limareh-utf8-charset",
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        res.setHeader = addUtf8Charset(res.setHeader);
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((_req, res, next) => {
        res.setHeader = addUtf8Charset(res.setHeader);
        next();
      });
    },
  };
}


const HERO_IMAGE = "capa-home-sprays";

/**
 * Injeta no <head>: preload responsivo da imagem do hero e as tags que
 * precisam de URL absoluta (og:image, og:url, canonical).
 * O domínio vem de SITE_URL ou, no Netlify, da variável URL da build.
 */
function headTagsPlugin(): Plugin {
  return {
    name: "limareh-head-tags",
    transformIndexHtml() {
      const tags: { tag: string; attrs: Record<string, string>; injectTo: "head" }[] = [];

      try {
        const meta = JSON.parse(fs.readFileSync("src/generated/images.json", "utf8"));
        const widths: number[] = meta[`${HERO_IMAGE}.jpeg`]?.widths ?? [];
        if (widths.length) {
          tags.push({
            tag: "link",
            injectTo: "head",
            attrs: {
              rel: "preload",
              as: "image",
              type: "image/avif",
              fetchpriority: "high",
              imagesizes: "100vw",
              imagesrcset: widths.map((w) => `/imgs/opt/${HERO_IMAGE}-${w}.avif ${w}w`).join(", "),
            },
          });
        }
      } catch {
        /* images.json ainda não gerado */
      }

      const site = (process.env.SITE_URL || process.env.URL || "").replace(/\/$/, "");
      const ogImage = `${site}/imgs/opt/og-image.jpg`;
      tags.push(
        { tag: "meta", injectTo: "head", attrs: { property: "og:image", content: ogImage } },
        { tag: "meta", injectTo: "head", attrs: { property: "og:image:width", content: "1200" } },
        { tag: "meta", injectTo: "head", attrs: { property: "og:image:height", content: "630" } },
        { tag: "meta", injectTo: "head", attrs: { name: "twitter:image", content: ogImage } },
      );
      if (site) {
        tags.push(
          { tag: "meta", injectTo: "head", attrs: { property: "og:url", content: `${site}/` } },
          { tag: "link", injectTo: "head", attrs: { rel: "canonical", href: `${site}/` } },
        );
      }
      return tags;
    },
  };
}

export default defineConfig({
  plugins: [utf8CharsetPlugin(), headTagsPlugin(), react()],
});