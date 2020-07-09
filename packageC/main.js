
const dirGlob = require('dir-glob');

(async () => {
  const x = await dirGlob('../packageA/package.json', { cwd: __dirname });

  console.log(x);
})();
