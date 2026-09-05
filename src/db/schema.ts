import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/* =========================================================
   ENUMS
========================================================= */

export const userRoleEnum = pgEnum("user_role", [
  "customer",
  "driver",
  "admin",
]);

export const vehicleTypeEnum = pgEnum("vehicle_type", [
  "bike",
  "scooty",
  "cab",
  "taxi",
  "bus",
]);

export const bookingStatusEnum = pgEnum("booking_status", [
  "searching",
  "driver_assigned",
  "driver_arriving",
  "ride_started",
  "ride_completed",
  "cancelled",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "paid",
  "failed",
  "refunded",
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "cash",
  "card",
  "upi",
]);

/* =========================================================
   USERS
========================================================= */

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  clerkUserId: varchar("clerk_user_id", {
    length: 255,
  })
    .notNull()
    .unique(),

  name: varchar({ length: 255 }).notNull(),

  email: varchar({ length: 255 }).notNull().unique(),

  phone: varchar({ length: 20 }),

  imageUrl: text("image_url"),

  role: userRoleEnum().notNull().default("customer"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* =========================================================
   VEHICLE TYPES
========================================================= */

export const vehicleTypesTable = pgTable("vehicle_types", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  name: vehicleTypeEnum().notNull().unique(),

  description: text(),

  baseFare: real("base_fare").notNull(),

  perKmRate: real("per_km_rate").notNull(),

  perMinuteRate: real("per_minute_rate").notNull(),

  minimumFare: real("minimum_fare").notNull(),

  icon: text(),

  isActive: boolean("is_active").notNull().default(true),
});

/* =========================================================
   DRIVERS
========================================================= */

export const driversTable = pgTable("drivers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),

  licenseNumber: varchar("license_number", {
    length: 100,
  })
    .notNull()
    .unique(),

  isAvailable: boolean("is_available")
    .notNull()
    .default(false),

  isVerified: boolean("is_verified")
    .notNull()
    .default(false),

  rating: real().notNull().default(5),

  totalRides: integer("total_rides")
    .notNull()
    .default(0),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

/* =========================================================
   VEHICLES
========================================================= */

export const vehiclesTable = pgTable("vehicles", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  driverId: integer("driver_id")
    .notNull()
    .references(() => driversTable.id, {
      onDelete: "cascade",
    }),

  vehicleTypeId: integer("vehicle_type_id")
    .notNull()
    .references(() => vehicleTypesTable.id),

  brand: varchar({ length: 100 }),

  model: varchar({ length: 100 }),

  registrationNumber: varchar("registration_number", {
    length: 50,
  })
    .notNull()
    .unique(),

  color: varchar({ length: 50 }),

  isActive: boolean("is_active")
    .notNull()
    .default(true),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

/* =========================================================
   LOCATIONS
========================================================= */

export const locationsTable = pgTable("locations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  address: text().notNull(),

  city: varchar({ length: 100 }),

  latitude: real().notNull(),

  longitude: real().notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

/* =========================================================
   BOOKINGS
========================================================= */

export const bookingsTable = pgTable("bookings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  bookingNumber: varchar("booking_number", {
    length: 50,
  })
    .notNull()
    .unique(),

  customerId: integer("customer_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),

  driverId: integer("driver_id").references(
    () => driversTable.id,
    {
      onDelete: "set null",
    }
  ),

  vehicleId: integer("vehicle_id").references(
    () => vehiclesTable.id,
    {
      onDelete: "set null",
    }
  ),

  vehicleTypeId: integer("vehicle_type_id")
    .notNull()
    .references(() => vehicleTypesTable.id),

  pickupLocationId: integer("pickup_location_id")
    .notNull()
    .references(() => locationsTable.id),

  dropLocationId: integer("drop_location_id")
    .notNull()
    .references(() => locationsTable.id),

  distanceKm: real("distance_km"),

  estimatedDurationMinutes: integer(
    "estimated_duration_minutes"
  ),

  estimatedFare: real("estimated_fare"),

  finalFare: real("final_fare"),

  status: bookingStatusEnum()
    .notNull()
    .default("searching"),

  bookedAt: timestamp("booked_at")
    .defaultNow()
    .notNull(),

  startedAt: timestamp("started_at"),

  completedAt: timestamp("completed_at"),

  cancelledAt: timestamp("cancelled_at"),

  cancellationReason: text("cancellation_reason"),
});

/* =========================================================
   BOOKING STATUS HISTORY
========================================================= */

export const bookingStatusHistoryTable = pgTable(
  "booking_status_history",
  {
    id: integer()
      .primaryKey()
      .generatedAlwaysAsIdentity(),

    bookingId: integer("booking_id")
      .notNull()
      .references(() => bookingsTable.id, {
        onDelete: "cascade",
      }),

    status: bookingStatusEnum().notNull(),

    changedAt: timestamp("changed_at")
      .defaultNow()
      .notNull(),
  }
);

/* =========================================================
   PAYMENTS
========================================================= */

export const paymentsTable = pgTable("payments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  bookingId: integer("booking_id")
    .notNull()
    .references(() => bookingsTable.id, {
      onDelete: "cascade",
    }),

  amount: real().notNull(),

  method: paymentMethodEnum().notNull(),

  status: paymentStatusEnum()
    .notNull()
    .default("pending"),

  transactionId: varchar("transaction_id", {
    length: 255,
  }),

  paidAt: timestamp("paid_at"),
});

/* =========================================================
   REVIEWS
========================================================= */

export const reviewsTable = pgTable("reviews", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  bookingId: integer("booking_id")
    .notNull()
    .references(() => bookingsTable.id, {
      onDelete: "cascade",
    }),

  customerId: integer("customer_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),

  driverId: integer("driver_id")
    .notNull()
    .references(() => driversTable.id, {
      onDelete: "cascade",
    }),

  rating: integer().notNull(),

  comment: text(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});