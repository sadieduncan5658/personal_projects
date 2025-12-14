import { F1Api } from "@f1api/sdk"


const url = "https://f1connectapi.vercel.app/api/2025/drivers?";

const res = await fetch(url);

if (!res.ok) {
  throw new Error(`HTTP error! Status: ${res.status}`);
}

const data = await res.json();

for (const { name } of data.drivers) {
  console.log(name);
}


// const f1Api = new F1Api()

// const drivers = await f1Api.getDrivers()

// console.log("hello world");
// console.log(drivers);