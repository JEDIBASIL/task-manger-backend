import App from "./app";
import TaskRoute from "./routes/task.route";
import UserRoute from "./routes/user.route";

const app = new App([
    new UserRoute(),
    new TaskRoute()
])

app.listen()