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
  PODS_URL: 'https://services3.arcgis.com/A6Zjpzrub8ESZ3c7/arcgis/rest/services/vwLatestDateLocator/FeatureServer/0/query?token=Zzb_3VHi6P-vmmU1XIqNhecOxfeFn996aiuzhm3-BLLMP8clL76ed3TyE2se9mS4TpN3IIhvNFp4e1LmbE9w-TKAVL4g7MhK2eLPxgMMC-yC1AXPKPlfp-qcixGgLPq-PFkKulPV_dNowB_AVGZw_a-1XD3cvDpmUdffRA_wcihf_IUc1kNBEiPfn7QxGrPEDKE0rvPUFx-AkjRP2IjTM1dKjUO8v_gJOpR5osgV3KGsR_oVQydPF-aUWy419ZnV&outSR=2263&outFields=DOECode,PODSiteName,Address,Borough,ZIP,Ops_status,OpeningTime,wait_time,LatestDate&where=1%3D1&f=pgeojson',
  CONTENT_URL: `data/content.csv?${cacheBust}`,
  GEOCLIENT_URL: 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example',
  DIRECTIONS_URL: 'https://maps.googleapis.com/maps/api/js?&sensor=false&libraries=visualization',
}

export default pods