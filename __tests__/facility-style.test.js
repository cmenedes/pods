import facilityStyle from '../src/js/facility-style'
import Feature from 'ol/Feature'
import {examplePOD} from './features.mock'

describe('pointStyle', () => {
  
  test('pointStyle', () => {
    expect.assertions(3)

    const style = facilityStyle.pointStyle(examplePOD, 305.748113140705)
    expect(style.length).toBe(1)
    expect(style[0].getImage().getSrc()).toBe('img/close-icon.svg')
    expect(style[0].getImage().getSize()).toEqual([33, 33])
    
  })

})
