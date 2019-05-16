const zoomFactor = 0.1

function executeBackgroundAction(action, cb = () => {}) {
  window.chrome.extension.sendMessage(action, cb)
}

export function zoomInTab() {
  const { tabs } = window.chrome
  tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
    const tabId = tab[0].id
    tabs.getZoom(tabId, (zoom) => {
      tabs.setZoom(tabId, zoom + zoomFactor)
    })
  })
}

export function zoomOutTab() {
  const { tabs } = window.chrome
  tabs.query({
    active: true,
    lastFocusedWindow: true
  }, (tab) => {
    const tabId = tab[0].id
    tabs.getZoom(tabId, (zoom) => {
      tabs.setZoom(tabId, zoom - zoomFactor)
    })
  })
}

export function restoreZoom() {
  const { tabs } = window.chrome
  tabs.query({
    active: true,
    lastFocusedWindow: true
  }, (tab) => {
    const tabId = tab[0].id
    tabs.setZoom(tabId, 0)
  })
}

function zoomIn() {
  executeBackgroundAction({
    zoomIn: true
  })
}

function zoomOut() {
  executeBackgroundAction({
    zoomOut: true
  })
}

function resetZoom() {
  executeBackgroundAction({
    resetZoom: true
  })
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-search-plus',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.zoom-out',
      help: 'i18n-help.zoom-out',
      action: zoomOut,
      group: 'i18n-group.zoom'
    }, {
      name: 'i18n-command.zoom-in',
      help: 'i18n-help.zoom-in',
      action: zoomIn,
      group: 'i18n-group.zoom'
    }, {
      name: 'i18n-command.reset-zoom',
      help: 'i18n-help.reset-zoom',
      action: resetZoom,
      group: 'i18n-group.zoom'
    }],
    i18n: {
      en: {
        'group.zoom': 'Zoom',
        'command.zoom-in': 'zoom in',
        'help.zoom-in': 'Zooms in the current tab',
        'command.zoom-out': 'zoom out',
        'help.zoom-out': 'Zooms out the current tab',
        'command.reset-zoom': 'reset zoom',
        'help.reset-zoom': 'Restore the zoom to the default level'
      },
      es: {
        'group.zoom': 'Zoom',
        'command.zoom-in': 'agrandar',
        'help.zoom-in': 'Incrementa el tamaño del contenido del sitio',
        'command.zoom-out': 'achicar',
        'help.zoom-out': 'Decrementa el tamaño del contenido del sitio',
        'command.reset-zoom': 'restaurar',
        'help.reset-zoom': 'Restaura el tamaño normal del sitio'
      },
      pt: {
        'group.zoom': 'Zoom',
        'command.zoom-in': 'aumentar zoom',
        'help.zoom-in': 'Aumenta o zoom na guia atual',
        'command.zoom-out': 'diminuir zoom',
        'help.zoom-out': 'Diminuir o zoom na guia atual',
        'command.reset-zoom': 'resetar zoom',
        'help.reset-zoom': 'Restaura o zoom para o estado original da guia'
      }
    }
  }],
  i18n: {
    en: {
      name: 'Zoom',
      description: 'Commands useful to zoom in and zoom out the website.'
    },
    es: {
      name: 'Zoom',
      description: 'Comandos útiles para cambiar el tamaño de los contentidos del sitio web.'
    },
    pt: {
      name: 'Zoom',
      description: 'Comando utilizado para aumentar e diminuir o zoom na guia.'
    }
  }
}
