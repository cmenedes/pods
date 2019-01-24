/**
 * @module pods/App
 */

import $ from 'jquery'
import pods from './pods'
import decorations from './decorations'

import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'

class App extends FinderApp {
  /**
   * @desc Create an instance of App
   * @public
   * @constructor
   * @param {module:nyc-lib/nyc/Content~Content} content The hurricane content
   */
  constructor(content) {
    super({
      title: content.message('title'),
      splashOptions: {
        message: content.message('splash')
      },
      facilityUrl: pods.PODS_URL,
      facilityFormat: new CsvPoint({
        id: 'POD_ID',
        x: 'Longitude',
        y: 'Latitude',
        defaultDataProjection: 'EPSG:4326'
      }),
      facilityTabTitle: 'PODs',
      decorations: [decorations],
      filterChoiceOptions: [{
        title: 'Status',
        choices: [
          {name: 'Operations_Status', values: ['Open to Public'], label: 'Open to Public', checked: true},
          {name: 'Operations_Status', values: ['Mobilizing'], label: 'Mobilizing', checked: true},
          {name: 'Operations_Status', values: ['Closed to Public'], label: 'Closed to Public', checked: true},
          {name: 'Operations_Status', values: [''], label: 'Unkown', checked: true},
        ]
      }],
      geoclientUrl: pods.GEOCLIENT_URL,
      directionsUrl: pods.DIRECTIONS_URL
    })
    this.content = content
    const marquee = content.message('marquee')
    if (marquee) {
      $('body').addClass('alert')
      $('#marquee div>div>div').html(marquee)
    }
  }
}

export default App