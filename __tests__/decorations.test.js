import decorations from '../src/js/decorations'
import OlFeature from 'ol/Feature';
import {examplePOD1,examplePOD2,examplePOD3} from './features.mock'
import nyc from 'nyc-lib/nyc'


describe('decorations', () => {
  let container
  beforeEach(() => {
    container = $('<div></div>')
    $('body').append(container)
  })
  afterEach(() => {
    container.remove()
  })

  test('extendFeature', () => {
    expect.assertions(2)
    expect(examplePOD1.active).toBe(examplePOD1.content.message("active"))
    expect(examplePOD1.getId()).toBe(examplePOD1.get('DOECode'))
  })

  test('getAddress1', () => {
    expect.assertions(2)
    expect(examplePOD1.getAddress1()).toBe(`${examplePOD1.get('Address')}`)
    expect(examplePOD1.getAddress1()).not.toBeNull()
  })


  test('getCityStateZip', () => {
    expect.assertions(2)
    expect(examplePOD1.getCityStateZip()).toBe(`${examplePOD1.get('Borough')}, NY ${examplePOD1.get('ZIP')}`)
    expect(examplePOD1.getCityStateZip()).not.toBeNull()
    
  })
  
  test('getName', () => {
    expect.assertions(2)
    expect(examplePOD1.getName()).toBe(`${examplePOD1.get('PODSiteName')}`)
    expect(examplePOD1.getName()).not.toBeNull()
    
  })

  test('getStatus', () => {
    expect.assertions(2)
    expect(examplePOD1.getStatus()).toBe(`${examplePOD1.get('Ops_status')}`)
    expect(examplePOD1.getStatus()).not.toBeNull()
    
  })

  test('getLatestDate', () => {
    expect.assertions(2)
    let date = new Date(examplePOD1.get('LatestDate'))
    let formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    expect(examplePOD1.getLatestDate()).toBe(formattedDate)
    expect(examplePOD1.getLatestDate()).not.toBeNull()
    
  })

  test('getWaitTime', () => {
    expect.assertions(2)
    expect(examplePOD1.getWaitTime()).toBe(`${examplePOD1.get('wait_time')}`)
    expect(examplePOD1.getWaitTime()).not.toBeNull()
    
  })

  test('detailsHtml - active is false', () => {
    expect.assertions(1)

    expect(examplePOD3.detailsHtml()).toBeUndefined()
    
  })

  test('detailsHtml - active is true, status is false', () => {
    expect.assertions(2)
    let ul = $('<ul></ul>').append(`<li><b>Status:</b> ${examplePOD1.get('Ops_status')}</li>`)
    expect(examplePOD1.detailsHtml()).toEqual(ul)
    expect(examplePOD1.detailsHtml().children().length).toBe(1)
    
  })

  test('detailsHtml - active is true, status is true', () => {
    expect.assertions(2)
    const update = new Date(examplePOD2.get('LatestDate'))
    let ul = 
    $('<ul></ul>')
      .append(`<li><b>Status:</b> ${examplePOD2.get('Ops_status')}</li>`)
      .append(`<li><b>Wait time:</b> ${examplePOD2.get('wait_time')} minutes</li>`)
      .append(`<li><b>Last update:</b> ${update.toLocaleDateString()} ${update.toLocaleTimeString()}`)
    expect(examplePOD2.detailsHtml()).toEqual(ul)
    expect(examplePOD2.detailsHtml().children().length).toBe(3)
    
  })

});