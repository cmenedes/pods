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
  ACTIVE_POD_WHERE_CLAUSE: " AND Ops_status <> 'Inactive' AND Ops_status IS NOT NULL",
  CONTENT_URL: `data/content.csv?${cacheBust}`,
  GEOCLIENT_URL: 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example',
  DIRECTIONS_URL: 'https://maps.googleapis.com/maps/api/js?&sensor=false&libraries=visualization',
  DESCRIPTION_HTML: '<div class="description"><div class="desc">All Points of Dispensing sites may not be activated at the time of an incident. Please continue checking this page to see which sites are activated following an event.<br><br>Click on the NYC Health Logo to refresh the map.</div></div>',
  LEGEND_HTML: '<div class="legend"><div class="leg"><div class="leg-it"><div class="leg-sw closed"></div><span>Closed</span></div><div class="leg-it"><div class="leg-sw open"></div><span>Open</span></div><div class="leg-it"><div class="leg-sw open-soon"></div><span>Opening Soon</span></div></div></div>'
}

export default pods