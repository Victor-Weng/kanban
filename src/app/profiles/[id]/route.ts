import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    _request: Request, // _ for unused params
    { params }: { params: Promise<{ id: string }> } // String because url
) {
    const { id: profileId } = await params;

    try {
        const profile = await prisma.profile.findUnique({
            where: {
                id: profileId,
            },
        });
        return new Response(JSON.stringify(profile), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Specific profile could not be found" }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    //return Response.json(user);
}
