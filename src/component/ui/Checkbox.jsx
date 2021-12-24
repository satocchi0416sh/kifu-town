import { useState, memo } from "react"

const Checkbox = memo((props) => {
    const { name, value, add, del } = props  
    const [ isCheck, setIsCheck ] = useState(false)

    const check = () => {
        setIsCheck(true)
        add(value)
    }

    const deleteCheck = () => {
        setIsCheck(false)
        del(value)
    }

    return(
        <>
        {isCheck ?
        <>
        <button onClick={deleteCheck}>Check/{name}</button>
        </>
        :
        <>
        <button onClick={check}>{name}</button>
        </>
        }
        </>
    )
})

export default Checkbox