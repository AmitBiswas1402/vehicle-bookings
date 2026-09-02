export type ServiceMode = "daily" | "rental" | "outstation";

export interface VehicleOption {
  id: string;
  name: string;
  category: "bike" | "auto" | "mini" | "sedan" | "suv" | "ev";
  brandTag: "Rapido" | "Ola" | "Uber" | "Eco";
  tagColor: string;
  tagBg: string;
  description: string;
  baseFare: number;
  perKmRate: number;
  perMinuteRate: number;
  etaMinutes: number;
  capacity: number;
  iconName: string;
  badge?: string;
  popular?: boolean;
}

export interface PopularLocation {
  id: string;
  name: string;
  area: string;
  type: "airport" | "transit" | "mall" | "techpark" | "residential";
  distanceKm: number;
}

export interface DriverProfile {
  name: string;
  rating: number;
  totalTrips: number;
  vehicleModel: string;
  vehiclePlate: string;
  vehicleColor: string;
  otp: string;
  phone: string;
  eta: string;
}

export interface ActiveBooking {
  id: string;
  serviceMode: ServiceMode;
  pickup: string;
  drop: string;
  vehicle: VehicleOption;
  totalFare: number;
  discount: number;
  couponApplied?: string;
  paymentMethod: string;
  status: "searching" | "confirmed" | "arriving" | "in_progress" | "completed";
  driver?: DriverProfile;
  bookingTime: string;
}
