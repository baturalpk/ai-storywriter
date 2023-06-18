import { StreamingTextResponse } from 'ai';

import { env } from '$env/dynamic/private';

const apiURL = new URL('/t2t', env.CUSTOM_API_BASE_URL);

async function queryStreamT2t(prompt: string) {
	const formData = new FormData();
	formData.append('prompt', prompt);

	const response = await fetch(apiURL, {
		method: 'POST',
		body: formData
	});
	return response.body;
}

export const POST = async ({ request }) => {
	const { prompt } = await request.json();

	const stream = await queryStreamT2t(prompt);

	if (stream == null) {
		return new Response('', { status: 500 });
	}
	return new StreamingTextResponse(stream);
};
