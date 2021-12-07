import { useState, useEffect, memo } from "react"
import { useHistory } from "react-router-dom"
import Axios from "axios"

const Display = memo((props) => {
    const { info, who } = props
    const [ anumber, setAnumber ] = useState(0)
    const [ left, setLeft ] = useState({})
    const history = useHistory()

    useEffect(() => {
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getAnumber/${info.dId}`)
        .then((response) => {
            setAnumber(response.data.num)
        })
    },[info])

    useEffect(() => {
        const getLeft = () => {
            const date = new Date()
            const year = date.getFullYear()
            const month = date.getMonth()+1
            const day = date.getDate()
            const hour = date.getHours()
            const minute = date.getMinutes()

            const dayE = Number(info.newDate.charAt(8)+info.newDate.charAt(9))
            const hourE = Number(info.time.charAt(0) + info.time.charAt(1))
            if(info.step === 4){
                return {type:"finish"}
            }
            let leftTime;
            if( dayE - day < 0 ){
                console.log( dayE - day)
                if( month === 4 || month === 6 || month === 9 || month === 11 ){
                    leftTime = 30 - day + dayE
                }else if( month === 2 ){
                    if( year % 4 === 0){
                        leftTime = 29 - day + dayE
                    }else{
                        leftTime = 28 - day + dayE
                    }
                }else{
                    leftTime = 31 - day + dayE
                }
            }else{
                leftTime = dayE - day
            }
            /* 残り日数が1日以上の時 */
            if( leftTime >= 1){
                if( hourE - hour <= 0){
                    leftTime -= 1
                }
            }
            /* 残り日数が0の時 */
            if( leftTime === 0){
                if( hourE - hour <= 0){
                    leftTime = 24 - hour + hourE -1
                }else{
                    leftTime = hourE - hour -1
                }
                /* 残り時間が0時間の場合 */
                if(leftTime === 0){
                    leftTime= 60 - minute
                    return {type:"minute",left:leftTime}
                }
                return {type:"hour",left:leftTime}
            }
            return {type:"date",left:leftTime}
        }

        if( info.time !== null && info.time !== undefined ){
            const data = getLeft()
            setLeft(data)
        }
       
    },[info])

    const goDetail = () => {
        if(who === "admin"){
            history.push({pathname:`/admin/check/${info.dId}`, state:info})
        }else if(who === "mine"){
            history.push({pathname:`/myproject/detail/${info.userId}/${info.dId}`, state:info})
        }else{
            history.push({pathname:`/apply/${info.dId}`, state:info})
        }
    }

    let disLeft;
    if(left.type === "date"){
        disLeft=<p>残り{left.left}日</p>
    }else if(left.type === "hour"){
        disLeft=<p>残り{left.left}時間</p>
    }else if(left.type === "minute"){
        disLeft=<p>残り{left.left}分</p>
    }else if(left.type === "finish"){
        disLeft=<p>【終了】{info.newDate} {info.time}</p>
    }
    return(
        <div onClick={goDetail}>
            <h5>寄付者：{info.username}</h5>
            <h2>{info.title}</h2>
            <p>募集人数{info.rnumber}名/応募者数{anumber}名</p>
            <p>{info.amount}円/１人あたり</p>
            {disLeft}
            <br/>
        </div> 
    )
})
export default Display