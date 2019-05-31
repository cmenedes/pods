/**
 * @module pods/App
 */

import $ from 'jquery'
import pods from './pods'
import decorations from './decorations'

import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import GeoJson from 'ol/format/GeoJSON'
import facilityStyle from './facility-style'

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

    const filters = [{
      title: 'Borough',
      choices: [
        { name: 'boro', values: ['Brooklyn'], label: 'Brooklyn', checked: true },
        { name: 'boro', values: ['Bronx'], label: 'Bronx', checked: true },
        { name: 'boro', values: ['Queens'], label: 'Queens', checked: true },
        { name: 'boro', values: ['Staten Island'], label: 'Staten Island', checked: true },
        { name: 'boro', values: ['Manhattan'], label: 'Manhattan', checked: true }
      ]
    }]
    if (content.message('active') === 'true') {
      filters.push({
        title: 'Status',
        choices: [
          { name: 'status', values: ['Open to Public'], label: 'Open to Public', checked: true },
          { name: 'status', values: ['Mobilizing'], label: 'Opening Soon', checked: true },
          { name: 'status', values: ['Closed to Public', 'Demobilizing', 'Demobilized'], label: 'Closed to Public', checked: true }
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
      facilitySearch: { displayField: 'search_label', nameField: 'name' },
      decorations: [{ content: content }, decorations],
      filterChoiceOptions: filters,
      geoclientUrl: pods.GEOCLIENT_URL,
      directionsUrl: pods.DIRECTIONS_URL,
      defaultDirectionsMode: 'WALKING',
      highlightStyle: facilityStyle.highlightStyle
    })

    this.content = content
    this.addMarquee()
    this.addDescription()
    this.addLegend()
    this.rearrangeLayers()
    this.addLabels()
    this.highlightSite()

  }

  rearrangeLayers() {
    this.map.getBaseLayers().labels.base.setZIndex(0)
    this.layer.setZIndex(1)
  }

  addLabels() {
    this.map.addLayer(
      new Layer({
        source: this.source,
        style: facilityStyle.textStyle,
        declutter: true,
        zIndex: 2
      })
    )
  }

  highlightSite() {
    const highlight = this.highlightListItem
    const map = this.map
    map.on('pointermove', event => {
      $('.lst-it').removeClass('active')
      map.forEachFeatureAtPixel(event.pixel, highlight)
    })
  }

  highlightListItem(feature) {
    $(`.${feature.getId()}`).parent().addClass('active')
  }

  addMarquee() {
    const active = this.content.message('active')
    const marquee = this.content.message('marquee')
    if (active === 'true') {
      $('body').addClass('alert')
      $('#marquee div>div>div').html(marquee)
    }
  
  }
  addDescription() {
    let list = $('#facilities .list')
    $(pods.DESCRIPTION_HTML).insertBefore(list)
  }

  addLegend() {
    const active = this.content.message('active')
    let desc = $('.desc')
    if(active == 'true'){
      $('.legend').css('display', 'block')
      desc.append($('.legend'))
    }
  }
  
  located(location) {
    super.located(location)
    this.zoomToExtent(location.coordinate, 3)
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
    if ($('#tabs .btns h2:first-of-type').css('display') !== 'none') {
      this.tabs.open('#map')
    }
    this.zoomToExtent(feature.getGeometry().getCoordinates(), 4)
  }

}

export default App