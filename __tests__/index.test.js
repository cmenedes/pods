import App from '../src/js/App'
import pods from '../src/js/pods'
import Content from 'nyc-lib/nyc/Content'

jest.mock('../src/js/App')

const loadCsv = Content.loadCsv

beforeEach(() => {
  App.mockReset()
  Content.loadCsv = jest.fn().mockImplementation(() => {
    return new Promise(resolve => {
      resolve('mock-csv-content')
    })
  })
})

afterEach(() => {
  Content.loadCsv = loadCsv
})

test('it works', () => {
  expect.assertions(5)

  const test = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        expect(Content.loadCsv).toHaveBeenCalledTimes(1)
        expect(Content.loadCsv.mock.calls[0][0].url).toBe(pods.CONTENT_URL)
        expect(App).toHaveBeenCalledTimes(1)
        expect(App.mock.calls[0][0]).toBe('mock-csv-content')
        resolve(true)
      }, 500)
    })
  }

  require('../src/js/index')

  return test().then(result => {expect(result).toBe(true)})
})