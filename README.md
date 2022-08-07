## Vite Boilerplate for Indorelawan.org React Frontend

_This repo used for internal use of indorelawan.org dev to increase frontend development QoL_

Use this boilerplate to replace legacy CRA environment with faster Vite HMR.

### How to use
- Clone this repo
- Go inside cloned folder
- Make symlinks to "src" and "public" folder of original CRA frontend folder with cmd or bash
  ```
  # for windows (UAC Required)
  mklink /D D:\this\repo\path\src D:\origin\CRA\path\src

  # for linux
  ln -s /this/repo/path/src /origin/CRA/path/src
  ```
- Then run `yarn` or `npm install`
- Use .env for custom environment vars
- Enjoy your new Vite dev environment


Note: **This only intended for development purposes don't use it for production env.**