import { mkdir, writeFile } from "node:fs/promises";
import swaggerSpec from "../src/docs/swagger.js";

const outputDir = new URL("../public/swagger/", import.meta.url);
const specPath = new URL("openapi.json", outputDir);

await mkdir(outputDir, { recursive: true });
await writeFile(specPath, `${JSON.stringify(swaggerSpec, null, 2)}\n`);

// console.log("Swagger docs written to public/swagger/openapi.json");
