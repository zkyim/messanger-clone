import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import { pusherServer } from "@/app/libs/pusher";

export async function DELETE(
    req: Request,
    {params}: {params: {conversationId: string}}
) {
    try {
        const {conversationId} = params;
        const currentUser = await getCurrentUser();
        if (!currentUser?.id) return new NextResponse("Unauthorized", {status: 401});
        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                users: true
            }
        });

        if (!existingConversation) return new NextResponse("Invalid ID", {status: 401});
        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        });
        existingConversation.users.forEach(user => {
            if (user.email) {
                pusherServer.trigger(user.email, 'conversation:remove', existingConversation)
            }
        })
        return NextResponse.json(deletedConversation)
    }catch (e) {
        console.log("[ERROR_DELETE_CONVERSATION]", e);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}