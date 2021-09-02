# Building / signing
Instructions for building/signing Kiro into a desktop electron app, capable of playing Widevine-protected DRM content.

Please note that Kiro is still in development. Building this repo as-is won't result in a functional program :(

## Dependencies
- Node.js + NPM 12.x+
- Python 3.7+
- castlabs-evs 1.1.0+
- electron-builder 22.11+

## Instructions

- Clone this repo, then cd into `client` and run `npm i` to ensure all nessecary packages are installed
- Create an account for Castlabs EVS as per the [documentation](https://github.com/castlabs/electron-releases/wiki/EVS#creating-an-evs-account), or auth with `python3 -m castlabs_evs.account reauth`
- Signing the electron package takes place before code-signing if on macos or linux, after if on windows. electron-builder uses the hooks 'afterPack' / 'afterSign' respectively for this [(ex)](https://www.electron.build/configuration/configuration#hooks)
- Open `evs.js` in the 'client' directory and ensure the path is set to the package's build directory, along with any other params you want to modify. 

### Windows

- Run `npm run build:win` from `client`

### Mac/Linux

- Run `npm run build:mac` (currently not functional)

## Resources:

- [electron-build configuration](https://www.electron.build/configuration/configuration)
- [castlabs-electron releases](https://github.com/castlabs/electron-releases)
- [castlabs-evs wiki](https://github.com/castlabs/electron-releases/wiki/EVS)
