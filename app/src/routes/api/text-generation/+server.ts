import { HfInference } from '@huggingface/inference';
import { HuggingFaceStream, StreamingTextResponse } from 'ai';

import { env } from '$env/dynamic/private';

const Hf = new HfInference(env.HF_API_TOKEN);

export const POST = async ({ request }) => {
	const { prompt } = await request.json();

	const response = Hf.textGenerationStream({
		model: 'EleutherAI/gpt-neox-20b',
		inputs: prompt,
		parameters: {
			do_sample: true,
			return_full_text: false
		}
	});

	const stream = HuggingFaceStream(response);

	return new StreamingTextResponse(stream);
};
