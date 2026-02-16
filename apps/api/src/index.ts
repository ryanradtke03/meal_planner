import { createApp } from "./app";
import { envInt } from "./config/env";

const app = createApp();
const port = envInt("PORT", 3001);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});