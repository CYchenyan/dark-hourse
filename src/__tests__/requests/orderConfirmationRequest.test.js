import { createTicketOrderAPI } from '../../requests/orderConfirmationRequest'
import fetchMock from 'jest-fetch-mock'

describe('orderConfirmationRequest.js', () => {

  it('should get correct response when fetch API successfully', async () => {
    fetchMock.mockIf(/^http:\/\/localhost:8080\/ticket-proposals\/*$/, req => {
      if (req.url.endsWith('/11/ticket-contract')) {
        return {
          status: 200,
          data: {
            flight: 'MU5099',
            id: 111,
            passenger: 'cy',
            phoneNum: 18080808080
          }
        }
      } 
    })

    const result = await createTicketOrderAPI({
      pid: 11,
      userInfo: {
        passenger: 'cy',
        flightId: 5099,
        certificateNum: '599029287616672872',
        phoneNum: 18080808080
      }
    })

    expect(result).toStrictEqual({
      flight: 'MU5099',
      id: 111,
      passenger: 'cy',
      phoneNum: 18080808080
    })
  })

  it('should get response with no spare tickets when fetch API successfully but no tickets remaining', async () => {
    fetchMock.mockIf(/^http:\/\/localhost:8080\/ticket-proposals\/*$/, req => {
      if (req.url.endsWith('/22/ticket-contract')) {
        return {
          status: 200,
          data: {
            message: '余票不足',
            code: "no_spare_ticket"
          }
        }
      } 
    })

    const result = await createTicketOrderAPI({
      pid: 22,
      userInfo: {
        passenger: 'cy',
        flightId: 5099,
        certificateNum: '599029287616672872',
        phoneNum: 18080808080
      }
    })

    expect(result).toStrictEqual({
      message: '余票不足',
      code: "no_spare_ticket"
    })
  })

  it('should throw errors when trigger service timeout', async () => {
    fetchMock.mockIf(/^http:\/\/localhost:8080\/ticket-proposals\/*$/, req => {
      if (req.url.endsWith('/33/ticket-contract')) {
        throw new Error({
          status: 408,
          data: {
            errorCode: 408,
            message: "timeout"
          }
        })
      } 
    })

    try {
      await createTicketOrderAPI({
        pid: 11,
        userInfo: {
          passenger: 'cy',
          flightId: 5099,
          certificateNum: '599029287616672872',
          phoneNum: 18080808080
        }
      })
    } catch(error){
      expect(error).toBe({
        errorCode: 408,
        message: "timeout"
      })
    }

  })

  it('should throw errors when trigger service error', async () => {
    fetchMock.mockIf(/^http:\/\/localhost:8080\/ticket-proposals\/*$/, req => {
      if (req.url.endsWith('/44/ticket-contract')) {
        throw new Error({
          status: 500,
          data: {
            errorCode: 500,
            message: "service_error"
          }
        })
      } 
    })

    try {
      await createTicketOrderAPI({
        pid: 44,
        userInfo: {
          passenger: 'cy',
          flightId: 5099,
          certificateNum: '599029287616672872',
          phoneNum: 18080808080
        }
      })
    } catch(error){
      expect(error).toBe({
        errorCode: 500,
        message: "service_error"
      })
    }

  })
})
