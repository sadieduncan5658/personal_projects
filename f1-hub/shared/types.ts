export type Driver = {
  driverId: string;
  name: string;
  surname?: string;
  number?: number;
  nationality?: string;
  team?: string;
};

export type DriversResponse = {
  season: string;
  drivers: Driver[];
};
