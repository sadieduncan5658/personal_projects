import express from "express";
import cors from "cors";
import { Driver, DriversResponse } from "../../shared/types.ts";

const app = express();
const PORT = 3001;

app.use(cors()); // 👈 STEP 3 GOES HERE

const cache = new Map<string, any>();

app.get("/api/drivers/:year", async (req, res) => {
  const { year } = req.params;

  if (cache.has(year)) {
    return res.json(cache.get(year));
  }

  const response = await fetch(
    `https://f1connectapi.vercel.app/api/${year}/drivers`
  );

  const data: DriversResponse = await response.json();
  cache.set(year, data);

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
