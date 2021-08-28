# Building / signing
WIP :)


## Instructions

- Install castlabs-evs with python3: `python3 -m pip install --upgrade castlabs-evs`
- Create an account as per the [castlabs documentation](https://github.com/castlabs/electron-releases/wiki/EVS#creating-an-evs-account), or auth with `python3 -m castlabs_evs.account reauth`
- Signing the electron package takes place before code-signing if on macos or linux, after if on windows. electron-builder uses the hooks 'afterPack' / 'afterSign' respectively for this [(ex.)](https://www.electron.build/configuration/configuration#hooks)
- Add `python3 -m castlabs_evs.vmp sign-pkg path/to/package-directroy` (for streaming scope) to `electron-build` in package.json with the correct hook:
```
"build": {
  ...
  "afterSign": "./myAfterSignHook.js"
}
```
- Run `npm run build` to build both React & Electron

## Resources:

- https://www.electron.build/configuration/configuration
- https://github.com/electron/get#usage
- https://github.com/castlabs/electron-releases
- https://github.com/castlabs/electron-releases/wiki/EVS
