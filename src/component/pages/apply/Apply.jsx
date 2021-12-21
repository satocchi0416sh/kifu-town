import { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import Axios from "axios"

function Apply(props){
    const { id, twitterId } = props
    const history = useHistory()
    const { state } = useLocation()
    const [ twitterInfo, setTwitterInfo ] = useState({})
    const [ anumber, setAnumber ] = useState(0)
    const [ fill, setFill ] = useState(false)

    
    useEffect(() => {
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getAnumber/${state}.dId}`)
        .then((response) => {
            setAnumber(response.data.num)
        })
    },[state])

    useEffect(() => {
        const getTwitterData = async () => {
            if(state.required === 1 && state.step === 2){
                if(twitterId !== null && twitterId !== undefined){
                    const { data } = await Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/twitterData/${state.twitterId}`)
                    setTwitterInfo(data)
                    Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/followData/${twitterId}`)
                    .then((response) => {
                        console.log(response.data)
                        if(response.data.errors === undefined){
                            console.log(response.data.ids.includes(data.id))
                            if(response.data.ids.includes(data.id)){
                                setFill(true)
                            }
                        }else{
                            alert("現在アクセスが集中しています。しばらく時間を置いてから再度アクセスしてください。")
                        }
                    })
                }
                
            }else{
                setFill(true)
            }
        }
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/ifApply/${id}/${state.dId}`)
        .then((response) => {
            if(response.data.result){
                getTwitterData()
            }else{
                alert("すでに応募しています")
            }
        })
    },[state,id,twitterId])
    

    return(
        <div>
            <h5>{state.username}</h5>
            <h1>{state.title}</h1>
            <p>募集人数{state.rnumber}名/応募者数{anumber}名</p>
            <p>{Number(state.amount/state.rnumber)}円/１人あたり</p>
            <h3>{state.text}</h3>
            <p>応募条件</p>
            {state.required === 1 ?
            <>
            <h5>以下のツイッターアカウントをフォローしていただく必要があります。</h5>
                {twitterId === null || twitterId === undefined ?
                <p>ツイッターアカウントを登録してください</p>
                :
                null} 
            <a href={`https://twitter.com/${state.twitterId}`}>
                <img alt="" src={twitterInfo.profile_image_url}/>
                <p>{twitterInfo.name}</p>
            </a>
            </>
            :
            <p>なし</p>}
            <p>募集締切</p>
            <p>{state.newDate} {state.time}</p>
            <p>選定方法</p>
            {state.auto ===1 ?
            <p>自動抽選</p>
            :
            <p>手動選択</p>
            }
            <br/>
            {state.step ===2 ?
            <>
            {fill ?
            <button onClick={()=>{history.push(`/applyForm/${state.dId}`)}}>応募する</button>
            :
            <p>あなたは応募のための条件を満たしていません</p>
            }
            </>
            :
            <p>募集は終了しました</p>
            }
            
        </div> 
    )
}
export default Apply