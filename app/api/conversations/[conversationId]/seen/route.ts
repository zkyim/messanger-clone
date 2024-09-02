import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import { pusherServer } from "@/app/libs/pusher";

export async function POST(
    req: Request,
    {params}: {params: {conversationId: string}}
) {
    try {
        const currentUser = await getCurrentUser();
        const {conversationId} = params;
        if (!currentUser?.id || !currentUser?.email) return new NextResponse("Unauthorized", {status: 401});
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                messages: {
                    include: {
                        seen: true,
                    }
                },
                users: true,
            }
        });
        if (!conversation) return new NextResponse("Invalid ID", {status: 401});

        const lastMessage = conversation.messages[conversation.messages.length - 1];

        if (!lastMessage) return NextResponse.json(conversation);

        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id,
            },
            include: {
                sender: true,
                seen: true,
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        });

        await pusherServer.trigger(currentUser.email, 'conversation:update', {
            id: conversationId,
            messages: [updatedMessage]
        });

        if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
            return NextResponse.json(conversation);
        }

        await pusherServer.trigger(conversationId, 'message:update', updatedMessage);

        return NextResponse.json(updatedMessage);
    }catch (err) {
        console.log("[ERROR_MESSAGES_SEEN]", err);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}