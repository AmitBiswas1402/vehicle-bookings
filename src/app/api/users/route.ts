import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import {
  ADMIN_EMAIL,
  syncUserInDb,
  updateUserRoleInDb,
  type UserRole,
} from "@/lib/authorization";

/**
 * GET /api/users
 * Returns the currently authenticated user's profile.
 */
export async function GET() {
  try {
    const user = await syncUserInDb();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Failed to fetch user in GET /api/users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/users
 * Updates the user's role (TRAVELLER or DRIVER).
 * Prevents non-admins from claiming ADMIN, and retains ADMIN role for ADMIN_EMAIL.
 */
export async function PATCH(req: NextRequest) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = clerkUser.emailAddresses?.[0]?.emailAddress?.toLowerCase().trim();
    if (!email) {
      return NextResponse.json({ error: "No email associated with account" }, { status: 400 });
    }

    const body = await req.json().catch(() => null);
    if (!body || !body.role) {
      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }

    const requestedRole = body.role as string;
    const allowedRoles: UserRole[] = ["TRAVELLER", "DRIVER"];

    if (!allowedRoles.includes(requestedRole as UserRole)) {
      return NextResponse.json(
        {
          error: `Invalid role '${requestedRole}'. Allowed roles: 'TRAVELLER', 'DRIVER'`,
        },
        { status: 400 }
      );
    }

    const dbUser = await syncUserInDb();
    if (!dbUser) {
      return NextResponse.json({ error: "User synchronization failed" }, { status: 500 });
    }

    // If user's email is ADMIN_EMAIL, enforce ADMIN role
    const finalRole: UserRole = email === ADMIN_EMAIL ? "ADMIN" : (requestedRole as UserRole);

    const updatedUser = await updateUserRoleInDb(dbUser.id, finalRole);

    return NextResponse.json({
      success: true,
      message: `Role successfully updated to ${finalRole}`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user role in PATCH /api/users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
