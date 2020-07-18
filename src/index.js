

export const VUpdateRefresherPlugin = {
    install(Vue, options) {
        if (!options) {
            options = {};
        }
        if (!options.updateURLS) {
            options.updateURLS = [];
        }
        if (!options.updateInterval) {
            options.updateInterval = 60000;
        }
        if (!options.versionURL) {
            options.versionURL = null;
        }
        if (!options.appURL) {
            options.appURL = "http://localhost:8080";
        }
        window.updateURLS = options.updateURLS;
        window.updateInterval = options.updateInterval;
        window.versionURL = options.versionURL;
        window.appURL = options.appURL;
        window.getMeta = function(metaName) {
            const metas = document.getElementsByTagName('meta');

            for (let i = 0; i < metas.length; i++) {
              if (metas[i].getAttribute('name') === metaName) {
                return metas[i].getAttribute('content');
              }
            }

            return '';
        }
        window.iterateUpdateURLS = async function() {
            for (const updateURL of window.updateURLs) {
                await fetch(updateURL, {
                    cache: "reload"
                });
            }
            window.location = window.appURL;
            return false;
        }
        window.appWillUpdate = async function() {
            /*
                This is intended to be a fail-safe if the html doc tries to refresh and is unable to/errors.
             */
            let refresh_count = localStorage.getItem("updateRefreshes");
            if (
                refresh_count === null ||
                refresh_count === "null" ||
                refresh_count === "undefined"
            ) {
                refresh_count = 0;
            } else {
                refresh_count = parseInt(refresh_count);
            }
            if (refresh_count > 1) {
                await window.iterateUpdateURLS();
            }
            refresh_count += 1;
            localStorage.setItem("updateRefreshes", refresh_count.toString());
        }
        window.appUpToDate = async function() {
            localStorage.setItem("updateRefreshes", "0");
        }
        if (options.versionURL) {
            /*
                Ideally this should be done on the html doc within a <script>... </script> in case the Vue App
                fails to initialize.
             */
            window.tickVersionCheck = async function() {
                const resp = fetch(window.versionURL, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json"
                  }
                });
                await resp.then(response => {
                  if (response.status === 200) {
                    let jd = response.json();
                    return jd.then(j => {
                      if (j.version) {
                        if (j.version.trim() > window.getMeta('vue-app-version')) {
                           window.appWillUpdate();
                           window.iterateUpdateURLS();
                        } else {
                           localStorage.setItem("updateRefreshes", "0");
                        }
                      }
                    });
                  }
                });
            }
            window.versionCheckTimer = setInterval(window.tickVersionCheck, window.updateInterval);
        }
    }
}