import express from 'express'
import { Admin } from './controllers/user.controller.js'
import connectDB from './DB/connection.js'
import * as allRouter from './routes/index.route.js'
import { userModel, userSchema } from './DB/models/user.model.js'
const app = express()
const port = 3000
const baseUrl='/api/v1'
app.use(express.json())

//Admin()
app.use(`${baseUrl}/auth`, allRouter.authRouter)
app.use(`${baseUrl}/product`, allRouter.productRouter)
app.use(`${baseUrl}/user`, allRouter.userRouter)
app.use(`${baseUrl}/comment`, allRouter.commentRouter)

app.use(`*`, (req, res) => {
    res.json({ message: "In-valid routing" })
})

app.get('/', (req, res) => res.send('Hello World!'))
connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))