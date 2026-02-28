import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = 'AIzaSyBaJr7Zfpx49sbjEqC1HPucCetAY9Mk7Jk';
const MODEL = 'imagen-4.0-fast-generate-001';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}`;
const OUT_DIR = path.resolve('public/images');

const images = [
  {
    filename: 'posts/what-is-marketing-automation.webp',
    prompt: 'Clean modern flat illustration of marketing automation concept, showing interconnected workflow nodes with email icons, analytics charts, and gear symbols on a light background, professional orange and blue accent colors, minimalist tech blog hero image style, no text',
  },
  {
    filename: 'posts/best-email-marketing-automation-tools.webp',
    prompt: 'Modern flat design illustration comparing email marketing platforms, showing multiple laptop screens with email dashboards side by side, inbox icons, bar charts and engagement metrics, professional blue and orange palette, clean tech blog style, no text',
  },
  {
    filename: 'posts/marketing-automation-for-small-business.webp',
    prompt: 'Warm modern illustration of a small business owner at a desk with laptop showing marketing dashboard, automated task icons floating around, small plant and coffee cup, professional and approachable style, orange and blue accents, no text',
  },
  {
    filename: 'posts/social-media-automation-guide.webp',
    prompt: 'Clean flat illustration of social media automation, showing a content calendar interface with scheduled posts across multiple platform icons, clock and scheduling symbols, modern blue and orange color scheme, tech blog style, no text',
  },
  {
    filename: 'posts/marketing-automation-workflows.webp',
    prompt: 'Modern flat design illustration of a marketing automation workflow diagram, showing connected nodes with triggers conditions and actions, flowchart arrows, funnel visualization, professional orange and blue palette, clean minimal style, no text',
  },
  {
    filename: 'posts/lead-scoring-automation.webp',
    prompt: 'Clean modern illustration of automated lead scoring concept, showing a funnel with scored leads at different priority levels, star ratings, analytics dashboard with conversion metrics, professional blue and orange accents, flat design style, no text',
  },
  {
    filename: 'posts/crm-marketing-automation-integration.webp',
    prompt: 'Modern flat illustration showing two software platforms being connected with data flow arrows, CRM database on one side and marketing automation tools on the other, bidirectional sync icons, professional blue and orange palette, no text',
  },
  {
    filename: 'posts/accounts-payable-automation.webp',
    prompt: 'Clean modern illustration of accounts payable automation, showing digital invoices being processed through an automated pipeline with approval checkmarks, calculator and financial document icons, professional blue and orange accents, flat design, no text',
  },
  {
    filename: 'posts/automated-expense-tracking.webp',
    prompt: 'Modern flat illustration of automated expense tracking on mobile and desktop, showing receipt scanning, categorized transactions with color-coded tags, pie chart of spending categories, professional blue and orange palette, clean style, no text',
  },
  {
    filename: 'og-default.png',
    prompt: 'Professional wide banner image for an automation education website, showing abstract connected automation workflow nodes and gears in a clean modern style, gradient background from light orange to white, minimal and polished, no text, 16:9 ratio',
  },
];

function apiRequest(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      instances: [{ prompt }],
      parameters: { sampleCount: 1, aspectRatio: '16:9' },
    });

    const url = new URL(API_URL);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        try {
          const data = JSON.parse(Buffer.concat(chunks).toString());
          if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
            resolve(data.predictions[0].bytesBase64Encoded);
          } else {
            reject(new Error('No image in response: ' + JSON.stringify(data).slice(0, 200)));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function generateImage(filename, prompt) {
  const outputPath = path.join(OUT_DIR, filename);
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  console.log(`Generating: ${filename}...`);
  try {
    const b64 = await apiRequest(prompt);
    const buffer = Buffer.from(b64, 'base64');
    fs.writeFileSync(outputPath, buffer);
    console.log(`  Saved: ${outputPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
  } catch (err) {
    console.error(`  ERROR: ${filename} - ${err.message}`);
  }
}

async function main() {
  console.log(`Generating ${images.length} images...\n`);

  // Generate sequentially to avoid rate limits
  for (const img of images) {
    await generateImage(img.filename, img.prompt);
  }

  console.log('\nAll images generated!');
}

main();
