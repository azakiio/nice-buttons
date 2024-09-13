<script lang="ts">
	import '$lib/prism.css';
	import Icon from '@iconify/svelte';
	import Prism from 'prismjs';

	type Props = {
		language: string;
		code: string;
		header: string;
	};
	const { language, code, header }: Props = $props();

	let isCopied = $state(false);

	const codeHTML = $derived(Prism.highlight(code, Prism.languages[language], 'css'));

	const copyToClipboard = () => {
		if (isCopied) return;
		navigator.clipboard.writeText(code);
		isCopied = true;
		setTimeout(() => {
			isCopied = false;
		}, 2000);
	};
</script>

<div
	class="bg-base-2 rounded-lg text-base-content relative overflow-hidden shadow-lg"
	data-theme="dark"
>
	<div class="flex justify-between p-3 items-center bg-base-1">
		{#if header}
			<div class="font-bold text-lg">{header}</div>
		{/if}
		<button class="btn bg-primary-4 text-primary-content" onclick={copyToClipboard} disabled={isCopied}>
			{#if isCopied}
				Copied!
			{:else}
				Copy!
				<Icon icon="carbon:copy" class="w-4 h-4" />
			{/if}
		</button>
	</div>
	<pre class="p-3"><code class="language-{language}">{@html codeHTML}</code></pre>
</div>
