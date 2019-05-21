import facilityStyle from '../src/js/facility-style'
import {examplePOD1,examplePOD2,examplePOD3,examplePOD4} from './features.mock'
import OlStyleCircle from 'ol/style/Circle'


describe('pointStyle', () => {
  const calcRadius = facilityStyle.calcRadius
  beforeEach(() => {
    $.resetMocks()
    facilityStyle.calcRadius = jest.fn().mockImplementation(() => {
      return 1
    })
  })
  afterEach(() => {
    facilityStyle.calcRadius = calcRadius
  })
  test('active is true, facility is closed', () => {
    expect.assertions(7)

    const style = facilityStyle.pointStyle(examplePOD1, 305.748113140705)

    expect(style.getImage() instanceof OlStyleCircle).toBe(true)
    expect(style.getImage().getFill().getColor()).toBe('#999999')
    expect(style.getImage().getStroke().getColor()).toBe('#1A1A1A')
    expect(style.getImage().getStroke().getWidth()).toBe(1)
    expect(style.getImage().getRadius()).toBe(facilityStyle.calcRadius.mock.results[0].value)
    expect(facilityStyle.calcRadius).toHaveBeenCalledTimes(1)
    expect(facilityStyle.calcRadius.mock.calls[0][0]).toBe(9)
 
  })

  test('active is true, facility is open', () => {
    expect.assertions(7)

    const style = facilityStyle.pointStyle(examplePOD2, 305.748113140705)

    expect(style.getImage() instanceof OlStyleCircle).toBe(true)
    expect(style.getImage().getFill().getColor()).toBe('#19DB17')
    expect(style.getImage().getStroke().getColor()).toBe('#1A1A1A')
    expect(style.getImage().getStroke().getWidth()).toBe(1)
    expect(style.getImage().getRadius()).toBe(facilityStyle.calcRadius.mock.results[0].value)
    expect(facilityStyle.calcRadius).toHaveBeenCalledTimes(1)
    expect(facilityStyle.calcRadius.mock.calls[0][0]).toBe(9)
    
  })

  test('active is true, facility opening soon', () => {
    expect.assertions(7)

    const style = facilityStyle.pointStyle(examplePOD3, 305.748113140705)

    expect(style.getImage() instanceof OlStyleCircle).toBe(true)
    expect(style.getImage().getFill().getColor()).toBe('#F3E318')
    expect(style.getImage().getStroke().getColor()).toBe('#1A1A1A')
    expect(style.getImage().getStroke().getWidth()).toBe(1)
    expect(style.getImage().getRadius()).toBe(facilityStyle.calcRadius.mock.results[0].value)
    expect(facilityStyle.calcRadius).toHaveBeenCalledTimes(1)
    expect(facilityStyle.calcRadius.mock.calls[0][0]).toBe(9)
    
  })


  test('active is false', () => {
    expect.assertions(7)

    const style = facilityStyle.pointStyle(examplePOD4, 305.748113140705)

    expect(style.getImage() instanceof OlStyleCircle).toBe(true)
    expect(style.getImage().getFill().getColor()).toBe('#0080A9')
    expect(style.getImage().getStroke().getColor()).toBe('#1A1A1A')
    expect(style.getImage().getStroke().getWidth()).toBe(1)
    expect(style.getImage().getRadius()).toBe(facilityStyle.calcRadius.mock.results[0].value)
    expect(facilityStyle.calcRadius).toHaveBeenCalledTimes(1)
    expect(facilityStyle.calcRadius.mock.calls[0][0]).toBe(9)
    
  })

})

describe('calcRadius', () => {
  test('zoom > 11', () => {
    expect(facilityStyle.calcRadius(12)).toBe(8)
  })

  test('zoom > 13', () => {
    expect(facilityStyle.calcRadius(14)).toBe(12)
  })

  test('zoom > 15', () => {
    expect(facilityStyle.calcRadius(16)).toBe(16)
  })

  test('zoom > 17', () => {
    expect(facilityStyle.calcRadius(18)).toBe(20)
  })

  test('zoom < 11', () => {
    expect(facilityStyle.calcRadius(10)).toBe(6)
  })
})

describe('highlightStyle', () => {
  const calcRadius = facilityStyle.calcRadius
  beforeEach(() => {
    $.resetMocks()
    facilityStyle.calcRadius = jest.fn().mockImplementation(() => {
      return 1
    })
  })
  afterEach(() => {
    facilityStyle.calcRadius = calcRadius
  })

  test('highlightStyle', () => {
    expect.assertions(6)

    const style = facilityStyle.highlightStyle(examplePOD1, 305.748113140705)

    expect(style.getImage() instanceof OlStyleCircle).toBe(true)
    expect(style.getImage().getStroke().getColor()).toBe('#58A7FA')
    expect(style.getImage().getStroke().getWidth()).toBe(1)
    expect(style.getImage().getStroke().getWidth()).toBe(facilityStyle.calcRadius.mock.results[0].value)
    expect(facilityStyle.calcRadius).toHaveBeenCalledTimes(1)
    expect(style.getImage().getRadius()).toBe(1.5)
  })


})
