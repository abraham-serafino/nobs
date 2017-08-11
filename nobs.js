#! /usr/bin/env node

const { createReadStream, existsSync, readdirSync, statSync } = require('fs');
const { join } = require('path');
const { maybeInstall } = require('npm-install-global');
const { readFileSync, writeFileSync } = require('jsonfile');
const { shell } = require('execa');
const { Extract } = require('unzip');

const projectPath = process.argv[2] || process.cwd();
const projectName = projectPath.split('/').pop();

function generateScaffold() {
  return new Promise(resolve => {
    console.log('Generating scaffold...');
    createReadStream(join(__dirname, 'nobs.zip'))
      .pipe(Extract({ path: projectPath }))
      .on('close', () => {
        resolve()
      });
  })
}

function installYarn() {
  console.log('Installing yarn...');

  return new Promise(resolve =>
    maybeInstall('yarn', error => {
      if (error) {
        console.error(error);
        process.exit();
      }

      resolve();
    })
  );
}

function configurePackage() {
  console.log('Configuring package...');
  const pkg = readFileSync(join(process.cwd(), 'package.json'));
  pkg.name = projectName;
  writeFileSync(join(process.cwd(), 'package.json'), pkg, { spaces: 2 });
}

async function installDependencies() {
  console.log('Installing dependencies... (this may take a minute or two)');
  const result = await shell('yarn install');
  console.log(result.stdout);
}

const main = async () => {
  if (existsSync(projectPath)) {
    if (!statSync(projectPath).isDirectory()) {
      console.error(`Cannot create project - '${projectPath}' is not a directory`);
      process.exit();
    }

    if (readdirSync(projectPath)) {
      console.error(`Cannot create project - folder '${projectPath}' is not empty.`);
      process.exit();
    }
  }

  try {
    await generateScaffold();
    process.chdir(projectPath);
    await installYarn();
    configurePackage();
    await installDependencies();
  } catch (error) {
    console.error(error.toString());
  }
}

main();
