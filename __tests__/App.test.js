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



describe('constructor', () => {
  let messages, content, container
  beforeEach(() => {
    $.resetMocks()
    messages = [
      {
        title: 'Points of Dispensing (POD) Finder',
        marquee: 'DOHMH controlled content (if empty the marquee is hidden)',
        splash: 'DOHMH controlled content - any message you like goes here - updated via an uploaded CSV file.',
        active: 'true',
        pods_url: 'https://services3.arcgis.com/A6Zjpzrub8ESZ3c7/arcgis/rest/services/vwLatestDateLocator/FeatureServer/0/query?f=pgeojson&outSR=2263&outFields=ActivePOD%20as%20activepod,DOHMHPODLink%20as%20lnk,DOECode%20as%20id,PODSiteName%20as%20name,Address%20as%20addr,Borough%20as%20boro,ZIP%20as%20zip,Ops_status%20as%20status,OpeningTime%20as%20opening,wait_time%20as%20wait,LatestDate%20as%20updated,%20LabelPos%20as%20labelpos&where=activepod%3D1'
      }
    ]
    content = new Content(messages)

    container = $('<div></div>')
    $('body')
      .append(container)
      .append($('<h2 id="marquee"> <div><div><div></div></div></div> </h2>'))
      .append($('<div class="legend" aria-hidden="true" style="display: none;" <div class="leg"><div class="leg-it"><div class="leg-sw closed"></div><span>Closed</span></div><div class="leg-it"><div class="leg-sw open"></div><span>Open</span></div><div class="leg-it"><div class="leg-sw open-soon"></div><span>Opening Soon</span></div></div></div>'))


   
  })

  afterEach(() => {
    container.remove()
    $('.alert').removeClass()
    $('#marquee').remove()
    $('.legend').css('display', 'none')
  })

  test('constructor', () => {
    expect.assertions(73)

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

    expect(app.facilitySearch.displayField).toBe('search_label')
    expect(app.facilitySearch.nameField).toBe('PODSiteName')

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


    expect($('#marquee div>div>div').html()).toBe(content.message('marquee'))    
    expect($('body').hasClass('alert')).toBe(true)

    expect($('.desc').html()).toBe('All Points of Dispensing sites may not be activated at the time of an incident. Please continue checking this page to see which sites are activated following an event.<br><br>Click on the NYC Health Logo to refresh the map.')


    let legend = $('.legend')
    expect(legend.css('display')).toBe('block')

    /* TODO */
    //check label layer is added to map
    //check zIndex set properly on all layers
    //check highlight site is called

  })

  test('contructor - active is false -> no marquee content', () => {
    expect.assertions(2)
    messages = [
      {
        title: 'Points of Dispensing (POD) Finder',
        marquee: 'DOHMH controlled content - any message you like goes here - updated via an uploaded CSV file.',
        splash: 'DOHMH controlled content - any message you like goes here - updated via an uploaded CSV file.',
        active: 'false',
        pods_url: 'https://services3.arcgis.com/A6Zjpzrub8ESZ3c7/arcgis/rest/services/vwLatestDateLocator/FeatureServer/0/query?f=pgeojson&outSR=2263&outFields=ActivePOD%20as%20activepod,DOHMHPODLink%20as%20lnk,DOECode%20as%20id,PODSiteName%20as%20name,Address%20as%20addr,Borough%20as%20boro,ZIP%20as%20zip,Ops_status%20as%20status,OpeningTime%20as%20opening,wait_time%20as%20wait,LatestDate%20as%20updated,%20LabelPos%20as%20labelpos&where=activepod%3D1'
      }
    ]
    content = new Content(messages)
    const app = new App(content, content.message('pods_url'))
    expect($('body').hasClass('alert')).toBe(false)
    expect($('#marquee div>div>div').html()).toBe('')


  })

  
})