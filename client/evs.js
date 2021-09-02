const { spawn } = require('child_process');

// pass python script + params
const subprocess = (function() {
    return spawn('python', [
      "-u", "-m", "castlabs_evs.vmp", "sign-pkg", "dist/win-unpacked/"
    ]);
  })();

// print output of script
subprocess.stdout.on('data', (data) => {
  console.log(`data:${data}`);
});
subprocess.stderr.on('data', (data) => {
  console.log(`error:${data}`);
});
subprocess.on('close', () => {
  console.log("Closed");
});
