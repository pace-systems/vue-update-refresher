# vue-update-refresher

A callback to force a refresh to the specified urls to update. 

Have a timer running that calls an api endpoint with version information and call window.appWillUpdate() if there's an 
update needed.

It's best to do that on your html document rather than inside the VueApp, however if that reload process fails for 
whatever reason or there isn't one after a few tries the VueApp will refresh the resources.

Reads meta value of vue-app-version to determine current version.

## Project setup
```
yarn install
```

```

import VUpdateRefresherPlugin from './index';

Vue.use(VUpdateRefresherPlugin, {updateURLs: [...], appURL: "http://localhost.com:8080");

```
### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### License

MIT

See LICENSE