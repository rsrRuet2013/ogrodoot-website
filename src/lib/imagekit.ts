const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

export async function uploadProfileImage(file: File) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) throw new Error("Profile picture must be a JPG, PNG, or WebP image.");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Profile picture must be 2 MB or smaller.");
  if (!process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_PUBLIC_KEY) throw new Error("ImageKit is not configured.");

  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
  const body = new URLSearchParams({
    file: base64,
    fileName: `profile-${crypto.randomUUID()}.${file.type.split("/")[1]}`,
    folder: "/rosb-members",
    useUniqueFileName: "true",
  });
  const auth = Buffer.from(`${process.env.IMAGEKIT_PRIVATE_KEY}:`).toString("base64");
  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) throw new Error("We could not upload the profile picture. Please try again.");
  const image = (await response.json()) as { url: string; fileId: string };
  return { url: image.url, fileId: image.fileId };
}

export async function deleteImageKitFile(fileId?: string) {
  if (!fileId || !process.env.IMAGEKIT_PRIVATE_KEY) return;
  const auth = Buffer.from(`${process.env.IMAGEKIT_PRIVATE_KEY}:`).toString("base64");
  const response = await fetch(`https://api.imagekit.io/v1/files/${encodeURIComponent(fileId)}`, { method: "DELETE", headers: { Authorization: `Basic ${auth}` } });
  if (!response.ok && response.status !== 404) throw new Error("ImageKit image deletion failed.");
}
