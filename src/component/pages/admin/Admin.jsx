import { useState, useEffect } from "react"
import Axios from "axios"
import Display from "../../ui/Display"

function Admin(props){
    const [ dList, setDList ] = useState([])//申請されたプロジェクト一覧
    
    useEffect(() => {
        Axios.get("https://friendly-bungotaketa-1534.lolipop.io/notAcceptedDlist")
        .then((response) => {
            setDList(response.data)
            console.log(response.data)
        })
    },[])

    return(
        <div className="select-page">
            <h1>申請されたのプロジェクト</h1>
            {dList.map((data,index) => {
                return(
                    <Display key={index} info={data} who="admin"/> 
                )
            })}
        </div> 
    )
}
export default Admin