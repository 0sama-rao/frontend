import { exec } from 'child_process';

const command = `npx sequelize-cli ${process.argv.slice(2).join(' ')}`;
exec(command, { env: process.env }, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(stdout);
});
