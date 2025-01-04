import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const profiles = await prisma.profile.findMany(); // returns a list of records
        return new Response(JSON.stringify(profiles), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to fetch profiles" }),
            {
                headers: { "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
}

/* not needed for profiles

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
        const profile = await request.json();
        const newProfile = await prisma.profile.create({
            data: {
                full_name: profile.full_name,
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

*/
