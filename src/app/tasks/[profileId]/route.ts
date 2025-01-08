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
    _request: Request, // _ for unused params
    {
        params,
    }: {
        params: {
            title: string;
            content: string;
            labels: string[];
            profileId: string;
        };
    } // String because url
) {
    const { title, content, labels, profileId } = await params;

    try {
        const user = await prisma.user.create({
            data: {
                title,
                content,
                labels,
                profileId,
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
