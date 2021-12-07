import { useHistory, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Axios from "axios"

function Detail(props){
    const { id } = props
    const history = useHistory()
    const { state } = useLocation()
    const [ slist, setSlist ] = useState([])

    useEffect(() => {
        if(state.step === 4){
            Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getSelectedApplicant/${state.dId}`)
            .then((response) => {
            setSlist(response.data)
            console.log(response.data)
        })
        }
    },[state])

    let stepContainer;
    if(state.step === 0 ){
        stepContainer = <div>
            <p>このプロジェクトは現在審査中です。もうしばらくお待ちください。</p>
        </div>
    }else if(state.step === 1){
        stepContainer = <div>
            <p>あなたのプロジェクトはまだ公開されていません。公開される為には支払いを済ませてください。</p>
            <button onClick={()=>{history.push({pathname:`/myproject/payment/${state.userId}/${state.dId}`, state:state})}}>支払う</button>
        </div>
    }else if(state.step === 2){
        stepContainer = <div>
            <p>このプロジェクトは現在公開されています</p>
            <button onClick={()=>{history.push({pathname:`/myproject/applicants/${id}/${state.dId}`, state:state})}}>応募者一覧</button>
        </div>
    }else if(state.step === 3){
        stepContainer = <div>
            <p>募集期間が終了しました。当選者を選んでください</p>
            <button onClick={()=>{history.push({pathname:`/myproject/applicants/${id}/${state.dId}`, state:state})}}>当選者を選ぶ</button>
        </div>
    }else if(state.step === 4){
        stepContainer = <div>
            <p>このプロジェクトはすでに終了しています</p>
            <p>当選者</p>
            {slist.map((data, index) => {
                return(
                    <p key={index}>{data.username}</p>
                )
            })}
        </div>
    }else{
        stepContainer = <div>
            <p>このプロジェクトは許可されませんでした</p>
        </div>
    }

    return(
        <div>
            <h5>{state.username}</h5>
            <h1>{state.title}</h1>
            <p>募集人数{state.rnumber}名</p>
            <p>{state.amount}円/１人あたり</p>
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
            {stepContainer}
            
        </div> 
    )
}
export default Detail