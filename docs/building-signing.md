# Building & signing package:

- Install castlabs-evs: `python3 -m pip install --upgrade castlabs-evs`
- Create an account as per the [castlabs documentation](https://github.com/castlabs/electron-releases/wiki/EVS#creating-an-evs-account)
- Auth (or re-auth) using `python3 -m castlabs_evs.account reauth`
- Sign electron package: *after* building if on windows. *before/during* building if on macos or linux
	- electron-builder uses hooks 'afterPack' / 'beforeBuild' respectively
	- `python3 -m castlabs_evs.vmp sign-pkg path/to/package-directroy` ( for streaming scope )
- Add the previous command to 'electron-build` in package.json; it should look like `electron-builder x` 
- Run `npm run build` to build both React & Electron

# Resources:

- https://www.electron.build/configuration/configuration
- https://github.com/electron/get#usage
- https://github.com/castlabs/electron-releases
- https://github.com/castlabs/electron-releases/wiki/EVS
