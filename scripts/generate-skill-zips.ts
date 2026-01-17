import JSZip from "jszip";
import { readdir, readFile, stat, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function generateSkillZips() {
  const skillsBasePath = join(process.cwd(), "src", "content", "skills");
  const outputPath = join(process.cwd(), "public", "skills");

  // Create output directory if it doesn't exist
  try {
    await mkdir(outputPath, { recursive: true });
  } catch (error: any) {
    if (error.code !== "EEXIST") {
      throw error;
    }
  }

  try {
    // Get all skill directories
    const entries = await readdir(skillsBasePath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const skillPath = join(skillsBasePath, entry.name);
      const skillStat = await stat(skillPath);

      if (!skillStat.isDirectory()) continue;

      // Check if SKILL.md exists
      try {
        await stat(join(skillPath, "SKILL.md"));
      } catch {
        // Skip if no SKILL.md
        continue;
      }

      // Create ZIP file
      const zip = new JSZip();

      // Recursively add files to ZIP
      async function addDirectoryToZip(dirPath: string, zipPath: string = "") {
        const dirEntries = await readdir(dirPath, { withFileTypes: true });

        for (const dirEntry of dirEntries) {
          const fullPath = join(dirPath, dirEntry.name);
          const relativePath = zipPath ? `${zipPath}/${dirEntry.name}` : dirEntry.name;

          // Skip hidden files and system files
          if (dirEntry.name.startsWith(".") && dirEntry.name !== ".gitkeep") {
            continue;
          }

          if (dirEntry.isDirectory()) {
            await addDirectoryToZip(fullPath, relativePath);
          } else if (dirEntry.isFile()) {
            // Skip .gitkeep files in the root
            if (dirEntry.name === ".gitkeep" && zipPath === "") {
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

      // Write ZIP file to public directory
      const zipOutputPath = join(outputPath, `${entry.name}.zip`);
      await writeFile(zipOutputPath, zipBuffer);

      console.log(`Generated ZIP for skill: ${entry.name}`);
    }

    console.log("Skill ZIP generation complete");
  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.log("No skills directory found, skipping ZIP generation");
      return;
    }
    throw error;
  }
}

generateSkillZips().catch((error) => {
  console.error("Error generating skill ZIPs:", error);
  process.exit(1);
});
