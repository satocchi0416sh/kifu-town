import {useState} from "react"
import { useHistory } from 'react-router-dom';
import Axios from "axios"
Axios.defaults.withCredentials=true

function Login(props){
    const {login}=props
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [emailError,setEmailError]=useState(false)
    const [passError,setPassError]=useState(false)

    const history=useHistory();

    /*ログイン欄とパスワード欄が入力されたとき */
    const emailChange=(e)=>{
        setEmail(e.target.value)
    }
    const  passChange=(e)=>{
        setPassword(e.target.value)
    }

    /*ログインボタンが押された時 */
    const decideLogin=()=>{
        setEmailError(false)
        setPassError(false)
        Axios.post("https://friendly-bungotaketa-1534.lolipop.io/login",{
            email:email,
            password:password
        },{withCredentials:true}).then((response)=>{
            if(response.data.isLoggedIn){
                history.push("/")
                var array=[]
                var obj={
                    "token":response.data.token
                }
                array.push(obj)
                var setjson=JSON.stringify(obj)
                window.localStorage.setItem("loggedDataTokenForkifukeiji",setjson)
                login(response.data.id,response.data.name,response.data.twitterId)
            }else{
                if(response.data.errorMsg==="email"){
                    setEmailError(true)
                }else{
                    setPassError(true)
                }
            }
        })
    }

    /*ホームに戻る */
    const backpage=()=>{
        history.goBack()
    }

    return(
            <div className="form">
                <div className="container">
                    <label>メールアドレス</label>
                    <br/>
                    <input type="text" value={email} onChange={emailChange} placeholder="email"/>
                    {emailError ?
                    <p>このメールアドレスは登録されていません</p>
                    :null}
                    <br/>
                    <label>パスワード</label>
                    <br/>
                    <input type="password" value={password} onChange={passChange} placeholder="password"/>
                    {passError ?
                    <p>パスワードが間違っています</p>
                    :null}
                    <br/>
                    <button onClick={decideLogin}>ログイン</button>
                    <br/>
                    <button onClick={backpage}>戻る</button>
                </div>
            </div>
    )
}
export default Login