const { spawn } = require('child_process');

const token = "DTX5Jg1jriH8skS0bWuko387";
const envs = [
    { name: "NEXT_PUBLIC_SUPABASE_URL", value: "https://sxbjcyelullbtiktdbsz.supabase.co" },
    { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY", value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4YmpjeWVsdWxsYnRpa3RkYnN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNzY0NzQsImV4cCI6MjA4Mzg1MjQ3NH0.AqzdBO6kZwypTQOSbiTb-praZTIs35OG8kpQoI5rYB8" }
];

async function addEnv(name, value) {
    return new Promise((resolve) => {
        console.log(`\n>>> STARTING ADD: ${name}`);
        const child = spawn('npx', ['vercel', 'env', 'add', name, 'production', '--token', token], {
            stdio: ['pipe', 'pipe', 'pipe'],
            shell: true
        });

        let valueSent = false;
        let sensitiveSent = false;

        const handleOutput = (data) => {
            const out = data.toString();
            process.stdout.write(out);

            if (!valueSent && out.toLowerCase().includes("value")) {
                console.log(`\n[FIX] Sending value for ${name}...`);
                child.stdin.write(value + "\n");
                valueSent = true;
            }

            if (!sensitiveSent && out.toLowerCase().includes("sensitive")) {
                console.log(`\n[FIX] Sending 'n' for sensitive prompt...`);
                child.stdin.write("n\n");
                sensitiveSent = true;
            }
        };

        child.stdout.on('data', handleOutput);
        child.stderr.on('data', handleOutput);

        child.on('close', (code) => {
            console.log(`\n>>> FINISHED ADD: ${name} (Exit code: ${code})`);
            resolve();
        });

        // Backup timer if prompts aren't detected
        setTimeout(() => {
            if (!valueSent) {
                console.log(`\n[TIMEOUT] Forcing value for ${name}...`);
                child.stdin.write(value + "\n");
                valueSent = true;
            }
        }, 10000);
    });
}

(async () => {
    // First remove them to be clean
    console.log("Cleaning up first...");
    const cleanup = spawn('npx', ['vercel', 'env', 'rm', 'NEXT_PUBLIC_SUPABASE_URL', 'production', '--token', token, '--yes'], { shell: true });
    cleanup.on('close', async () => {
        const cleanup2 = spawn('npx', ['vercel', 'env', 'rm', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'production', '--token', token, '--yes'], { shell: true });
        cleanup2.on('close', async () => {
            for (const env of envs) {
                await addEnv(env.name, env.value);
            }
            console.log("\nALL DONE");
        });
    });
})();
