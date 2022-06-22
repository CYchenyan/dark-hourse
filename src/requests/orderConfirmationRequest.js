import fetch from 'cross-fetch'

 export const createTicketOrderAPI = ({
  pid,
  userInfo
}) => {
  // return Promise.resolve({
  //     flight: "MU5099",
  //     id: 111,
  //     passenger: "cy",
  //     phoneNum: 18080808080
  // })
  return fetch(`http://localhost:8080/ticket-proposals/${pid}/ticket-contract`, {
    userInfo
  }).then(res => res.json)
}
