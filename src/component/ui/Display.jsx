import { useState, useEffect, memo } from "react"
import { useHistory } from "react-router-dom"
import Axios from "axios"
import { Grid, Paper, Typography, Chip } from "@mui/material"
import { Redeem } from "@mui/icons-material"

const Display = memo((props) => {
    const { info, who } = props
    const [anumber, setAnumber] = useState(0)
    const [left, setLeft] = useState({})
    const history = useHistory()

    useEffect(() => {
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getAnumber/${info.dId}`)
            .then((response) => {
                setAnumber(response.data.num)
            })
    }, [info])

    useEffect(() => {
        const getLeft = () => {
            const date = new Date()
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const hour = date.getHours()
            const minute = date.getMinutes()

            const dayE = Number(info.newDate.charAt(8) + info.newDate.charAt(9))
            const hourE = Number(info.time.charAt(0) + info.time.charAt(1))
            if (info.step === 4) {
                return { type: "finish" }
            }
            let leftTime;
            if (dayE - day < 0) {
                console.log(dayE - day)
                if (month === 4 || month === 6 || month === 9 || month === 11) {
                    leftTime = 30 - day + dayE
                } else if (month === 2) {
                    if (year % 4 === 0) {
                        leftTime = 29 - day + dayE
                    } else {
                        leftTime = 28 - day + dayE
                    }
                } else {
                    leftTime = 31 - day + dayE
                }
            } else {
                leftTime = dayE - day
            }
            /* 残り日数が1日以上の時 */
            if (leftTime >= 1) {
                if (hourE - hour <= 0) {
                    leftTime -= 1
                }
            }
            /* 残り日数が0の時 */
            if (leftTime === 0) {
                if (hourE - hour <= 0) {
                    leftTime = 24 - hour + hourE - 1
                } else {
                    leftTime = hourE - hour - 1
                }
                /* 残り時間が0時間の場合 */
                if (leftTime === 0) {
                    leftTime = 60 - minute
                    return { type: "minute", left: leftTime }
                }
                return { type: "hour", left: leftTime }
            }
            return { type: "date", left: leftTime }
        }

        if (info.time !== null && info.time !== undefined) {
            const data = getLeft()
            setLeft(data)
        }

    }, [info])

    const goDetail = () => {
        if (who === "admin") {
            history.push({ pathname: `/admin/check/${info.dId}`, state: info })
        } else if (who === "mine") {
            history.push({ pathname: `/myproject/detail/${info.userId}/${info.dId}`, state: info })
        } else {
            history.push({ pathname: `/apply/${info.dId}`, state: info })
        }
    }

    let disLeft;
    if (left.type === "date") {
        disLeft = `残り${left.left}日`
    } else if (left.type === "hour") {
        disLeft = `残り${left.left}時間`
    } else if (left.type === "minute") {
        disLeft = `残り${left.left}分`
    } else if (left.type === "finish") {
        disLeft = `【終了】${info.newDate} ${info.time}`
    }
    else {
        disLeft = "未公開"
    }

    return (
        <Grid item xs={12} onClick={goDetail}>
            <Paper variant="outlined" sx={{ p: 2, cursor: "pointer" }}>
                <Grid container>
                    <Grid item xs={7}>
                        <Typography variant="subtitle2" color="GrayText" component="h3" >{info.username}</Typography>
                        <Typography variant="h5" component="h2">{info.title}</Typography>
                        <Typography variant="subtitle2" component="h3" color="inherit">募集人数 <Typography variant="subtitle1" component="span" style={{ fontWeight: "bold", }}>{info.rnumber}</Typography> 名 / 応募者数 <Typography variant="subtitle1" component="span" style={{ fontWeight: "bold", }}>{anumber}</Typography> 名</Typography>
                    </Grid>
                    <Grid item xs={5} sx={{ textAlign: "right" }}>
                        <Chip label={disLeft} color="secondary" sx={{ mb: 2 }} />
                        <Grid container>
                            <Grid item sx={{ flexGrow: 1 }} />
                            <Grid item><Redeem /></Grid>
                            <Grid item >{info.amount}円 / １人あたり</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
})
export default Display