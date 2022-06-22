import { useState } from "react";
import {createTicketOrderAPI} from '../requests/orderConfirmationRequest'

export const useOrderConfirmation = () => {

  const [isOrderCreated, setIsOrderCreated] = useState(false)
  const [isOrderCreatedError, setIsOrderCreatedError] = useState(false)
  const [isNoSpareTicket, setIsNoSpareTicket] = useState(false)


  const [userInfo, setUserInfo] = useState({
    passenger: "cy",
    flightId: 5099,
    certificateNum: "599029287616672872",
    phoneNum: 18080808080
  })

  const cancelModel = () => setIsOrderCreated(false)

  const createTicketOrder = async (values) => {
    try{
      const result = await createTicketOrderAPI({
        pid: 1111,
        userInfo: values || userInfo
      })

      if(result.code === "no_spare_ticket"){
        setIsNoSpareTicket(true)
      }else{
        setIsOrderCreated(true)
      }
    } catch(err){
      setIsOrderCreatedError(true)
    }
      
  }


  return {
    createTicketOrder,
    userInfo,
    isOrderCreated,
    cancelModel,
    isNoSpareTicket,
    isOrderCreatedError
  }
}
