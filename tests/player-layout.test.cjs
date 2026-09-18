"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const css = fs.readFileSync(path.join(__dirname, "..", "style.css"), "utf8");

test("quadro e VSL têm a mesma proporção feed 3:4, sem letterboxing da página", () => {
  const frameRule = css.match(/\.video-player \{([^}]+)\}/)[1];
  const iframeRule = css.match(/\.video-player \.embed-stage iframe \{([^}]+)\}/)[1];
  assert.match(frameRule, /width: min\(100%, var\(--player-width\)\)/);
  assert.match(frameRule, /aspect-ratio: 3 \/ 4/);
  assert.match(iframeRule, /width: 100%; height: 100%/);
  assert.match(css, /--player-width: 322px/);
  assert.doesNotMatch(css, /height: 75%|aspect-ratio: 9 \/ 16|transform:\s*scale|object-fit:\s*cover;[^}]*iframe/);
});
