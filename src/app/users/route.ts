export const users = [
    { id: 1, name: "Victor" },
    { id: 2, name: "Belgh" },
    { id: 3, name: "Burge" },
];

export async function GET() {
    //return Response.json(users);
    return new Response(JSON.stringify(users), {
        // replace with database later
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST(request: Request) {
    const user = await request.json();
    const newUser = {
        id: users.length + 1, // Replace with database later
        name: user.name, // assume sent request has a .name property
    };
    users.push(newUser); // REplace with database later
    return new Response(JSON.stringify(newUser), {
        headers: {
            "Content-Type": "application/json",
        },
        status: 201,
    });
}
