import { users } from "../route"; // change for db

export async function GET(
    _request: Request, // _ for unused params
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const user = users.find((user) => user.id === parseInt(id));
    return new Response(JSON.stringify(user));
    //return Response.json(user);
}
