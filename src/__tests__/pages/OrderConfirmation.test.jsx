import React from 'react'
import { getByText, render, screen, waitFor } from '@testing-library/react'
import OrderConfirmation from '../../pages/OrderConfirmation/OrderConfirmation'
import userEvent from '@testing-library/user-event'
import * as useOrderConfirmation from '../../hooks/useOrderConfirmation'

describe('OrderConfirmation.tsx', () => {

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })
  })

  afterEach(jest.clearAllMocks)
  afterEach(jest.resetAllMocks)

  // story1 example1 工序4
  it('should render with a submit button', () => {
    render(<OrderConfirmation />)

    expect(screen.getByTestId('submit-button')).toBeDefined()
  })

  //story1 example1 工序5
  it('should trigger createTicketOrder when click submit button', async () => {
    const mockCreateTicketOrder = jest.fn()

    jest
      .spyOn(useOrderConfirmation, 'useOrderConfirmation')
      .mockImplementation(() => {
        return {
          createTicketOrder: values => mockCreateTicketOrder(values),
          userInfo: {
            passenger: "cy",
            flightId: 5099,
            certificateNum: "599029287616672872",
            phoneNum: 18080808080
          }
        }
      })

    render(<OrderConfirmation />)

    const submitButtn = screen.getByTestId('submit-button')
    userEvent.click(submitButtn)

    await waitFor(() => {
      expect(mockCreateTicketOrder).toBeCalledWith({
        passenger: "cy",
        flightId: 5099,
        certificateNum: "599029287616672872",
        phoneNum: 18080808080
      })
    })
  })

  //story1 example1 工序4
  it("should render with correct successful UI when create order successfully", async () => {

    jest
      .spyOn(useOrderConfirmation, 'useOrderConfirmation')
      .mockImplementation(() => {
        return {
          isOrderCreated: true
        }
      })
   

    render(<OrderConfirmation />)

    await waitFor(() => {
     expect(screen.getByText("订单创建成功，请尽快支付!")).toBeDefined()
    })

  })

  it("should render with correct successful UI when create order fail with no spare ticket", async () => {

    jest
      .spyOn(useOrderConfirmation, 'useOrderConfirmation')
      .mockImplementation(() => {
        return {
          isNoSpareTicket: true
        }
      })
   

    render(<OrderConfirmation />)

    await waitFor(() => {
     expect(screen.getByText("余票不足，请选择其他航班或关注后续是否有余票")).toBeDefined()
    })

  })

  it("should render with correct successful UI when create order fail", async () => {

    jest
      .spyOn(useOrderConfirmation, 'useOrderConfirmation')
      .mockImplementation(() => {
        return {
          isOrderCreatedError: true
        }
      })
   

    render(<OrderConfirmation />)

    await waitFor(() => {
     expect(screen.getByText("订单创建失败，是否重试")).toBeDefined()
    })

  })

})
