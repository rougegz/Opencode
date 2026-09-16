import type { Plugin } from "@opencode-ai/plugin";

export const NotificationPlugin: Plugin = async () => {
  return {
    // Disabled: session.idle fires far too often (alert fatigue + wasted shell spawn).
    // Re-enable with a real filter (e.g. TUI toast) only if you miss notifications.
  };
};

export default NotificationPlugin;
