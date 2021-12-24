import { useHistory, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Axios from "axios"
import { Box, ThemeProvider } from "@mui/system"
import { Alert, Avatar, Button, Container, Divider, Grid, Paper, Typography } from "@mui/material"
import Theme from "../../ui/Theme"
import { Redeem } from "@mui/icons-material"
import { comma } from "../../../App"

function Detail(props) {
    const { id } = props
    const history = useHistory()
    const { state } = useLocation()
    const [slist, setSlist] = useState([])

    useEffect(() => {
        if (state.step === 4) {
            Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getSelectedApplicant/${state.dId}`)
                .then((response) => {
                    setSlist(response.data)
                    console.log(response.data)
                })
        }
    }, [state])

    let stepContainer;
    if (state.step === 0) {
        stepContainer = <div>
            <p>このプロジェクトは現在審査中です。もうしばらくお待ちください。</p>
        </div>
    } else if (state.step === 1) {
        stepContainer = <div>
            <p>あなたのプロジェクトはまだ公開されていません。公開される為には支払いを済ませてください。</p>
            <Button variant="contained" fullWidth onClick={() => { history.push({ pathname: `/myproject/payment/${state.userId}/${state.dId}`, state: state }) }} sx={{ my: 2 }}>支払う</Button>
        </div>
    } else if (state.step === 2) {
        stepContainer = <div>
            <p>このプロジェクトは現在公開されています</p>
            <Button variant="contained" fullWidth onClick={() => { history.push({ pathname: `/myproject/applicants/${id}/${state.dId}`, state: state }) }} sx={{ my: 2 }}>応募者一覧</Button>
        </div>
    } else if (state.step === 3) {
        stepContainer = <div>
            <p>募集期間が終了しました。当選者を選んでください</p>
            <Button variant="contained" fullWidth onClick={() => { history.push({ pathname: `/myproject/applicants/${id}/${state.dId}`, state: state }) }} sx={{ my: 2 }}>当選者を選ぶ</Button>
        </div>
    } else if (state.step === 4) {
        stepContainer = <div>
            <p>このプロジェクトはすでに終了しています</p>
            <p>当選者</p>
            {slist.map((data, index) => {
                return (
                    <p key={index}>{data.username}</p>
                )
            })}
        </div>
    } else {
        stepContainer = <div>
            <p>このプロジェクトは許可されませんでした</p>
        </div>
    }

    return (
        <div>
            <ThemeProvider theme={Theme}>
                <Container>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <Redeem />
                        </Avatar>
                        <Typography component="h2" variant="h6">{state.username}</Typography>
                        <Typography component="h1" variant="h4" sx={{ mt: 2 }}>{state.title}</Typography>
                        <Grid container component={Paper} sx={{ p: 2, textAlign: "center" }}>
                            <Grid item xs>
                                募集人数<br />{state.rnumber}名
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid item xs>
                                1人あたり<br />{comma(Number(state.amount / state.rnumber))}円
                            </Grid>
                        </Grid>
                        <Box sx={{ textAlign: "left", width: "100%" }}>
                            <Typography component="p" variant="body1" sx={{ mt: 2 }}>{state.text}</Typography>
                            <Typography component="p" variant="body1" sx={{ mt: 2, mb: 1 }}>応募条件</Typography>

                            {state.required === 1 ?
                                <Paper sx={{ p: 2 }}>
                                    <p>Twitterをフォロー</p>
                                </Paper>
                                :
                                <Paper sx={{ p: 2 }}>
                                    <p>なし</p>
                                </Paper>
                            }

                            <Typography component="p" variant="body1" sx={{ mt: 2, mb: 1 }}>選定方法</Typography>
                            <Paper sx={{ p: 2 }}>
                                {state.auto === 1 ?
                                    <p>自動抽選</p>
                                    :
                                    <p>手動選択</p>
                                }
                            </Paper>
                        </Box>
                        <Alert sx={{ mt: 2 }} severity="info">{stepContainer}</Alert>
                    </Box>
                </Container>
            </ThemeProvider>

        </div>
    )
}
export default Detail