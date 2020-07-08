const multirelease = require('multi-semantic-release');
const { getManifest } = require('multi-semantic-release/lib/getManifest');

const dryRun = false;

async function go() {
  try {
    const paths = [
      `${__dirname}/packageA/package.json`,
      `${__dirname}/packageB/package.json`,
    ];

    paths.forEach(path => {
      const manifest = getManifest(path);
      if (manifest.private) {
        throw `${manifest} is marked private. Only non-private packages can be published.`
      }
    })

    await multirelease(paths, { dryRun });
  }
  catch (error) {
    // Log out errors.
    console.error('[multi-semantic-release]:', error);
    process.exit(1);
  }
}

go();
