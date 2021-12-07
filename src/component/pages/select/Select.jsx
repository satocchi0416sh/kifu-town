import { useState, useEffect } from "react"
import Axios from "axios"
import Display from "../../ui/Display"
import "./Select.css"
function Select(){
    const [ dList, setDList ] = useState([])
    
    useEffect(() => {
        Axios.get("https://friendly-bungotaketa-1534.lolipop.io/getDlist")
        .then((response) => {
            setDList(response.data)
            console.log(response.data)
        })
    },[])

    return(
        <div className="select-page">
            {dList.map((data,index) => {
                return(
                    <Display key={index} info={data} who="ohter"/>
                )
            })}
        </div> 
    )
}
export default Select