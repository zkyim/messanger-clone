import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb"

export async function POST(
    req: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const {
            image,
            name,
        } = body;
        if (!currentUser?.id) return new NextResponse("Unauthorized", {status: 401});
        const updateUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                iamge: image,
                name
            }
        });
        return NextResponse.json(updateUser);
    }catch (e) {
        console.log("ERROR_SETTINGS", e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}