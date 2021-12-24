import { ThemeProvider } from "@emotion/react";
import { Container, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useLocation } from "react-router-dom"
import Theme from "../../ui/Theme";

const Payment = () => {
  const { state } = useLocation()
  const amount = Number(state.amount * state.rnumber + state.amount * state.rnumber * 0.1 + 300)

  const completePayment = () => {
    const date = new Date()
    date.setDate(date.getDate() + 5);
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    var dayOfWeek = date.getDay();	// 曜日(数値)
    var dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek]
    console.log(`${year}/${month}/${day}`)
    Axios.post("https://friendly-bungotaketa-1534.lolipop.io/pay", {
      dId: state.dId,
      date: year + "-" + month + "-" + day + " " + hour + ":" + "00",
      week: dayOfWeekStr
    })
  }

  return (
    <ThemeProvider theme={Theme}>
      <Container sx={{ mt: 4 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>お支払い</Typography>
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  寄付総額
                </TableCell>
                <TableCell align="right">
                  {state.amount * state.rnumber}円
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  手数料
                </TableCell>
                <TableCell align="right">
                  {state.amount * state.rnumber * 0.1 + 300}円
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  合計
                </TableCell>
                <TableCell align="right">
                  {amount}円
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <PayPalButton
          amount={`${amount}`}
          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          onSuccess={(details, data) => {
            console.log(details, data)
            completePayment()
          }}
          options={{
            clientId: "AeX01Jz-REWB1Lvhj0UAlXvFFfpLlHYDBVXCn6SOyptoaar4UhrBt1j1DyPqn561AvuJCxbhuaE7dJNE",
            currency: "JPY"
          }}
        />
        <button onClick={completePayment}>クリック</button>
      </Container>
    </ThemeProvider>
  );
}
export default Payment