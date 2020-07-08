#!/usr/bin/env node

/**
 * This script sets the version of the package.json file in the current working directory
 * to other packages with have a dependency on the package.json name in the current working
 * directory.
 *
 * Usage:
 *   node set-dependency-versions <package1> <package2> ...
 */

const fs = require('fs');
const path = require('path');

const pwd = process.env.PWD || process.cwd();

const { version, name } = require(path.join(pwd, 'package.json'));

function main(extensions) {
  console.info(`Received ${extensions.length} packages for which the dependency ${name} will be set to ${version}.`);

  extensions.forEach(extension => {
    const extensionPath = path.resolve(pwd, '..', extension);

    // Give the extension always the same version as this package.
    const manifestPath = path.join(extensionPath, 'package.json');
    const manifest = fs.readFileSync(manifestPath, {encoding: 'utf8'});
    const newManifest = manifest
      .replace(new RegExp(`"${name}": ".*"`, 'i'), `"${name}": "${version}"`);

    fs.writeFileSync(manifestPath, newManifest);

    console.info(`> Package ${extension} now depends on ${name} @ ${version}.`)
  });
}

main(process.argv.slice(2));
