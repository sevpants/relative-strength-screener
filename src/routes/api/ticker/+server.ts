export async function GET(event) {
    console.log("Event", event)
    console.log("Event params", event.params)
    // const posts = await db.post.findMany()
    // return json(event)
    return new Response(String(event))
}
