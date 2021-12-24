import { useHistory, useParams, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Axios from "axios"
import DisNote from "./DisNote"

function Notice(props) {
    const { id, notificationNum } = props
    const history = useHistory()
    const [noticeList, setNoticeList] = useState([])//情報のリスト

    useEffect(() => {
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getNotice/${id}`)
        .then((response) => {
                setNoticeList(response.data)
                console.log(response.data)
        })
        Axios.post(`https://friendly-bungotaketa-1534.lolipop.io/readNotice/${id}`)
        .then((response) => {
                setNoticeList(response.data)
        })
        notificationNum()   
    }, [id])



    return (
        <>
            <p>お知らせ</p>
            {noticeList.map((data, index) => {
                return (
                    <DisNote key={index} type={data.type} dId={data.dId} title={data.title} text={data.text} date={data.newDate} />
                )
            })}
        </>
    )


}
export default Notice