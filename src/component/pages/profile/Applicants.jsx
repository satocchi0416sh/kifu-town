import { useHistory, useParams, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Axios from "axios"
import User from "../../ui/User"

function Applicants(props){
    const history = useHistory()
    const [ alist, setAlist ] = useState([]) // 応募者リスト
    const [ slist, setSlist ] = useState([])
    const [ page, setPage ] = useState(0) // 一覧画面と確認画面の切り替え
    const { userId, dId } = useParams()// パラメータの受け取り
    const { state } = useLocation()// ステートの受け取り

    /* 応募者リストを取得 */
    useEffect(() => {
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getApplicant/${dId}`)
        .then((response) => {
            setAlist(response.data)
        })
    },[dId, page])

    /* 確認画面に移動＆選択した応募者を取得 */
    const goCheck = () => {
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getSelectedApplicant/${dId}`)
        .then((response) => {
            setSlist(response.data)
            console.log(response.data)
            setPage(1)
        })
    }

    /* 当選者を決定 */
    const decision = () => {
        const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
        const N=30;
        const sender_batch_id=Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('');
        console.log(sender_batch_id)
        let items = []
        slist.forEach((data,index) => {
            items.push({
                "note": "Your 1$ Payout!",
                "amount": {
                    "currency": "JPY",
                    "value": String(state.amount)
                },
                "receiver": data.email,
                "sender_item_id": `Test_txn_${index}`
            })
        })
        const requestBody = {
            "sender_batch_header": {
                "recipient_type": "EMAIL",
                "email_message": "SDK payouts test txn",
                "note": "Enjoy your Payout!!",
                "sender_batch_id": sender_batch_id,
                "email_subject": "This is a test transaction from SDK"
            },
            "items": items
        }
        console.log(requestBody)
        Axios.post(`https://friendly-bungotaketa-1534.lolipop.io/payForWinner`,{
            requestBody:requestBody,
            dId:dId
        }).then((response) => {
            if(response.data.result){
                alert("成功")
            }else{
                alert("予期せぬエラーが発生しました")
            }
        })
    }

    if(state.step === 2){
        return(
            <div>
                <h1>応募者リスト</h1>
                {alist.map((data, index) => {
                    return(
                        <p key={index}>{data.username}</p>
                    )
                })}
            </div> 
        )
    }else{
        return(
            <>
            {page === 0 ?
            <div>
                <h1>応募者リスト</h1>
                {alist.map((data, index) => {
                    return(
                        <User key={index} dId={data.dId} userId={data.userId} username={data.username} selected={data.selected}/>
                    )
                })}
                <br/>
                <button onClick={goCheck}>当選者を決定する</button>
            </div> 
            :
            <div>
                <h1>当選者の確認</h1>
                {slist.length < state.rnumber ?
                <>
                <p>残り{state.rnumber - slist.length}人選択してください</p>
                {slist.map((data, index) => {
                    return(
                        <p key={index}>{data.username}</p>
                    )
                })}
                </>
                :
                <>
                {slist.map((data, index) => {
                    return(
                        <p key={index}>{data.username}</p>
                    )
                })}
                <button onClick={decision}>決定</button>
                </>
                }
                
                <button onClick={()=>{setPage(0)}}>戻る</button>
            </div>
            }
            
            </>
        )
    }
    
}
export default Applicants