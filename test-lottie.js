const https = require('https');

https.get('https://assets3.lottiefiles.com/packages/lf20_w51pcehl.json', (res) => {
  console.log('Status Code:', res.statusCode);
  process.exit(0);
}).on('error', (e) => {
  console.error(e);
  process.exit(1);
});
