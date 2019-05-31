import decorations from '../src/js/decorations'
import OlFeature from 'ol/Feature'
import {examplePOD1, examplePOD2, examplePOD3, examplePOD4, examplePOD6} from './features.mock'
import nyc from 'nyc-lib/nyc'


describe('decorations', () => {
  let container, extendedDecorations
  beforeEach(() => {
    $.resetMocks()
    container = $('<div></div>')
    $('body').append(container)
    extendedDecorations = {
      nameHtml() {
        return '<p>A Name</p>'
      },
      addressHtml() {
        return '<p>An Address</p>'
      },
      distanceHtml(screen) {
        return (screen ? '<p>screen</p>' : '<p>A Distance</p>')
      },
      mapButton() {
        return '<p>Map</p>'
      },
      directionsButton() {
        return '<p>Directions</p>'
      },
      handleOver() {
        return 'over'
      },
      handleOut() {
        return 'out'
      }
    }
    $.extend(examplePOD1, extendedDecorations)
    $.extend(examplePOD4, extendedDecorations)
    
  })
  afterEach(() => {
    container.remove()
    jest.resetModules()
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

  test('html - active true', () => {
    expect.assertions(8)

    let date = new Date(examplePOD1.get('updated'))
    const time = date.toLocaleTimeString()
    date = date.toLocaleDateString()

    examplePOD1.extendFeature()
    expect(examplePOD1.html()).toEqual($(`<div class="facility POD_ID closed-to-public"><p>A Distance</p><p>A Name</p><p>screen</p><p>An Address</p><ul><li><b>Status: </b>Closed to Public</li><li><b>Last Updated: </b>${date} ${time}</li></ul><p>Map</p><p>Directions</p><a class="btn rad-all prep" href="Link" target="_blank">Prepare For Your Visit</a></div>`))
    expect(examplePOD1.html().data('feature')).toBe(examplePOD1)
    expect(examplePOD1.html()).not.toBeNull()  

    $.resetMocks()
    
    $(examplePOD1.html()).trigger('mouseover')

    expect($.proxy).toHaveBeenCalledTimes(2)

    expect($.proxy.mock.calls[0][0]).toBe(examplePOD1.handleOver)
    expect($.proxy.mock.calls[0][1]).toBe(examplePOD1)
    
    expect($.proxy.mock.calls[1][0]).toBe(examplePOD1.handleOut)
    expect($.proxy.mock.calls[1][1]).toBe(examplePOD1)

  })

  test('html - active false', () => {
    expect.assertions(8)
    examplePOD4.extendFeature()
    expect(examplePOD4.html()).toEqual($('<div class="facility POD_ID"><p>A Distance</p><p>A Name</p><p>screen</p><p>An Address</p><p>Map</p><p>Directions</p><a class="btn rad-all prep" href="Link" target="_blank">Prepare For Your Visit</a></div>'))
    expect(examplePOD4.html().data('feature')).toBe(examplePOD4)
    expect(examplePOD4.html()).not.toBeNull()

    $.resetMocks()
    
    $(examplePOD4.html()).trigger('mouseover')

    expect($.proxy).toHaveBeenCalledTimes(2)

    expect($.proxy.mock.calls[0][0]).toBe(examplePOD4.handleOver)
    expect($.proxy.mock.calls[0][1]).toBe(examplePOD4)

    expect($.proxy.mock.calls[1][0]).toBe(examplePOD4.handleOut)
    expect($.proxy.mock.calls[1][1]).toBe(examplePOD4)
  })

  test('prepButton', () => {
    expect.assertions(2)
    expect(examplePOD1.prepButton()).toEqual($('<a class="btn rad-all prep" href="Link" target="_blank">Prepare For Your Visit</a>'))
    expect(examplePOD1.prepButton()).not.toBeNull()
  })

  test('getTip', () => {
    expect.assertions(2)

    let date = new Date(examplePOD1.get('updated'))
    const time = date.toLocaleTimeString()
    date = date.toLocaleDateString()

    examplePOD1.extendFeature()
    expect(examplePOD1.getTip()).toEqual($(`<div><p>A Name</p><p>An Address</p><ul><li><b>Status: </b>Closed to Public</li><li><b>Last Updated: </b>${date} ${time}</li></ul><i class="dir-tip">Click on site for directions</i></div>`))
    expect(examplePOD1.getTip()).not.toBeNull()
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
describe('getStatus', () => {
  afterEach(() => {
    examplePOD1.set('status', 'Closed to Public')
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
    expect(examplePOD6.getLatestDate()).toBeUndefined()
    
  })

  test('getOpeningTime', () => {
    expect.assertions(1)
    expect(examplePOD1.getOpeningTime()).not.toBeNull()
    
  })

  test('getOpeningTime - no time', () => {
    expect.assertions(1)
    expect(examplePOD6.getOpeningTime()).toBeUndefined()
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

  describe('detailsHtml', () => {
    afterEach(() => {
      examplePOD1.set('updated', '1/10/2019,3:54 PM')
      examplePOD2.set('wait', 'Wait_Time')
      examplePOD3.set('opening', '1/10/2019,3:55 PM')
      
    })

    test('detailsHtml - active is false', () => {
      expect.assertions(1)
      expect(examplePOD4.detailsHtml()).toBeUndefined()
    })
  
    test('detailsHtml - active is true, status is open to public', () => {
      expect.assertions(4)
      const update = new Date(examplePOD2.get('updated'))
      let ul = $('<ul></ul>')
        .append(`<li><b>Status: </b>${examplePOD2.getStatus()}</li>`)
        .append(`<li><b>Wait time: </b>${examplePOD2.get('wait')} minutes</li>`)
        .append(`<li><b>Last Updated: </b>${update.toLocaleDateString()} ${update.toLocaleTimeString()}</li>`)
    
      expect(examplePOD2.detailsHtml()).toEqual(ul)
      expect(examplePOD2.detailsHtml().children().length).toBe(3)


      examplePOD2.set('wait', '')

      ul = $('<ul></ul>')
        .append(`<li><b>Status: </b>${examplePOD2.getStatus()}</li>`)
        .append(`<li><b>Wait time: </b>N/A</li>`)
        .append(`<li><b>Last Updated: </b>${update.toLocaleDateString()} ${update.toLocaleTimeString()}</li>`)

        expect(examplePOD2.detailsHtml()).toEqual(ul)
        expect(examplePOD2.detailsHtml().children().length).toBe(3)
    })
  
    test('detailsHtml - active is true, status is opening soon', () => {
      expect.assertions(4)
      const update = new Date(examplePOD3.get('updated'))
      const opening = new Date(examplePOD3.get('opening'))
  
      let ul = $('<ul></ul>')
        .append(`<li><b>Status: </b>${examplePOD3.getStatus()}</li>`)
        .append(`<li><b>Estimated Opening Time: </b>${opening.toLocaleDateString()} ${opening.toLocaleTimeString()}</li>`)
        .append(`<li><b>Last Updated: </b>${update.toLocaleDateString()} ${update.toLocaleTimeString()}</li>`)
    
      expect(examplePOD3.detailsHtml()).toEqual(ul)
      expect(examplePOD3.detailsHtml().children().length).toBe(3)


      examplePOD3.set('opening', '')

      ul = $('<ul></ul>')
        .append(`<li><b>Status: </b>${examplePOD3.getStatus()}</li>`)
        .append(`<li><b>Estimated Opening Time: </b>N/A</li>`)        
        .append(`<li><b>Last Updated: </b>${update.toLocaleDateString()} ${update.toLocaleTimeString()}</li>`)

        expect(examplePOD3.detailsHtml()).toEqual(ul)
        expect(examplePOD3.detailsHtml().children().length).toBe(3)
    })
  
    test('detailsHtml - active is true, status is closed', () => {
      expect.assertions(4)
      const update = new Date(examplePOD1.get('updated'))
      let ul = $('<ul></ul>').append(`<li><b>Status: </b>${examplePOD1.getStatus()}</li>`)
      .append(`<li><b>Last Updated: </b>${update.toLocaleDateString()} ${update.toLocaleTimeString()}</li>`)
    
      expect(examplePOD1.detailsHtml()).toEqual(ul)
      expect(examplePOD1.detailsHtml().children().length).toBe(2)
  
      examplePOD1.set('updated', '')
      ul = $('<ul></ul>')
        .append(`<li><b>Status: </b>${examplePOD1.getStatus()}</li>`)
        .append(`<li><b>Last Updated: </b>N/A</li>`)

      expect(examplePOD1.detailsHtml()).toEqual(ul)
      expect(examplePOD1.detailsHtml().children().length).toBe(2)
      
    })
  
  })

});