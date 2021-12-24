import { useEffect, useState } from "react"
import Axios from "axios"
import { Box, ThemeProvider } from "@mui/system"
import Theme from "../../ui/Theme"
import { Avatar, Button, Container, CssBaseline, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Modal, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { Send } from "@mui/icons-material"
import { useHistory } from "react-router"

function Donate(props) {
    const { id, name, twitterId } = props
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [amount, setAmount] = useState("")
    const [rnumber, setRnumber] = useState("")
    const [required, setRequired] = useState("")
    const [auto, setAuto] = useState("")

    const [donationModal, setDonationModal] = useState(false);

    const history = useHistory();

    useEffect(() => {
        console.log(required)
        if (required === "1") {
            if (twitterId === null) {
                alert("ツイッターアカウントを登録してください")
                setRequired(0)
            }
        }
    }, [required, twitterId])

    const checkDonation = (e) => {
        e.preventDefault()
        console.log(name)
        setDonationModal(true)
    }



    const postDonation = () => {
        if (title !== "" && text !== "" && amount !== "" && rnumber !== "" && required !== "" && auto !== "")
            Axios.post("https://friendly-bungotaketa-1534.lolipop.io/submitDonation", {
                userId: id,
                username: name,
                twitterId: twitterId,
                title: title,
                text: text,
                amount: amount,
                rnumber: rnumber,
                required: required,
                auto: auto
            })
    }



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80vw",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <ThemeProvider theme={Theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <Send />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        寄付送信ページ
                    </Typography>
                    <Box component="form" onSubmit={checkDonation} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="タイトル"
                            type="text"
                            autoFocus
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows={4}
                            label="詳細"
                            type="text"
                            value={text}
                            onChange={(e) => { setText(e.target.value) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="一人当たりの金額"
                            type="number"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">円</InputAdornment>,
                            }}
                            value={amount}
                            onChange={(e) => { setAmount(e.target.value) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="募集人数"
                            type="number"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">人</InputAdornment>,
                            }}
                            value={rnumber}
                            onChange={(e) => { setRnumber(e.target.value) }}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel required id="req-label">応募条件</InputLabel>
                            <Select
                                required
                                labelId="req-label"
                                margin="normal"
                                value={required}
                                label="応募条件"
                                onChange={e => setRequired(e.target.value)}
                            >
                                <MenuItem value={0}>条件なし</MenuItem>
                                <MenuItem value={1}>Twitterをフォロー</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel required id="auto-label">当選者の決め方</InputLabel>
                            <Select
                                required
                                labelId="auto-label"
                                margin="normal"
                                value={auto}
                                label="当選者の決め方"
                                onChange={e => setAuto(e.target.value)}
                            >
                                <MenuItem value={0}>自分で選ぶ</MenuItem>
                                <MenuItem value={1}>自動当選</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            内容を確認する
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Modal
                open={donationModal}
                onClose={() => { setDonationModal(false) }}
            >
                <Box sx={style}>
                    <Typography component="h2" variant="h6" sx={{ textAlign: "center", mb: 1 }}>寄付情報確認</Typography>
                    <Typography component="p" variant="body2" sx={{ textAlign: "center", mb: 2 }}>ご登録の内容をご確認ください。</Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        タイトル
                                    </TableCell>
                                    <TableCell align="right">{title}</TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        詳細
                                    </TableCell>
                                    <TableCell align="right">{text}</TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        寄付総額
                                    </TableCell>
                                    <TableCell align="right">{amount}</TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        募集人数
                                    </TableCell>
                                    <TableCell align="right">{rnumber}</TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        応募条件
                                    </TableCell>
                                    <TableCell align="right">{required ? "Twitterをフォロー" : "条件なし"}</TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        当選者の決め方
                                    </TableCell>
                                    <TableCell align="right">{auto ? "自動当選" : "自分で選ぶ"}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack spacing={2} direction="row" sx={{ mt: 2, justifyContent: "center" }}>
                        <Button variant="outlined" onClick={() => { setDonationModal(false) }}>キャンセル</Button>
                        <Button variant="contained" onClick={() => { setDonationModal(false); postDonation(); alert("送信が完了しました。"); history.push("/") }}>確定</Button>
                    </Stack>
                </Box>
            </Modal>
        </ThemeProvider>
    )
}
export default Donate