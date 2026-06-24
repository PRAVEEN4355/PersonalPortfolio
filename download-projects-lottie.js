const https = require('https');
const fs = require('fs');
const path = require('path');

const animations = [
  { url: 'https://assets9.lottiefiles.com/packages/lf20_qmfs6c3i.json', name: 'glow-chart.json' }, // Chart/Analytics
  { url: 'https://assets5.lottiefiles.com/packages/lf20_mjxwnk5b.json', name: 'trucell-mobile.json' }, // Mobile OTP/Signature
  { url: 'https://assets6.lottiefiles.com/private_files/lf30_8ikv91bx.json', name: 'liveness-face.json' }, // Face recognition
  { url: 'https://assets2.lottiefiles.com/packages/lf20_znxueee3.json', name: 'customer-bank.json' } // Mobile Banking
];

// Fallback animations in case the above are 404s
const fallbacks = [
  { url: 'https://raw.githubusercontent.com/LottieFiles/lottie-react/master/example/src/animation.json', name: 'glow-chart.json' },
  { url: 'https://raw.githubusercontent.com/LottieFiles/lottie-react/master/example/src/animation.json', name: 'trucell-mobile.json' },
  { url: 'https://raw.githubusercontent.com/LottieFiles/lottie-react/master/example/src/animation.json', name: 'liveness-face.json' },
  { url: 'https://raw.githubusercontent.com/LottieFiles/lottie-react/master/example/src/animation.json', name: 'customer-bank.json' }
];

async function downloadLottie(url, filename, isFallback = false) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadLottie(res.headers.location, filename, isFallback).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        if (!isFallback) {
          console.log(`Failed to download ${url}, trying fallback...`);
          const fallback = fallbacks.find(f => f.name === filename);
          return downloadLottie(fallback.url, filename, true).then(resolve).catch(reject);
        }
        return reject(new Error(`Status Code: ${res.statusCode} for ${url}`));
      }
      
      const writeStream = fs.createWriteStream(path.join('public', filename));
      res.pipe(writeStream);
      res.on('end', () => resolve());
    }).on('error', (e) => reject(e));
  });
}

async function main() {
  for (const anim of animations) {
    try {
      await downloadLottie(anim.url, anim.name);
      console.log(`Downloaded ${anim.name}`);
    } catch (e) {
      console.error(`Failed to download ${anim.name}:`, e.message);
    }
  }
}

main();
