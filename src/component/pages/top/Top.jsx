import { Alert, AlertTitle, Button, Grid, Paper, ThemeProvider, Typography } from "@mui/material"
import { useHistory } from "react-router-dom"
import Theme from "../../ui/Theme"
import "./Top.css"
function Top(props) {
    const { id, isLoggedIn } = props
    const history = useHistory()
    console.log("top")
    return (
        <div>
            {isLoggedIn
                ?
                <>
                    <ThemeProvider theme={Theme}>
                        <Grid container sx={{ mt: 5 }}>
                            <Grid item xs={6}>
                                <Paper sx={{ m: 1, p: 1 }}>
                                    <Typography variant="h6" component="h1" sx={{ mb: 3 }}>寄付する</Typography>
                                    <Alert severity="info">
                                        <AlertTitle>説明</AlertTitle>
                                        ここに説明が入ります <br />— <strong>強調することもできます</strong>
                                    </Alert>

                                    <Grid container sx={{ my: 2 }} spacing={1}>
                                        <Grid item>
                                            <Button variant="text">マイプロジェクトを見る</Button>
                                        </Grid>
                                    </Grid>
                                    <Button variant="contained" sx={{ mt: 1 }} onClick={() => { history.push(`/donate/${id}`) }}>
                                        寄付する
                                    </Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper sx={{ m: 1, p: 1 }}>
                                    <Typography variant="h6" component="h1" sx={{ mb: 3 }}>寄付を受ける</Typography>
                                    <Alert severity="info">
                                        <AlertTitle>説明</AlertTitle>
                                        ここに説明が入ります <br />— <strong>強調することもできます</strong>
                                    </Alert>
                                    <Button variant="contained" sx={{ mt: 1 }} onClick={() => { history.push("/selectDonation") }}>
                                        寄付を受ける
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </ThemeProvider>
                </>
                :
                <>
                    <ThemeProvider theme={Theme}>
                        <Grid container sx={{ mt: 5 }}>
                            <Grid item xs={6}>
                                <Paper sx={{ m: 1, p: 1 }}>
                                    <Typography variant="h6" component="h1" sx={{ mb: 3 }}>【サービス名】 ログイン</Typography>
                                    <Alert severity="info">
                                        <AlertTitle>注意事項</AlertTitle>
                                        ここに注意事項が入ります <br />— <strong>強調することもできます</strong>
                                    </Alert>

                                    <Grid container sx={{ my: 2 }} spacing={1}>
                                        <Grid item>
                                            <Button variant="text">プライバシーポリシー</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="text">利用規約</Button>
                                        </Grid>
                                    </Grid>
                                    <Button variant="contained" sx={{ mt: 1 }} onClick={() => { history.push("/login") }}>
                                        ログイン
                                    </Button>
                                </Paper>
                            </Grid>

                            <Grid item xs={6}>
                                <Paper sx={{ m: 1, p: 1 }}>
                                    <Typography variant="h6" component="h1" sx={{ mb: 3 }}>初めてご利用になる方</Typography>
                                    <Alert severity="info">
                                        <AlertTitle>注意事項</AlertTitle>
                                        ここに注意事項が入ります <br />— <strong>強調することもできます</strong>
                                    </Alert>
                                    <Button variant="contained" sx={{ mt: 1 }} onClick={() => { history.push("/signup") }}>
                                        新規登録
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </ThemeProvider>
                </>
            }

        </div>
    )
}
export default Top