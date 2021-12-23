import { useState, useEffect, memo } from "react"
import Axios from "axios"
import { useHistory } from "react-router-dom"

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

    return (
        <div>
            <h2>{title}</h2>
            <p>12/24 01:14</p>
            <p>{text}</p>
            <button onClick={goDetail}>プロジェクト詳細</button>
        </div>
    )
})
export default DisNote