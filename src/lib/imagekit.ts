const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB limit

export async function uploadProfileImage(file: File) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Profile picture must be a JPG, PNG, or WebP image.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    throw new Error(`Profile picture is ${sizeInMb} MB, which exceeds the 10 MB limit.`);
  }
  if (!process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_PUBLIC_KEY) {
    throw new Error("ImageKit credentials are not configured on the server.");
  }

  const ext = file.type.split("/")[1] || "jpg";
  const form = new FormData();
  form.append("file", file);
  form.append("fileName", `profile-${crypto.randomUUID()}.${ext}`);
  form.append("folder", "/rosb-members");
  form.append("useUniqueFileName", "true");

  const auth = Buffer.from(`${process.env.IMAGEKIT_PRIVATE_KEY}:`).toString("base64");
  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}` },
    body: form,
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("ImageKit profile picture upload error:", errText);
    let parsedMsg = "";
    try {
      const json = JSON.parse(errText);
      parsedMsg = json.message || json.help || "";
    } catch {}
    throw new Error(parsedMsg ? `ImageKit error: ${parsedMsg}` : `Failed to upload image to ImageKit (HTTP ${response.status}).`);
  }

  const image = (await response.json()) as { url: string; fileId: string };
  return { url: image.url, fileId: image.fileId };
}

export async function uploadMediaImage(file: File, folder: string = "/ogrodoot-media") {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) throw new Error("File must be a JPG, PNG, or WebP image.");
  const MAX_MEDIA_BYTES = 10 * 1024 * 1024;
  if (file.size > MAX_MEDIA_BYTES) throw new Error("Image must be 10 MB or smaller.");
  if (!process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_PUBLIC_KEY) throw new Error("ImageKit is not configured.");

  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
  const ext = file.name.split(".").pop() || "jpg";
  const body = new URLSearchParams({
    file: base64,
    fileName: `media-${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`,
    folder,
    useUniqueFileName: "true",
  });
  const auth = Buffer.from(`${process.env.IMAGEKIT_PRIVATE_KEY}:`).toString("base64");
  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) {
    const errText = await response.text();
    console.error("ImageKit media upload error:", errText);
    let parsedMsg = "";
    try {
      const json = JSON.parse(errText);
      parsedMsg = json.message || json.help || "";
    } catch {}
    throw new Error(parsedMsg ? `ImageKit error: ${parsedMsg}` : `Failed to upload image to ImageKit (HTTP ${response.status}).`);
  }
  const image = (await response.json()) as { url: string; fileId: string };
  return { url: image.url, fileId: image.fileId };
}

export async function deleteImageKitFile(fileId?: string) {
  if (!fileId || !process.env.IMAGEKIT_PRIVATE_KEY) return;
  const auth = Buffer.from(`${process.env.IMAGEKIT_PRIVATE_KEY}:`).toString("base64");
  const response = await fetch(`https://api.imagekit.io/v1/files/${encodeURIComponent(fileId)}`, { method: "DELETE", headers: { Authorization: `Basic ${auth}` } });
  if (!response.ok && response.status !== 404) throw new Error("ImageKit image deletion failed.");
}

