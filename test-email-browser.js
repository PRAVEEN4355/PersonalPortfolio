const https = require('https');

const data = JSON.stringify({
  service_id: 'service_o70023m',
  template_id: 'template_wd6fzgz',
  user_id: 'ExVSW_ybqSubbzG4P',
  template_params: {
    name: 'Ram',
    email: '16it035@gmail.com',
    phone: '9585664854',
    subject: 'New Personal Portfolio',
    message: 'Reach out me..'
  }
});

const options = {
  hostname: 'api.emailjs.com',
  port: 443,
  path: '/api/v1.0/email/send',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'Origin': 'http://localhost:3000' // Spoof browser environment
  }
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
  
  res.on('end', () => {
    console.log('\nRequest ended.');
    process.exit(0);
  });
});

req.on('error', error => {
  console.error(error);
  process.exit(1);
});

req.write(data);
req.end();
