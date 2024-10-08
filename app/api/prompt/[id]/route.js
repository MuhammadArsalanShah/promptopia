import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const selectedPrompt = await Prompt.findById(params.id).populate('creator');

    if(!selectedPrompt) return new Response('Prompt not found', { status: 404 });

    return new Response(JSON.stringify(selectedPrompt), { status: 200 });
    

  } catch (error) {

    return new Response("Failed to fetch the selected post", { status: 500 });

  }
}

//PATCH (update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  console.log('here its inside the route')
  try {
    await connectToDB()

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) return new Response('Prompt not found', { status: 404 });
    
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    
    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 })
    
  }
}


//Delete (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response('Prompt deleted successfully', { status: 200 });

  } catch (error) {
    return new Response('Failed to delete prompt', { status: 500});
  }
}