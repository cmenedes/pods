import App from '../src/js/App'
import decorations from '../src/js/decorations'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import GeoJson from 'ol/format/GeoJSON'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import Content from 'nyc-lib/nyc/Content'
import Decorate from 'nyc-lib/nyc/ol/format/Decorate'


describe('constructor', () => {
  let messages, content, container
  beforeEach(() => {
    $.resetMocks()
    messages = [
      {
        title: 'Points of Dispensing (POD) Finder',
        marquee: 'DOHMH controlled content (if empty the marquee is hidden)',
        splash: 'DOHMH controlled content - any message you like goes here - updated via an uploaded CSV file.',
        active: 'true'
      }
    ]
    content = new Content(messages)

    container = $('<div></div>')
    $('body')
      .append(container)
      .append($('<h2 id="marquee"> <div><div><div></div></div></div> </h2>'))

   
  })

  afterEach(() => {
    container.remove()
  })

  test('constructor', () => {
    expect.assertions(41)
    const app = new App(content)

    expect(app instanceof App).toBe(true)
    expect(app instanceof FinderApp).toBe(true)
   
    expect(app.content).toBe(content)

    expect(app.layer.getSource()).toBe(app.source)

    expect(app.source).not.toBeNull()
    expect(app.source.getFormat() instanceof Decorate).toBe(true)
    expect(app.source.getFormat().decorations[0]).toBe(FinderApp.FEATURE_DECORATIONS)
    expect(app.source.getFormat().decorations[1].app instanceof FinderApp).toBe(true)
    expect(app.source.getFormat().decorations[2].content).toBe(content)
    expect(app.source.getFormat().decorations[3]).toBe(decorations)
    expect(app.source.getFormat().parentFormat instanceof GeoJson).toBe(true)
    expect(app.source.getFormat().parentFormat.dataProjection.getCode()).toBe('EPSG:2263')
    expect(app.source.getFormat().parentFormat.defaultFeatureProjection.getCode()).toBe('EPSG:3857')

    expect(app.tabs.find('.btn-0').html()).toBe('Map')
    expect(app.tabs.find('.btn-1').html()).toBe('PODs')
    expect(app.tabs.find('.btn-2').html()).toBe('Filters')

    expect(app.tabs.tabs.find('.tab-0').get(0)).toBe($('#map').get(0))
    expect(app.tabs.tabs.find('.tab-1').get(0)).toBe($('#facilities').get(0))
    expect(app.tabs.tabs.find('.tab-2').get(0)).toBe($('#filters').get(0))

    expect(app.filters.choiceControls.length).toBe(1)
    expect(app.filters.choiceControls[0].radio).toBeUndefined()
    expect(app.filters.choiceControls[0].choices.length).toBe(4)
    expect(app.filters.choiceControls[0].choices.length).toBe(4)
    
    expect(app.filters.choiceControls[0].choices[0].label).toBe('Open to Public')
    expect(app.filters.choiceControls[0].choices[0].name).toBe('Ops_status')
    expect(app.filters.choiceControls[0].choices[0].values).toEqual(['Open to Public'])
    expect(app.filters.choiceControls[0].choices[0].checked).toBe(true)

    expect(app.filters.choiceControls[0].choices[1].label).toBe('Mobilizing')
    expect(app.filters.choiceControls[0].choices[1].name).toBe('Ops_status')
    expect(app.filters.choiceControls[0].choices[1].values).toEqual(['Mobilizing'])
    expect(app.filters.choiceControls[0].choices[1].checked).toBe(true)

    expect(app.filters.choiceControls[0].choices[2].label).toBe('Closed to Public')
    expect(app.filters.choiceControls[0].choices[2].name).toBe('Ops_status')
    expect(app.filters.choiceControls[0].choices[2].values).toEqual(['Closed to Public'])
    expect(app.filters.choiceControls[0].choices[2].checked).toBe(true)

    expect(app.filters.choiceControls[0].choices[3].label).toBe('Unknown')
    expect(app.filters.choiceControls[0].choices[3].name).toBe('Ops_status')
    expect(app.filters.choiceControls[0].choices[3].values).toEqual([''])
    expect(app.filters.choiceControls[0].choices[3].checked).toBe(true)

    expect($('body').hasClass('alert')).toBe(true)
    expect($('#marquee div>div>div').html()).toBe(content.message('marquee'))

  })


  
})