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


class App extends FinderApp {
  /**
   * @desc Create an instance of App
   * @public
   * @constructor
   * @param {module:nyc-lib/nyc/Content~Content} content The POD content
   */
  constructor(content) {
    super({
      title: content.message('title'),
      splashOptions: {
        message: content.message('splash')
      },
      facilityUrl: pods.PODS_URL,
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
          {name: 'Ops_status', values: ['Mobilizing'], label: 'Mobilizing', checked: true},
          {name: 'Ops_status', values: ['Closed to Public'], label: 'Closed to Public', checked: true},
          {name: 'Ops_status', values: [''], label: 'Unknown', checked: true},
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
    
  }

  addMarquee(active, marquee) {
    if (active == 'true') {
      $('body').addClass('alert')
      $('#marquee div>div>div').html(marquee)
    }
  }
  addDescription(){
    let facilities = $('.fnd #facilities')
    facilities.prepend($('<div class="ada-content">All NYC Points of Dispensing<br>Sites are ADA Accessible.</div>'))
  }
  setHomeZoom(){
    let home = $('<div class="home-btn" aria-label="Reset the zoom" class="button"><div class="btn-sq rad-all btn-home"></div></div>')
    home.insertAfter($('.geoloc'))
    $('.home-btn').on('click', () => {
      this.map.getView().setZoom(10)
      this.map.getView().setCenter(Basemap.CENTER)
    })
  }

}

export default App