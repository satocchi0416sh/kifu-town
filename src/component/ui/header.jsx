import { memo } from "react"
import { useHistory, Link } from "react-router-dom"
import "./header.css"

const Header = memo ( (props) => {
    const { isLoggedIn, id, logout } = props
    const history=useHistory()
    return(
        <div className="comu-header">
            {isLoggedIn
            ?
            <ul className="pc-menu">
                <li className="list1"><p onClick={()=>{history.push("/")}}>トップ</p></li>
                <li className="list1"><p onClick={()=>{history.push(`/profile/${id}`)}}>プロフィール</p></li>
                <li className="list1"><p onClick={()=>{history.push(`/myproject/${id}`)}}>マイプロジェクト</p></li>
                <li className="list1"><p onClick={()=>{history.push(`/notice/${id}`)}}>通知</p></li>
                <li className="list1"><p onClick={()=>{logout()}}>ログアウト</p></li>
                <div className="clear-left"></div>                
            </ul>
            :
            <ul className="pc-menu">
                <li className="list1"><p onClick={()=>{history.push(`/login`)}}>ログイン</p></li>
                <li className="list1"><p onClick={()=>{history.push(`/signup`)}}>新規登録</p></li>
                <div className="clear-left"></div>                
            </ul>
            }
            <div className="clear-right"></div>
            <input className="comu-hamberger" type="checkbox" id="hamburger" />
            <label htmlFor="hamburger" className="comu-hamberger-label">
                <span>
                <i></i>
                <i></i>
                <i></i>
                </span>
            </label>

            <nav className="hamburger-list">
                <div className="hamburger-list__wrap">
                {isLoggedIn
                ?
                <ul>
                    <li><Link to="/">トップ</Link></li>
                    <li><Link to={`/profile/${id}`}>プロフィール</Link></li>
                    <li><Link to={`/myproject/${id}`}>マイプロジェクト</Link></li>
                    <li><Link to={`/notice/${id}`}>通知</Link></li>
                    <li onClick={()=>{logout()}}>ログアウト</li>
                </ul>
                :
                <ul>
                    <li><Link to={"/login"}>ログイン</Link></li>
                    <li><Link to={"/signup"}>新規登録</Link></li>
                </ul>
                }
                
                </div>
            </nav>
        </div>
    )
})
export default Header