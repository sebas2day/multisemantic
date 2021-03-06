const multirelease = require('multi-semantic-release');
const { getManifest } = require('multi-semantic-release/lib/getManifest');

const dryRun = false;

async function go() {
  try {
    const paths = [
      `${__dirname}/packageB/package.json`,
      `${__dirname}/packageA/package.json`,
      `${__dirname}/packageC/package.json`,
    ];

    await multirelease(paths, { dryRun });
  }
  catch (error) {
    // Log out errors.
    console.error('[multi-semantic-release]:', error);
    process.exit(1);
  }
}

go();
