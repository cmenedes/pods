import App from '../src/js/App'
import pods from '../src/js/pods'
import Content from 'nyc-lib/nyc/Content'

jest.mock('../src/js/App')

const loadCsv = Content.loadCsv

describe('entry point - active false', () => {
  let content
  const messages = [
    {
      title: 'title',
      marquee: 'marquee',
      splash: 'splash',
      active: 'false',
      pods_url: 'http://pods_url'
    }
  ]
  beforeEach(() => {
    content = new Content(messages)
    // jest.resetModules()
    // fetch.resetMocks()
    Content.loadCsv = jest.fn().mockImplementation(() => {
      return new Promise(resolve => {
        resolve(content)
      })
    })
    
  })
  afterEach(() => {
    // Content.loadCsv.mockReset()
    Content.loadCsv = loadCsv
  })
  test('it works - active false', () => {
    expect.assertions(6)

    fetch.mockResponse(require('../src/js/index'))
    const test = async () => {
      return new Promise(resolve => {
        setTimeout(() => {
          expect(Content.loadCsv).toHaveBeenCalledTimes(1)
          expect(Content.loadCsv.mock.calls[0][0].url).toBe(pods.CONTENT_URL)
          expect(App).toHaveBeenCalledTimes(1)
          expect(App.mock.calls[0][0]).toBe(content)
          expect(App.mock.calls[0][1]).toBe(content.message('pods_url'))
          resolve(true)
        }, 500)
      })
    }
  
    // require('../src/js/index')
    return test().then(result => {expect(result).toBe(true)})
  })
  
})

describe('entry point - active true', () => {
  let content
  const messages = [
    {
      title: 'title',
      marquee: 'marquee',
      splash: 'splash',
      active: 'true',
      pods_url: 'http://pods_url'
    }
  ]
  beforeEach(() => {
    content = new Content(messages)
    // jest.resetModules()
    // fetch.resetMocks()
    Content.loadCsv = jest.fn().mockImplementation(() => {
      return new Promise(resolve => {
        resolve(content)
      })
    })
    
  })
  afterEach(() => {
    // Content.loadCsv.mockReset()
    Content.loadCsv = loadCsv
  })
  test('it works - active true', () => {
    expect.assertions(6)

    fetch.mockResponse(require('../src/js/index'))
    
    const test = async () => {
      return new Promise(resolve => {
        setTimeout(() => {
          expect(Content.loadCsv).toHaveBeenCalledTimes(1)
          expect(Content.loadCsv.mock.calls[0][0].url).toBe(pods.CONTENT_URL)
          expect(App).toHaveBeenCalledTimes(1)
          expect(App.mock.calls[0][0]).toBe(content)
          expect(App.mock.calls[0][1]).toBe(`${content.message('pods_url')}${encodeURIComponent(pods.ACTIVE_POD_WHERE_CLAUSE)}`)
          resolve(true)
        }, 500)
      })
    }
    
    // require('../src/js/index')
    return test().then(result => {expect(result).toBe(true)})

  })
})