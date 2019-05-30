import $ from 'jquery'
import facilityStyle from '../src/js/facility-style'
import decorations from '../src/js/decorations'
import pods from '../src/js/pods'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import App from '../src/js/App';
import GeoJson from 'ol/format/GeoJSON'

jest.mock('nyc-lib/nyc/ol/FinderApp')
jest.mock('ol/format/GeoJSON')

const mockContent = {
  messages: {
    title: 'app title',
    splash: 'splash content'
  },
  message: (key) => {
    return mockContent.messages[key]
  }
}

describe('constructor', () => {
  const addMarquee = App.prototype.addMarquee
  const addDescription = App.prototype.addDescription
  const addLegend = App.prototype.addLegend
  const rearrangeLayers = App.prototype.rearrangeLayers
  const addLabels = App.prototype.addLabels
  const highlightSite = App.prototype.highlightSite

  beforeEach(() => {
    App.prototype.addMarquee = jest.fn()
    App.prototype.addDescription = jest.fn()
    App.prototype.addLegend = jest.fn()
    App.prototype.rearrangeLayers = jest.fn()
    App.prototype.addLabels = jest.fn()
    App.prototype.highlightSite = jest.fn()
  })

  test('constructor active', () => {
    expect.assertions(22)

    mockContent.messages.active = 'true'

    const app = new App(mockContent, 'http://pods-endpoint')

    expect(app instanceof FinderApp).toBe(true)
    expect(FinderApp).toHaveBeenCalledTimes(1)

    expect(FinderApp.mock.calls[0][0].title).toBe('app title')
    expect(FinderApp.mock.calls[0][0].splashOptions.message).toBe('splash content')
    expect(FinderApp.mock.calls[0][0].facilityUrl).toBe('http://pods-endpoint')
    
    expect(GeoJson).toHaveBeenCalledTimes(1)
    expect(GeoJson.mock.calls[0][0].dataProjection).toBe('EPSG:2263')
    expect(GeoJson.mock.calls[0][0].featureProjection).toBe('EPSG:3857')
    expect(FinderApp.mock.calls[0][0].facilityFormat).toBe(GeoJson.mock.instances[0])
    
    expect(FinderApp.mock.calls[0][0].facilityTabTitle).toBe('PODs')
    expect(FinderApp.mock.calls[0][0].facilityStyle).toBe(facilityStyle.pointStyle)
    expect(FinderApp.mock.calls[0][0].facilitySearch.displayField).toBe('search_label')
    expect(FinderApp.mock.calls[0][0].facilitySearch.nameField).toBe('name')
    expect(FinderApp.mock.calls[0][0].decorations.length).toBe(2)
    expect(FinderApp.mock.calls[0][0].decorations[0].content).toBe(mockContent)
    expect(FinderApp.mock.calls[0][0].decorations[1]).toBe(decorations)

    expect(App.prototype.addMarquee).toHaveBeenCalledTimes(1)
    expect(App.prototype.addDescription).toHaveBeenCalledTimes(1)
    expect(App.prototype.addLegend).toHaveBeenCalledTimes(1)
    expect(App.prototype.rearrangeLayers).toHaveBeenCalledTimes(1)
    expect(App.prototype.addLabels).toHaveBeenCalledTimes(1)
    expect(App.prototype.highlightSite).toHaveBeenCalledTimes(1)

  })
})
