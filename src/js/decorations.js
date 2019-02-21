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
  getLatestDate() {
    let date = new Date(this.get('LatestDate'))
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}` 
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
        const waitTime = `<li><b>Wait time:</b> ${this.getWaitTime()} minutes</li>`
        const latestUpdate = `<li><b>Last update:</b> ${update}`
        
        ul.append(waitTime)
          .append(latestUpdate)
      }
      return ul
    }
  }

}

export default decorations