import { app } from "./app.js";
import { loadEnv } from "./utils/env.utils.js";

loadEnv();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
