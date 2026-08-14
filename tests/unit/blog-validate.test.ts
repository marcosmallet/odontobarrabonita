import assert from "node:assert/strict";
import test from "node:test";
import { validateBlog } from "../../scripts/validate-blog";

test("valida o catálogo vazio sem publicar fixture ou template", async () => {
  const result = await validateBlog();
  assert.deepEqual(result.errors, []);
});
