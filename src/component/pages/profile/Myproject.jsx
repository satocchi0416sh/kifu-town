import { useState, useEffect } from "react"
import Axios from "axios"
import Display from "../../ui/Display"
import { Grid, Typography, ThemeProvider, Container } from "@mui/material"
import Theme from "../../ui/Theme"
import { styled } from "@mui/system"

function Myproject(props) {
    const { id } = props
    const [unselected, setUnselected] = useState([])
    const [release, setRelease] = useState([])
    const [unpaid, setUnpaid] = useState([])
    const [finished, setFinished] = useState([])
    const [unAccepted, setUnAccepted ] = useState([])

    useEffect(() => {
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getUnselected/${id}`)
            .then((response) => {
                setUnselected(response.data)
            })
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getRelease/${id}`)
            .then((response) => {
                setRelease(response.data)
            })
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getUnpaid/${id}`)
            .then((response) => {
                setUnpaid(response.data)
            })
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getFinished/${id}`)
            .then((response) => {
                setFinished(response.data)
            })
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getUnaccepted/${id}`)
        .then((response) => {
            setUnAccepted(response.data)
        })
    }, [id])

    return (
        <ThemeProvider theme={Theme}>
            <Container component="main">
                {unselected.length > 0 ?
                    <>
                        <Typography sx={{ mt: 4, mb: 1 }} variant="h6" component="h2">当選者が決まっていないプロジェクト</Typography>
                        <Grid container>
                            {unselected.map((data, index) => {
                                return (
                                    <Display key={index} info={data} who="mine" />
                                )
                            })}
                        </Grid>
                    </>
                    :
                    null
                }

                {unpaid.length > 0 ?
                    <>
                        <Typography sx={{ mt: 4, mb: 1 }} variant="h6" component="h2">未払いのプロジェクト</Typography>
                        <Grid container>
                            {unpaid.map((data, index) => {
                                return (
                                    <Display key={index} info={data} who="mine" />
                                )
                            })}
                        </Grid>
                    </>
                    :
                    null
                }

                {release.length > 0 ?
                    <>
                        <Typography sx={{ mt: 4, mb: 1 }} variant="h6" component="h2">現在公開中のプロジェクト</Typography>
                        <Grid container>
                            {release.map((data, index) => {
                                return (
                                    <Display key={index} info={data} who="mine" />
                                )
                            })}
                        </Grid>
                    </>
                    :
                    null}

                    {unAccepted.length > 0 ?
                    <>
                        <Typography sx={{ mt: 4, mb: 1 }} variant="h6" component="h2">申請中のプロジェクト</Typography>
                        <Grid container>
                            {unAccepted.map((data, index) => {
                                return (
                                    <Display key={index} info={data} who="mine" />
                                )
                            })}
                        </Grid>
                    </>
                    :
                    null}

                {finished.length > 0 ?
                    <>
                        <Typography sx={{ mt: 4, mb: 1 }} variant="h6" component="h2">終了したプロジェクト</Typography>
                        <Grid container>
                            {finished.map((data, index) => {
                                return (
                                    <Display key={index} info={data} who="mine" />
                                )
                            })}
                        </Grid>
                    </>
                    :
                    null
                }
            </Container>
        </ThemeProvider>
    )
}
export default Myproject