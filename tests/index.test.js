import module, {
  zoomInTab,
  zoomOutTab,
  restoreZoom
} from '../src/index'

const defaultTabs = [{
  id: 1
}]

const zoom = 1.2

function mockExtension(methods = {}) {
  global.chrome = {
    extension: {
      sendMessage: jest.fn(),
      ...methods
    },
    tabs: {
      query: (query, cb) => cb(defaultTabs),
      getZoom: (tabId, cb) => cb(zoom),
      setZoom: jest.fn(),
      ...methods
    }
  }
}

describe('Module', () => {
  it('defines a module', () => {
    expect(module).toMatchSnapshot()
  })
  describe('zoomOut action', () => {
    it('calls background action', () => {
      const sendMessage = jest.fn()
      mockExtension({ sendMessage })
      const zoomOut = module.contexts[0].commands[0]
      expect(zoomOut.name).toEqual('i18n-command.zoom-out')
      zoomOut.action()
      expect(sendMessage.mock.calls).toMatchSnapshot()
    })
  })
  describe('zoomIn action', () => {
    it('calls background action', () => {
      const sendMessage = jest.fn()
      mockExtension({ sendMessage })
      const zoomIn = module.contexts[0].commands[1]
      expect(zoomIn.name).toEqual('i18n-command.zoom-in')
      zoomIn.action()
      expect(sendMessage.mock.calls).toMatchSnapshot()
    })
  })
  describe('resetZoom action', () => {
    it('calls background action', () => {
      const sendMessage = jest.fn()
      mockExtension({ sendMessage })
      const resetZoom = module.contexts[0].commands[2]
      expect(resetZoom.name).toEqual('i18n-command.reset-zoom')
      resetZoom.action()
      expect(sendMessage.mock.calls).toMatchSnapshot()
    })
  })
})

describe('zoomInTab background action', () => {
  it('increases the zoom level', () => {
    const setZoom = jest.fn()
    mockExtension({ setZoom })
    zoomInTab()
    expect(setZoom).toHaveBeenCalledWith(1, zoom + 0.1)
  })
})

describe('zoomOutTab background action', () => {
  it('decreases the zoom level', () => {
    const setZoom = jest.fn()
    mockExtension({ setZoom })
    zoomOutTab()
    expect(setZoom).toHaveBeenCalledWith(1, zoom - 0.1)
  })
})

describe('restoreZoom background action', () => {
  it('restore the zoom level', () => {
    const setZoom = jest.fn()
    mockExtension({ setZoom })
    restoreZoom()
    expect(setZoom).toHaveBeenCalledWith(1, 0)
  })
})
