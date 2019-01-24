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
  PODS_URL: `data/pods.csv?${cacheBust}`,
  CONTENT_URL: `data/content.csv?${cacheBust}`,
  GEOCLIENT_URL: 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example',
  DIRECTIONS_URL: 'https://maps.googleapis.com/maps/api/js?&sensor=false&libraries=visualization',
}

export default pods