<script lang="ts">
	import { colorMode } from '$lib/colorMode.svelte';
	import { getColor } from '$lib/colors';
	import Highlight from '$lib/Highlight.svelte';
	import Icon from '@iconify/svelte';
	import { wcagContrast } from 'culori';
	import { isEqual } from 'radash';
	import ColorPicker from './ColorPicker.svelte';
	import { cssString, directions, durations, patterns, sizes, type Controls } from './constants';

	let controls = $state<Controls>({
		textColor: '#fff',
		angle: 'bottom right',
		size: 3,
		colorList: getColor(2, 2, patterns[0].pattern),
		pattern: patterns[0].pattern,
		position: '0% 0%',
		positionHover: '100% 100%',
		duration: 1
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
    background-size: ${controls.size * 100}% ${controls.size * 100}%;
    --position: ${controls.position};
    --position-hover: ${controls.positionHover};
    --duration: ${controls.duration}s;`;

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
	const title = 'Nice Buttons';
	const tagline = 'Generate beautiful gradient hover effects';
	const image = '/meta.png';

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

	const button_width = 80;
	const demoButtonStyles = $derived.by(() => {
		let returnString = '';
		returnString += `background-image: linear-gradient(to ${controls.angle}, 
    ${controls.colorList.map((item) => item.color).join(',\n\t')});`;

		returnString += `width: ${button_width * controls.size}px;`;
		returnString += `height: ${(button_width * controls.size) / 2}px;`;
		returnString += `transition: width 0.5s, height 0.5s;`;

		return returnString;
	});
	let demo_styles = $state(getStyles());

	const calcContrast = () => {
		let avgContrast = 0;
		controls.colorList.forEach((color) => {
			if (color.color) {
				avgContrast += wcagContrast(color.color, controls.textColor);
			}
		});
		return avgContrast / controls.colorList.length;
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={tagline} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://www.nicebuttons.com/" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={tagline} />
	<meta property="og:image" content={image} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://www.nicebuttons.com/" />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={tagline} />
	<meta property="twitter:image" content={image} />
</svelte:head>

<section class="grid my-14">
	<hgroup class="col-span-full mb-8 text-center">
		<h1
			class="font-extrabold bg-clip-text text-transparent uppercase tracking-wider"
			style="background-image: linear-gradient(to right, {controls.colorList
				.map((item) => item.color)
				.join(',')});">
			{title}
		</h1>
		<p class="text-lg text-base-content/70">{tagline}</p>
	</hgroup>

	<div class="grid md:grid-cols-2">
		<div
			class="grid md:sticky md:top-40 my-12 md:my-24 self-start place-items-center relative gap-4">
			<div
				class="absolute top-0 flex items-center gap-2"
				style="translate: 0 {isCopied ? -200 : 0}%; opacity: {isCopied
					? 1
					: 0}; transition-property: translate, opacity; transition-duration: 0.3s;">
				<Icon icon="carbon:copy" class="w-6 h-6" />
				Copied!
			</div>
			<!-- <div>
				{calcContrast()}
			</div> -->
			<button
				onclick={copyToClipboard}
				class="grid px-4 rounded-lg brand-gradient py-3 shadow-lg relative justify-self-center plausible-event-name=Styles+Copied"
				style={`${generateStyleString()}`}>
				<div
					class="text-lg font-bold leading-normal"
					style="text-transform: {isUppercase ? 'uppercase' : 'none'};">
					{textContent}
				</div>
				<div style="color: oklch(from {controls.textColor} l c h / 0.7)">{subTextContent}</div>
			</button>
			<button
				class="btn bg-base-2 w-14 h-14 p-3 rounded-full"
				onclick={() => themeManager.setTheme(themeManager.theme === 'light' ? 'dark' : 'light')}>
				<Icon
					icon={themeManager.theme === 'light' ? 'carbon:asleep' : 'carbon:awake'}
					class="w-full h-full" />
			</button>
		</div>

		<div class="grid gap-4">
			<label>
				<div class="font-bold mb-1">Text:</div>
				<div class="grid grid-flow-col gap-2">
					<input type="text" class="input" bind:value={textContent} />
					<button class="btn bg-base-2 p-1 rounded-full w-10 h-10">
						<Icon
							icon="material-symbols:uppercase"
							onclick={() => (isUppercase = !isUppercase)}
							class="w-full h-full" />
					</button>
				</div>
			</label>
			<label>
				<div class="font-bold mb-1">Subtext:</div>
				<input type="text" class="input" bind:value={subTextContent} />
			</label>

			<ColorPicker bind:colorList={controls.colorList} bind:pattern={controls.pattern} />

			<div class="grid sm:grid-cols-2 gap-4 mb-20">
				<div>
					<div class="font-bold mb-2">Patterns:</div>
					<div class="flex flex-wrap gap-2 items-start">
						{#each patterns as pattern}
							<button
								class="btn bg-base-2 w-14 h-14 p-3 rounded-full"
								class:bg-primary-4={isEqual(controls.pattern.flat(), pattern.pattern.flat())}
								class:text-primary-content={isEqual(
									controls.pattern.flat(),
									pattern.pattern.flat()
								)}
								onclick={() => {
									controls.pattern = pattern.pattern;
									controls.colorList = getColor(
										controls.colorList[0].hueIndex,
										controls.colorList[0].toneIndex,
										pattern.pattern
									);
								}}>
								<Icon icon={pattern.icon} class="w-full h-full" />
							</button>
						{/each}
					</div>
				</div>
				<div class="grid grid-cols-3 place-items-center w-fit gap-2">
					<div class="font-bold col-span-full justify-self-start mb-2">Direction:</div>
					{#each directions as direction}
						{#if direction.name === 'reset'}
							<div></div>
						{:else}
							<button
								class="btn bg-base-2 w-14 h-14 p-3 rounded-full"
								class:bg-primary-4={controls.angle === direction.name}
								class:text-primary-content={controls.angle === direction.name}
								onclick={() => {
									controls.angle = direction.name;
									controls.position = `${direction.positions[0] * 100}% ${direction.positions[1] * 100}% `;
									controls.positionHover = `${direction.positions[2] * 100}% ${direction.positions[3] * 100}% `;
								}}><Icon icon={direction.icon} class="w-full h-full" /></button>
						{/if}
					{/each}
				</div>

				<div class="grid gap-2 col-span-full">
					<div class="font-bold mb-2">Speed:</div>
					<div class="flex gap-2">
						{#each durations as { icon, value }}
							<button
								class="btn bg-base-2 w-14 h-14 p-3 rounded-full"
								class:bg-primary-4={controls.duration === value}
								class:text-primary-content={controls.duration === value}
								onclick={() => (controls.duration = value)}>
								<Icon {icon} class="w-full h-full" />
							</button>
						{/each}
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-2 mb-8">
				<h2 class="text-xl font-bold">How does this work?</h2>
				<p>
					We simply have a gradient background that is larger than the button. On hover, we
					transition the <code>background-position</code>.
				</p>
				<div class="mx-auto my-4 grid gap-4">
					<p>
						Try playing around with the relative
						<code>background-size</code> and see how it affects the button.
					</p>
					<div class="flex gap-2 justify-center">
						{#each sizes as { name, value }}
							<button
								class="btn bg-base-2"
								class:bg-primary-4={controls.size === value}
								class:text-primary-content={controls.size === value}
								onclick={() => {
									controls.size = value;
								}}>
								{name}
							</button>
						{/each}
					</div>
					<button
						class="rounded-lg relative mx-auto"
						style={demoButtonStyles}
						onmouseenter={() => (demo_styles = getHoverStyles())}
						onmouseleave={() => (demo_styles = getStyles())}>
						<div
							class="border w-20 rounded-lg absolute font-bold border-2 grid items-center"
							style="transition-property: left, top, translate; transition-duration: 1s; {demo_styles}; color: {controls.textColor};
          width: {button_width}px; height: {button_width / 2}px;">
							button
						</div>
					</button>
				</div>
				<p>
					Notice how setting the size to <b>1x</b> makes the gradient fill the button. <br />
					In this case there's no space to transition anything.
				</p>
				<p>
					Depending on the gradient angle, we sometimes need to adjust the initial and final <code
						>background-position</code>
				</p>
			</div>

			<Highlight language="css" code={css} header="The Styles" />
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
		transition-duration: var(--duration), 0.5s;
	}
	.brand-gradient:hover {
		translate: 0 -0.25rem;
		background-position: var(--position-hover);
	}
</style>
