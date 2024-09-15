"use client";

import { useParams } from "next/navigation";
import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React from "react";
import Header from "./_components/Header";
import ChatInput from "./_components/input/ChatInput";
import Body from "./_components/body/Body";

const ConversationPage = () => {
  const params = useParams();
  const conversationId = params?.conversationsid;

  if (!conversationId) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Conversation ID is missing or invalid</p>
      </div>
    );
  }

  const parsedConversationId: Id<"conversations"> =
    conversationId as unknown as Id<"conversations">;

  const conversation = useQuery(api.conversation.get, {
    id: parsedConversationId,
  });

  return conversation === undefined ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="h-8 w-8" />
    </div>
  ) : conversation === null ? (
    <p className="w-full h-full flex items-center justify-center">
      Conversation not found
    </p>
  ) : (
    <ConversationContainer>
      <Header
        name={
          (conversation.isGroup
            ? undefined
            : conversation.otherMember?.username) || ""
        }
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherMember?.imageUrl
        }
      />
      <Body />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;
