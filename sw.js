importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js", "precache-manifest.766919d3350e18927debe6f3564be33e.js");

const _cache = 'mposCache'
// install
self.addEventListener('install', event => {
  console.log('installing…')
  const urlParams = new URLSearchParams(location.search)
  const deviceSN = urlParams.get('sn')

  var request = self.indexedDB.open('mpos', 1)
  request.onerror = function(event) {
    console.log(event.srcElement.error)
  }
  request.onsuccess = function(event) {
    console.log('onsuccess…')
    if (deviceSN !== undefined && deviceSN !== null) {
      var db = event.target.result
      var trans = db.transaction(['config'], 'readwrite')
      var objStore = trans.objectStore('config')
      objStore.add({ device: 'mpos', serialNumber: deviceSN })
    }
  }
  request.onupgradeneeded = function(event) {
    console.log('onupgradeneeded…')
    var db = event.target.result
    var store = db.createObjectStore('config', { keyPath: 'device' })
    store.add({ device: 'mpos', serialNumber: deviceSN })
  }

  event.waitUntil(
    caches.open(_cache).then(function(cache) {
      return cache.addAll([
        '/',
        '/app.js',
        '/static/fonts/element-icons.535877f5.woff'
      ])
    })
  )
})

// activate
self.addEventListener('activate', event => {
  console.log('now ready to handle fetches!')
})

// fetch
self.addEventListener('fetch', event => {
  /*
  event.respondWith(
    caches.open(_cache).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        return (
          response ||
          fetch(event.request).then(function(response) {
            return response
          })
        )
      })
    })
  )
  */
})

// catch message = skipWaiting
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting()
    console.log('skipWaiting')
  }
})

