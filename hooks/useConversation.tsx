import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useConversation = () => {
  const param = useParams();

  const conversationId = useMemo(
    () => param.conversationsid,
    [param.conversationsid],
  );

  const isActive = useMemo(() => !!conversationId, [conversationId]);

  return { isActive, conversationId };
};
