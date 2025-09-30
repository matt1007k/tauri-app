import { platform } from "@tauri-apps/plugin-os";

const currentPlatform = platform();

export const isDesktop = ["linux", "macos", "windows"].includes(
  currentPlatform
);
