import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    _request: Request, // _ for unused params
    { params }: { params: { id: string } } // String because url
) {
    const { id: userId } = await params;

    try {
        const user = await prisma.profile.findUnique({
            where: {
                id: parseInt(userId),
            },
        });
        return new Response(JSON.stringify(user), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Specific user could not be found" }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    //return Response.json(user);
}
