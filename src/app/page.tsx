import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { syncUserInDb, ADMIN_EMAIL } from "@/lib/authorization";
import { HomeClient } from "@/components/HomeClient";

export default async function Home() {
  const clerkUser = await currentUser();

  if (clerkUser) {
    const dbUser = await syncUserInDb();
    const primaryEmail =
      clerkUser.emailAddresses?.[0]?.emailAddress?.toLowerCase().trim() || "";

    // Requirement 3: If a signed-in user has role === null (and is not an ADMIN), redirect to /choose-role
    if (dbUser && dbUser.role === null && primaryEmail !== ADMIN_EMAIL) {
      redirect("/choose-role");
    }

    return <HomeClient user={dbUser} />;
  }

  return <HomeClient user={null} />;
}
