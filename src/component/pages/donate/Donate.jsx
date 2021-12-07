import { useEffect, useState } from "react"
import Axios from "axios"
function Donate (props){
    const { id, name, twitterId } = props
    const [ title, setTitle ] = useState("")
    const [ text, setText ] = useState("")
    const [ amount, setAmount ] = useState("")
    const [ rnumber, setRnumber ] = useState(1)
    const [ required, setRequired ] = useState(0)
    const [ auto, setAuto ] = useState(0)

    useEffect(() => {
        console.log(required)
        if(required === "1"){
            if(twitterId === null){
                alert("ツイッターアカウントを登録してください")
                setRequired(0)
            }
        }
    },[required, twitterId])

    const submitDonation = (e) => {
        e.preventDefault()
        console.log(name)
        Axios.post("https://friendly-bungotaketa-1534.lolipop.io/submitDonation",{
            userId:id,
            username:name,
            twitterId:twitterId,
            title:title,
            text:text,
            amount:amount,
            rnumber:rnumber,
            required:required,
            auto:auto
        })
    }

    return(
        <div className="donation-page">
            <h1>寄付送信ページ</h1>
            <form onSubmit={submitDonation}>
                <label>タイトル</label>
                <br/>
                <input required value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                <br/>
                <label>説明</label>
                <br/>
                <textarea required value={text} onChange={(e)=>{setText(e.target.value)}}/>
                <br/>
                <label>寄付総額</label>
                <br/>
                <input required type="number" value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
                <br/>
                <label>募集人数</label>
                <br/>
                <input required type="number" value={rnumber} onChange={(e)=>{setRnumber(e.target.value)}}/>
                <br/>
                <label>応募条件</label>
                <br/>
                <select required value={required} onChange={(e) => { setRequired(e.target.value) }}>
                    <option value={0}>条件なし</option>
                    <option value={1}>ツイッターをフォロー</option>  
                </select>
                <br/>
                <label>当選者の決め方</label>
                <br/>
                <select required onChange={(e) => { setAuto(e.target.value) }}>
                    <option value={0}>自分で選ぶ</option>
                    <option value={1}>自動当選</option>  
                </select>
                <br/>
                <button type="submit">支払いに進む</button>
            </form>

        </div>
    )
}
export default Donate