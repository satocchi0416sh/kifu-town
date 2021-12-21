import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { authentication } from "../../firebase/firebase"
import { signInWithPopup, TwitterAuthProvider } from '@firebase/auth';
import Axios from "axios"
import "./Profile.css"
import { ThemeProvider } from "@mui/system";
import { Button, Container, Grid, Paper, TextField } from "@mui/material";
import Theme from "../../ui/Theme";


function Profile(props) {
    const { id, twitterId, edit } = props
    const [newName, setNewName] = useState("")
    const [newTwitterId, setNewTwitterId] = useState(twitterId)
    const [newComment, setNewComment] = useState("")

    /* モード  */
    const [editMode, setEditMode] = useState(false)
    const { userId } = useParams()

    useEffect(() => {
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getUserInfo/${userId}`)
            .then((response) => {
                setNewName(response.data.username)
                setNewTwitterId(response.data.twitterId)
                if (response.data.comment === null) {
                    setNewComment("")
                } else {
                    setNewComment(response.data.comment)
                }

            })
    }, [userId])

    const editInfo = () => {
        Axios.post("https://friendly-bungotaketa-1534.lolipop.io/editUserInfo", {
            userId: id,
            username: newName,
            comment: newComment,
            twitterId: newTwitterId
        })
        edit(newName, newTwitterId)
        setEditMode(false)
    }

    const signIn = () => {
        const provider = new TwitterAuthProvider()
        signInWithPopup(authentication, provider)
            .then((response) => {
                setNewTwitterId(response._tokenResponse.screenName)
            })
    }



    return (
        <div className="profile-page">

            <ThemeProvider theme={Theme}>
                <Container component="main">
                    <Paper sx={{ mt: 5, p: 2, textAlign: "center" }}>
                        <>
                            {editMode ?
                                <>

                                    <div className="info-wrapper">
                                        <Grid container rowSpacing={3}>
                                            <Grid item xs={12}>
                                                <h2>編集</h2>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField fullWidth label="名前" value={newName} onChange={(e) => { setNewName(e.target.value) }} required />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField fullWidth label="ひとこと" value={newComment} onChange={(e) => { setNewComment(e.target.value) }} />
                                            </Grid>
                                            {newTwitterId === null || newTwitterId === undefined
                                                ?
                                                <Grid item xs={12}>
                                                    <Button variant="outlined" onClick={signIn}>ツイッターと連携</Button>
                                                </Grid>
                                                :
                                                <>
                                                    <Grid item xs={12}>
                                                        <label>twitter（認証済み）</label>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <label>@{newTwitterId}</label>
                                                    </Grid>

                                                </>
                                            }
                                            <Grid item xs={12}>
                                                <Button fullWidth size="large" variant="contained" onClick={editInfo}>決定</Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </>
                                :

                                <div className="info-wrapper">
                                    <h2>プロフィール</h2>
                                    <br />
                                    <label>名前</label>
                                    <p>{newName}</p>
                                    <label>ひとこと</label>
                                    <p>{newComment}</p>
                                    <br />
                                    {newTwitterId === null || newTwitterId === undefined
                                        ?
                                        <label>twitter未登録</label>
                                        :
                                        <>
                                            <label>twitter</label>
                                            <br />
                                            <label>@{newTwitterId}</label>
                                            <br />
                                        </>
                                    }
                                    <br />
                                    {Number(userId) === id ?
                                        <Button fullWidth size="large" variant="contained" onClick={() => { setEditMode(true) }}>編集</Button>
                                        :
                                        null
                                    }

                                </div>
                            }
                        </>
                    </Paper>
                </Container>
            </ThemeProvider>
        </div>

    )
}
export default Profile