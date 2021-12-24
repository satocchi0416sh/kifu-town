import { useHistory, useParams, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Axios from "axios"
import DisNote from "./DisNote"
import { Container, Grid, Typography } from "@mui/material"
import Theme from "../../ui/Theme"
import { ThemeProvider } from "@emotion/react"

function Notice(props) {
    const { id, notificationNum } = props
    const history = useHistory()
    const [noticeList, setNoticeList] = useState([])//情報のリスト

    useEffect(() => {
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getNotice/${id}`)
            .then((response) => {
                setNoticeList(response.data)
                console.log(response.data)
            })
        Axios.post(`https://friendly-bungotaketa-1534.lolipop.io/readNotice/${id}`)
            .then((response) => {
                setNoticeList(response.data)
            })
        //notificationNum()
    }, [id])



    return (
        <>
            <ThemeProvider theme={Theme}>
                <Container sx={{ mt: 4 }}>
                    <Typography variant="h6" component="h1">お知らせ</Typography>
                    <Grid container sx={{ mt: 2 }}>
                        {noticeList.map((data, index) => {
                            return (
                                <DisNote key={index} type={data.type} dId={data.dId} title={data.title} text={data.text} date={data.newDate} />
                            )
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>
        </>
    )


}
export default Notice