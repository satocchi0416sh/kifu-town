import { useState } from "react"
import { Link, useHistory } from 'react-router-dom';
import Axios from "axios"
import { Avatar, Button, Container, CssBaseline, Grid, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LockOutlined } from "@mui/icons-material";
import Theme from "../../ui/Theme";
Axios.defaults.withCredentials = true

function Login(props) {
    const { login } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passError, setPassError] = useState(false)

    const history = useHistory();

    /*ログイン欄とパスワード欄が入力されたとき */
    const emailChange = (e) => {
        setEmail(e.target.value)
    }
    const passChange = (e) => {
        setPassword(e.target.value)
    }

    /*ログインボタンが押された時 */
    const decideLogin = () => {
        setEmailError(false)
        setPassError(false)
        Axios.post("https://friendly-bungotaketa-1534.lolipop.io/login", {
            email: email,
            password: password
        }, { withCredentials: true }).then((response) => {
            if (response.data.isLoggedIn) {
                history.push("/")
                var array = []
                var obj = {
                    "token": response.data.token
                }
                array.push(obj)
                var setjson = JSON.stringify(obj)
                window.localStorage.setItem("loggedDataTokenForkifukeiji", setjson)
                login(response.data.id, response.data.name, response.data.twitterId)
            } else {
                if (response.data.errorMsg === "email") {
                    setEmailError(true)
                } else {
                    setPassError(true)
                }
            }
        })
    }

    /*ホームに戻る */
    const backpage = () => {
        history.goBack()
    }

    return (
        <>{/*
            <div className="form">
                <div className="container">
                    <label>メールアドレス</label>
                    <br />
                    <input type="text" value={email} onChange={emailChange} placeholder="email" />
                    {emailError ?
                        <p>このメールアドレスは登録されていません</p>
                        : null}
                    <br />
                    <label>パスワード</label>
                    <br />
                    <input type="password" value={password} onChange={passChange} placeholder="password" />
                    {passError ?
                        <p>パスワードが間違っています</p>
                        : null}
                    <br />
                    <button onClick={decideLogin}>ログイン</button>
                    <br />
                    <button onClick={backpage}>戻る</button>
                </div>
                    </div>*/}
            < ThemeProvider theme={Theme} >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />

                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            ログイン
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>

                            <TextField
                                error={emailError}
                                helperText={emailError ? "このメールアドレスは登録されていません" : null}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="メールアドレス"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={emailChange}
                            />

                            <TextField
                                error={passError}
                                helperText={passError ? "パスワードが間違っています" : null}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="パスワード"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={passChange}
                            />
                            <Button
                                color="primary"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={decideLogin}
                            >
                                ログイン
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                </Grid>
                                <Grid item>
                                    <Link to="/signup" variant="body2">
                                        アカウントをお持ちでない場合は登録
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >

        </>
    )
}
export default Login