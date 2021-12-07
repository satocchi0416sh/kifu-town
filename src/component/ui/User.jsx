import { useState, memo } from "react"
import Axios from "axios"

const User = memo((props) => {
    const { dId, userId, username, selected } = props
    const [ newSelect, setNewSelct ] = useState(Number(selected))

    const select = () => {
        Axios.post(`https://friendly-bungotaketa-1534.lolipop.io/selectApplicant/${dId}/${userId}`)
        .then((response) => {
            if(response.data.result){
                setNewSelct(1)
                console.log("選択")
            }else{
                alert("これ以上は選択できません")
            }
        })
        
    }

    const unSelect = () => {
        Axios.post(`https://friendly-bungotaketa-1534.lolipop.io/unselectApplicant/${dId}/${userId}`)
        setNewSelct(0)
        console.log("選択解除")
    }

    if(newSelect === 1){
        return(
            <>
                <label>{username}</label>
                <button onClick={unSelect}>選択済み</button>
            </>
        )
    }else{
        return(
            <>
                <label>{username}</label>
                <button onClick={select}>選択する</button>
            </>
        )
    }
    
})

export default User