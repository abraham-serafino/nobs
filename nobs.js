const { createReadStream, mkdirSync, statSync } = require('fs')
const { join } = require('path')
const { maybeInstall } = require('npm-install-global')
const { readFileSync, writeFileSync } = require('jsonfile')
const { shell } = require('execa')
const { Extract } = require('unzip')

const projectPath = process.argv[2] || process.cwd()
const projectName = projectPath.split('/').pop()

function generateScaffold() {
  return new Promise(resolve => {
    console.log('Generating scaffold...')
    createReadStream(join(__dirname, 'nobs.zip'))
      .pipe(Extract({ path: projectPath }))
      .on('close', () => {
        console.log('done.')
        resolve()
      })
  })
}

function changeDirectory() {
  /* try {
    if (!statSync(projectPath).isDirectory()) {
      console.error(`${projectPath} already exists and is not a directory.`)
      process.exit()
    }
  } catch (e) {
    mkdirSync(projectPath)
  } */

  process.chdir(projectPath)
}

function installYarn() {
  console.log('Installing yarn...')

  return new Promise(resolve =>
    maybeInstall('yarn', error => {
      if (error) {
        console.error(error)
        process.exit()
      }

      console.log('done.')
      resolve()
    })
  )
}

function configurePackage() {
  console.log('Configuring package...')
  const package = readFileSync(join(process.cwd(), 'package.json'))
  package.name = projectName
  writeFileSync(join(process.cwd(), 'package.json'), package)
  console.log('done.')
}

async function installDependencies() {
  console.log('Installing dependencies...')
  const result = await shell('yarn install')
  console.log(result.stdout)
  console.log('done.')
}

const main = async () => {
  try {
    await generateScaffold()
    changeDirectory()
    await installYarn()
    configurePackage()
    await installDependencies()
  } catch (error) {
    console.error(error.toString())
  }
}

main()
