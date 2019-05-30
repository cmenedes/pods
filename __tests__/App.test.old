import App from '../src/js/App'
import pods from '../src/js/pods'
import decorations from '../src/js/decorations'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import GeoJson from 'ol/format/GeoJSON'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import MapMgr from 'nyc-lib/nyc/ol/MapMgr'
import Content from 'nyc-lib/nyc/Content'
import Decorate from 'nyc-lib/nyc/ol/format/Decorate'
import facilityStyle from '../src/js/facility-style'
import OlFeature from 'ol/Feature'
import OlGeomPoint from 'ol/geom/Point'
import OlSourceVector from 'ol/source/Vector'
import OlLayerVector from 'ol/layer/Vector'

const messages = [
  {
    title: 'title',
    marquee: 'marquee',
    splash: 'splash',
    active: 'true',
    pods_url: 'pods_url'
  }
]
const content = new Content(messages)
 

describe('constructor', () => {
  let container
  const highlightSite = App.prototype.highlightSite
  beforeEach(() => {
    $.resetMocks()
    container = $('<div></div>')
    $('body')
      .append(container)
      .append($('<h2 id="marquee"> <div><div><div></div></div></div> </h2>'))
      .append($('<div class="legend" aria-hidden="true" style="display: none;" <div class="leg"><div class="leg-it"><div class="leg-sw closed"></div><span>Closed</span></div><div class="leg-it"><div class="leg-sw open"></div><span>Open</span></div><div class="leg-it"><div class="leg-sw open-soon"></div><span>Opening Soon</span></div></div></div>'))

    App.prototype.highlightSite = jest.fn()

  })

  afterEach(() => {
    container.remove()
    $('.alert').removeClass()
    $('#marquee').remove()
    $('.legend').css('display', 'none')
    App.prototype.highlightSite = highlightSite
  })

  test('constructor', () => {
    expect.assertions(80)

    const app = new App(content, content.message('pods_url'))

    expect(app instanceof App).toBe(true)
    expect(app instanceof FinderApp).toBe(true)
    expect(app instanceof MapMgr).toBe(true)
   
    expect(app.content).toBe(content)


    expect($('#banner div').html()).toBe(content.message('title'))
    expect($('.splash div.dia-msg').html()).toBe(content.message('splash'))


    expect(app.source).not.toBeNull()
    expect(app.source.getUrl()).toBe(content.message('pods_url'))
    expect(app.source.getFormat() instanceof Decorate).toBe(true)
    expect(app.source.getFormat().decorations[0]).toBe(FinderApp.FEATURE_DECORATIONS)
    expect(app.source.getFormat().decorations[1].app instanceof FinderApp).toBe(true)
    expect(app.source.getFormat().decorations[2].content).toBe(content)
    expect(app.source.getFormat().decorations[3]).toBe(decorations)
    expect(app.source.getFormat().parentFormat instanceof GeoJson).toBe(true)
    expect(app.source.getFormat().parentFormat.dataProjection.getCode()).toBe('EPSG:2263')
    expect(app.source.getFormat().parentFormat.defaultFeatureProjection.getCode()).toBe('EPSG:3857')

    expect(app.layer.getSource()).toBe(app.source)
    expect(app.layer.getStyle()).toBe(facilityStyle.pointStyle)
    expect(app.layer.getZIndex()).toBe(1)

    expect(app.facilitySearch.displayField).toBe('search_label')
    expect(app.facilitySearch.nameField).toBe('name')

    expect(app.tabs.find('.btn-0').html()).toBe('Map')
    expect(app.tabs.find('.btn-1').html()).toBe('PODs')
    expect(app.tabs.find('.btn-2').html()).toBe('Filters')

    expect(app.tabs.tabs.find('.tab-0').get(0)).toBe($('#map').get(0))
    expect(app.tabs.tabs.find('.tab-1').get(0)).toBe($('#facilities').get(0))
    expect(app.tabs.tabs.find('.tab-2').get(0)).toBe($('#filters').get(0))

    
    /* FILTERS */
    expect(app.filters.choiceControls.length).toBe(2)

    expect(app.filters.choiceControls[1].radio).toBeUndefined()
    expect(app.filters.choiceControls[1].choices.length).toBe(3)
    expect($('.filter-1 .clps .rad-top').html()).toBe('Status')
    
    expect(app.filters.choiceControls[1].choices[0].label).toBe('Open to Public')
    expect(app.filters.choiceControls[1].choices[0].name).toBe('status')
    expect(app.filters.choiceControls[1].choices[0].values).toEqual(['Open to Public'])
    expect(app.filters.choiceControls[1].choices[0].checked).toBe(true)

    expect(app.filters.choiceControls[1].choices[1].label).toBe('Opening Soon')
    expect(app.filters.choiceControls[1].choices[1].name).toBe('status')
    expect(app.filters.choiceControls[1].choices[1].values).toEqual(['Mobilizing'])
    expect(app.filters.choiceControls[1].choices[1].checked).toBe(true)

    expect(app.filters.choiceControls[1].choices[2].label).toBe('Closed to Public')
    expect(app.filters.choiceControls[1].choices[2].name).toBe('status')
    expect(app.filters.choiceControls[1].choices[2].values).toEqual(['Closed to Public', 'Demobilizing', 'Demobilized'])
    expect(app.filters.choiceControls[1].choices[2].checked).toBe(true)


    expect(app.filters.choiceControls[0].radio).toBeUndefined()
    expect(app.filters.choiceControls[0].choices.length).toBe(5)
    expect($('.filter-0 .clps .rad-top').html()).toBe('Borough')

    expect(app.filters.choiceControls[0].choices[0].label).toBe('Brooklyn')
    expect(app.filters.choiceControls[0].choices[0].name).toBe('boro')
    expect(app.filters.choiceControls[0].choices[0].values).toEqual(['Brooklyn'])
    expect(app.filters.choiceControls[0].choices[0].checked).toBe(true)

    expect(app.filters.choiceControls[0].choices[1].label).toBe('Bronx')
    expect(app.filters.choiceControls[0].choices[1].name).toBe('boro')
    expect(app.filters.choiceControls[0].choices[1].values).toEqual(['Bronx'])
    expect(app.filters.choiceControls[0].choices[1].checked).toBe(true)

    expect(app.filters.choiceControls[0].choices[2].label).toBe('Queens')
    expect(app.filters.choiceControls[0].choices[2].name).toBe('boro')
    expect(app.filters.choiceControls[0].choices[2].values).toEqual(['Queens'])
    expect(app.filters.choiceControls[0].choices[2].checked).toBe(true)

    expect(app.filters.choiceControls[0].choices[3].label).toBe('Staten Island')
    expect(app.filters.choiceControls[0].choices[3].name).toBe('boro')
    expect(app.filters.choiceControls[0].choices[3].values).toEqual(['Staten Island'])
    expect(app.filters.choiceControls[0].choices[3].checked).toBe(true)

    expect(app.filters.choiceControls[0].choices[4].label).toBe('Manhattan')
    expect(app.filters.choiceControls[0].choices[4].name).toBe('boro')
    expect(app.filters.choiceControls[0].choices[4].values).toEqual(['Manhattan'])
    expect(app.filters.choiceControls[0].choices[4].checked).toBe(true)


    expect(app.directionsUrl).toBe(pods.DIRECTIONS_URL)
    expect(app.locationMgr.locator.geocoder.url).toBe(`${pods.GEOCLIENT_URL}&input=`)

    expect(app.highlightLayer.getStyle()).toBe(facilityStyle.highlightStyle)
    expect(app.highlightLayer.getSource()).toBe(app.highlightSource)
  

    let baseLayer = app.map.getBaseLayers().labels.base
    expect(baseLayer.getZIndex()).toBe(0)

    let textLayer = app.map.getLayers().getArray().slice(-1)[0]
    expect(textLayer.getZIndex()).toBe(2)
    expect(textLayer.getStyle()).toBe(facilityStyle.textStyle)
    expect(textLayer.getSource()).toBe(app.source)
    expect(textLayer.get('declutter')).toBe(true)


    expect($('#marquee div>div>div').html()).toBe(content.message('marquee'))    
    expect($('body').hasClass('alert')).toBe(true)

    let legend = $('.legend')
    expect(legend.css('display')).toBe('block')
    expect($('.desc').children().last().html()).toBe(legend.html())


    expect(app.highlightSite).toHaveBeenCalledTimes(1)

  })

  test('contructor - active is false -> no marquee content', () => {
    expect.assertions(2)
    const app = new App(content, content.message('pods_url'))
    expect($('body').hasClass('alert')).toBe(false)
    expect($('#marquee div>div>div').html()).toBe('')

  })

test('addMarquee', () => {
  const app = new App(content, content.message('pods_url'))
  $.resetMocks()
  app.addMarquee()
  expect($('#marquee div>div>div').html()).toBe(content.message('marquee'))    
  expect($('body').hasClass('alert')).toBe(true)
})

test('addDescription', () => {
  const app = new App(content, content.message('pods_url'))
  $.resetMocks()
  app.addDescription()
  expect($('#facilities .list').prev()).toBe($('.description'))

})
  
})

describe('highlightSite', () => {
  let feature1Div, feature2Div
  
  const feature1 = {
    getId: jest.fn().mockImplementation(() => {
      return 'feature1'
    })
  }
  const feature2 = {
    getId: jest.fn().mockImplementation(() => {
      return 'feature2'
    })
  }
  const mockMap = {
    eventHandlers: {},
    on: (eventName, callback) => {
      mockMap.eventHandlers[eventName] = callback
    },
    trigger: (eventName, event) => {
      mockMap.eventHandlers[eventName](event)
    } 
  }

  beforeEach(() => {
    feature1.getId.mockClear()
    feature2.getId.mockClear()
    feature1Div = $('<div class="lst-it"><div class="feature1"></div></div>')
    feature2Div = $('<div class="lst-it"><div class="feature2"></div></div>')
    $('body').append(feature1Div).append(feature2Div)
    mockMap.eventHandlers = {}

  })
  afterEach(() => {
    feature1Div.remove()
    feature2Div.remove()
    
  })

  test('highlightSite', () => {
    expect.assertions(4)
    const app = new App(content, content.message('pods_url'))
    app.map = mockMap
    app.map.forEachFeatureAtPixel = jest.fn()
    app.highlightSite()
    mockMap.trigger('pointermove', {pixel: 'mockPixel'})
    expect(app.map.forEachFeatureAtPixel).toHaveBeenCalledTimes(1)
    expect(app.map.forEachFeatureAtPixel.mock.calls[0][0]).toBe('mockPixel')
    expect(app.map.forEachFeatureAtPixel.mock.calls[0][1]).toBe(app.highlightListItem)
    expect($('.lst-it').hasClass('active')).toBe(false)
  })

  test('highlightListItem', () => {
    expect.assertions(2)
    const app = new App(content, content.message('pods_url'))

    app.highlightListItem(feature1)
    expect($('.feature1').parent().hasClass('active')).toBe(true)
    app.highlightListItem(feature2)
    expect($('.feature2').parent().hasClass('active')).toBe(true)

  })
  
})