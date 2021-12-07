import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { useState, useEffect, useRef } from "react"
import Axios from "axios"
import './App.css';
import io from 'socket.io-client'

import Login from './component/pages/signup/Login';
import SignUp from "./component/pages/signup/signup"
import Top from './component/pages/top/Top';
import Donate from './component/pages/donate/Donate';
import Select from './component/pages/select/Select';
import Header from './component/ui/header';
import Profile from './component/pages/profile/Profile';
import Apply from './component/pages/apply/Apply';
import ApplyForm from './component/pages/apply/ApplyForm';
import Admin from './component/pages/admin/Admin';
import Check from './component/pages/admin/Check';
import Myproject from './component/pages/profile/Myproject';
import Detail from './component/pages/profile/Detail';
import Payment from './component/pages/profile/Payment';
import Applicants from './component/pages/profile/Applicants';
import Notice from './component/pages/notice/Notice';

const socket = io('https://friendly-bungotaketa-1534.lolipop.io')
function App() {
  const [ id, setId]=useState(null)
  const [ name, setName]=useState("")
  const [ twitterId, setTwitterId ] = useState(null)
  const [ isLoggedIn, setIsLoggedIn]=useState(false)
  const [ newMessage, setNewMessage ] = useState({})
  const isMountRef=useRef(null)
  
  
  useEffect(()=>{
    const strage=localStorage.getItem("loggedDataTokenForkifukeiji")
    const loggedData=JSON.parse(strage)
    if(loggedData !==null){
      let token = loggedData["token"]
      Axios.post("https://friendly-bungotaketa-1534.lolipop.io/auth",{token:token},{withCredentials:true}).then((response)=>{
      console.log(response.data)
      if(response.data.auth){
        setId(response.data.id)
        setName(response.data.name)
        setTwitterId(response.data.twitterId)
        setIsLoggedIn(true)
      }
      })
    }
  },[])



  const login = (id,username,tId) => {
    setIsLoggedIn(true)
    setId(id)
    setName(username)
    setTwitterId(tId)
  }

  const logout = () => {
    localStorage.removeItem("loggedDataTokenForkifukeiji")
    setIsLoggedIn(false)
    setId(null)
    setName("")
  }
  
  /* リアルタイム通信関係 */

  /* 自分のidに参加 */
  useEffect(() => {
    if(id !== null){
      socket.emit("JOIN_ID",{id:id})
    }
  },[id])

  /* リアルタイムでメッセージを取得 */
  useEffect(() => {
    isMountRef.current=true;
    socket.on("RECEIVE_MESSAGE",(data)=>{
        if(isMountRef.current){
            setNewMessage(data)
            console.log(data)
        }
    })
    return()=>isMountRef.current=false 
  },[])

  /* リアルタイムで申請の結果を送る */
  const sendResult = ( type, dId, userId, title, date, accept ) => {
    socket.emit("SEND_RESULT",{
      type:type,
      dId:dId,
      rId:userId,
      title:title,
      date:date,
      accept:accept,
    })
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} id={id} logout={logout}/>
        <Switch>
          <Route exact path="/">
            <Top id={id} isLoggedIn={isLoggedIn} />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/login">
            <Login login={login}/>
          </Route>

          <Route path="/notice/:id">
            <Notice />
          </Route>

          <Route path="/donate/:id">
            <Donate id={id} name={name} twitterId={twitterId}/>
          </Route>

          <Route path="/selectDonation">
            <Select />
          </Route>

          <Route path="/apply/:dId">
            <Apply id={id} name={name} twitterId={twitterId}/>
          </Route>

          <Route path="/applyForm/:dId">
            <ApplyForm id={id} name={name}/>
          </Route>
          
          <Route path="/profile/:userId">
            <Profile id={id} twitterId={twitterId}/>
          </Route>

          <Route
          path="/myproject"
          render={({match: { url }})=>(
            <>
            <Route exact path={ `${url}/:userId` }>
              <Myproject id={id} />
            </Route>

            <Route path={`${ url }/detail/:userId/:dId`}>
              <Detail id={id}/>
            </Route>

            <Route path={`${ url }/applicants/:userId/:dId`}>
              <Applicants id={id}/>
            </Route>

            <Route path={`${ url }/payment/:userId/:dId`}>
              <Payment />
            </Route>

            </>
          )} />

          <Route
          path="/admin"
          render={({match: { url }})=>(
            <>
            <Route exact path={ url }>
              <Admin id={id}/>
            </Route>

            <Route path={`${ url }/check/:dId`}>
              <Check sendResult={sendResult}/>
            </Route>

            </>
          )} />
          

        </Switch>       
      </BrowserRouter>
      
    </div>
  );
}

export default App;