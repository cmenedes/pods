/**
 * @module pods/App
 */

import $ from 'jquery'
import pods from './pods'
import decorations from './decorations'
import MapMgr from 'nyc-lib/nyc/ol/MapMgr'

import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import GeoJson from 'ol/format/GeoJSON'
import facilityStyle from './facility-style'
import Basemap from 'nyc-lib/nyc/ol/Basemap'

import {extend as extentExtend} from 'ol/extent'
import Directions from 'nyc-lib/nyc/Directions'
import Point from 'ol/geom/Point'


class App extends FinderApp {
  /**
   * @desc Create an instance of App
   * @public
   * @constructor
   * @param {module:nyc-lib/nyc/Content~Content} content The POD content
   * @param {string} url The POD data URL
   */
  constructor(content, url) {
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
      decorations: [{content: content}, decorations],
      filterChoiceOptions: [{
        title: 'Status',
        choices: [
          {name: 'Ops_status', values: ['Open to Public'], label: 'Open to Public', checked: true},
          {name: 'Ops_status', values: ['Opening Soon'], label: 'Opening Soon', checked: true},
          {name: 'Ops_status', values: ['Closed to Public'], label: 'Closed to Public', checked: true}
        ]
      }],
      geoclientUrl: pods.GEOCLIENT_URL,
      directionsUrl: pods.DIRECTIONS_URL
    })
    this.content = content
    const active = content.message('active')
    const marquee = content.message('marquee')

    this.addMarquee(active, marquee)
    this.addDescription()
    this.setHomeZoom()
    this.adjustFilters(active)


  }

  addMarquee(active, marquee) {
    if (active == 'true') {
      $('body').addClass('alert')
      $('#marquee div>div>div').html(marquee)
    }
  }
  addDescription(){
    let facilities = $('.fnd #facilities')
    facilities.prepend($('<div class="ada-content">All NYC Points of Dispensing<br>sites are wheelchair accessible</div>'))
  }
  setHomeZoom(){
    let home = $('<div class="home-btn" aria-label="Reset the zoom" class="button"><div class="btn-sq rad-all btn-home"></div></div>')
    home.insertAfter($('.geoloc'))
    $('.home-btn').on('click', () => {
      this.map.getView().setZoom(10)
      this.map.getView().setCenter(Basemap.CENTER)
    })
  }
  adjustFilters(active){
    if(active == 'false'){
      $('.btn-2').parent().remove()
    }
  }
  
  located(location) {
    super.located(location)
    let extent = new Point(location.coordinate).getExtent()
    const features = this.source.sort(location.coordinate)
    for(let i = 0; i < 3; i++){
      extent = extentExtend(extent, features[i].getGeometry().getExtent())
    }
    this.view.fit(extent, {size: this.map.getSize(), duration: 500})
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

}

export default App