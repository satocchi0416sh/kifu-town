import { useHistory, useParams, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Axios from "axios"

function Notice(props){
    const { id } = props
    const history = useHistory()
    const [ noticeList, setNoticeList ] = useState([])//情報のリスト

    useEffect(() => {
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getNotice/${id}`)
        .then((response) => {
            setNoticeList(response.data)
        })
    },[id])
    
    return(
        <>
        <p>お知らせ</p>
        {noticeList.map((data, index) => {
            return(
                <p>{data}</p>
            )
        })}
        </>
    )

    
}
export default Notice