import fs from "node:fs/promises";
import path from "node:path";

const PROJECT_ROOT = process.cwd();

/**
 * URL slugs (used by routes) -> folder names (under public/images/)
 */
const GALLERY_FOLDERS = {
  balloons: "Balloons",
  characters: "Characters",
  entertainers: "Entertainers",
  "face-painting": "FacePainting",
  shows: "Shows",
  "special-characters": "Special",
};

// Supported public gallery media formats.
// Images + videos are included in the manifest; the runtime gallery decides how to render them.
const SUPPORTED_MEDIA_EXTS = new Set([
  // images
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  // videos
  ".mp4",
  ".webm",
  ".mov",
]);

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

const isSupportedMedia = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  return SUPPORTED_MEDIA_EXTS.has(ext);
};

const normalizeSlashes = (p) => p.split(path.sep).join("/");

const getFilename = (p) => p.split("/").pop() ?? p;

/**
 * "Smart shuffle" key: try to avoid consecutive images with very similar names.
 * - Group by a normalized prefix token (e.g. Elsa_and_Anna_1, Elsa_and_Anna_2)
 * - Special-case common camera/chat exports like "Photo", "WhatsApp", "Screenshot"
 */
const getGroupKey = (relativeUrlPath) => {
  const filename = getFilename(relativeUrlPath);
  const base = filename.replace(/\.[^.]+$/, "");

  const tokens = base
    .toLowerCase()
    .replace(/\s+/g, " ")
    .split(/[_\-\s]+/)
    .filter(Boolean);

  if (tokens.length === 0) return "misc";

  const first = tokens[0];
  const generic = new Set(["photo", "whatsapp", "image", "screenshot", "img", "dsc"]);
  if (generic.has(first) && tokens.length > 1) return tokens[1];

  return first;
};

const interleaveByGroup = (items) => {
  const groups = new Map();
  for (const item of items) {
    const key = getGroupKey(item);
    const list = groups.get(key) ?? [];
    list.push(item);
    groups.set(key, list);
  }

  const groupKeys = Array.from(groups.keys()).sort((a, b) => collator.compare(a, b));

  const out = [];
  let remaining = items.length;
  while (remaining > 0) {
    for (const key of groupKeys) {
      const group = groups.get(key);
      if (group && group.length > 0) {
        out.push(group.shift());
        remaining--;
      }
    }
  }
  return out;
};

const walkFiles = async (dirAbs) => {
  const entries = await fs.readdir(dirAbs, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue; // ignore .DS_Store, etc.
    const abs = path.join(dirAbs, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walkFiles(abs)));
    } else if (entry.isFile()) {
      results.push(abs);
    }
  }

  return results;
};

const buildCategoryList = async ({ slug, folderName }) => {
  const folderAbs = path.join(PROJECT_ROOT, "public", "images", folderName);

  let filesAbs = [];
  try {
    filesAbs = await walkFiles(folderAbs);
  } catch (e) {
    // Folder missing: treat as empty category.
    return { slug, items: [] };
  }

  const urls = [];
  for (const abs of filesAbs) {
    const filename = path.basename(abs);
    if (!isSupportedMedia(filename)) continue;

    // Stored as public-relative URL paths (no leading slash) so Vite base can be applied.
    const relToPublic = normalizeSlashes(path.relative(path.join(PROJECT_ROOT, "public"), abs));
    urls.push(relToPublic);
  }

  // de-dupe + stable sort
  const deduped = Array.from(new Set(urls));
  deduped.sort((a, b) => collator.compare(getFilename(a), getFilename(b)));

  // deterministic interleave to avoid adjacent similar names
  const interleaved = interleaveByGroup(deduped);

  return { slug, items: interleaved };
};

const main = async () => {
  const categories = {};

  for (const [slug, folderName] of Object.entries(GALLERY_FOLDERS)) {
    const { items } = await buildCategoryList({ slug, folderName });
    categories[slug] = items;
  }

  const manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    categories,
  };

  const outAbs = path.join(PROJECT_ROOT, "public", "gallery-manifest.json");
  await fs.writeFile(outAbs, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  // eslint-disable-next-line no-console
  console.log(`Wrote gallery manifest: ${path.relative(PROJECT_ROOT, outAbs)}`);
};

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});


