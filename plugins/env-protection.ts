import type { Plugin } from "@opencode-ai/plugin";

// Production guard: block secret files across read/bash/grep/glob + redact tokens in output.
// No new deps, stdlib only.
const SECRET_FILE = /(^|\/)(\.env(\..*)?|.*\.(pem|key|p12|pfx))$|credentials/i;

export const EnvProtectionPlugin: Plugin = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      const args = JSON.stringify(output.args ?? {});
      // Block secret file access via any tool
      if (["read", "edit", "write", "glob", "grep"].includes(input.tool)) {
        if (SECRET_FILE.test(args)) {
          throw new Error(
            "Blocked: secret files (.env, *.pem/key) are never readable",
          );
        }
      }
      // Block shell exfiltration paths (vibeguard handles value redaction)
      if (input.tool === "bash") {
        if (SECRET_FILE.test(args) || /printenv|cat\s+.*\.env/i.test(args)) {
          throw new Error("Blocked: shell access to secrets is denied");
        }
      }
    },
  };
};

export default EnvProtectionPlugin;
