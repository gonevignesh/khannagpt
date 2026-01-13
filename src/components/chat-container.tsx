"use client";

import { Message } from "@/actions";
import { addMessageToChat, createNewChat } from "@/actions/chat";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { toast } from "sonner";
import ChatWrapper from "./chat-wrapper";

interface Props {
    user: User | null;
    chatId?: string;
    messages: Message[] | [];
}

const ChatContainer = ({ user, chatId, messages }: Props) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
    const [oMessages, setOMessages] = useState<Message[]>([]);
    const [guestChatId, setGuestChatId] = useState<string | null>(null);

    // Determine if this is a guest session
    const isGuestMode = !user;
    const currentChatId = chatId || guestChatId;

    const handleSendMessage = async (message: string) => {
        setIsLoading(true);

        if (!message.trim()) return;

        const tempMessageId = `temp-${Date.now()}`;
        const userMessage: Message = {
            id: tempMessageId,
            chat_id: currentChatId || "",
            content: String(message),
            role: "user",
            created_at: new Date().toISOString(),
        };

        setOMessages((prev) => [...prev, userMessage]);

        try {
            if (currentChatId) {
                // Continue existing chat
                setIsAiLoading(true);
                const { aiMessage } = await addMessageToChat(currentChatId, message, 'user');

                if (!aiMessage) {
                    toast.error("Failed to generate AI response");
                    return;
                }

                // For guest mode, add AI message to state
                if (isGuestMode) {
                    const aiMessageObj: Message = typeof aiMessage === 'string' ? {
                        id: `ai-${Date.now()}`,
                        chat_id: currentChatId,
                        content: aiMessage,
                        role: 'assistant',
                        created_at: new Date().toISOString()
                    } : aiMessage;
                    setOMessages(prev => [...prev, aiMessageObj]);
                } else {
                    router.refresh();
                }
            } else {
                // Create new chat
                setIsAiLoading(true);
                const { chatId: newChatId, aiMessage } = await createNewChat(message);

                const aiMessageObj: Message = {
                    id: `temp-ai-${Date.now()}`,
                    chat_id: newChatId,
                    content: String(aiMessage),
                    role: 'assistant',
                    created_at: new Date().toISOString()
                };

                setOMessages(prev => [...prev, aiMessageObj]);

                // For guest mode, keep on homepage; for authenticated, navigate to chat
                if (isGuestMode) {
                    setGuestChatId(newChatId);
                } else {
                    router.push(`/c/${newChatId}`);
                }
            }
        } catch (error) {
            console.log("Error creating chat", error);
            toast.error("Error creating chat. Please try again");
            setOMessages(prev =>
                prev.filter(msg => msg.id !== tempMessageId)
            );
        } finally {
            setIsLoading(false);
            setIsAiLoading(false);
            // Only clear messages for authenticated users (they get redirected)
            if (!isGuestMode && !currentChatId) {
                setTimeout(() => {
                    setOMessages([]);
                }, 1000);
            }
        }
    };

    return (
        <ChatWrapper
            user={user}
            messages={messages}
            isLoading={isLoading}
            oMessages={oMessages}
            isAiLoading={isAiLoading}
            onSubmit={handleSendMessage}
        />
    )
};

export default ChatContainer
