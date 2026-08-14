import { spawnSync } from "node:child_process";

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const environment = { ...process.env, BLOG_INCLUDE_FIXTURES: "1" };

const build = spawnSync(npm, ["run", "build"], { stdio: "inherit", env: environment });
if (build.status !== 0) process.exit(build.status ?? 1);

const tests = spawnSync(npm, ["exec", "playwright", "test"], { stdio: "inherit", env: environment });
process.exit(tests.status ?? 1);
