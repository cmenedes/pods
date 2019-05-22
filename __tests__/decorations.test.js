import decorations from '../src/js/decorations'
import OlFeature from 'ol/Feature';
import {examplePOD1,examplePOD2,examplePOD3,examplePOD4,examplePOD5} from './features.mock'
import nyc from 'nyc-lib/nyc'


describe('decorations', () => {
  let container
  beforeEach(() => {
    $.resetMocks()
    container = $('<div></div>')
    $('body').append(container)
  })
  afterEach(() => {
    container.remove()
  })

  test('extendFeature', () => {
    expect.assertions(4)
    examplePOD1.extendFeature()
    expect(examplePOD1.active).toBe(examplePOD1.content.message("active"))
    expect(examplePOD1.getId()).toBe(examplePOD1.get('id'))
    expect(examplePOD1.get('search_label')).not.toBeNull()
    expect(examplePOD1.get('search_label')).toBe(`<b><span class="srch-lbl-lg">${examplePOD1.get('name')}</span></b><br>
      <span class="srch-lbl-sm">${examplePOD1.get('addr')}</span>`)

  })

  test('getAddress1', () => {
    expect.assertions(2)
    expect(examplePOD1.getAddress1()).toBe(`${examplePOD1.get('addr')}`)
    expect(examplePOD1.getAddress1()).not.toBeNull()
  })


  test('getCityStateZip', () => {
    expect.assertions(2)
    expect(examplePOD1.getCityStateZip()).toBe(`${examplePOD1.get('boro')}, NY ${examplePOD1.get('zip')}`)
    expect(examplePOD1.getCityStateZip()).not.toBeNull()
    
  })
  
  test('getName', () => {
    expect.assertions(2)
    expect(examplePOD1.getName()).toBe(`${examplePOD1.get('name')}`)
    expect(examplePOD1.getName()).not.toBeNull()
    
  })

  test('getStatus - open soon', () => {
    expect.assertions(3)
    examplePOD1.set('status', 'Mobilizing')
    expect(examplePOD1.get('status')).toBe('Mobilizing')
    expect(examplePOD1.getStatus()).toBe('Opening Soon')
    expect(examplePOD1.getStatus()).not.toBeNull()
    
  })
  test('getStatus - closed', () => {
    expect.assertions(7)

    examplePOD1.set('status', 'Demobilizing')
    expect(examplePOD1.get('status')).toBe('Demobilizing')
    expect(examplePOD1.getStatus()).toBe('Closed to Public')

    examplePOD1.set('status', 'Demobilized')
    expect(examplePOD1.get('status')).toBe('Demobilized')
    expect(examplePOD1.getStatus()).toBe('Closed to Public')

    examplePOD1.set('status', 'Closed to Public')
    expect(examplePOD1.get('status')).toBe('Closed to Public')
    expect(examplePOD1.getStatus()).toBe('Closed to Public')

    expect(examplePOD1.getStatus()).not.toBeNull()
    
  })
  test('getStatus - open', () => {
    expect.assertions(2)
    examplePOD1.set('status', 'Open to Public')
    expect(examplePOD1.getStatus()).toBe('Open to Public')
    expect(examplePOD1.getStatus()).not.toBeNull()
    
  })

  test('getStatus - inactive', () => {
    expect.assertions(2)
    examplePOD1.set('status', '')
    expect(examplePOD1.getStatus()).toBe('Inactive')
    expect(examplePOD1.getStatus()).not.toBeNull()
    
  })

  test('getLatestDate', () => {
    expect.assertions(2)
    let date = new Date(examplePOD1.get('updated'))
    let formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    expect(examplePOD1.getLatestDate()).toBe(formattedDate)
    expect(examplePOD1.getLatestDate()).not.toBeNull()
    
  })
  test('getLatestDate - no date', () => {
    expect.assertions(1)
    examplePOD1.set('updated', '')
    expect(examplePOD1.getLatestDate()).toBeUndefined()
    
  })
  test('getOpeningTime', () => {
    expect.assertions(1)
    expect(examplePOD1.getOpeningTime()).not.toBeNull()
    
  })
  test('getOpeningTime - no time', () => {
    expect.assertions(1)
    examplePOD1.set('opening', '')
    expect(examplePOD1.getOpeningTime()).toBeUndefined()

  })
  test('getPODLink', () => {
    expect.assertions(2)
    expect(examplePOD1.getPODLink()).toBe('Link')
    expect(examplePOD1.getPODLink()).not.toBeNull()
    
  })

  test('getWaitTime', () => {
    expect.assertions(2)
    expect(examplePOD1.getWaitTime()).toBe(`${examplePOD1.get('wait')}`)
    expect(examplePOD1.getWaitTime()).not.toBeNull()
    
  })

  test('detailsHtml - active is false', () => {
    expect.assertions(1)

    expect(examplePOD4.detailsHtml()).toBeUndefined()
    
  })

  // test('detailsHtml - active is true, status is false', () => {
  //   expect.assertions(2)
  //   let ul = $('<ul></ul>').append(`<li><b>Status:</b> ${examplePOD1.get('status')}</li>`)
  //   expect(examplePOD1.detailsHtml()).toEqual(ul)
  //   expect(examplePOD1.detailsHtml().children().length).toBe(1)
    
  // })

  // test('detailsHtml - active is true, status is true', () => {
  //   expect.assertions(2)
  //   const update = new Date(examplePOD2.get('LatestDate'))
  //   let ul = 
  //   $('<ul></ul>')
  //     .append(`<li><b>Status:</b> ${examplePOD2.get('status')}</li>`)
  //     .append(`<li><b>Wait time:</b> ${examplePOD2.get('wait')} minutes</li>`)
  //     .append(`<li><b>Last update:</b> ${update.toLocaleDateString()} ${update.toLocaleTimeString()}`)
  //   expect(examplePOD2.detailsHtml()).toEqual(ul)
  //   expect(examplePOD2.detailsHtml().children().length).toBe(3)
    
  // })

});