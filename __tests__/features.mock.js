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
  PODSiteName: 'POD_Site_Name',
  Address: 'Address',
  Borough: 'Borough',
  ZIP: 'Zip',
  DOECode: 'POD_ID',
  Ops_status: 'Closed to Public',
  wait_time: 'Wait_Time',
  LatestDate: '1/10/2019,3:54 PM',
  OpeningTime: 'Opening_Time',
  LabelPos: 'N',
  DOHMHPODLink: 'Link'
})

$.extend(examplePOD1, decorations, {content: content})
examplePOD1.extendFeature()

//active, open
const examplePOD2 = new OlFeature({
  geometry: new Point([100, 100]),
  PODSiteName: 'POD_Site_Name',
  Address: 'Address',
  Borough: 'Borough',
  ZIP: 'Zip',
  DOECode: 'POD_ID',
  Ops_status: 'Open to Public',
  wait_time: 'Wait_Time',
  LatestDate: '1/10/2019,3:54 PM',
  OpeningTime: 'Opening_Time',
  LabelPos: 'S',
  DOHMHPODLink: 'Link'
})

$.extend(examplePOD2, decorations, {content: content})
examplePOD2.extendFeature()

const examplePOD3 = new OlFeature({
  geometry: new Point([200, 200]),
  PODSiteName: 'POD_Site_Name',
  Address: 'Address',
  Borough: 'Borough',
  ZIP: 'Zip',
  DOECode: 'POD_ID',
  Ops_status: 'Mobilizing',
  wait_time: 'Wait_Time',
  LatestDate: '1/10/2019,3:54 PM',
  OpeningTime: '1/10/2019,3:55 PM',
  LabelPos: 'E',
  DOHMHPODLink: 'Link'
})

$.extend(examplePOD3, decorations, {content: content})
examplePOD3.extendFeature()

const examplePOD5 = new OlFeature({
  geometry: new Point([300, 0]),
  PODSiteName: 'POD_Site_Name',
  Address: 'Address',
  Borough: 'Borough',
  ZIP: 'Zip',
  DOECode: 'POD_ID',
  Ops_status: 'Ops_status',
  wait_time: 'Wait_Time',
  LatestDate: '1/10/2019,3:54 PM',
  OpeningTime: 'Opening_Time',
  DOHMHPODLink: 'Link'
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
  PODSiteName: 'POD_Site_Name',
  Address: 'Address',
  Borough: 'Borough',
  ZIP: 'Zip',
  DOECode: 'POD_ID',
  Ops_status: 'Ops_status',
  wait_time: 'Wait_Time',
  LatestDate: 'Latest_Update',
  OpeningTime: 'Opening_Time',
  LabelPos: 'W',
  DOHMHPODLink: 'Link'
})

$.extend(examplePOD4, decorations, {content: content})
examplePOD4.extendFeature()

const examplePOD6 = new OlFeature({
  PODSiteName: '',
  Address: '',
  Borough: '',
  ZIP: '',
  DOECode: '',
  Ops_status: '',
  wait_time: '',
  LatestDate: '',
  OpeningTime: '',
  LabelPos: '',
  DOHMHPODLink: ''
})

$.extend(examplePOD6, decorations, {content: content})
examplePOD6.extendFeature()

module.exports = {examplePOD1,examplePOD2,examplePOD3,examplePOD4,examplePOD5, examplePOD6}