import { useHistory, useLocation } from "react-router-dom"
import Axios from "axios"

function Check(props){
    const { sendResult } = props
    const history = useHistory()
    const { state } = useLocation()

    /* 許可OR拒否？ */
    const conclude = (accept) => {
        let title;
        if(accept === 1) {
            title = "プロジェクトが許諾されました。お支払いを完了してください。"
        }else{
            title = "残念ながらあなたが申請したプロジェクトは許諾されませんでした。"
        }
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const thisTime = `${year}/${month}/${day} ${hour}:${minute}:00`
        sendResult(1, state.dId, state.userId, title, thisTime, accept)

        Axios.post("https://friendly-bungotaketa-1534.lolipop.io/conclude",{
            dId:state.dId,
            accept:accept
        }).then((response) => {
            history.push("/admin")
        })
        
    }

    return(
        <div>
            <h5>{state.username}</h5>
            <h1>{state.title}</h1>
            <p>募集人数{state.rnumber}名</p>
            <p>{Number(state.amount/state.rnumber)}円/１人あたり</p>
            <h3>{state.text}</h3>
            <p>応募条件</p>
            {state.required === 1 ?
            <h5>Twitterをフォロー</h5>
            :
            <p>なし</p>}
            <p>選定方法</p>
            {state.auto ===1 ?
            <p>自動抽選</p>
            :
            <p>手動選択</p>
            }
            <br/>
            <button onClick={()=>{conclude(1)}}>許可</button>
            <button onClick={()=>{conclude(9)}}>不可</button>
        </div> 
    )
}
export default Check