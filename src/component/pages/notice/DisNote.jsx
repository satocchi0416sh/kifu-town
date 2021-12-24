import { useState, useEffect, memo } from "react"
import Axios from "axios"
import { useHistory } from "react-router-dom"
import { Collapse, Divider, Grid, IconButton, Paper, Typography } from "@mui/material"
import { ExpandLess, ExpandMore } from "@mui/icons-material"

const DisNote = memo((props) => {
    const { type, dId, title, text, date } = props
    const [info, setInfo] = useState("")
    const history = useHistory()

    useEffect(() => {
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getDinfo/${dId}`)
            .then((response) => {
                console.log(response.data)
                setInfo(response.data[0])
            })
    }, [dId])

    const goDetail = () => {
        if (type === 1) {
            history.push({ pathname: `/myproject/detail/${info.userId}/${info.dId}`, state: info })
        } else {
            history.push({ pathname: `/apply/${info.dId}`, state: info })
        }
    }

    const [textOpen, setTextOpen] = useState(false);

    return (
        <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2, cursor: "pointer" }}>
                <Grid container>
                    <Grid item xs={8} onClick={goDetail}><Typography variant="subtitle1">{title}</Typography></Grid>
                    <Grid item xs={4} sx={{ textAlign: "right" }}>
                        <Typography variant="caption">12/24 01:14
                            <IconButton onClick={() => setTextOpen(prev => !prev)}>
                                {text === null ? null :
                                    <>
                                        {textOpen ? <ExpandLess /> : <ExpandMore />}
                                    </>
                                }
                            </IconButton>
                        </Typography>
                    </Grid>
                </Grid>
                <Collapse in={textOpen}>
                    <Divider sx={{ my: 2 }} />
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">{text}</Typography>
                    </Grid>
                </Collapse>

            </Paper>
        </Grid>
    )
})
export default DisNote