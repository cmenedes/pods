import facilityStyle from '../src/js/facility-style'
import {examplePOD1,examplePOD2,examplePOD3} from './features.mock'


describe('pointStyle', () => {

  test('active is true, facility is closed', () => {
    expect.assertions(3)

    const style = facilityStyle.pointStyle(examplePOD1, 305.748113140705)
    expect(style.length).toBe(1)
    expect(style[0].getImage().getSrc()).toBe('img/close-icon.svg')
    expect(style[0].getImage().getSize()).toEqual([33, 33])
    
  })

  test('active is true, facility is open', () => {
    expect.assertions(3)

    const style = facilityStyle.pointStyle(examplePOD2, 305.748113140705)
    expect(style.length).toBe(1)
    expect(style[0].getImage().getSrc()).toBe('img/open-icon.svg')
    expect(style[0].getImage().getSize()).toEqual([33, 33])
    
  })


  test('active is false', () => {
    expect.assertions(3)

    const style = facilityStyle.pointStyle(examplePOD3, 305.748113140705)
    expect(style.length).toBe(1)
    expect(style[0].getImage().getSrc()).toBe('img/inactive-icon.svg')
    expect(style[0].getImage().getSize()).toEqual([33, 33])
    
  })

})
