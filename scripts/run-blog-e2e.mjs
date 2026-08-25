import { spawnSync } from "node:child_process";

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const environment = { ...process.env, BLOG_INCLUDE_FIXTURES: "1" };
const spawnOptions = { stdio: "inherit", env: environment, shell: process.platform === "win32" };

function run(args) {
  const result = spawnSync(npm, args, spawnOptions);
  if (result.error) {
    console.error(`Failed to start ${npm}: ${result.error.message}`);
    return 1;
  }
  return result.status ?? 1;
}

const buildStatus = run(["run", "build"]);
if (buildStatus !== 0) process.exit(buildStatus);

process.exit(run(["exec", "playwright", "test"]));
