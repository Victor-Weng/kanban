import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
    _request: Request, // _ for unused params
    { params }: { params: Promise<{ profileId: string; taskId: string }> } // String because url
) {
    const { profileId, taskId } = await params;
    const taskIdNumber = parseInt(taskId); // convert string to int

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
        console.error(`Error deleting task: ${error}`);
        return new Response(
            JSON.stringify({ error: "Tasks could not be found" }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 500,
            }
        );
    }
}
