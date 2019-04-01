/**
 * @module pods/App
 */

import $ from 'jquery'
import pods from './pods'
import decorations from './decorations'

import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import GeoJson from 'ol/format/GeoJSON'
import facilityStyle from './facility-style'
import Basemap from 'nyc-lib/nyc/ol/Basemap'

import {extend as extentExtend} from 'ol/extent'

import Directions from 'nyc-lib/nyc/Directions'
import Point from 'ol/geom/Point'

import Layer from 'ol/layer/Vector'



class App extends FinderApp {
  /**
   * @desc Create an instance of App
   * @public
   * @constructor
   * @param {module:nyc-lib/nyc/Content~Content} content The POD content
   * @param {string} url The POD data URL
   */
  constructor(content, url) {
    let filters = [{
      title: 'Borough',
      choices: [
        { name: 'Borough', values: ['Brooklyn'], label: 'Brooklyn', checked: true },
        { name: 'Borough', values: ['Bronx'], label: 'Bronx', checked: true },
        { name: 'Borough', values: ['Queens'], label: 'Queens', checked: true },
        { name: 'Borough', values: ['Staten Island'], label: 'Staten Island', checked: true },
        { name: 'Borough', values: ['Manhattan'], label: 'Manhattan', checked: true }
      ]
    }]
    if(content.message("active") === 'true'){
      filters.unshift({
        title: 'Status',
        choices: [
          { name: 'Ops_status', values: ['Open to Public'], label: 'Open to Public', checked: true },
          { name: 'Ops_status', values: ['Mobilizing'], label: 'Opening Soon', checked: true },
          { name: 'Ops_status', values: ['Closed to Public', 'Demobilizing', 'Demobilized'], label: 'Closed to Public', checked: true }
        ]
      })
  
    }

    
    super({
      title: content.message('title'),
      splashOptions: {
        message: content.message('splash')
      },
      facilityUrl: url,
      facilityFormat: new GeoJson({
        dataProjection: 'EPSG:2263',
        featureProjection: 'EPSG:3857'
      }),
      facilityTabTitle: 'PODs',
      facilityStyle: facilityStyle.pointStyle,
      facilitySearch: { displayField: 'search_label', nameField: 'PODSiteName' },
      decorations: [{ content: content }, decorations],
      filterChoiceOptions: filters,
      geoclientUrl: pods.GEOCLIENT_URL,
      directionsUrl: pods.DIRECTIONS_URL,
      highlightStyle: facilityStyle.highlightStyle
    })
    this.content = content
    const active = content.message('active')
    const marquee = content.message('marquee')

    this.addMarquee(active, marquee)
    this.addDescription()
    this.addLegend(active)
    this.setHomeZoom()
    this.map.getBaseLayers().labels.base.setZIndex(0)
    this.layer.setZIndex(1)

    this.map.addLayer(
      new Layer({
        source: this.source,
        style: facilityStyle.textStyle,
        declutter: true,
        zIndex: 2
      })
    )

    const map = this.map
    map.on('pointermove', event => {
      $('.lst-it').removeClass('active')
      map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
        $(`.${feature.getId()}`).parent().addClass('active')  
      })
    })
  }

  addMarquee(active, marquee) {
    if (active == 'true') {
      $('body').addClass('alert')
      $('#marquee div>div>div').html(marquee)
    }
  }
  addDescription() {
    let facilities = $('.fnd #facilities')
    facilities.prepend($('<div class="ada-content">All NYC Points of Dispensing<br>sites are wheelchair accessible</div>'))
  }
  addLegend(active) {
    let ada = $('.ada-content')
    if(active == 'true'){
      $('.legend').css('display', 'block')
      ada.append($('.legend'))
    }
  }
  setHomeZoom(){
    let home = $('<div class="home-btn" aria-label="Reset the zoom" class="button"><div class="btn-sq rad-all btn-home"></div></div>')
    home.insertAfter($('.geoloc'))
    $('.home-btn').on('click', () => {
      this.map.getView().setZoom(10)
      this.map.getView().setCenter(Basemap.CENTER)
    })
  }
  
  located(location) {
    super.located(location)
    this.zoomToExtent(location.coordinate, 3)
  }

  directionsTo(feature) {
    this.directions = this.directions || new Directions({
      url: this.directionsUrl,
      toggle: '#tabs',
    })
    const to = feature.getFullAddress()
    const name = feature.getName()
    const from = this.getFromAddr()
    this.directions.directions({
      mode: 'WALKING',
      from: from,
      to: to,
      facility: name,
      origin: this.location,
      destination: {
        name: feature.getName(),
        coordinate: feature.getGeometry().getCoordinates()
      }
    })
  }

  zoomToExtent(coord, limit){
    let extent = new Point(coord).getExtent()
    const features = this.source.nearest(coord, limit)

    features.forEach(f => {
      extent = extentExtend(extent, f.getGeometry().getExtent())
    })
      
    this.view.fit(extent, {size: this.map.getSize(), duration: 500})
  }

  zoomTo(feature) {
    const popup = this.popup
    popup.hide()
    this.map.once('moveend', () => {
      popup.showFeature(feature)
    })

    this.zoomToExtent(feature.getGeometry().getCoordinates(), 4)
  }

}

export default App