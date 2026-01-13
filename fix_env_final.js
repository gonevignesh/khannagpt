const { spawn } = require('child_process');
const token = "DTX5Jg1jriH8skS0bWuko387";

const envs = {
    "NEXT_PUBLIC_SUPABASE_URL": "https://sxbjcyelullbtiktdbsz.supabase.co",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4YmpjeWVsdWxsYnRpa3RkYnN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNzY0NzQsImV4cCI6MjA4Mzg1MjQ3NH0.AqzdBO6kZwypTQOSbiTb-praZTIs35OG8kpQoI5rYB8"
};

async function addEnv(name, value) {
    return new Promise((resolve) => {
        console.log(`Adding ${name}...`);
        const child = spawn('npx', ['vercel', 'env', 'add', name, 'production', '--token', token], { shell: true });

        child.stdout.on('data', (data) => {
            const out = data.toString();
            console.log(`STDOUT: ${out}`);
            if (out.includes("value")) {
                console.log(`Writing value for ${name}`);
                child.stdin.write(value + "\n");
            }
            if (out.includes("sensitive")) {
                console.log(`Writing 'no' for sensitive prompt`);
                child.stdin.write("n\n");
            }
        });

        child.stderr.on('data', (data) => {
            const out = data.toString();
            console.log(`STDERR: ${out}`);
            if (out.includes("value")) {
                child.stdin.write(value + "\n");
            }
            if (out.includes("sensitive")) {
                child.stdin.write("n\n");
            }
        });

        child.on('close', resolve);
    });
}

(async () => {
    for (const [name, value] of Object.entries(envs)) {
        await addEnv(name, value);
    }
    console.log("Done");
})();
