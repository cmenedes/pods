/**
 * @module pods/facility-style
 */

import Style from 'ol/style/Style'
import nycOl from 'nyc-lib/nyc/ol' 
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'


const facilityStyle = {

  pointStyle: (feature, resolution) => {
    const zoom = nycOl.TILE_GRID.getZForResolution(resolution)
    const active = feature.getActive()
    const status = feature.getStatus()

    let fillColor

    if(active === 'false'){
      fillColor = '#0080A9'
    }
    else if(active === 'true'){
      if(status === 'Open to Public'){
        fillColor = '#19DB17'
      }
      else if(status === 'Opening Soon'){
        fillColor = '#F3E318'
      }
      else if(status === 'Closed to Public'){
        fillColor = '#999999'
      }
    }
    

      
      let radius = 6
      if (zoom > 17) radius = 20
      else if (zoom > 15) radius = 16
      else if (zoom > 13) radius = 12
      else if (zoom > 11) radius = 8

      return [new Style({
        image: new Circle({
          fill: new Fill({
            color: fillColor
          }),
          radius: radius,
          stroke: new Stroke({
            width: 1,
            color: '#1A1A1A'
          })
        })
      })]
  }
}

export default facilityStyle

  