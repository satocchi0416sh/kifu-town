import { useHistory } from "react-router-dom"
import "./Top.css"
function Top(props) {
    const { id, isLoggedIn } = props
    const history = useHistory()
    console.log("top")
    return (
        <div>
            {isLoggedIn
                ?
                <>
                    <button onClick={() => { history.push(`/donate/${id}`) }}>寄付する</button>
                    <button onClick={() => { history.push("/selectDonation") }}>寄付を受ける</button>
                </>
                :
                <>
                    <button onClick={() => { history.push("/login") }}>ログイン</button>
                    <button onClick={() => { history.push("/signup") }}>新規登録</button>
                </>
            }

        </div>
    )
}
export default Top