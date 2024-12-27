import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    // //return Response.json(users);
    // return new Response(JSON.stringify(users), {
    //     // replace with database later
    //     headers: { "Content-Type": "application/json" },
    // });

    try {
        const users = await prisma.user.findMany(); // returns a list of records
        return new Response(JSON.stringify(users), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to fetch users" }),
            {
                headers: { "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
}

export async function POST(request: Request) {
    // const user = await request.json();
    // const newUser = {
    //     id: users.length + 1, // Replace with database later
    //     name: user.name, // assume sent request has a .name property
    // };
    // users.push(newUser); // REplace with database later
    // return new Response(JSON.stringify(newUser), {
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     status: 201,
    // });

    try {
        const user = await request.json();
        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
            },
        });
        return new Response(JSON.stringify(newUser), {
            headers: {
                "Content-Type": "application.json",
            },
            status: 201,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to post user" }), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
