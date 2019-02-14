/**
 * @module pods/facility-style
 */

import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import nycOl from 'nyc-lib/nyc/ol' 

const facilityStyle = {

  pointStyle: (feature, resolution) => {
    const zoom = nycOl.TILE_GRID.getZForResolution(resolution)

    const active = feature.getActive()
    const status = feature.getStatus()

    let img
    if(active === 'false')
      img = 'img/inactive-icon.svg'
    else if(active === 'true' && status === 'Open to Public')
      img = 'img/open-icon.svg'
    else //this should check if status is 'Closed to Public' but not all fields have that value at the moment
      img = 'img/close-icon.svg'

      let size = 12
      if (zoom > 17) size = 40
      else if (zoom > 15) size = 32
      else if (zoom > 13) size = 24
      else if (zoom > 11) size = 16

    const style = [new Style({
      image: new Icon({
        src: img,
        scale: size / 33,
        imgSize: [33, 33]
      })
    })]
  
    return style
  }
}

export default facilityStyle

  