export const users = [
    { id: 1, name: "Victor"},
    { id: 2, namme: "Belgh"},
    { id: 3, name: "Burge"},
];

export async function GET() {
    return Response.json(users);
}

export async function POST() {
    
}