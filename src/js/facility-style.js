/**
 * @module pods/facility-style
 */

import Style from 'ol/style/Style'
import nycOl from 'nyc-lib/nyc/ol' 
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Text from 'ol/style/Text'



const facilityStyle = {

  pointStyle: (feature, resolution) => {
    const zoom = nycOl.TILE_GRID.getZForResolution(resolution)
    const active = feature.getActive()
    const status = feature.getStatus()
    const siteName = feature.getName()

    let fillColor = '#0080A9'

    if (active === 'true') {
      if(status === 'Open to Public') {
        fillColor = '#19DB17'
      }
      else if (status === 'Opening Soon') {
        fillColor = '#F3E318'
      }
      else if (status === 'Closed to Public') {
        fillColor = '#999999'
      }
    }
    
    const radius = facilityStyle.calcRadius(zoom)

    const style = [
      new Style({
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
      })
    ]

    if (zoom > 13) {
      facilityStyle.textStyle(radius, siteName, style)
    }

    return style
  },
  calcRadius: (zoom) => {
    let radius = 6
    if (zoom > 17) radius = 20
    else if (zoom > 15) radius = 16
    else if (zoom > 13) radius = 12
    else if (zoom > 11) radius = 8
    return radius
  },
  highlightStyle: (feature, resolution) => {
    const zoom = nycOl.TILE_GRID.getZForResolution(resolution)
    const radius = facilityStyle.calcRadius(zoom)
    return new Style({
      image: new Circle({
        radius: radius * 1.5,
        stroke: new Stroke({
          color: 'rgb(0,128,169,.5)',
          width: radius
        })
      })
    })
  },

  textStyle: (size, siteName, style) => {
    const fontSize = size
    siteName = facilityStyle.stringDivider(siteName, 24, '\n')
    style.push(
      new Style({
        text: new Text({
          fill: new Fill({color: '#000'}),
          font: `bold ${fontSize}px sans-serif`,
          text: siteName,
          offsetX: 1.5 * fontSize,
          textAlign: 'left',
          stroke: new Stroke({color: 'rgb(254,252,213)', width: fontSize / 2}),
          zIndex: 1
        })
      })
    )
  },

  stringDivider: (str, width, spaceReplacer) => {
    if (str.length > width) {
      let p = width
      while (p > 0 && (str[p] != ' ' && str[p] != '-')) {
        p--
      }
      if (p > 0) {
        let left;
        if (str.substring(p, p + 1) == '-') {
          left = str.substring(0, p + 1)
        } else {
          left = str.substring(0, p);
        }
        let right = str.substring(p + 1)
        return left + spaceReplacer + facilityStyle.stringDivider(right, width, spaceReplacer)
      }
    }
    return str;
  }
}

export default facilityStyle

  