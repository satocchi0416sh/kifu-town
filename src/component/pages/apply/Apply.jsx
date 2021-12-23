import { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import Axios from "axios"
import { Box, ThemeProvider } from "@mui/system"
import Theme from "../../ui/Theme"
import { Alert, Avatar, Button, Container, Divider, Grid, Paper, Typography } from "@mui/material"
import { Redeem } from "@mui/icons-material"

function Apply(props) {
    const { id, twitterId } = props
    const history = useHistory()
    const { state } = useLocation()
    const [twitterInfo, setTwitterInfo] = useState({})
    const [anumber, setAnumber] = useState(0)
    const [fill, setFill] = useState(false)


    useEffect(() => {
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getAnumber/${state}.dId}`)
            .then((response) => {
                setAnumber(response.data.num)
            })
    }, [state])

    useEffect(() => {
        const getTwitterData = async () => {
            if (state.required === 1) {
                if (twitterId !== null && twitterId !== undefined) {
                    const { data } = await Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/twitterData/${state.twitterId}`)
                    setTwitterInfo(data)
                    Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/followData/${twitterId}`)
                        .then((response) => {
                            console.log(response.data)
                            if (response.data.errors === undefined) {
                                console.log(response.data.ids.includes(data.id))
                                if (response.data.ids.includes(data.id)) {
                                    setFill(true)
                                }
                            } else {
                                alert("現在アクセスが集中しています。しばらく時間を置いてから再度アクセスしてください。")
                            }
                        })
                }

            } else {
                setFill(true)
            }
        }
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/ifApply/${id}/${state.dId}`)
            .then((response) => {
                if (response.data.result) {
                    getTwitterData()
                } else {
                    alert("すでに応募しています")
                }
            })
    }, [state, id, twitterId])


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
                        <Typography variant="subtitle1" sx={{ my: 2 }}>募集締切 : {state.newDate} {state.time}</Typography>
                        <Grid container component={Paper} sx={{ p: 2, textAlign: "center" }}>
                            <Grid item xs>
                                募集人数<br />{state.rnumber}名/応募者数{anumber}名
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid item xs>
                                １人あたり<br />{Number(state.amount / state.rnumber)}円
                            </Grid>
                        </Grid>
                        <Box sx={{ textAlign: "left", width: "100%" }}>
                            <Typography component="p" variant="body1" sx={{ mt: 2 }}>{state.text}</Typography>
                            <Typography component="p" variant="body1" sx={{ mt: 2, mb: 1 }}>応募条件</Typography>

                            {state.required === 1 ?
                                <>
                                    <Typography variant="caption" sx={{ mb: 1 }}>以下のツイッターアカウントをフォローしていただく必要があります。</Typography>
                                    <Paper sx={{ p: 2 }}>
                                        {twitterId === null || twitterId === undefined ?
                                            <p>ツイッターアカウントを登録してください</p>
                                            :
                                            null}
                                        <Button component="a" href={`https://twitter.com/${state.twitterId}`} sx={{ display: "flex" }} target="_blank">
                                            <Avatar alt={twitterInfo.name} src={twitterInfo.profile_image_url} />
                                            <Typography variant="subtitle1" sx={{ ml: 1 }}>{twitterInfo.name}</Typography>
                                        </Button>
                                    </Paper>
                                </>
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
                            {fill ?
                                <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => { history.push(`/applyForm/${state.dId}`) }}>応募する</Button>
                                :
                                <Alert fullWidth sx={{ mt: 2 }} severity="error">あなたは応募のための条件を満たしていません</Alert>
                            }
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}
export default Apply