import { useState, useEffect } from "react"
import Axios from "axios"
import Display from "../../ui/Display"
import "./Select.css"
import { Box, display, ThemeProvider } from "@mui/system"
import { Button, Container, Grid } from "@mui/material"
import Theme from "../../ui/Theme"
import { useHistory } from "react-router"

function Select({ id }) {

    const history = useHistory();

    const [dList, setDList] = useState([])

    useEffect(() => {
        Axios.get("https://friendly-bungotaketa-1534.lolipop.io/getDlist")
            .then((response) => {
                setDList(response.data)
                console.log(response.data)
            })
    }, [])

    return (
        <>
            <ThemeProvider theme={Theme}>
                <Container component="main">
                    <Grid container sx={{ mt: 5, mb: 15 }}>

                        {dList.map((data, index) => {
                            return (
                                <Display key={index} info={data} who="other" />
                            )
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