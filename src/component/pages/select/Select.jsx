import { useState, useEffect } from "react"
import Axios from "axios"
import Display from "../../ui/Display"
import "./Select.css"
import { Box, ThemeProvider } from "@mui/system"
import { Button, Collapse, Container, Divider, Grid, IconButton, Paper, Typography } from "@mui/material"
import Theme from "../../ui/Theme"
import { useHistory } from "react-router"
import Checkbox from "../../ui/Checkbox"
import { FilterList } from "@mui/icons-material"
import { getRandomInt } from "../../../App"
import { LeaderBoard } from "../../../Ads/Ads"

function Select({ id }) {

    const history = useHistory();

    const [dList, setDList] = useState([])
    const [step, setStep] = useState([])
    const [required, setRequired] = useState([])

    const [filter, setFilter] = useState(false);

    useEffect(() => {
        Axios.post("https://friendly-bungotaketa-1534.lolipop.io/getDlistF", {
            step: step,
            required: required
        })
            .then((response) => {
                setDList(response.data)
                console.log(response.data)
            })
    }, [step, required])

    const addStep = (num) => {
        setStep([...step, num])
    }

    const deleteStep = (num) => {
        setStep(step.map((data) => {
            if (data === num) {
                return (null)
            } else {
                return (data)
            }
        }))
    }

    const addReq = (num) => {
        setRequired([...required, num])
    }

    const deleteReq = (num) => {
        setRequired(required.map((data) => {
            if (data === num) {
                return (null)
            } else {
                return (data)
            }
        }))
    }

    return (
        <>
            <ThemeProvider theme={Theme}>
                <Container component="main">{/* 広告を挿入 */}
                    {(() => {

                        const i = getRandomInt(LeaderBoard.length)
                        return (
                            <Box component="a" sx={{ display: "flex", justifyContent: "center", mt: 5 }} href={LeaderBoard[i].url} target="_blank"><img className="img" style={{ width: "100%", maxWidth: "700px" }} src={LeaderBoard[i].img} alt="ad" /></Box>
                        )
                    })()}
                    <Box component="div" sx={{ textAlign: "right", mt: 1 }}>
                        <IconButton onClick={() => setFilter(prev => !prev)}><FilterList /></IconButton>
                        <Typography component="span" variant="subtitle2" sx={{ mt: 5 }}>フィルター</Typography>
                    </Box>
                    <Collapse in={filter}>
                        <Box component={Paper} sx={{ mt: 1, p: 2 }}>
                            <Typography variant="caption" component="p">募集ステータス</Typography>
                            <Checkbox name="募集中" value={2} add={addStep} del={deleteStep} />
                            <Checkbox name="終了" value={4} add={addStep} del={deleteStep} />
                            <Divider sx={{ my: 1 }}></Divider>
                            <Typography variant="caption" component="p">応募条件</Typography>
                            <Checkbox name="Twitterフォローあり" value={1} add={addReq} del={deleteReq} />
                            <Checkbox name="なし" value={0} add={addReq} del={deleteReq} />
                        </Box>
                    </Collapse>
                    <Grid container sx={{ mt: 2, mb: 15 }}>

                        {dList.map((data, index) => {
                            if (data.step === 2 && data.userId !== id) {
                                return (
                                    <Display key={index} info={data} who="other" />
                                )
                            }
                        })}
                        {dList.map((data, index) => {
                            if (data.step === 4 && data.userId !== id) {
                                return (
                                    <Display key={index} info={data} who="other" />
                                )
                            }
                        })}

                    </Grid>
                    <Button variant="contained" onClick={() => { history.push(`/donate/${id}`) }} sx={{ position: "fixed", left: "50%", top: "90%", transform: "translate(-50%, -50%)", fontSize: "1.2rem", px: 7, borderRadius: "45px" }} >
                        寄付する
                    </Button>
                </Container>
            </ThemeProvider>
        </>
    )
}
export default Select