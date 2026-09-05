import { currentUser } from "@clerk/nextjs/server";

/**
 * Super Admin Email constant.
 * Any user signing in with this email is automatically designated an ADMIN.
 */
export const ADMIN_EMAIL = "amit.142biswas@gmail.com";

/**
 * Valid application user roles.
 */
export type UserRole = "TRAVELLER" | "DRIVER" | "ADMIN";

/**
 * User data model representation.
 */
export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
  role: UserRole | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Result structure returned by the requireRole authorization helper.
 */
export type RequireRoleResult =
  | { user: null; status: 401 }
  | { user: null; status: 403 }
  | { user: User; status: null };

// In-memory placeholder store (replace with your Drizzle ORM queries when ready)
const usersDbStore = new Map<string, User>();

/**
 * Synchronizes the current Clerk authenticated user session with the database.
 * 
 * TODO: When you set up Drizzle ORM, replace the storage logic with your Drizzle queries:
 * 1. Search `users` table matching `clerk_id` OR `email`.
 * 2. On first sign-in: insert with role = (email === ADMIN_EMAIL ? "ADMIN" : null).
 * 3. On subsequent sign-in: update name, email, avatar URL, and if email === ADMIN_EMAIL, ensure role = "ADMIN".
 */
export async function syncUserInDb(): Promise<User | null> {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return null;
  }

  const primaryEmail = clerkUser.emailAddresses?.[0]?.emailAddress?.toLowerCase().trim();
  if (!primaryEmail) {
    return null;
  }

  const isAdmin = primaryEmail === ADMIN_EMAIL;

  // Search existing user by clerkId or email
  let existingUser: User | undefined;
  for (const u of usersDbStore.values()) {
    if (u.clerkId === clerkUser.id || u.email === primaryEmail) {
      existingUser = u;
      break;
    }
  }

  const nameParts = [clerkUser.firstName, clerkUser.lastName].filter(Boolean);
  const fullName = nameParts.length > 0 ? nameParts.join(" ") : clerkUser.username || null;
  const imageUrl = clerkUser.imageUrl || null;

  if (!existingUser) {
    // First Sign-in (Insert)
    const newUser: User = {
      id: crypto.randomUUID(),
      clerkId: clerkUser.id,
      email: primaryEmail,
      name: fullName,
      imageUrl,
      role: isAdmin ? "ADMIN" : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    usersDbStore.set(newUser.id, newUser);
    return newUser;
  } else {
    // Subsequent Sign-in (Update)
    const targetRole = isAdmin ? "ADMIN" : existingUser.role;
    const updatedUser: User = {
      ...existingUser,
      clerkId: clerkUser.id,
      email: primaryEmail,
      name: fullName,
      imageUrl,
      role: targetRole,
      updatedAt: new Date(),
    };
    usersDbStore.set(updatedUser.id, updatedUser);
    return updatedUser;
  }
}

/**
 * Server-Side Authorization helper that checks if current user has one of the required roles.
 *
 * - Returns { user: null, status: 401 } if unauthenticated.
 * - Returns { user: null, status: 403 } if user lacks required role.
 * - Returns { user, status: null } if authorized.
 */
export async function requireRole(
  ...roles: UserRole[]
): Promise<RequireRoleResult> {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return { user: null, status: 401 };
  }

  const email = clerkUser.emailAddresses?.[0]?.emailAddress?.toLowerCase().trim();

  let dbUser: User | undefined;
  for (const u of usersDbStore.values()) {
    if (u.clerkId === clerkUser.id || (email && u.email === email)) {
      dbUser = u;
      break;
    }
  }

  if (!dbUser) {
    return { user: null, status: 401 };
  }

  if (!dbUser.role || (roles.length > 0 && !roles.includes(dbUser.role as UserRole))) {
    return { user: null, status: 403 };
  }

  return { user: dbUser, status: null };
}

/**
 * Updates a user's role in the database.
 * TODO: Replace with your Drizzle ORM update query when you configure Drizzle.
 */
export async function updateUserRoleInDb(
  userId: string,
  newRole: UserRole
): Promise<User | null> {
  const user = usersDbStore.get(userId);
  if (!user) return null;

  const updated: User = {
    ...user,
    role: newRole,
    updatedAt: new Date(),
  };
  usersDbStore.set(userId, updated);
  return updated;
}
