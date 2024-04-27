import { createClient } from "redis";

async function init_redis_client() {
  const client = await createClient({ url: "localhost:3005" })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();
  return client;
}
export default init_redis_client;
