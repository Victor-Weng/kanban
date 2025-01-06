import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
    _request: Request, // _ for unused params
    { params }: { params: { profileId: string; taskId: string } } // String because url
) {
    const { profileId, taskId } = await params;
    const taskIdNumber = parseInt(taskId, 4); // convert string to int

    try {
        const tasks = await prisma.post.delete({
            where: {
                id: taskIdNumber,
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
            JSON.stringify({ error: "Tasks could not be found" }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}