import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { syncUserInDb, ADMIN_EMAIL } from "@/lib/authorization";
import { RoleSelectorClient } from "./RoleSelectorClient";

export const metadata = {
  title: "Choose Role | NexRide Urban Transit",
  description: "Select whether you are riding or driving with NexRide.",
};

export default async function ChooseRolePage() {
  const clerkUser = await currentUser();

  // If unauthenticated, redirect to home
  if (!clerkUser) {
    redirect("/");
  }

  // Synchronize DB user
  const dbUser = await syncUserInDb();

  const primaryEmail =
    clerkUser.emailAddresses?.[0]?.emailAddress?.toLowerCase().trim() || "";

  // If user is Admin or already has a non-null role, redirect to home
  if (primaryEmail === ADMIN_EMAIL || (dbUser && dbUser.role !== null)) {
    redirect("/");
  }

  const nameParts = [clerkUser.firstName, clerkUser.lastName].filter(Boolean);
  const fullName = nameParts.length > 0 ? nameParts.join(" ") : clerkUser.username;

  return (
    <RoleSelectorClient
      userEmail={primaryEmail}
      userName={fullName}
      userAvatar={clerkUser.imageUrl}
    />
  );
}
