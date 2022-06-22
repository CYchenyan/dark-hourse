import { renderHook, act } from '@testing-library/react'
import { useOrderConfirmation } from '../../hooks/useOrderConfirmation'
import * as orderConfirmationRequest from '../../requests/orderConfirmationRequest'

describe('useOrderConfirmation.js', () => {
 
  //story1 example1 工序3
  it('should trigger createTicketOrderAPI with correctly when call the createTicketOrder', () => {
    jest.spyOn(orderConfirmationRequest, 'createTicketOrderAPI')
    const { result } = renderHook(() => useOrderConfirmation())

    act(() => {
      result.current.createTicketOrder()
    })

    expect(orderConfirmationRequest.createTicketOrderAPI).toBeCalledWith({
      pid: 1111,
      userInfo: {
        passenger: 'cy',
        flightId: 5099,
        certificateNum: '599029287616672872',
        phoneNum: 18080808080
      }
    })
  })

  //story1 example1 工序2 
  it('should return isOrderCreated is true when call the createTicketOrderAPI successfully', async () => {
    jest.spyOn(orderConfirmationRequest, 'createTicketOrderAPI').mockResolvedValue({
      flightName: "MU5099",
      id: 5099,
      passenger: "cy",
      phoneNum: 18080808080
    })
    const { result } = renderHook(() => useOrderConfirmation())

    await act(() => {
      result.current.createTicketOrder()
    })

    expect(result.current.isOrderCreated).toBeTruthy()
  })

  it('should return isNoSpareTicket is true when call the createTicketOrderAPI successfully with no_spare_ticket response', async () => {
    jest.spyOn(orderConfirmationRequest, 'createTicketOrderAPI').mockResolvedValue({
      message: '余票不足',
      code: "no_spare_ticket"
    })
    const { result } = renderHook(() => useOrderConfirmation())

    await act(() => {
      result.current.createTicketOrder()
    })

    expect(result.current.isNoSpareTicket).toBeTruthy()
  })

  it('should return isOrderCreatedError is true when call the createTicketOrderAPI timeout', async () => {
    jest.spyOn(orderConfirmationRequest, 'createTicketOrderAPI').mockRejectedValue({
      errorCode: 408,
      message: "timeout"
    })
    const { result } = renderHook(() => useOrderConfirmation())

    await act(() => {
      result.current.createTicketOrder()
    })

    expect(result.current.isOrderCreatedError).toBeTruthy()
  })

  it('should return isOrderCreatedError is true when call the createTicketOrder with service error', async () => {
    jest.spyOn(orderConfirmationRequest, 'createTicketOrderAPI').mockRejectedValue({
      errorCode: 500,
      message: "service_error"
    })
    const { result } = renderHook(() => useOrderConfirmation())

    await act(() => {
      result.current.createTicketOrder()
    })

    expect(result.current.isOrderCreatedError).toBeTruthy()
  })
})
