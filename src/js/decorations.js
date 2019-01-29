/**
 * @module pods/decorations
 */

import pods from './pods'
import nyc from 'nyc-lib/nyc'

const decorations = {
  extendFeature() {
    this.setId(this.get('DOECode'))
  },
  getName() {
    return this.get('PODSiteName')
  },
  getAddress1() {
    return this.get('Address')
  },
  getCityStateZip() {
    return `${this.get('Borough')}, NY ${this.get('ZIP')}`
  },
  detailsHtml() {
    const date = new Date(this.get('LatestDate'))
    return $('<ul></ul>')
      .append(`<li><b>Status:</b> ${this.get('Ops_status')}</li>`)
      //.append(`<li><b>Opens:</b> ${this.get('Opening_Date')} ${this.get('Opening_Time')}</li>`)
      .append(`<li><b>Wait time:</b> ${this.get('wait_time')} minutes</li>`)
      //.append(`<li><b>Last update:</b> ${this.get('Latest_Update_Date')} ${this.get('Latest_Update_Time')}</li>`) 
      .append(`<li><b>Last update:</b> ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`) 
  }
}

export default decorations