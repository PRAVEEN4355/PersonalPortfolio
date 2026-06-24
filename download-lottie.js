const https = require('https');
const fs = require('fs');

https.get('https://assets3.lottiefiles.com/packages/lf20_w51pcehl.json', (res) => {
  const writeStream = fs.createWriteStream('public/developer-typing.json');
  res.pipe(writeStream);
  res.on('end', () => {
    console.log('Downloaded');
    process.exit(0);
  });
}).on('error', (e) => {
  console.error(e);
  process.exit(1);
});
