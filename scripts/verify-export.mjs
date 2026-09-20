import fs from 'node:fs';
import assert from 'node:assert/strict';
const live = process.argv.includes('--production');
for (const page of ['index', 'privacy', 'terms', 'accessibility']) {
  const html = fs.readFileSync(`out/${page}.html`, 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${page}: one primary heading`);
  assert.ok(html.includes(`content="${live ? 'index, follow' : 'noindex, nofollow'}"`), `${page}: crawl policy`);
  assert.ok(html.includes('rel="canonical" href="https://www.virtualcandy.com'), `${page}: canonical`);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) JSON.parse(json);
}
const home = fs.readFileSync('out/index.html', 'utf8');
assert.ok(home.includes('<fieldset class="inquiry-fields" disabled="">'), 'Inquiry disabled until JavaScript initializes');
assert.ok(home.includes('<noscript>'), 'No-JavaScript contact guidance');
assert.equal((home.match(/class="client-card client-/g) || []).length, 7, 'Seven client examples');
const robots = fs.readFileSync('out/robots.txt','utf8');
assert.ok(robots.includes(live ? 'Allow: /' : 'Disallow: /'));
const image = fs.readFileSync('out/opengraph-image');
assert.equal(image.subarray(1,4).toString(), 'PNG', 'Social image is PNG');
assert.ok(fs.readFileSync('out/_headers','utf8').includes('Content-Type: image/png'));
console.log(`Verified ${live ? 'production' : 'preview'} export: metadata, headings, structured data, inquiry fallback, client links, social image and headers.`);

const skeleton = fs.readFileSync('out/__forms.html', 'utf8');
for (const field of ['form-name', 'name', 'email', 'business', 'message', 'brief', 'bot-field']) {
  assert.ok(skeleton.includes(`name="${field}"`), `Netlify registration includes ${field}`);
  assert.ok(home.includes(`name="${field}"`), `Visible form includes ${field}`);
}
assert.ok(skeleton.includes('name="studio-inquiry"'));
assert.ok(skeleton.includes('netlify-honeypot="bot-field"'));
console.log('Netlify form registration and submission fields match.');
