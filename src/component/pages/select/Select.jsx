import { useState, useEffect } from "react"
import Axios from "axios"
import Display from "../../ui/Display"
import "./Select.css"
import { Box, display, ThemeProvider } from "@mui/system"
import { Container, Grid } from "@mui/material"
import Theme from "../../ui/Theme"
function Select(props) {
    
    const { id } = props
    console.log(id)
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
                    <Grid container sx={{ mt: 5 }}>

                        {dList.map((data, index) => {
                            
                            if(id === data.userId){
                                return(null)
                            }else{
                                return (
                                    <Display key={index} info={data} who="ohter" />
                                )
                            }
                            
                        })}

                    </Grid>
                </Container>
            </ThemeProvider>
        </>
    )
}
export default Select