import { useState, useEffect } from "react"
import Axios from "axios"
import Display from "../../ui/Display"

function Myproject(props){
    const { id } = props
    const [ unselected, setUnselected ] = useState([])
    const [ release, setRelease ] = useState([])
    const [ unpaid, setUnpaid ] = useState([])
    const [ finished, setFinished ] = useState([])  
    
    useEffect(() => {
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getUnselected/${id}`)
        .then((response) => {
            setUnselected(response.data)
        })
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getRelease/${id}`)
        .then((response) => {
            setRelease(response.data)
        })
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getUnpaid/${id}`)
        .then((response) => {
            setUnpaid(response.data)
        })
        Axios.get(`https://friendly-bungotaketa-1534.lolipop.io/getFinished/${id}`)
        .then((response) => {
            setFinished(response.data)
        })
    },[id])

    return(
        <div className="select-page">
            {unselected.length > 0 ?
            <>
            <h2>当選者が決まっていないプロジェクト</h2>
            {unselected.map((data,index) => {
                return(
                    <Display key={index} info={data} who="mine"/>
                )
            })}
            </>
            :
            null
            }
            
            {unpaid.length > 0 ?
            <>
            <h2>未払いのプロジェクト</h2>
            {unpaid.map((data,index) => {
                return(
                    <Display key={index} info={data} who="mine"/>
                )
            })}
            </>
            :
            null
            }

            {release.length > 0 ?
            <>
            <h2>現在公開中のプロジェクト</h2>
            {release.map((data,index) => {
                return(
                    <Display key={index} info={data} who="mine"/>
                )
            })}
            </>
            :
            null}

            {finished.length > 0 ?
            <>
            <h2>終了したプロジェクト</h2>
            {finished.map((data,index) => {
                return(
                    <Display key={index} info={data} who="mine"/>
                )
            })}
            </>
            :
            null
            }
            
        </div> 
    )
}
export default Myproject