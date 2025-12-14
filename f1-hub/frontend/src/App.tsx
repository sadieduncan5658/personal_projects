import { useEffect, useState } from "react";
import { getDrivers } from "./api/backend";
import type { Driver } from "../../shared/types";

function App() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDrivers(2025)
      .then((data) => setDrivers(data.drivers))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Drivers (2025)</h1>
      <ul>
        {drivers.map((d) => (
          <li key={d.driverId}>
            Name: {d.name} {d.surname} | Nationality: {d.nationality} | #: {d.number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
