import OlFeature from 'ol/Feature'
import Content from 'nyc-lib/nyc/Content'
import decorations from '../src/js/decorations'


let messages = [
  {
    title: 'Points of Dispensing (POD) Finder',
    marquee: 'DOHMH controlled content (if empty the marquee is hidden)',
    splash: 'DOHMH controlled content - any message you like goes here - updated via an uploaded CSV file.',
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
  Ops_status: 'Operations_Status',
  wait_time: 'Wait_Time',
  LatestDate: '1/10/2019,3:54 PM',
  Opening_Date: 'Opening_Date',
  OpeningTime: 'Opening_Time'
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
  Ops_status: 'Open to Public',
  wait_time: 'Wait_Time',
  LatestDate: '1/10/2019,3:54 PM',
  Opening_Date: 'Opening_Date',
  OpeningTime: 'Opening_Time'
})

$.extend(examplePOD2, decorations, {content: content})
examplePOD2.extendFeature()

//inactive
messages = [
  {
    title: 'Points of Dispensing (POD) Finder',
    marquee: 'DOHMH controlled content (if empty the marquee is hidden)',
    splash: 'DOHMH controlled content - any message you like goes here - updated via an uploaded CSV file.',
    active: 'false'
  }
]
content = new Content(messages)

const examplePOD3 = new OlFeature({
  PODSiteName: 'POD_Site_Name',
  Address: 'Address',
  Borough: 'Borough',
  Zip: 'Zip',
  Longitude: 'Longitude',
  Latitude: 'Latitude',
  DOECode: 'POD_ID',
  Ops_status: 'Operations_Status',
  wait_time: 'Wait_Time',
  LatestDate: '1/10/2019,3:54 PM',
  Opening_Date: 'Opening_Date',
  OpeningTime: 'Opening_Time'
})

$.extend(examplePOD3, decorations, {content: content})
examplePOD3.extendFeature()

module.exports = {examplePOD1,examplePOD2,examplePOD3}