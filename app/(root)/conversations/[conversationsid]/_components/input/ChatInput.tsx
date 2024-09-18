import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/convex/_generated/api";
import { useConversation } from "@/hooks/useConversation";
import { useMutationState } from "@/hooks/useMutationState";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConvexError } from "convex/values";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import MessageActionPopover from "./MessageActionPopover";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";

const chatMessageSchema = z.object({
  content: z.string().min(1, { message: "This field can't be empty" }),
});

const ChatInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const { conversationId } = useConversation();
  const { theme } = useTheme();

  const { mutate: createMessage } = useMutationState(api.message.create);

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: "",
    },
  });
  const content = form.watch("content", "");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, selectionStart } = event.target;
    if (selectionStart !== null) {
      form.setValue("content", value);
      setCursorPosition(selectionStart);
    }
  };
  const handleInputClick = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    const { value, selectionStart } = event.currentTarget;
    if (selectionStart !== null) {
      setCursorPosition(selectionStart);
      form.setValue("content", value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setEmojiPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const insertEmoji = (emoji: string) => {
    const newText = [
      content.substring(0, cursorPosition),
      emoji,
      content.substring(cursorPosition),
    ].join("");

    form.setValue("content", newText);

    setCursorPosition(cursorPosition + emoji.length);
  };

  const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
    createMessage({
      content: [values.content],
      type: "text",
      conversationId,
    })
      .then(() => {
        form.reset();
        textareaRef.current?.focus();
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError
            ? error.data
            : "Unexpected error occurred",
        );
      });
  };

  return (
    <Card className="w-full p-2 rounded-lg relative">
      <div className="absolute bottom-16" ref={emojiPickerRef}>
        <EmojiPicker
          open={emojiPickerOpen}
          theme={theme as Theme}
          onEmojiClick={(emojiDetails) => {
            insertEmoji(emojiDetails.emoji);
          }}
          lazyLoadEmojis
        />
      </div>
      <div className="flex gap-2 items-end w-full">
        <MessageActionPopover setEmojiPickerOpen={setEmojiPickerOpen} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex gap-2 items-end w-full"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="h-full w-full">
                  <FormControl>
                    <TextareaAutosize
                      onKeyDown={async (e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          await form.handleSubmit(handleSubmit)();
                        }
                      }}
                      rows={1}
                      maxRows={3}
                      {...field}
                      onChange={handleInputChange}
                      onClick={handleInputClick}
                      placeholder="Type a message..."
                      className="min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5 flex"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={false} size="icon" type="submit">
              <SendHorizonal />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default ChatInput;
