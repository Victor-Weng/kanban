export default async function Task({ params }: {params: {id: string} }) {
    const { id } = await params;
    return <p>Task: {id}</p>
}