import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { authentication } from "../../firebase/firebase"
import { signInWithPopup, TwitterAuthProvider } from '@firebase/auth';
import Axios from "axios"
import "./Profile.css"


function Profile(props){
    const { id, twitterId } = props
    const [ newName, setNewName ] = useState("")
    const [ newTwitterId, setNewTwitterId ] = useState(twitterId)
    const [ newComment, setNewComment ] = useState("")

    /* モード  */
    const [ editMode, setEditMode ] = useState(false)
    const { userId } = useParams()

    useEffect(() => {
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getUserInfo/${userId}`)
        .then((response) => {
            setNewName(response.data.username)
            setNewTwitterId(response.data.twitterId)
            if(response.data.comment === null){
                setNewComment("")
            }else{
                setNewComment(response.data.comment)
            }
            
        })
    },[userId])

    const editInfo = () =>{
        Axios.post("https://friendly-bungotaketa-1534.lolipop.io/editUserInfo",{
            userId:id,
            username:newName,
            comment:newComment,
            twitterId:newTwitterId
        })
        setEditMode(false)
    }

    const signIn = () => {
        const provider = new TwitterAuthProvider()
        signInWithPopup(authentication,provider)
        .then((response) => {
            setNewTwitterId(response._tokenResponse.screenName)
        })
    }

    

    return(
        <div className="profile-page">
            {editMode ?
            <>
                <div className="info-wrapper">
                    <h2>編集</h2>
                    <br/>
                    <label>名前</label>
                    <br/>
                    <input value={newName} onChange={(e)=>{setNewName(e.target.value)}} required/>
                    <br/>
                    <label>ひとこと</label>
                    <br/>
                    <input value={newComment} onChange={(e)=>{setNewComment(e.target.value)}}/>
                    <br/><br/><br/>
                    {newTwitterId === null || newTwitterId === undefined
                    ?
                    <label onClick={signIn}>ツイッターと連携</label>
                    :
                    <>
                    <label>twitter（認証済み）</label>
                    <br/>
                    <label>@{newTwitterId}</label>
                    <br/>
                    </>
                    }
                    <br/>
                    <button onClick={editInfo}>決定</button>
                </div>
            </>
            :
            <div className="info-wrapper">
                <h2>プロフィール</h2>
                <br/>
                <label>名前</label>
                <p>{newName}</p>
                <label>ひとこと</label>
                <p>{newComment}</p>
                <br/>
                {newTwitterId === null || newTwitterId === undefined
                ?
                <label>twitter未登録</label>
                :
                <>
                <label>twitter</label>
                <br/>
                <label>@{newTwitterId}</label>
                <br/>
                </>
                }
                <br/>
                {Number(userId) === id ?
                <button onClick={()=>{setEditMode(true)}}>編集</button>
                :
                null
                }
                
            </div>
            }
    </div>

    )
}
export default Profile