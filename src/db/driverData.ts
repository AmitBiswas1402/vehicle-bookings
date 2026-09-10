export interface DriverRideHistoryItem {
  id: string;
  bookingRef: string;
  pickup: string;
  drop: string;
  vehicleType: string;
  fare: number;
  status: "Completed" | "Cancelled";
  completedAt: string;
  distanceKm: number;
  durationMins: number;
}

export interface DriverStateData {
  name: string;
  firstName: string;
  phone: string;
  email: string;
  avatar: string;
  rating: number;
  totalTrips: number;
  isOnline: boolean;
  city: string;
  vehicle: {
    makeModel: string;
    type: string;
    registrationNumber: string;
    color: string;
    year: number;
  };
  earnings: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    todayRidesCount: number;
    todayGross: number;
    todayPlatformFee: number;
  };
  bankAccount: {
    bankName: string;
    accountNumberMasked: string;
    ifsc: string;
    upiId: string;
  };
  documents: {
    name: string;
    number: string;
    status: "verified" | "pending";
    expiry: string;
  }[];
  history: DriverRideHistoryItem[];
}

export interface IncomingRideRequest {
  id: string;
  bookingRef: string;
  passengerName: string;
  passengerRating: number;
  passengerPhone: string;
  passengerAvatar: string;
  vehicleType: string;
  pickup: string;
  drop: string;
  distanceKm: number;
  durationMins: number;
  estimatedEarnings: number;
  otp: string;
}

export const INITIAL_DRIVER_STATE: DriverStateData = {
  name: "Rahul Sharma",
  firstName: "Rahul",
  phone: "+91 98765 43210",
  email: "rahul.sharma@gmail.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  rating: 4.8,
  totalTrips: 1248,
  isOnline: true,
  city: "Kolkata",
  vehicle: {
    makeModel: "Honda Activa 6G / Hyundai Aura",
    type: "Cab",
    registrationNumber: "WB 19 C 1459",
    color: "Arctic Silver",
    year: 2023,
  },
  earnings: {
    today: 1840,
    thisWeek: 12430,
    thisMonth: 48920,
    todayRidesCount: 12,
    todayGross: 2100,
    todayPlatformFee: 260,
  },
  bankAccount: {
    bankName: "HDFC Bank Ltd",
    accountNumberMasked: "•••• 4892",
    ifsc: "HDFC0001289",
    upiId: "rahul.sharma@okaxis",
  },
  documents: [
    {
      name: "Commercial Driving License",
      number: "DL-WB-2021-008921",
      status: "verified",
      expiry: "09 Mar 2031",
    },
    {
      name: "Vehicle Registration Certificate (RC)",
      number: "WB 19 C 1459",
      status: "verified",
      expiry: "14 Jan 2038",
    },
    {
      name: "Commercial Motor Insurance",
      number: "POL-ICICI-99210",
      status: "verified",
      expiry: "19 Jan 2027",
    },
    {
      name: "Police Character Clearance Certificate",
      number: "PCC-KOL-2025-412",
      status: "verified",
      expiry: "04 Jan 2027",
    },
  ],
  history: [
    {
      id: "hist-1",
      bookingRef: "BK00123",
      pickup: "Park Street",
      drop: "Howrah",
      vehicleType: "Cab",
      fare: 186,
      status: "Completed",
      completedAt: "Today, 11:22 AM",
      distanceKm: 7.4,
      durationMins: 28,
    },
    {
      id: "hist-2",
      bookingRef: "BK00119",
      pickup: "Salt Lake",
      drop: "Airport",
      vehicleType: "Cab",
      fare: 320,
      status: "Completed",
      completedAt: "Today, 09:45 AM",
      distanceKm: 14.8,
      durationMins: 35,
    },
    {
      id: "hist-3",
      bookingRef: "BK00114",
      pickup: "Sector V",
      drop: "City Centre",
      vehicleType: "Cab",
      fare: 145,
      status: "Completed",
      completedAt: "Today, 08:30 AM",
      distanceKm: 5.6,
      durationMins: 18,
    },
    {
      id: "hist-4",
      bookingRef: "BK00108",
      pickup: "Ballygunge",
      drop: "Esplanade",
      vehicleType: "Cab",
      fare: 190,
      status: "Completed",
      completedAt: "Today, 07:15 AM",
      distanceKm: 8.2,
      durationMins: 26,
    },
  ],
};

export const SAMPLE_INCOMING_REQUEST: IncomingRideRequest = {
  id: "REQ-9921",
  bookingRef: "BK00130",
  passengerName: "Amit Biswas",
  passengerRating: 4.95,
  passengerPhone: "+91 98301 99011",
  passengerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  vehicleType: "Cab",
  pickup: "Park Street (outside Flurys)",
  drop: "Howrah Railway Station",
  distanceKm: 7.4,
  durationMins: 26,
  estimatedEarnings: 186,
  otp: "4892",
};
