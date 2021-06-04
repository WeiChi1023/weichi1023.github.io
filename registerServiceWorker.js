/* eslint-disable no-console */

import { register } from 'register-service-worker'
import store from '@/store'
import { removeToken } from '@/utils/auth'
import { fetchConfig } from '@/api/register'
import { IdbKeyValue } from '@/utils/indexdatabase'
const idb = new IdbKeyValue('mpos', 'config')

if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'development'
) {
  let swUri = `${process.env.BASE_URL}sw.js`
  const urlParams = new URLSearchParams(window.location.href.split('/login')[1])
  const deviceSN = urlParams.get('sn')
  if (deviceSN !== null) {
    swUri = `${process.env.BASE_URL}sw.js?sn=${deviceSN}`
  }
  register(swUri, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated() {
      emitUpdate()
      console.log('New content is updated.')
    },
    offline() {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })

  // let installPromptEvent
  window.addEventListener('beforeinstallprompt', event => {
    const install_button = document.querySelector('#install')
    const loginInput = document.querySelector('#loginInput')

    install_button.style.display = 'block'
    loginInput.style.display = 'none'

    event.preventDefault()
    window.deferredPrompt = event
    // wait for click install button by user
    install_button.addEventListener('click', e => {
      window.deferredPrompt.prompt()
      window.deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          // user accept the prompt
          // lets hidden button
          install_button.style.display = 'none'
          loginInput.style.display = 'block'
        } else {
          console.log('User dismissed the prompt')
        }
        window.deferredPrompt = null
      })
    })
  })

  /*
  // EventListener to ServiceWorker refresh
  let refreshing = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) {
      return
    }
    refreshing = true
    alert('controllerchange')
    window.location.reload()
  })
  */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(swUri)
      .then(function(reg) {
        if (reg.waiting) {
          emitUpdate()
          removeToken()
          getConfig()
          store.dispatch('systemInfo/setSystemInfo', { swUpdate: true })
          return
        }
        reg.onupdatefound = function() {
          var installingWorker = reg.installing
          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                if (reg.active) {
                  emitUpdate()
                } else {
                  // very first service worker registration, do nothing
                }

                break
            }
          }
        }
      })
      .catch(function(e) {
        console.error('Error during service worker registration:', e)
      })
  }
}

function emitUpdate() {
  var event = document.createEvent('Event')
  event.initEvent('sw.update', true, true)
  window.dispatchEvent(event)
}

function getConfig() {
  idb.get('serialNumber').then(sn => {
    const config = new Promise(resolve => {
      const res = fetchConfig(sn)
      resolve(res)
    })
    config
      .then(res => {
        res.api_SSL = true
        this.$store.dispatch('systemInfo/setSystemInfo', res)
        this.$message({
          type: 'info',
          message: '修改成功'
        })
      })
      .catch(err => {
        this.errorMsg = 'fetch config error'
        console.error(err)
      })
  })
}
