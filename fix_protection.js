const https = require('https');

const token = "DTX5Jg1jriH8skS0bWuko387";
const projectId = "khannagpt";
const teamId = "team_rX7u6fuxQjCh7nFSp_Pn";

const data = JSON.stringify({
    vercelAuthentication: {
        deploymentType: "none"
    }
});

const options = {
    hostname: 'api.vercel.com',
    path: `/v9/projects/${projectId}?teamId=${teamId}`,
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authorization': `Bearer ${token}`
    }
};

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Body: ${body}`);
    });
});

req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
});

req.write(data);
req.end();
