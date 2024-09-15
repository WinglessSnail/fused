"use client";

import LoadingLogo from "@/components/shared/LoadingLogo";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { Authenticated, AuthLoading, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const convexClient = new ConvexReactClient(CONVEX_URL);

export const ConvexClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convexClient}>
        <AuthLoading>
          <LoadingLogo />
        </AuthLoading>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
