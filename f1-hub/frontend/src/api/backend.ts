export async function getDrivers(year: number) {
  const res = await fetch(`/api/drivers/${year}`);
  if (!res.ok) {
    throw new Error("Failed to fetch drivers");
  }
  return res.json();
}
