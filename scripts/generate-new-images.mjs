import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = 'AIzaSyBaJr7Zfpx49sbjEqC1HPucCetAY9Mk7Jk';
const MODEL = 'imagen-4.0-fast-generate-001';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}`;
const OUT_DIR = path.resolve('public/images');

const images = [
  // New marketing posts
  {
    filename: 'posts/marketing-automation-roi-guide.webp',
    prompt: 'Clean modern flat illustration of marketing ROI measurement concept, showing upward trending charts, dollar signs, calculator, and marketing funnel with conversion metrics, professional orange and blue palette, minimal tech blog style, no text',
  },
  {
    filename: 'posts/ai-powered-marketing-automation.webp',
    prompt: 'Modern flat illustration of AI-powered marketing automation, showing a brain/neural network icon connected to marketing channels like email social media and analytics, futuristic but clean design, orange and blue accents, no text',
  },
  {
    filename: 'posts/email-drip-campaign-automation.webp',
    prompt: 'Clean flat design illustration of email drip campaign automation, showing a sequence of emails flowing in a timeline with trigger points and branching paths, envelope icons, professional orange and blue color scheme, no text',
  },
  {
    filename: 'posts/marketing-automation-mistakes-to-avoid.webp',
    prompt: 'Modern flat illustration of marketing automation pitfalls, showing warning signs and red X marks next to common mistake icons like broken workflows and spam emails, contrasted with green checkmarks for best practices, orange and blue palette, no text',
  },
  {
    filename: 'posts/ecommerce-marketing-automation.webp',
    prompt: 'Clean modern illustration of ecommerce marketing automation, showing an online shopping cart connected to automated email sequences, product recommendations, and abandoned cart recovery workflows, orange and blue palette, flat design, no text',
  },
  // New finance posts
  {
    filename: 'posts/automated-invoicing-guide.webp',
    prompt: 'Clean flat illustration of automated invoicing process, showing digital invoices flowing through an automated pipeline with payment tracking, dollar signs, and approval checkmarks, professional blue and orange color scheme, minimal style, no text',
  },
  {
    filename: 'posts/payroll-automation-software.webp',
    prompt: 'Modern flat design illustration of payroll automation, showing employee icons connected to an automated payroll system with salary calculations, tax withholdings, and direct deposit indicators, blue and orange accents, no text',
  },
  {
    filename: 'posts/financial-reporting-automation.webp',
    prompt: 'Clean modern illustration of automated financial reporting, showing dashboards with auto-generated charts, profit and loss statements, and real-time financial metrics on a screen, professional blue and orange palette, flat design, no text',
  },
  {
    filename: 'posts/tax-preparation-automation.webp',
    prompt: 'Modern flat illustration of automated tax preparation, showing tax forms being processed through an automated system with categorized expenses, receipt scanning, and compliance checkmarks, blue and orange color scheme, no text',
  },
  {
    filename: 'posts/budgeting-forecasting-automation.webp',
    prompt: 'Clean flat design illustration of automated budgeting and financial forecasting, showing forward-looking trend lines, scenario comparison charts, and budget dashboards with rolling forecasts, professional blue and orange palette, no text',
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
            reject(new Error('No image in response: ' + JSON.stringify(data).slice(0, 300)));
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
  console.log(`Generating ${images.length} new images...\n`);
  for (const img of images) {
    await generateImage(img.filename, img.prompt);
  }
  console.log('\nAll new images generated!');
}

main();
