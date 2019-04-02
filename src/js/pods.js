/**
 * @module pods
 */

import nyc from 'nyc-lib/nyc'

/**
 * @private
 * @const {string} 
 */ 
const cacheBust = nyc.cacheBust(5)

/**
* @desc Constants
* @public
* @const {Object<string, string>}
*/
const pods = {
  PODS_URL: 'https://services3.arcgis.com/A6Zjpzrub8ESZ3c7/arcgis/rest/services/vwLatestDateLocator/FeatureServer/0/query?f=pgeojson&outSR=2263&outFields=DOHMHPODLink,DOECode,PODSiteName,Address,Borough,ZIP,Ops_status,OpeningTime,wait_time,LatestDate&where=1%3D1',
  ACTIVE_POD_WHERE_CLAUSE: " AND Ops_status <> 'Inactive' AND Ops_status IS NOT NULL",
  CONTENT_URL: `data/content.csv?${cacheBust}`,
  GEOCLIENT_URL: 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example',
  DIRECTIONS_URL: 'https://maps.googleapis.com/maps/api/js?&sensor=false&libraries=visualization',
}

export default pods