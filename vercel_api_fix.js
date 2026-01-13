const https = require('https');

const token = "DTX5Jg1jriH8skS0bWuko387";
const projectId = "khannagpt";
const teamId = "team_rX7u6fuxQjCh7nFSp_Pn";

const envs = [
    {
        key: "NEXT_PUBLIC_SUPABASE_URL",
        value: "https://sxbjcyelullbtiktdbsz.supabase.co"
    },
    {
        key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4YmpjeWVsdWxsYnRpa3RkYnN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNzY0NzQsImV4cCI6MjA4Mzg1MjQ3NH0.AqzdBO6kZwypTQOSbiTb-praZTIs35OG8kpQoI5rYB8"
    }
];

async function updateEnv(env) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            key: env.key,
            value: env.value,
            type: "plain",
            target: ["production"]
        });

        const options = {
            hostname: 'api.vercel.com',
            path: `/v10/projects/${projectId}/env?teamId=${teamId}`,
            method: 'POST',
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
                console.log(`Status ${env.key}: ${res.statusCode}`);
                console.log(`Body ${env.key}: ${body}`);
                resolve();
            });
        });

        req.on('error', (e) => {
            console.error(`Error ${env.key}: ${e.message}`);
            reject(e);
        });

        req.write(data);
        req.end();
    });
}

(async () => {
    for (const env of envs) {
        await updateEnv(env);
    }
    console.log("Finished API updates");
})();
