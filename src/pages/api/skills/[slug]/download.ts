import type { APIRoute } from "astro";
import JSZip from "jszip";
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;

  if (!slug) {
    return new Response("Skill slug is required", { status: 400 });
  }

  // Resolve skill directory
  const skillsBasePath = join(process.cwd(), "src", "content", "skills");
  const skillPath = join(skillsBasePath, slug);

  try {
    // Verify skill directory exists
    const skillStat = await stat(skillPath);
    if (!skillStat.isDirectory()) {
      return new Response("Skill not found", { status: 404 });
    }

    // Create ZIP file
    const zip = new JSZip();

    // Recursively add files to ZIP
    async function addDirectoryToZip(dirPath: string, zipPath: string = "") {
      const entries = await readdir(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(dirPath, entry.name);
        const relativePath = zipPath ? `${zipPath}/${entry.name}` : entry.name;

        // Skip hidden files and system files
        if (entry.name.startsWith(".") && entry.name !== ".gitkeep") {
          continue;
        }

        if (entry.isDirectory()) {
          await addDirectoryToZip(fullPath, relativePath);
        } else if (entry.isFile()) {
          // Skip .gitkeep files in the root
          if (entry.name === ".gitkeep" && zipPath === "") {
            continue;
          }
          const fileContent = await readFile(fullPath);
          zip.file(relativePath, fileContent);
        }
      }
    }

    await addDirectoryToZip(skillPath);

    // Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE",
      compressionOptions: {
        level: 9,
      },
    });

    // Return ZIP file
    return new Response(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${slug}.zip"`,
        "Content-Length": zipBuffer.length.toString(),
      },
    });
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return new Response("Skill not found", { status: 404 });
    }

    console.error("Error creating skill ZIP:", error);
    return new Response("Internal server error", { status: 500 });
  }
};
