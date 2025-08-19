export interface Location {
  type: string;
  id: string;
  latitude: number;
  longitude: number;
}

export interface Products {
  suburban: boolean;
  subway: boolean;
  tram: boolean;
  bus: boolean;
  ferry: boolean;
  express: boolean;
  regional: boolean;
}

export interface Stop {
  type: string;
  id: string;
  name: string;
  location: Location;
  products: Products;
}

export interface LocationsResponse extends Array<Stop> {}

export interface Line {
  type: string;
  id: string;
  fahrtNr: string;
  name: string;
  public: boolean;
  adminCode: string;
  productName: string;
  mode: string;
  product: string;
  operator: {
    type: string;
    id: string;
    name: string;
  };
}

export interface Departure {
  tripId: string;
  stop: Stop;
  when: string;
  plannedWhen: string;
  delay: number;
  platform: string | null;
  plannedPlatform: string | null;
  prognosisType: string;
  direction: string;
  provenance: string | null;
  line: Line;
  remarks: any[];
  origin: Stop | null;
  destination: Stop;
}

export interface DeparturesResponse {
  departures: Departure[];
  realtimeDataUpdatedAt: number;
}
