/**
 * @module pods/decorations
 */

import pods from './pods'
import nyc from 'nyc-lib/nyc'

const decorations = {
  getName() {
    return this.get('POD_Site_Name')
  },
  getAddress1() {
    return this.get('Address')
  },
  getCityStateZip() {
    return `${this.get('Borough')}, NY ${this.get('Zip')}`
  },
  detailsHtml() {
    return $('<ul></ul>')
      .append(`<li><b>Status:</b> ${this.get('Operations_Status')}</li>`)
      .append(`<li><b>Opens:</b> ${this.get('Opening_Date')} ${this.get('Opening_Time')}</li>`)
      .append(`<li><b>Wait time:</b> ${this.get('Wait_Time')} minutes</li>`)
      .append(`<li><b>Last update:</b> ${this.get('Latest_Update_Date')} ${this.get('Latest_Update_Time')}</li>`) 
  }
}

export default decorations