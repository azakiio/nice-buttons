<script lang="ts">
	import { colorMode } from '$lib/colorMode.svelte';
	import { getColor, type Color } from '$lib/colors';
	import Icon from '@iconify/svelte';
	import 'highlight.js/styles/github.css';
	import { isEqual } from 'radash';
	import ColorPicker from './ColorPicker.svelte';
	import { cssString, directions, patterns } from './constants';
	import Highlight from '$lib/Highlight.svelte';

	let controls = $state<{
		textColor: string;
		angle: string;
		size: number;
		colorList: Color[];
		pattern: number[][];
		position: string;
		positionHover: string;
	}>({
		textColor: 'white',
		angle: 'bottom right',
		size: 400,
		colorList: getColor(6, 4, patterns[0].pattern),
		pattern: patterns[0].pattern,
		position: '0% 0%',
		positionHover: '100% 100%'
	});

	let textContent = $state('Click to copy Styles');
	let subTextContent = $state('no credit card required');
	let isUppercase = $state(true);
	let isCopied = $state(false);

	const themeManager = colorMode();

	const generateStyleString = () => {
		const styleString = `background-image: linear-gradient(
    to ${controls.angle},
    ${controls.colorList.map((item) => item.color).join(',\n\t')}
  );
  color: ${controls.textColor};
  background-size: ${controls.size}% ${controls.size}%;
  --position: ${controls.position};
  --position-hover: ${controls.positionHover};`;

		return styleString;
	};

	const copyToClipboard = () => {
		if (isCopied) return;
		const text = document.getElementById('css-code')?.innerText;
		navigator.clipboard.writeText(text || '');
		isCopied = true;
		setTimeout(() => {
			isCopied = false;
		}, 2000);
	};

	const css = $derived(cssString(controls));

	const tagline = 'Generate beautiful gradient hover effects';

	const getStyles = () => {
		const [x, y] = controls.position.split(' ');
		return Object.entries({
			left: `${x}`,
			top: `${y}`,
			translate: `-${x} -${y}`
		})
			.map(([key, value]) => {
				return `${key}: ${value};`;
			})
			.join(' ');
	};

	const getHoverStyles = () => {
		const [x, y] = controls.positionHover.split(' ');
		return Object.entries({
			left: `${x}`,
			top: `${y}`,
			translate: `-${x} -${y}`
		})
			.map(([key, value]) => {
				return `${key}: ${value};`;
			})
			.join(' ');
	};

	let demo_styles = $state(getStyles());
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content={tagline} />
</svelte:head>

<section class="grid">
	<hgroup class="col-span-full mb-4 text-center">
		<h1 class="font-bold">Nice buttons</h1>
		<p class="text-base-content/50">{tagline}</p>
	</hgroup>

	<div class="grid md:grid-cols-2 mb-24">
		<button
			onclick={copyToClipboard}
			class="grid px-4 rounded-lg brand-gradient flex-col gap-0 py-3 shadow-lg place-self-center relative my-12 place-items-center"
			style={`${generateStyleString()}`}
		>
			<div
				class="absolute bottom-[125%] flex items-center gap-2"
				style="translate: 0 {isCopied ? 0 : 200}%; opacity: {isCopied ? 1 : 0}; 
    transition-property: translate, opacity; transition-duration: 0.3s;"
			>
				<Icon icon="carbon:copy" class="w-6 h-6" />
				Copied!
			</div>

			<div
				class="text-lg font-bold leading-normal"
				style="text-transform: {isUppercase ? 'uppercase' : 'none'};"
			>
				{textContent}
			</div>
			<div style="color: oklch(from {controls.textColor} l c h / 0.6)">{subTextContent}</div>
		</button>

		<div class="grid gap-4 p-4">
			<label>
				<div class="font-bold mb-1">Text:</div>
				<div class="grid grid-flow-col gap-2">
					<input type="text" class="input" bind:value={textContent} />
					<button class="btn bg-base-2 p-1 rounded-full w-10 h-10">
						<Icon
							icon="material-symbols:uppercase"
							onclick={() => (isUppercase = !isUppercase)}
							class="w-full h-full"
						/>
					</button>
				</div>
			</label>
			<label>
				<div class="font-bold mb-1">Subtext:</div>
				<input type="text" class="input" bind:value={subTextContent} />
			</label>

			<ColorPicker bind:colorList={controls.colorList} bind:pattern={controls.pattern} />

			<div class="grid sm:grid-cols-2 gap-4">
				<div>
					<div class="font-bold mb-2">Patterns:</div>
					<div class="flex flex-wrap gap-2 items-start">
						{#each patterns as pattern}
							<button
								class="btn bg-base-2"
								class:bg-primary-4={isEqual(controls.pattern.flat(), pattern.pattern.flat())}
								onclick={() => {
									controls.pattern = pattern.pattern;
									controls.colorList = getColor(
										controls.colorList[0].hueIndex,
										controls.colorList[0].toneIndex,
										pattern.pattern
									);
								}}
							>
								<Icon icon={pattern.icon} class="w-6 h-6" />
							</button>
						{/each}
					</div>
				</div>
				<div class="grid grid-cols-3 place-items-center w-fit gap-2">
					<div class="font-bold col-span-full justify-self-start mb-2">Behavior:</div>
					{#each directions as direction}
						{#if direction.name === 'reset'}
							<button
								class="btn bg-base-2 w-14 h-14 p-3 rounded-full"
								onclick={() =>
									themeManager.setTheme(themeManager.theme === 'light' ? 'dark' : 'light')}
							>
								<Icon
									icon={themeManager.theme === 'light' ? 'carbon:asleep' : 'carbon:awake'}
									class="w-full h-full"
								/>
							</button>
						{:else}
							<button
								class="btn bg-base-2 w-14 h-14 p-3 rounded-full"
								class:bg-primary-4={controls.angle === direction.name}
								onclick={() => {
									controls.angle = direction.name;
									controls.position = `${direction.positions[0] * 100}% ${direction.positions[1] * 100}% `;
									controls.positionHover = `${direction.positions[2] * 100}% ${direction.positions[3] * 100}% `;
								}}><Icon icon={direction.icon} class="w-full h-full" /></button
							>
						{/if}
					{/each}

					<label class="col-span-full">
						Size:
						{controls.size}
						<input type="range" bind:value={controls.size} min="100" max="800" step="25" />
					</label>
				</div>
			</div>
		</div>
	</div>

	<div class="grid md:grid-cols-[max-content_1fr] gap-x-8 gap-y-10 px-4 mb-12">
		<Highlight language="css" code={css} header="The Styles" />
		<div class="flex flex-col gap-2">
			<h2 class="text-xl font-bold">How does this work?</h2>
			<p>
				We just have a gradient background that is
				larger than the button.
			</p>
			<p>On hover, we transition the <code>background-position</code></p>
			<button
				class="w-50 h-50 rounded-lg relative mx-auto my-4"
				style="background-image: linear-gradient(to {controls.angle},
        {controls.colorList.map((item) => item.color).join(',\n\t')});"
				onmouseenter={() => (demo_styles = getHoverStyles())}
				onmouseleave={() => (demo_styles = getStyles())}
			>
				<div
					class="border px-4 py-2 w-fit rounded-lg absolute font-bold border-2"
					style="transition-property: left, top, translate; transition-duration: 1s; {demo_styles}; color: {controls.textColor};"
				>
					button
				</div>
			</button>
		</div>
	</div>
</section>

<style>
	h1 {
		width: 100%;
	}

	.brand-gradient {
		background-position: var(--position);
		transition-property: background-position, translate;
		transition-duration: 0.7s, 0.5s;
	}
	.brand-gradient:hover {
		translate: 0 -0.25rem;
		background-position: var(--position-hover);
	}
</style>
