import { Done, DoneOutline, DoneOutlined } from "@mui/icons-material"
import { Chip, ThemeProvider } from "@mui/material"
import { useState, memo } from "react"
import Theme from "./Theme"

const Checkbox = memo((props) => {
    const { name, value, add, del } = props
    const [isCheck, setIsCheck] = useState(false)

    const check = () => {
        setIsCheck(true)
        add(value)
    }

    const deleteCheck = () => {
        setIsCheck(false)
        del(value)
    }

    return (
        <>
            <ThemeProvider theme={Theme}>
                {isCheck ?
                    <>
                        <Chip
                            label={name}
                            onClick={deleteCheck}
                            onDelete={deleteCheck}
                            deleteIcon={<Done color="primary" />}
                            color="secondary"
                            sx={{ mr: 2 }}
                        />

                    </>
                    :
                    <>
                        <Chip
                            label={name}
                            onClick={check}
                            onDelete={check}
                            deleteIcon={<Done />}
                            sx={{ mr: 2 }}
                        />
                    </>
                }
            </ThemeProvider>
        </>
    )
})

export default Checkbox