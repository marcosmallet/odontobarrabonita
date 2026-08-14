import { validateBlog } from "./validate-blog";

async function main() {
  const result = await validateBlog();
  for (const warning of result.warnings) console.warn(`WARN ${warning}`);
  for (const error of result.errors) console.error(`ERROR ${error}`);
  if (result.errors.length) process.exitCode = 1;
  else console.log(`Blog validation passed (${result.warnings.length} warning(s)).`);
}

void main();
