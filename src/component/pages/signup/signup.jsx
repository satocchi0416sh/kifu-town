import { useState } from "react"
import { useHistory,Link } from 'react-router-dom';
import Axios from "axios"
import "./signup.css"
function SignUp (){
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ passCheck, setPassCheck] = useState("")
    const [ passErr, setPassErr ] = useState(false)
    const [ isRegistered, setIsRegistered ] = useState(false)
    const history = useHistory();


    /*登録ボタンが押されたとき */
    const register = (e) => {
        e.preventDefault()
        setPassErr(false)
        if( password === passCheck ){
            setIsRegistered(true)
            Axios.post("https://friendly-bungotaketa-1534.lolipop.io/signup",{
                username:name,
                email:email,
                password:password,
            })
        }else{
            setPassErr(true)
        }
        
    }


    /*ログインページに行く */
    const goLogin = () => {
        history.push("/login")
    }
    const backpage = () => {
        history.goBack()
    }

    return(
        <>
            {isRegistered ?
            <div className="form">
                <div className="container">   
                    <p>新規登録が完了しました
                    <br/>ログインしてサービスをお楽しみください</p>
                    <button onClick={goLogin}>ログインする</button>
                </div>
            </div>          
            :
            <div className="form">
                <div className="container">
                    <form onSubmit = {register}>
                        <label>ユーザー名</label>
                        <br/>
                        <input type="text" placeholder="username" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                        <br/>
                        <label>メールアドレス</label>
                        <br/>
                        <input type="text" placeholder="e-mail" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <br/>
                        <label>パスワード</label>
                        <br/>
                        <input type="text" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        <br/>
                        <label>パスワード（確認）</label>
                        {passErr
                        ?
                        <p>パスワードが一致しません</p>
                        :null}
                        <br/>
                        <input type="text" placeholder="password(確認)" value={passCheck} onChange={(e)=>{setPassCheck(e.target.value)}}/>
                        <br/>
                        <button type="submit">登録する</button>
                    </form>
                    <br/>
                    <br/>
                    <button onClick={backpage}>戻る</button>
                    <br/>
                    <Link to="/login">すでにアカウントをお持ちの方はこちら</Link>
                </div>        
            </div>
            }
        </>
    )
}
export default SignUp