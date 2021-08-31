# Building / signing
Instructions for building/signing then packaging kiro into a desktop electron app.

## Dependencies
- castlabs-evs (`python3 -m pip install --upgrade castlabs-evs`)
- electron-builder (`npm i electron-builder`)
- todo: add other dependencies here :)

## Instructions

- Create an account for EVS as per the [documentation](https://github.com/castlabs/electron-releases/wiki/EVS#creating-an-evs-account), or auth with `python3 -m castlabs_evs.account reauth`
- Signing the electron package takes place before code-signing if on macos or linux, after if on windows. electron-builder uses the hooks 'afterPack' / 'afterSign' respectively for this [(ex)](https://www.electron.build/configuration/configuration#hooks)
- Open `evs.js` in the 'client' directory and set the path to your package's build directory, along with any other params you want to modify. 

### Windows

- Run `npm run build:win`

### Mac/Linux

- Run `npm run build:mac`

## Resources:

- https://www.electron.build/configuration/configuration
- https://github.com/castlabs/electron-releases
