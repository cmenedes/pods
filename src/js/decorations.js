/**
 * @module pods/decorations
 */

import pods from './pods'
import nyc from 'nyc-lib/nyc'

const decorations = {
  extendFeature() {
    this.setId(this.get('DOECode'))
    this.active = this.content.message('active')
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
  getActive() {
    return this.active
  },
  getStatus() {
    return this.get('Ops_status')
  },
  detailsHtml() {
    if (this.getActive() === 'true') {
      const open = new Date(this.get('OpeningTime'))
      const update = new Date(this.get('LatestDate'))

      const status = `<li><b>Status:</b> ${this.get('Ops_status')}</li>`
      const waitTime = `<li><b>Wait time:</b> ${this.get('wait_time')} minutes</li>`
      const latestUpdate = `<li><b>Last update:</b> ${update.toLocaleDateString()} ${update.toLocaleTimeString()}`

      let ul = $('<ul></ul>').append((`<li><b>Status:</b> ${this.get('Ops_status')}</li>`))

      if (this.getStatus() === 'Open to Public') {
        ul.append(waitTime)
          .append(latestUpdate)
      }
      return ul
    }
  }

}

export default decorations