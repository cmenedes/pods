import OlFeature from 'ol/Feature'
import Content from 'nyc-lib/nyc/Content'
import decorations from '../src/js/decorations'
import Point from 'ol/geom/Point';


let messages = [
  {
    title: 'title',
    marquee: 'marquee',
    splash: 'splash',
    active: 'true'
  }
]
let content = new Content(messages)

//active, closed
const examplePOD1 = new OlFeature({
  geometry: new Point([100, 200]),
  name: 'POD_Site_Name',
  addr: 'Address',
  boro: 'Borough',
  zip: 'Zip',
  id: 'POD_ID',
  status: 'Closed to Public',
  wait: 'Wait_Time',
  updated: '1/10/2019,3:54 PM',
  opening: 'Opening_Time',
  labelpos: 'N',
  lnk: 'Link'
})

$.extend(examplePOD1, decorations, {content: content})
examplePOD1.extendFeature()

//active, open
const examplePOD2 = new OlFeature({
  geometry: new Point([100, 100]),
  name: 'POD_Site_Name',
  addr: 'Address',
  boro: 'Borough',
  zip: 'Zip',
  id: 'POD_ID',
  status: 'Open to Public',
  wait: 'Wait_Time',
  updated: '1/10/2019,3:54 PM',
  opening: 'Opening_Time',
  labelpos: 'S',
  lnk: 'Link'
})

$.extend(examplePOD2, decorations, {content: content})
examplePOD2.extendFeature()

const examplePOD3 = new OlFeature({
  geometry: new Point([200, 200]),
  name: 'POD_Site_Name',
  addr: 'Address',
  boro: 'Borough',
  zip: 'Zip',
  id: 'POD_ID',
  status: 'Mobilizing',
  wait: 'Wait_Time',
  updated: '1/10/2019,3:54 PM',
  opening: '1/10/2019,3:55 PM',
  labelpos: 'E',
  lnk: 'Link'
})

$.extend(examplePOD3, decorations, {content: content})
examplePOD3.extendFeature()

const examplePOD5 = new OlFeature({
  geometry: new Point([300, 0]),
  name: 'POD_Site_Name',
  addr: 'Address',
  boro: 'Borough',
  zip: 'Zip',
  id: 'POD_ID',
  status: 'Ops_status',
  wait: 'Wait_Time',
  updated: '1/10/2019,3:54 PM',
  opening: 'Opening_Time',
  lnk: 'Link'
})

$.extend(examplePOD5, decorations, {content: content})
examplePOD5.extendFeature()


//inactive
messages = [
  {
    title: 'title',
    marquee: 'marquee',
    splash: 'splash',
    active: 'false'
  }
]
content = new Content(messages)

const examplePOD4 = new OlFeature({
  name: 'POD_Site_Name',
  addr: 'Address',
  boro: 'Borough',
  zip: 'Zip',
  id: 'POD_ID',
  status: 'Ops_status',
  wait: 'Wait_Time',
  updated: 'Latest_Update',
  opening: 'Opening_Time',
  labelpos: 'W',
  lnk: 'Link'
})

$.extend(examplePOD4, decorations, {content: content})
examplePOD4.extendFeature()

const examplePOD6 = new OlFeature({
  name: '',
  addr: '',
  boro: '',
  zip: '',
  id: '',
  status: '',
  wait: '',
  updated: '',
  opening: '',
  labelpos: '',
  lnk: ''
})

$.extend(examplePOD6, decorations, {content: content})
examplePOD6.extendFeature()

module.exports = {examplePOD1,examplePOD2,examplePOD3,examplePOD4,examplePOD5, examplePOD6}