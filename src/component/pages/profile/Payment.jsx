import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useLocation } from "react-router-dom"

const Payment = () => {
    const { state } = useLocation()
    const amount = Number(state.amount * state.rnumber + state.amount*state.rnumber * 0.1 + 300)

    const completePayment = () => {
      const date = new Date()
      date.setDate(date.getDate() + 5);
      const year = date.getFullYear()
      const month = date.getMonth()+1
      const day = date.getDate()
      const hour = date.getHours()
      var dayOfWeek = date.getDay() ;	// 曜日(数値)
      var dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek]
      console.log(`${year}/${month}/${day}`)
      Axios.post("https://friendly-bungotaketa-1534.lolipop.io/pay",{
        dId:state.dId,
        date:year + "-" + month + "-" + day + " " + hour + ":" + "00",
        week:dayOfWeekStr
      })
    }

    return (
      <>

      <br/><br/><br/><br/><br/>
      <p>寄付総額：{state.amount * state.rnumber}円</p>
      <p>手数料:{state.amount*state.rnumber * 0.1 + 300}円</p>
      <p>合計:{amount}円</p>
       
      <PayPalButton
        amount={`${amount}`}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          console.log(details,data)
          completePayment()
        }}
        options={{
            clientId: "AeX01Jz-REWB1Lvhj0UAlXvFFfpLlHYDBVXCn6SOyptoaar4UhrBt1j1DyPqn561AvuJCxbhuaE7dJNE",
            currency:"JPY"
        }}
      />
      <button onClick={completePayment}>クリック</button>
      </>
    );
}
export default Payment