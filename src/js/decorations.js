/**
 * @module pods/decorations
 */

import pods from './pods'
import nyc from 'nyc-lib/nyc'
import Collapsible from 'nyc-lib/nyc/Collapsible'

const decorations = {
  extendFeature() {
    this.setId(this.get('DOECode'))
    this.active = this.content.message('active')
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
  getLatestDate() {
    let date = this.get('LatestDate')

    if(date){
      let date_convert = new Date(date)
      return `${date_convert.toLocaleDateString()} ${date_convert.toLocaleTimeString()}` 
    }
  },
  getWaitTime() {
    return this.get('wait_time')
  },
  detailsHtml() {
    if (this.getActive() === 'true') {
      const status = `<li><b>Status:</b> ${this.getStatus()}</li>`
      
      let ul = $('<ul></ul>').append(status)

      if (this.getStatus() === 'Open to Public') {
        const update = this.getLatestDate()
        const waitTime = `<li><b>Wait time:</b> ${this.getWaitTime() || '0'} minutes</li>`
        const latestUpdate = `<li><b>Last update:</b> ${update || 'N/A'}`
        
        ul.append(waitTime)
          .append(latestUpdate)
      }
      return ul
    }
  }

}

export default decorations