import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    _request: Request, // _ for unused params
    { params }: { params: { profileId: string } } // String because url
) {
    const { profileId } = await params;

    try {
        const tasks = await prisma.post.findMany({
            where: {
                profileId: profileId,
            },
        });
        return new Response(JSON.stringify(tasks), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Tasks for profile could not be found" }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
