const https = require('https');

https.get('https://vazxmixizvqvwwh15271.supabase.co/storage/v1/object/public/models/macbook/model.gltf', (res) => {
  console.log('Status Code:', res.statusCode);
  process.exit(0);
}).on('error', (e) => {
  console.error(e);
  process.exit(1);
});
