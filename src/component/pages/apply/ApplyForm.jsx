import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import Axios from "axios"
import { Box, ThemeProvider, typography } from "@mui/system"
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material"
import Theme from "../../ui/Theme"

function ApplyForm(props) {
    const { id, name } = props
    const [message, setMessage] = useState("")
    const [page, setPage] = useState("1")
    const history = useHistory()
    const { dId } = useParams()

    const apply = async () => {
        const { data } = await Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getUserEmail/${id}`)
        console.log(data)
        Axios.post("https://friendly-bungotaketa-1534.lolipop.io/apply", {
            dId: dId,
            userId: id,
            username: name,
            email: data.email,
            message: message
        })
        setPage("3")
    }

    let currentPage
    if (page === "1") {
        currentPage =
            <ThemeProvider theme={Theme}>
                <Container>
                    <Box sx={{ mt: 5 }}>
                        <Typography component="h1" variant="h4">応募メッセージ</Typography>
                        <Typography sx={{ mt: 2, mb: 1 }} variant="subtitle1">寄付者に届けたいメッセージを入力しましょう</Typography>
                        <TextField label="メッセージ" required fullWidth value={message} sx={{ mb: 1 }} onChange={(e) => { setMessage(e.target.value) }} />
                        {message === "" ?
                            <Button fullWidth variant="contained">確認する</Button>
                            :
                            <Button fullWidth variant="contained" onClick={() => { setPage("2") }}>確認する</Button>
                        }
                    </Box>
                </Container>
            </ThemeProvider>

    } else if (page === "2") {
        currentPage =
            <ThemeProvider theme={Theme}>
                <Container>
                    <Box sx={{ mt: 5 }}>
                        <Typography component="h1" variant="h4">応募メッセージ</Typography>
                        <Typography sx={{ mt: 2, mb: 1 }} variant="subtitle1">寄付者に届けたいメッセージを入力しましょう</Typography>
                        <Paper sx={{ p: 2 }}><Typography variant="subtitle1">{message}</Typography></Paper>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={6} >
                                <Button fullWidth variant="contained" onClick={() => { setPage("1") }}>戻る</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth variant="contained" onClick={apply}>応募する</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </ThemeProvider>
    } else {
        currentPage =
            <ThemeProvider theme={Theme}>
                <Container>
                    <Box sx={{ mt: 5 }}>
                        <Typography component="h1" variant="h4">応募が完了しました</Typography>
                        <Button sx={{ mt: 1 }} fullWidth variant="contained" onClick={() => { history.push("/") }}>戻る</Button>
                    </Box>
                </Container>
            </ThemeProvider>
    }
    return (
        <>
            {currentPage}
        </>
    )
}
export default ApplyForm