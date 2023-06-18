<script>
	import { useCompletion } from 'ai/svelte';

	const { input, handleSubmit, completion } = useCompletion({
		api: '/api/text-generation'
		// api: '/api/text-to-text'
	});
</script>

<svelte:head>
	<title>AI Storywriter</title>
</svelte:head>

<section>
	<p>Completion result:</p>
	<p>{$completion}</p>
	<form on:submit={handleSubmit}>
		<input bind:value={$input} />
		<button type="submit">Send</button>
	</form>
</section>

<style>
	section {
		margin-top: 10%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
