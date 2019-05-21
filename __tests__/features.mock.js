import OlFeature from 'ol/Feature'
import Content from 'nyc-lib/nyc/Content'
import decorations from '../src/js/decorations'


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
  PODSiteName: 'POD_Site_Name',
  Address: 'Address',
  Borough: 'Borough',
  Zip: 'Zip',
  Longitude: 'Longitude',
  Latitude: 'Latitude',
  DOECode: 'POD_ID',
  status: 'Closed to Public',
  wait_time: 'Wait_Time',
  LatestDate: '1/10/2019,3:54 PM',
  Opening_Date: 'Opening_Date',
  OpeningTime: 'Opening_Time',
  labelpos: 'N'
})

$.extend(examplePOD1, decorations, {content: content})
examplePOD1.extendFeature()

//active, open
const examplePOD2 = new OlFeature({
  PODSiteName: 'POD_Site_Name',
  Address: 'Address',
  Borough: 'Borough',
  Zip: 'Zip',
  Longitude: 'Longitude',
  Latitude: 'Latitude',
  DOECode: 'POD_ID',
  status: 'Open to Public',
  wait_time: 'Wait_Time',
  LatestDate: '1/10/2019,3:54 PM',
  Opening_Date: 'Opening_Date',
  OpeningTime: 'Opening_Time',
  labelpos: 'S'
})

$.extend(examplePOD2, decorations, {content: content})
examplePOD2.extendFeature()

const examplePOD3 = new OlFeature({
  PODSiteName: 'POD_Site_Name',
  Address: 'Address',
  Borough: 'Borough',
  Zip: 'Zip',
  Longitude: 'Longitude',
  Latitude: 'Latitude',
  DOECode: 'POD_ID',
  status: 'Mobilizing',
  wait_time: 'Wait_Time',
  LatestDate: '1/10/2019,3:54 PM',
  Opening_Date: 'Opening_Date',
  OpeningTime: 'Opening_Time',
  labelpos: 'E'
})

$.extend(examplePOD3, decorations, {content: content})
examplePOD3.extendFeature()

const examplePOD5 = new OlFeature({
  PODSiteName: 'POD_Site_Name',
  Address: 'Address',
  Borough: 'Borough',
  Zip: 'Zip',
  Longitude: 'Longitude',
  Latitude: 'Latitude',
  DOECode: 'POD_ID',
  status: 'Ops_status',
  wait_time: 'Wait_Time',
  LatestDate: '1/10/2019,3:54 PM',
  Opening_Date: 'Opening_Date',
  OpeningTime: 'Opening_Time'
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
  Zip: 'Zip',
  Longitude: 'Longitude',
  Latitude: 'Latitude',
  DOECode: 'POD_ID',
  status: 'Ops_status',
  wait_time: 'Wait_Time',
  LatestDate: '1/10/2019,3:54 PM',
  Opening_Date: 'Opening_Date',
  OpeningTime: 'Opening_Time',
  labelpos: 'W'
})

$.extend(examplePOD4, decorations, {content: content})
examplePOD4.extendFeature()


module.exports = {examplePOD1,examplePOD2,examplePOD3,examplePOD4,examplePOD5}