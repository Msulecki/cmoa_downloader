# Cmoa manga downloader

#### Use only for educational purposes, with your own account !

---

_*It's useful for saving your magna of choice for offline reading*_

```
$ git clone https://github.com/Msulecki/cmoa_downloader.git
$ cd client
$ npm install
$ npm run build
$ cd ../server
$ npm install
$ nodemon index.js
```

It's pretty straightforward - login with your account data, and wait for popup with download request.

- There will be some user settings in future.
- There also will be live version, when i handle some privacy stuff.
- ~~imgMerge/write is made pseudo asynchronously so it can fuck up your server for now.~~
- Image merging is handled asynchronously during page navigation, one-by-one, so there shouldn't be server timeouts no more caused by huge synchronous function

##### **I'll try to make it cool and usable in the future**
