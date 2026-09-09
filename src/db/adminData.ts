export const ADMIN_EMAIL = "amit.142biswas@gmail.com";

export interface AdminKPIs {
  totalTravellers: number;
  activeDrivers: number;
  activeRides: number;
  completedRides: number;
  todayRevenue: number;
  todayRevenueFormatted: string;
  cancelledRidesToday: number;
  avgDriverRating: number;
  onlineDriversCount: number;
  onTripDriversCount: number;
  offlineDriversCount: number;
}

export interface AdminActiveRide {
  id: string;
  bookingRef: string;
  riderName: string;
  riderAvatar: string;
  driverName: string;
  driverAvatar: string;
  vehicleType: "bike" | "scooty" | "cab" | "taxi" | "bus";
  vehicleModel: string;
  plateNumber: string;
  pickup: string;
  drop: string;
  status: "on_way_to_pickup" | "picked_up" | "nearing_destination";
  fare: number;
  currentEtaMinutes: number;
  progressPercent: number;
  driverPhone: string;
  riderPhone: string;
  lat: number;
  lng: number;
}

export type DriverStatus = "ACTIVE" | "PENDING" | "OFFLINE" | "SUSPENDED" | "REJECTED";

export interface DriverDocument {
  id: string;
  name: string;
  type: "license" | "aadhaar" | "rc" | "insurance" | "police_verification";
  documentNumber: string;
  status: "verified" | "pending" | "rejected" | "expired";
  issuedDate: string;
  expiryDate: string;
  fileUrl: string;
}

export interface DriverRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: DriverStatus;
  city: string;
  rating: number;
  totalRides: number;
  completedRides: number;
  cancelledRides: number;
  joinedDate: string;
  availability: "online" | "offline" | "on_trip";
  vehicle: {
    model: string;
    type: "Bike" | "Scooty" | "Cab" | "Taxi" | "Bus";
    registrationNumber: string;
    color: string;
    year: number;
    fuelType: "Petrol" | "EV" | "CNG" | "Diesel";
  };
  earnings: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    lifetime: number;
  };
  documents: DriverDocument[];
  complaintsCount: number;
  complaints: {
    id: string;
    bookingId: string;
    riderName: string;
    date: string;
    category: string;
    description: string;
    status: "resolved" | "open" | "investigating";
  }[];
}

export interface VehicleRecord {
  id: string;
  registrationNumber: string;
  model: string;
  type: "Bike" | "Scooter" | "Cab" | "Taxi" | "Bus";
  category: "bike" | "scooty" | "cab" | "taxi" | "bus";
  seatingCapacity: number;
  fuelType: "Petrol" | "EV" | "CNG" | "Diesel";
  status: "active" | "inactive" | "maintenance" | "unverified";
  assignedDriverId?: string;
  assignedDriverName?: string;
  registrationExpiry: string;
  insuranceExpiry: string;
  fitnessValidUntil: string;
  pollutionValidUntil: string;
  totalTripsLogged: number;
  year: number;
}

export interface VehiclePricing {
  id: string;
  category: "bike" | "scooty" | "cab" | "taxi" | "bus";
  name: string;
  icon: string;
  tagline: string;
  baseFare: number;
  perKmRate: number;
  perMinuteRate: number;
  minimumFare: number;
  capacity: number;
  isEnabled: boolean;
  peakSurgeMultiplier: number;
  cancellationFee: number;
}

export type BookingStatus = "active" | "searching" | "assigned" | "completed" | "cancelled";

export interface BookingTimelineEvent {
  step: string;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface BookingRecord {
  id: string;
  bookingRef: string;
  travellerName: string;
  travellerPhone: string;
  travellerAvatar: string;
  driverName: string;
  driverPhone: string;
  driverAvatar: string;
  vehicleType: "Bike" | "Scooty" | "Cab" | "Taxi" | "Bus";
  vehicleModel: string;
  plateNumber: string;
  pickupLocation: string;
  dropLocation: string;
  distanceKm: number;
  durationMinutes: number;
  fare: number;
  discount: number;
  platformFee: number;
  driverEarning: number;
  paymentMethod: "UPI" | "Credit Card" | "Debit Card" | "Cash" | "NexWallet";
  paymentStatus: "paid" | "pending" | "refunded" | "failed";
  status: BookingStatus;
  createdAt: string;
  cancellationReason?: string;
  cancelledBy?: "traveller" | "driver" | "system";
  rating?: number;
  timeline: BookingTimelineEvent[];
}

export interface PaymentTransaction {
  id: string;
  transactionId: string;
  bookingRef: string;
  travellerName: string;
  driverName: string;
  amount: number;
  paymentMethod: "UPI" | "Credit Card" | "Debit Card" | "Cash" | "NexWallet";
  status: "successful" | "failed" | "refunded";
  platformCommission: number;
  driverEarnings: number;
  refundAmount?: number;
  timestamp: string;
}

export interface TravellerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: "active" | "suspended" | "blocked";
  rating: number;
  totalRides: number;
  cancelledRides: number;
  totalSpent: number;
  walletBalance: number;
  joinedDate: string;
  preferredPayment: string;
  recentBookingsCount: number;
  strikes: number;
}

export interface ModerationReview {
  id: string;
  bookingRef: string;
  travellerName: string;
  travellerAvatar: string;
  driverName: string;
  driverAvatar: string;
  rating: number;
  reviewText: string;
  vehicleType: string;
  date: string;
  flagged: boolean;
  flagReason?: string;
}

export interface ModerationComplaint {
  id: string;
  complaintRef: string;
  bookingRef: string;
  complainantType: "traveller" | "driver";
  complainantName: string;
  complainantPhone: string;
  againstName: string;
  againstRole: "driver" | "traveller";
  category: "Rash Driving" | "Overcharging" | "AC Not Working" | "Rude Behavior" | "Route Detour" | "Ride Refusal" | "Safety Concern";
  priority: "high" | "medium" | "critical";
  description: string;
  evidenceProvided: boolean;
  status: "open" | "investigating" | "resolved" | "dismissed";
  timestamp: string;
  resolutionNote?: string;
}

// ---------------------- Initial Mock Data ----------------------

export const INITIAL_ADMIN_KPIS: AdminKPIs = {
  totalTravellers: 12450,
  activeDrivers: 1284,
  activeRides: 342,
  completedRides: 28920,
  todayRevenue: 482000,
  todayRevenueFormatted: "₹4.82L",
  cancelledRidesToday: 24,
  avgDriverRating: 4.82,
  onlineDriversCount: 890,
  onTripDriversCount: 342,
  offlineDriversCount: 52,
};

export const INITIAL_VEHICLE_PRICING: VehiclePricing[] = [
  {
    id: "vp-bike",
    category: "bike",
    name: "Bike",
    icon: "🏍️",
    tagline: "Swift & economical solo rides",
    baseFare: 20,
    perKmRate: 8,
    perMinuteRate: 1,
    minimumFare: 25,
    capacity: 1,
    isEnabled: true,
    peakSurgeMultiplier: 1.0,
    cancellationFee: 15,
  },
  {
    id: "vp-scooty",
    category: "scooty",
    name: "Scooty",
    icon: "🛵",
    tagline: "Nimble city commuter with footboard space",
    baseFare: 25,
    perKmRate: 9,
    perMinuteRate: 1,
    minimumFare: 30,
    capacity: 1,
    isEnabled: true,
    peakSurgeMultiplier: 1.0,
    cancellationFee: 20,
  },
  {
    id: "vp-cab",
    category: "cab",
    name: "Cab",
    icon: "🚕",
    tagline: "Comfortable air-conditioned hatchbacks & compacts",
    baseFare: 50,
    perKmRate: 14,
    perMinuteRate: 2,
    minimumFare: 65,
    capacity: 4,
    isEnabled: true,
    peakSurgeMultiplier: 1.2,
    cancellationFee: 40,
  },
  {
    id: "vp-taxi",
    category: "taxi",
    name: "Taxi",
    icon: "🚖",
    tagline: "Dedicated metered yellow/city taxis with high reliability",
    baseFare: 60,
    perKmRate: 16,
    perMinuteRate: 2.5,
    minimumFare: 80,
    capacity: 4,
    isEnabled: true,
    peakSurgeMultiplier: 1.0,
    cancellationFee: 50,
  },
  {
    id: "vp-bus",
    category: "bus",
    name: "Bus",
    icon: "🚌",
    tagline: "Shared high-capacity scheduled commuter shuttles",
    baseFare: 30,
    perKmRate: 5,
    perMinuteRate: 0.5,
    minimumFare: 35,
    capacity: 25,
    isEnabled: true,
    peakSurgeMultiplier: 1.0,
    cancellationFee: 15,
  },
];

export const INITIAL_DRIVERS: DriverRecord[] = [
  {
    id: "DRV-1001",
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    status: "ACTIVE",
    city: "Kolkata",
    rating: 4.7,
    totalRides: 1248,
    completedRides: 1220,
    cancelledRides: 28,
    joinedDate: "15 Jan 2025",
    availability: "online",
    vehicle: {
      model: "Honda Activa 6G",
      type: "Scooty",
      registrationNumber: "WB 02 AX 4892",
      color: "Matte Grey",
      year: 2023,
      fuelType: "Petrol",
    },
    earnings: {
      today: 1840,
      thisWeek: 12450,
      thisMonth: 48900,
      lifetime: 384000,
    },
    documents: [
      {
        id: "doc-1",
        name: "Commercial Driving License",
        type: "license",
        documentNumber: "DL-WB-2021-008921",
        status: "verified",
        issuedDate: "10 Mar 2021",
        expiryDate: "09 Mar 2031",
        fileUrl: "#",
      },
      {
        id: "doc-2",
        name: "Aadhaar Identity Card",
        type: "aadhaar",
        documentNumber: "XXXX-XXXX-4812",
        status: "verified",
        issuedDate: "14 Aug 2018",
        expiryDate: "Permanent",
        fileUrl: "#",
      },
      {
        id: "doc-3",
        name: "Vehicle Registration Certificate (RC)",
        type: "rc",
        documentNumber: "WB02AX4892-RC",
        status: "verified",
        issuedDate: "15 Jan 2023",
        expiryDate: "14 Jan 2038",
        fileUrl: "#",
      },
      {
        id: "doc-4",
        name: "Comprehensive Motor Insurance",
        type: "insurance",
        documentNumber: "POL-ICICI-99210",
        status: "verified",
        issuedDate: "20 Jan 2026",
        expiryDate: "19 Jan 2027",
        fileUrl: "#",
      },
      {
        id: "doc-5",
        name: "Police Character Clearance Certificate",
        type: "police_verification",
        documentNumber: "PCC-KOL-2025-412",
        status: "verified",
        issuedDate: "05 Jan 2025",
        expiryDate: "04 Jan 2027",
        fileUrl: "#",
      },
    ],
    complaintsCount: 1,
    complaints: [
      {
        id: "cmp-01",
        bookingId: "BK00112",
        riderName: "Debjit Roy",
        date: "24 Feb 2026",
        category: "Route Detour",
        description: "Driver took a slightly congested alleyway during evening commute.",
        status: "resolved",
      },
    ],
  },
  {
    id: "DRV-1002",
    name: "Subhash Mondal",
    email: "subhash.m@yahoo.com",
    phone: "+91 98311 22334",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: "PENDING",
    city: "Kolkata",
    rating: 4.9,
    totalRides: 0,
    completedRides: 0,
    cancelledRides: 0,
    joinedDate: "08 Mar 2026",
    availability: "offline",
    vehicle: {
      model: "Maruti Suzuki Dzire",
      type: "Cab",
      registrationNumber: "WB 06 B 8820",
      color: "Arctic White",
      year: 2024,
      fuelType: "CNG",
    },
    earnings: {
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      lifetime: 0,
    },
    documents: [
      {
        id: "doc-21",
        name: "Commercial Driving License",
        type: "license",
        documentNumber: "DL-WB-2023-994120",
        status: "pending",
        issuedDate: "12 Apr 2023",
        expiryDate: "11 Apr 2033",
        fileUrl: "#",
      },
      {
        id: "doc-22",
        name: "Aadhaar Card",
        type: "aadhaar",
        documentNumber: "XXXX-XXXX-9912",
        status: "verified",
        issuedDate: "10 Feb 2017",
        expiryDate: "Permanent",
        fileUrl: "#",
      },
      {
        id: "doc-23",
        name: "Vehicle RC",
        type: "rc",
        documentNumber: "WB06B8820-RC",
        status: "pending",
        issuedDate: "01 Mar 2024",
        expiryDate: "28 Feb 2039",
        fileUrl: "#",
      },
      {
        id: "doc-24",
        name: "Commercial Insurance",
        type: "insurance",
        documentNumber: "POL-HDFC-55120",
        status: "pending",
        issuedDate: "02 Mar 2026",
        expiryDate: "01 Mar 2027",
        fileUrl: "#",
      },
      {
        id: "doc-25",
        name: "Police Verification",
        type: "police_verification",
        documentNumber: "PCC-KOL-2026-902",
        status: "pending",
        issuedDate: "04 Mar 2026",
        expiryDate: "03 Mar 2028",
        fileUrl: "#",
      },
    ],
    complaintsCount: 0,
    complaints: [],
  },
  {
    id: "DRV-1003",
    name: "Vikram Chatterjee",
    email: "vikram.c@gmail.com",
    phone: "+91 97482 10922",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    status: "ACTIVE",
    city: "Kolkata",
    rating: 4.85,
    totalRides: 2840,
    completedRides: 2810,
    cancelledRides: 30,
    joinedDate: "12 Oct 2024",
    availability: "on_trip",
    vehicle: {
      model: "Hyundai Aura Prime",
      type: "Cab",
      registrationNumber: "WB 19 C 1459",
      color: "Silver Grey",
      year: 2023,
      fuelType: "CNG",
    },
    earnings: {
      today: 3450,
      thisWeek: 21200,
      thisMonth: 78500,
      lifetime: 540000,
    },
    documents: [
      {
        id: "doc-31",
        name: "Commercial Driving License",
        type: "license",
        documentNumber: "DL-WB-2019-481920",
        status: "verified",
        issuedDate: "12 Jan 2019",
        expiryDate: "11 Jan 2029",
        fileUrl: "#",
      },
      {
        id: "doc-32",
        name: "Vehicle RC",
        type: "rc",
        documentNumber: "WB19C1459-RC",
        status: "verified",
        issuedDate: "18 Jun 2023",
        expiryDate: "17 Jun 2038",
        fileUrl: "#",
      },
    ],
    complaintsCount: 0,
    complaints: [],
  },
  {
    id: "DRV-1004",
    name: "Anisur Rahman",
    email: "anisur.bike@gmail.com",
    phone: "+91 91234 56789",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    status: "ACTIVE",
    city: "Kolkata",
    rating: 4.92,
    totalRides: 954,
    completedRides: 942,
    cancelledRides: 12,
    joinedDate: "02 Jun 2025",
    availability: "online",
    vehicle: {
      model: "Bajaj Pulsar 150",
      type: "Bike",
      registrationNumber: "WB 24 K 3901",
      color: "Midnight Blue",
      year: 2023,
      fuelType: "Petrol",
    },
    earnings: {
      today: 1420,
      thisWeek: 9800,
      thisMonth: 38200,
      lifetime: 198000,
    },
    documents: [],
    complaintsCount: 0,
    complaints: [],
  },
  {
    id: "DRV-1005",
    name: "Sunil Das",
    email: "sunil.das82@gmail.com",
    phone: "+91 98305 11982",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    status: "OFFLINE",
    city: "Kolkata",
    rating: 4.6,
    totalRides: 3120,
    completedRides: 3040,
    cancelledRides: 80,
    joinedDate: "20 May 2024",
    availability: "offline",
    vehicle: {
      model: "Ambassador Classic Taxi",
      type: "Taxi",
      registrationNumber: "WB 04 F 2901",
      color: "Yellow Taxi",
      year: 2021,
      fuelType: "Diesel",
    },
    earnings: {
      today: 0,
      thisWeek: 14200,
      thisMonth: 61000,
      lifetime: 620000,
    },
    documents: [],
    complaintsCount: 2,
    complaints: [
      {
        id: "cmp-02",
        bookingId: "BK00089",
        riderName: "Swarup Sen",
        date: "12 Feb 2026",
        category: "AC Not Working",
        description: "Yellow taxi non-AC condition despite booking standard metered ride.",
        status: "resolved",
      },
    ],
  },
  {
    id: "DRV-1006",
    name: "Tapas Banik",
    email: "tapas.banik@rediffmail.com",
    phone: "+91 94331 82711",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    status: "SUSPENDED",
    city: "Kolkata",
    rating: 3.4,
    totalRides: 412,
    completedRides: 380,
    cancelledRides: 32,
    joinedDate: "18 Nov 2025",
    availability: "offline",
    vehicle: {
      model: "Tata Indigo eCS",
      type: "Cab",
      registrationNumber: "WB 02 Z 7731",
      color: "White",
      year: 2019,
      fuelType: "Diesel",
    },
    earnings: {
      today: 0,
      thisWeek: 1200,
      thisMonth: 11000,
      lifetime: 94000,
    },
    documents: [],
    complaintsCount: 4,
    complaints: [
      {
        id: "cmp-03",
        bookingId: "BK00045",
        riderName: "Priyanka Roy",
        date: "01 Mar 2026",
        category: "Rash Driving",
        description: "Severe overspeeding along Maa Flyover. Ignored passenger safety requests.",
        status: "open",
      },
      {
        id: "cmp-04",
        bookingId: "BK00072",
        riderName: "Ananya Ghosh",
        date: "03 Mar 2026",
        category: "Rude Behavior",
        description: "Demanded additional cash outside app and misbehaved upon drop-off.",
        status: "investigating",
      },
    ],
  },
  {
    id: "DRV-1007",
    name: "Rameshwar Prasad",
    email: "rameshwar.p@gmail.com",
    phone: "+91 98830 45612",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    status: "REJECTED",
    city: "Kolkata",
    rating: 0,
    totalRides: 0,
    completedRides: 0,
    cancelledRides: 0,
    joinedDate: "28 Feb 2026",
    availability: "offline",
    vehicle: {
      model: "Hero Splendor Plus",
      type: "Bike",
      registrationNumber: "WB 26 Q 9012",
      color: "Black / Red",
      year: 2018,
      fuelType: "Petrol",
    },
    earnings: {
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      lifetime: 0,
    },
    documents: [
      {
        id: "doc-71",
        name: "Commercial License",
        type: "license",
        documentNumber: "DL-WB-INVALID",
        status: "rejected",
        issuedDate: "10 Jan 2015",
        expiryDate: "09 Jan 2025",
        fileUrl: "#",
      },
    ],
    complaintsCount: 0,
    complaints: [],
  },
  {
    id: "DRV-1008",
    name: "Manish Chourasia",
    email: "manish.shuttle@gmail.com",
    phone: "+91 98362 89012",
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
    status: "ACTIVE",
    city: "Kolkata",
    rating: 4.88,
    totalRides: 840,
    completedRides: 835,
    cancelledRides: 5,
    joinedDate: "10 Aug 2025",
    availability: "online",
    vehicle: {
      model: "Force Traveller Shuttle AC",
      type: "Bus",
      registrationNumber: "WB 07 D 3319",
      color: "Emerald Green",
      year: 2023,
      fuelType: "Diesel",
    },
    earnings: {
      today: 4100,
      thisWeek: 26500,
      thisMonth: 95000,
      lifetime: 420000,
    },
    documents: [],
    complaintsCount: 0,
    complaints: [],
  },
];

export const INITIAL_VEHICLES: VehicleRecord[] = [
  {
    id: "VEH-01",
    registrationNumber: "WB 02 AX 4892",
    model: "Honda Activa 6G",
    type: "Scooter",
    category: "scooty",
    seatingCapacity: 2,
    fuelType: "Petrol",
    status: "active",
    assignedDriverId: "DRV-1001",
    assignedDriverName: "Rahul Sharma",
    registrationExpiry: "14 Jan 2038",
    insuranceExpiry: "19 Jan 2027",
    fitnessValidUntil: "14 Jan 2038",
    pollutionValidUntil: "15 Jul 2026",
    totalTripsLogged: 1248,
    year: 2023,
  },
  {
    id: "VEH-02",
    registrationNumber: "WB 24 K 3901",
    model: "Bajaj Pulsar 150",
    type: "Bike",
    category: "bike",
    seatingCapacity: 2,
    fuelType: "Petrol",
    status: "active",
    assignedDriverId: "DRV-1004",
    assignedDriverName: "Anisur Rahman",
    registrationExpiry: "18 Jun 2038",
    insuranceExpiry: "24 Aug 2026",
    fitnessValidUntil: "18 Jun 2038",
    pollutionValidUntil: "20 Sep 2026",
    totalTripsLogged: 954,
    year: 2023,
  },
  {
    id: "VEH-03",
    registrationNumber: "WB 19 C 1459",
    model: "Hyundai Aura Prime",
    type: "Cab",
    category: "cab",
    seatingCapacity: 5,
    fuelType: "CNG",
    status: "active",
    assignedDriverId: "DRV-1003",
    assignedDriverName: "Vikram Chatterjee",
    registrationExpiry: "17 Jun 2038",
    insuranceExpiry: "12 Oct 2026",
    fitnessValidUntil: "17 Jun 2030",
    pollutionValidUntil: "18 Oct 2026",
    totalTripsLogged: 2840,
    year: 2023,
  },
  {
    id: "VEH-04",
    registrationNumber: "WB 06 B 8820",
    model: "Maruti Suzuki Dzire",
    type: "Cab",
    category: "cab",
    seatingCapacity: 5,
    fuelType: "CNG",
    status: "unverified",
    assignedDriverId: "DRV-1002",
    assignedDriverName: "Subhash Mondal",
    registrationExpiry: "28 Feb 2039",
    insuranceExpiry: "01 Mar 2027",
    fitnessValidUntil: "28 Feb 2032",
    pollutionValidUntil: "02 Mar 2027",
    totalTripsLogged: 0,
    year: 2024,
  },
  {
    id: "VEH-05",
    registrationNumber: "WB 04 F 2901",
    model: "Ambassador Classic Taxi",
    type: "Taxi",
    category: "taxi",
    seatingCapacity: 5,
    fuelType: "Diesel",
    status: "inactive",
    assignedDriverId: "DRV-1005",
    assignedDriverName: "Sunil Das",
    registrationExpiry: "12 May 2031",
    insuranceExpiry: "18 Aug 2026",
    fitnessValidUntil: "12 May 2027",
    pollutionValidUntil: "10 Nov 2026",
    totalTripsLogged: 3120,
    year: 2021,
  },
  {
    id: "VEH-06",
    registrationNumber: "WB 07 D 3319",
    model: "Force Traveller Shuttle AC",
    type: "Bus",
    category: "bus",
    seatingCapacity: 26,
    fuelType: "Diesel",
    status: "active",
    assignedDriverId: "DRV-1008",
    assignedDriverName: "Manish Chourasia",
    registrationExpiry: "24 Nov 2038",
    insuranceExpiry: "15 Dec 2026",
    fitnessValidUntil: "24 Nov 2028",
    pollutionValidUntil: "12 Dec 2026",
    totalTripsLogged: 840,
    year: 2023,
  },
  {
    id: "VEH-07",
    registrationNumber: "WB 02 Z 7731",
    model: "Tata Indigo eCS",
    type: "Cab",
    category: "cab",
    seatingCapacity: 5,
    fuelType: "Diesel",
    status: "maintenance",
    assignedDriverId: "DRV-1006",
    assignedDriverName: "Tapas Banik",
    registrationExpiry: "10 Apr 2029",
    insuranceExpiry: "20 May 2026",
    fitnessValidUntil: "10 Apr 2026",
    pollutionValidUntil: "14 May 2026",
    totalTripsLogged: 412,
    year: 2019,
  },
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: "BK-001",
    bookingRef: "BK00123",
    travellerName: "Amit Biswas",
    travellerPhone: "+91 98301 99011",
    travellerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    driverName: "Rahul Sharma",
    driverPhone: "+91 98765 43210",
    driverAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    vehicleType: "Cab",
    vehicleModel: "Hyundai Aura Prime",
    plateNumber: "WB 19 C 1459",
    pickupLocation: "Kolkata (Park Street)",
    dropLocation: "Howrah Railway Station",
    distanceKm: 8.4,
    durationMinutes: 28,
    fare: 245,
    discount: 25,
    platformFee: 44,
    driverEarning: 201,
    paymentMethod: "UPI",
    paymentStatus: "paid",
    status: "completed",
    createdAt: "Today, 10:45 AM",
    rating: 5,
    timeline: [
      { step: "1", title: "Ride Requested", description: "Amit booked a Cab from Park Street to Howrah", timestamp: "10:45 AM", completed: true },
      { step: "2", title: "Driver Assigned", description: "Rahul Sharma accepted the trip (OTP: 4892)", timestamp: "10:47 AM", completed: true },
      { step: "3", title: "Driver Arrived", description: "Vehicle reached pickup point outside Flurys", timestamp: "10:52 AM", completed: true },
      { step: "4", title: "Trip Started", description: "OTP verified. En route via Vidyasagar Setu", timestamp: "10:54 AM", completed: true },
      { step: "5", title: "Trip Completed", description: "Safely arrived at Howrah Stn. ₹245 paid via UPI", timestamp: "11:22 AM", completed: true },
    ],
  },
  {
    id: "BK-002",
    bookingRef: "BK00124",
    travellerName: "Priya Mukherjee",
    travellerPhone: "+91 97481 00293",
    travellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    driverName: "Anisur Rahman",
    driverPhone: "+91 91234 56789",
    driverAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    vehicleType: "Bike",
    vehicleModel: "Bajaj Pulsar 150",
    plateNumber: "WB 24 K 3901",
    pickupLocation: "Salt Lake Sector V (DLF 1)",
    dropLocation: "Park Street Metro Station",
    distanceKm: 11.2,
    durationMinutes: 24,
    fare: 120,
    discount: 10,
    platformFee: 22,
    driverEarning: 98,
    paymentMethod: "NexWallet",
    paymentStatus: "paid",
    status: "active",
    createdAt: "Today, 11:15 AM",
    timeline: [
      { step: "1", title: "Ride Requested", description: "Priya booked quick Bike Taxi from Sector V", timestamp: "11:15 AM", completed: true },
      { step: "2", title: "Driver Assigned", description: "Anisur Rahman accepted. On way to DLF 1", timestamp: "11:16 AM", completed: true },
      { step: "3", title: "Driver Arrived", description: "Helmet handed over. OTP 7721 verified", timestamp: "11:20 AM", completed: true },
      { step: "4", title: "Trip in Progress", description: "Navigating via EM Bypass & Park Circus", timestamp: "11:22 AM", completed: true },
      { step: "5", title: "Destination Drop", description: "Approaching Park Street (ETA 4 mins)", timestamp: "Pending", completed: false },
    ],
  },
  {
    id: "BK-003",
    bookingRef: "BK00125",
    travellerName: "Debashis Ganguly",
    travellerPhone: "+91 98310 44556",
    travellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    driverName: "Vikram Chatterjee",
    driverPhone: "+91 97482 10922",
    driverAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    vehicleType: "Cab",
    vehicleModel: "Hyundai Aura Prime",
    plateNumber: "WB 19 C 1459",
    pickupLocation: "Kolkata Airport (CCU Terminal 2)",
    dropLocation: "Ballygunge Circular Road",
    distanceKm: 19.5,
    durationMinutes: 45,
    fare: 480,
    discount: 50,
    platformFee: 86,
    driverEarning: 394,
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
    status: "active",
    createdAt: "Today, 11:02 AM",
    timeline: [
      { step: "1", title: "Ride Requested", description: "Airport arrival pickup requested", timestamp: "11:02 AM", completed: true },
      { step: "2", title: "Driver Assigned", description: "Vikram Chatterjee assigned at CCU Bay 4", timestamp: "11:04 AM", completed: true },
      { step: "3", title: "Luggage Loaded", description: "Driver assisted with baggage. OTP: 9012", timestamp: "11:10 AM", completed: true },
      { step: "4", title: "Trip in Progress", description: "On VIP Road flyover", timestamp: "11:12 AM", completed: true },
      { step: "5", title: "Drop Off", description: "Arriving at Ballygunge in 12 mins", timestamp: "Pending", completed: false },
    ],
  },
  {
    id: "BK-004",
    bookingRef: "BK00126",
    travellerName: "Siddharth Sen",
    travellerPhone: "+91 98366 11223",
    travellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    driverName: "Unassigned",
    driverPhone: "--",
    driverAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    vehicleType: "Taxi",
    vehicleModel: "Metered Yellow Taxi",
    plateNumber: "Searching...",
    pickupLocation: "Sealdah Railway Hub",
    dropLocation: "Esplanade Metro Gate 2",
    distanceKm: 3.8,
    durationMinutes: 18,
    fare: 110,
    discount: 0,
    platformFee: 20,
    driverEarning: 90,
    paymentMethod: "Cash",
    paymentStatus: "pending",
    status: "searching",
    createdAt: "Today, 11:28 AM",
    timeline: [
      { step: "1", title: "Ride Requested", description: "Siddharth requested metered taxi at Sealdah Hub", timestamp: "11:28 AM", completed: true },
      { step: "2", title: "Finding Nearby Taxi", description: "Broadcasting request to 14 drivers within 2 km radius", timestamp: "11:28 AM", completed: true },
      { step: "3", title: "Driver Acceptance", description: "Awaiting driver confirmation", timestamp: "In Progress", completed: false },
    ],
  },
  {
    id: "BK-005",
    bookingRef: "BK00127",
    travellerName: "Rituja Banerjee",
    travellerPhone: "+91 94320 88123",
    travellerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    driverName: "Tapas Banik",
    driverPhone: "+91 94331 82711",
    driverAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    vehicleType: "Cab",
    vehicleModel: "Tata Indigo eCS",
    plateNumber: "WB 02 Z 7731",
    pickupLocation: "Ruby General Hospital",
    dropLocation: "Gariahat Crossing",
    distanceKm: 5.2,
    durationMinutes: 20,
    fare: 160,
    discount: 0,
    platformFee: 0,
    driverEarning: 0,
    paymentMethod: "UPI",
    paymentStatus: "failed",
    status: "cancelled",
    createdAt: "Today, 09:30 AM",
    cancellationReason: "Driver was stationary and refused to come to pickup location",
    cancelledBy: "traveller",
    timeline: [
      { step: "1", title: "Ride Requested", description: "Rituja booked Cab from Ruby Hospital", timestamp: "09:30 AM", completed: true },
      { step: "2", title: "Driver Assigned", description: "Tapas Banik assigned", timestamp: "09:32 AM", completed: true },
      { step: "3", title: "Cancelled by Passenger", description: "Driver was stationary for 12 mins without movement", timestamp: "09:44 AM", completed: true },
    ],
  },
  {
    id: "BK-006",
    bookingRef: "BK00128",
    travellerName: "Rohan Gupta",
    travellerPhone: "+91 98319 77889",
    travellerAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80",
    driverName: "Manish Chourasia",
    driverPhone: "+91 98362 89012",
    driverAvatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
    vehicleType: "Bus",
    vehicleModel: "Force Traveller Shuttle AC",
    plateNumber: "WB 07 D 3319",
    pickupLocation: "New Town Ecospace Gate 1",
    dropLocation: "Ultadanga Station Concourse",
    distanceKm: 12.0,
    durationMinutes: 30,
    fare: 90,
    discount: 0,
    platformFee: 16,
    driverEarning: 74,
    paymentMethod: "UPI",
    paymentStatus: "paid",
    status: "completed",
    createdAt: "Today, 08:30 AM",
    rating: 5,
    timeline: [
      { step: "1", title: "Shuttle Seat Booked", description: "Rohan reserved seat #08 on Route EX-1", timestamp: "08:30 AM", completed: true },
      { step: "2", title: "Shuttle Boarded", description: "QR Boarding pass verified at Ecospace", timestamp: "08:45 AM", completed: true },
      { step: "3", title: "Departed", description: "On-time departure with 22 passengers", timestamp: "08:50 AM", completed: true },
      { step: "4", title: "Completed", description: "Safe drop-off at Ultadanga station", timestamp: "09:20 AM", completed: true },
    ],
  },
];

export const INITIAL_PAYMENTS: PaymentTransaction[] = [
  {
    id: "TXN-901",
    transactionId: "TXN_7829104812",
    bookingRef: "BK00123",
    travellerName: "Amit Biswas",
    driverName: "Rahul Sharma",
    amount: 245,
    paymentMethod: "UPI",
    status: "successful",
    platformCommission: 44,
    driverEarnings: 201,
    timestamp: "Today, 11:22 AM",
  },
  {
    id: "TXN-902",
    transactionId: "TXN_7829104813",
    bookingRef: "BK00124",
    travellerName: "Priya Mukherjee",
    driverName: "Anisur Rahman",
    amount: 120,
    paymentMethod: "NexWallet",
    status: "successful",
    platformCommission: 22,
    driverEarnings: 98,
    timestamp: "Today, 11:15 AM",
  },
  {
    id: "TXN-903",
    transactionId: "TXN_7829104814",
    bookingRef: "BK00125",
    travellerName: "Debashis Ganguly",
    driverName: "Vikram Chatterjee",
    amount: 480,
    paymentMethod: "Credit Card",
    status: "successful",
    platformCommission: 86,
    driverEarnings: 394,
    timestamp: "Today, 11:02 AM",
  },
  {
    id: "TXN-904",
    transactionId: "TXN_7829104815",
    bookingRef: "BK00127",
    travellerName: "Rituja Banerjee",
    driverName: "Tapas Banik",
    amount: 160,
    paymentMethod: "UPI",
    status: "refunded",
    platformCommission: 0,
    driverEarnings: 0,
    refundAmount: 160,
    timestamp: "Today, 09:45 AM",
  },
  {
    id: "TXN-905",
    transactionId: "TXN_7829104816",
    bookingRef: "BK00128",
    travellerName: "Rohan Gupta",
    driverName: "Manish Chourasia",
    amount: 90,
    paymentMethod: "UPI",
    status: "successful",
    platformCommission: 16,
    driverEarnings: 74,
    timestamp: "Today, 08:30 AM",
  },
  {
    id: "TXN-906",
    transactionId: "TXN_7829104817",
    bookingRef: "BK00119",
    travellerName: "Sayantan Paul",
    driverName: "Sunil Das",
    amount: 210,
    paymentMethod: "Debit Card",
    status: "failed",
    platformCommission: 0,
    driverEarnings: 0,
    timestamp: "Today, 07:15 AM",
  },
];

export const INITIAL_TRAVELLERS: TravellerRecord[] = [
  {
    id: "TRV-201",
    name: "Amit Biswas",
    email: "amit.142biswas@gmail.com",
    phone: "+91 98301 99011",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    status: "active",
    rating: 4.95,
    totalRides: 142,
    cancelledRides: 3,
    totalSpent: 38450,
    walletBalance: 1250,
    joinedDate: "10 Oct 2024",
    preferredPayment: "UPI (Google Pay)",
    recentBookingsCount: 8,
    strikes: 0,
  },
  {
    id: "TRV-202",
    name: "Priya Mukherjee",
    email: "priya.mukh@gmail.com",
    phone: "+91 97481 00293",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    status: "active",
    rating: 4.88,
    totalRides: 89,
    cancelledRides: 4,
    totalSpent: 16800,
    walletBalance: 420,
    joinedDate: "12 Dec 2024",
    preferredPayment: "NexWallet",
    recentBookingsCount: 5,
    strikes: 0,
  },
  {
    id: "TRV-203",
    name: "Debashis Ganguly",
    email: "debashis.g@corporate.com",
    phone: "+91 98310 44556",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: "active",
    rating: 4.9,
    totalRides: 210,
    cancelledRides: 7,
    totalSpent: 92400,
    walletBalance: 3500,
    joinedDate: "05 Jul 2024",
    preferredPayment: "Corporate Card",
    recentBookingsCount: 14,
    strikes: 0,
  },
  {
    id: "TRV-204",
    name: "Koushik Ghosh",
    email: "koushik.ghosh88@yahoo.com",
    phone: "+91 98309 88120",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    status: "suspended",
    rating: 2.8,
    totalRides: 18,
    cancelledRides: 14,
    totalSpent: 3100,
    walletBalance: 0,
    joinedDate: "15 Jan 2026",
    preferredPayment: "Cash",
    recentBookingsCount: 1,
    strikes: 3,
  },
  {
    id: "TRV-205",
    name: "Anand Verma",
    email: "anand.fraud.test@mail.com",
    phone: "+91 91220 99881",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    status: "blocked",
    rating: 1.5,
    totalRides: 6,
    cancelledRides: 5,
    totalSpent: 890,
    walletBalance: -450,
    joinedDate: "02 Feb 2026",
    preferredPayment: "Cash",
    recentBookingsCount: 0,
    strikes: 5,
  },
];

export const INITIAL_REVIEWS: ModerationReview[] = [
  {
    id: "REV-501",
    bookingRef: "BK00123",
    travellerName: "Amit Biswas",
    travellerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    driverName: "Rahul Sharma",
    driverAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    reviewText: "Rahul was very courteous, punctual and navigated morning rush hour with total ease. 5 stars!",
    vehicleType: "Cab",
    date: "Today, 11:30 AM",
    flagged: false,
  },
  {
    id: "REV-502",
    bookingRef: "BK00128",
    travellerName: "Rohan Gupta",
    travellerAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80",
    driverName: "Manish Chourasia",
    driverAvatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    reviewText: "The AC commuter shuttle was spotless and strictly on time. Great daily transport service.",
    vehicleType: "Bus",
    date: "Today, 09:25 AM",
    flagged: false,
  },
  {
    id: "REV-503",
    bookingRef: "BK00072",
    travellerName: "Ananya Ghosh",
    travellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    driverName: "Tapas Banik",
    driverAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    rating: 1,
    reviewText: "Horrible experience. Driver demanded extra ₹100 cash outside the meter and was shouting.",
    vehicleType: "Cab",
    date: "Yesterday",
    flagged: true,
    flagReason: "Contains serious allegations of extortion and abuse",
  },
];

export const INITIAL_COMPLAINTS: ModerationComplaint[] = [
  {
    id: "CMP-801",
    complaintRef: "CMP-2026-081",
    bookingRef: "BK00072",
    complainantType: "traveller",
    complainantName: "Ananya Ghosh",
    complainantPhone: "+91 98311 99882",
    againstName: "Tapas Banik",
    againstRole: "driver",
    category: "Rude Behavior",
    priority: "high",
    description: "Driver refused to turn on AC in humid weather and insisted on additional cash above booking total.",
    evidenceProvided: true,
    status: "investigating",
    timestamp: "03 Mar 2026, 04:12 PM",
    resolutionNote: "Driver has been temporarily suspended pending telephonic inquiry.",
  },
  {
    id: "CMP-802",
    complaintRef: "CMP-2026-082",
    bookingRef: "BK00045",
    complainantType: "traveller",
    complainantName: "Priyanka Roy",
    complainantPhone: "+91 94322 10982",
    againstName: "Tapas Banik",
    againstRole: "driver",
    category: "Rash Driving",
    priority: "critical",
    description: "Overspeeding at 95 km/h on flyover in heavy traffic despite repeated passenger requests to slow down.",
    evidenceProvided: false,
    status: "open",
    timestamp: "01 Mar 2026, 08:45 PM",
  },
  {
    id: "CMP-803",
    complaintRef: "CMP-2026-083",
    bookingRef: "BK00112",
    complainantType: "traveller",
    complainantName: "Debjit Roy",
    complainantPhone: "+91 98300 12891",
    againstName: "Rahul Sharma",
    againstRole: "driver",
    category: "Route Detour",
    priority: "medium",
    description: "Driver took a 1.2 km detour through narrow lanes due to waterlogging on main road.",
    evidenceProvided: true,
    status: "resolved",
    timestamp: "24 Feb 2026, 06:10 PM",
    resolutionNote: "GPS verified waterlogging on Shakespeare Sarani. Route deviation was justified. Fare adjusted by ₹12.",
  },
  {
    id: "CMP-804",
    complaintRef: "CMP-2026-084",
    bookingRef: "BK00127",
    complainantType: "traveller",
    complainantName: "Rituja Banerjee",
    complainantPhone: "+91 94320 88123",
    againstName: "Tapas Banik",
    againstRole: "driver",
    category: "Ride Refusal",
    priority: "high",
    description: "Driver was stationary for 12 minutes after accepting and asked passenger to cancel ride.",
    evidenceProvided: true,
    status: "resolved",
    timestamp: "Today, 09:44 AM",
    resolutionNote: "Full ₹160 fare refunded immediately. Driver issued non-compliance strike.",
  },
];

export const INITIAL_ACTIVE_RIDES: AdminActiveRide[] = [
  {
    id: "AR-1",
    bookingRef: "BK00124",
    riderName: "Priya Mukherjee",
    riderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    driverName: "Anisur Rahman",
    driverAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    vehicleType: "bike",
    vehicleModel: "Bajaj Pulsar 150 (WB 24 K 3901)",
    plateNumber: "WB 24 K 3901",
    pickup: "Salt Lake Sector V",
    drop: "Park Street Metro",
    status: "picked_up",
    fare: 120,
    currentEtaMinutes: 4,
    progressPercent: 78,
    driverPhone: "+91 91234 56789",
    riderPhone: "+91 97481 00293",
    lat: 22.5697,
    lng: 88.3697,
  },
  {
    id: "AR-2",
    bookingRef: "BK00125",
    riderName: "Debashis Ganguly",
    riderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    driverName: "Vikram Chatterjee",
    driverAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    vehicleType: "cab",
    vehicleModel: "Hyundai Aura Prime (WB 19 C 1459)",
    plateNumber: "WB 19 C 1459",
    pickup: "CCU Airport T2",
    drop: "Ballygunge Circular Rd",
    status: "picked_up",
    fare: 480,
    currentEtaMinutes: 12,
    progressPercent: 55,
    driverPhone: "+91 97482 10922",
    riderPhone: "+91 98310 44556",
    lat: 22.6241,
    lng: 88.4212,
  },
  {
    id: "AR-3",
    bookingRef: "BK00129",
    riderName: "Swarnali Das",
    riderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    driverName: "Rahul Sharma",
    driverAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    vehicleType: "scooty",
    vehicleModel: "Honda Activa 6G (WB 02 AX 4892)",
    plateNumber: "WB 02 AX 4892",
    pickup: "Gariahat Mall",
    drop: "Jadavpur University Gate 3",
    status: "on_way_to_pickup",
    fare: 65,
    currentEtaMinutes: 3,
    progressPercent: 20,
    driverPhone: "+91 98765 43210",
    riderPhone: "+91 98312 34567",
    lat: 22.5188,
    lng: 88.3683,
  },
];
