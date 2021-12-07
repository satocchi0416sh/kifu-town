import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import Axios from "axios"

function ApplyForm(props){
    const { id, name } = props
    const [ message, setMessage ] =useState("")
    const [ page, setPage ] = useState("1")
    const history = useHistory()
    const { dId } = useParams()

    const apply = async() => {
        const { data } = await Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getUserEmail/${id}`)
        console.log(data)
        Axios.post("https://friendly-bungotaketa-1534.lolipop.io/apply",{
            dId:dId,
            userId:id,
            username:name,
            email:data.email,
            message:message
        })
        setPage("3")
    }

    let currentPage
    if(page==="1"){
        currentPage=
            <div>
                <h1>応募メッセージ</h1>
                <h5>寄付者に届けたいメッセージを入力しましょう</h5>
                <input value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
                {message === "" ?
                <button>確認する</button>
                :
                <button onClick={()=>{setPage("2")}}>確認する</button>
                }
            </div> 
    
    }else if(page === "2"){
        currentPage=<div>
            <h1>応募メッセージ</h1>
            <h5>寄付者に届けたいメッセージを入力しましょう</h5>
            <p>{message}</p>
            <button onClick={()=>{setPage("1")}}>戻る</button>
            <button onClick={apply}>応募する</button>
        </div> 
    }else{
        currentPage=<div>
            <h1>応募が完了しました</h1>
            <button onClick={()=>{history.push("/")}}>戻る</button>
        </div> 
    }
    return(
        <>
        {currentPage}
        </>
    )
}
export default ApplyForm