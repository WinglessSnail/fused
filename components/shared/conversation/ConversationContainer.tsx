import { Card } from "@/components/ui/card";
import React from "react";

const ConversationContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="lg:h-full h-[calc(100svh-32px)] w-full p-2 flex flex-col gap-2">
      {children}
    </Card>
  );
};

export default ConversationContainer;
