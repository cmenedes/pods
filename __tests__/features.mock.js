import OlFeature from 'ol/Feature'
import Content from 'nyc-lib/nyc/Content'
import decorations from '../src/js/decorations'


let content = 'content'

const examplePOD = new OlFeature({
  POD_Site_Name: 'POD_Site_Name',
  Address: 'Address',
  Borough: 'Borough',
  Zip: 'Zip',
  Longitude: 'Longitude',
  Latitude: 'Latitude',
  POD_ID: 'POD_ID',
  Operations_Status: 'Operations_Status',
  Wait_Time: 'Wait_Time',
  Latest_Update_Date: 'Latest_Update_Date',
  Latest_Update_Time: 'Latest_Update_Time',
  Opening_Date: 'Opening_Date',
  Opening_Time: 'Opening_Time'
})

$.extend(examplePOD, decorations, {content: content})

module.exports = {examplePOD}