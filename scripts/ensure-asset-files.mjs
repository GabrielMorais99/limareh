/**
 * Garante a pasta public/imgs (imagens reais vêm só de imgs/ via ensure-images).
 * Não cria mais miniaturas 1×1 — se não houver arquivo, o site omite a imagem.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const destDir = path.join(root, "public", "imgs");

fs.mkdirSync(destDir, { recursive: true });
