import { app } from "./app";
import { paymentRouter } from "./router/paymentRouter";
import { userRouter } from "./router/userRouter";

app.use("/user", userRouter)
app.use("/payment", paymentRouter)