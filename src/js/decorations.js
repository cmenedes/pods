/**
 * @module pods/decorations
 */

import pods from './pods'
import nyc from 'nyc-lib/nyc'

const decorations = {
  extendFeature() {
    this.setId(this.get('DOECode'))
    this.active = this.content.message('active')

    this.set(
      'search_label',
      `<b><span class="srch-lbl-lg">${this.getName()}</span></b><br>
      <span class="srch-lbl-sm">${this.getAddress1()}</span>`
    )
  },
  getName() {
    return this.get('PODSiteName')
  },
  html() {
    return $('<div class="facility"></div>')
      .addClass(this.cssClass())
      .append(this.distanceHtml())
      .append(this.nameHtml())
      .append(this.distanceHtml(true))
      .append(this.addressHtml())
      .append(this.detailsHtml())
      .append(this.mapButton())
      .append(this.directionsButton())
      .data('feature', this)
      .mouseover($.proxy(this.handleOver, this))
      .mouseout($.proxy(this.handleOut, this))
  },  
  getTip() {
    return $('<div></div>')
      .append(this.nameHtml())
      .append(this.addressHtml())
      .append(this.detailsHtml())
  },
  getAddress1() {
    return this.get('Address')
  },
  getCityStateZip() {
    return `${this.get('Borough')}, NY ${this.get('ZIP')}`
  },
  getActive() {
    return this.active
  },
  getStatus() {
    return this.get('Ops_status')
  },
  setStatus(status) {
    this.set('Ops_status', status)
  },
  getLatestDate() {
    let date = this.get('LatestDate')

    if(date){
      let date_convert = new Date(date)
      return `${date_convert.toLocaleDateString()} ${date_convert.toLocaleTimeString()}` 
    }
  },
  getOpeningTime() {
    let time = this.get('OpeningTime')

    if(time){
      let time_convert = new Date(time)
      return `${time_convert.toLocaleDateString()} ${time_convert.toLocaleTimeString()}` 
    }
  },
  getWaitTime() {
    return this.get('wait_time')
  },
  detailsHtml() {
    if (this.getActive() === 'true') {
      
      let ul = $('<ul></ul>')

      if (this.getStatus() === 'Open to Public') {
        this.setStatus('Open to Public')
        const wait = this.getWaitTime() ? this.getWaitTime() + ' minutes' : 'N/A'
        const waitTime = `<li><b>Wait time:</b> ${wait} </li>`

        ul.append(waitTime)
      }
      else if(this.getStatus() === 'Mobilizing' || this.getStatus() === 'Opening Soon'){
        this.setStatus('Opening Soon')
        const openingTime = `<li><b>Opening at:</b> ${this.getOpeningTime() || 'N/A'} </li>`
        
        ul.append(openingTime)
      }
      else if(this.getStatus() === 'Closed to Public' || this.getStatus() === 'Demobilizing' || this.getStatus() === 'Demobilized'){
        this.setStatus('Closed to Public')
      }
    
      const status = `<li><b>Status:</b> ${this.getStatus()}</li>`

      const update = this.getLatestDate()
      const latestUpdate = `<li><b>Last Updated:</b> ${update || 'N/A'}`
      ul.append(latestUpdate)

      ul.prepend(status)

      return ul
    }
  }

}

export default decorations