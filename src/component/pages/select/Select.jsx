import { useState, useEffect } from "react"
import Axios from "axios"
import Display from "../../ui/Display"
import "./Select.css"
import { Box, display, ThemeProvider } from "@mui/system"
import { Button, Container, Grid } from "@mui/material"
import Theme from "../../ui/Theme"
import { useHistory } from "react-router"
import Checkbox from "../../ui/Checkbox"

function Select({ id }) {

    const history = useHistory();

    const [dList, setDList] = useState([])
    const [step, setStep] = useState([])
    const [required, setRequired] = useState([])

    useEffect(() => {
        Axios.post("https://friendly-bungotaketa-1534.lolipop.io/getDlistF",{
            step:step,
            required:required
        })
        .then((response) => {
            setDList(response.data)
            console.log(response.data)
        })
    }, [step,required])

    const addStep = (num) => {
        setStep([...step, num])
    }

    const deleteStep = (num) => {
        setStep(step.map((data) => {
            if(data === num){
                return(null)
            }else{
                return(data)
            }
        }))
    }

    const addReq = (num) => {
        setRequired([...required, num])
    }

    const deleteReq = (num) => {
        setRequired(required.map((data) => {
            if(data === num){
                return(null)
            }else{
                return(data)
            }
        }))
    }

    return (
        <>
            <ThemeProvider theme={Theme}>
                <Container component="main">
                    <br/><br/><br/><br/>
                    <label>フィルター</label>
                    <br/>
                    <label>募集ステータス</label>
                    <br/>
                    <Checkbox name="募集中" value={2} add={addStep} del={deleteStep}/>
                    <Checkbox name="終了" value={4} add={addStep} del={deleteStep}/>
                    <br/>
                    <label>応募条件</label>
                    <br/>
                    <Checkbox name="Twitterフォローあり" value={1} add={addReq} del={deleteReq}/>
                    <Checkbox name="なし" value={0} add={addReq} del={deleteReq}/>
                    <Grid container sx={{ mt: 5, mb: 15 }}>

                        {dList.map((data, index) => {
                            if(data.step === 2 && data.userId !== id){
                                return (
                                    <Display key={index} info={data} who="other" />
                                )
                            }
                        })}
                        {dList.map((data, index) => {
                            if(data.step === 4 && data.userId !== id){
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