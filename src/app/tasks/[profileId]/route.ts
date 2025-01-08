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

export async function POST(
    request: Request, // used for request on POST
    {
        params,
    }: {
        params: {
            profileId: string;
        };
    } // String because url
) {
    const { profileId } = await params;
    const { title, content, labels } = await request.json();

    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                labels,
                profileId,
            },
        });
        return new Response(JSON.stringify(post), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Could not post the task" }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 500,
            }
        );
    }
}
