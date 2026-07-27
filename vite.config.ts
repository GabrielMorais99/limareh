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

export default defineConfig({
  plugins: [utf8CharsetPlugin(), react()],
});