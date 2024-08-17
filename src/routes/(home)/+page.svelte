<script>
	import { colorMode } from '$lib/colorMode.svelte';
	import Icon from '@iconify/svelte';
	import ColorPicker from './ColorPicker.svelte';

	let controls = $state({
		textColor: 'white',
		angle: 'bottom right',
		size: 400,
		colorList: [],
		position: '0% 0%',
		positionHover: '100% 100%'
	});

	let textContent = $state('Book a Consultation');
	let subTextContent = $state('no credit card required');
	let isUppercase = $state(true);

	const cssString = `
.brand-gradient {
  background-image: linear-gradient(
    135deg,
    oklch(var(--s)),
    oklch(var(--p)),
    oklch(var(--a)),
    rgb(251 146 60)
  );
  color: oklch(var(--pc));
  background-size: 400% 400%;
  background-position: 0% 0%;
  transition: background-position 1s, transform 0.5s;

  &:hover {
    background-position: 100% 100%;
  }
}`;

	const themeManager = colorMode();

	const directions = [
		{
			name: 'top left',
			positions: [1, 1, 0, 0],
			icon: 'carbon:arrow-up-left'
		},
		{
			name: 'top',
			positions: [1, 1, 0, 0],
			icon: 'carbon:arrow-up'
		},
		{
			name: 'top right',
			positions: [0, 1, 1, 0],
			icon: 'carbon:arrow-up-right'
		},
		{
			name: 'left',
			positions: [1, 1, 0, 0],
			icon: 'carbon:arrow-left'
		},
		{
			name: 'reset',
			positions: [0, 0, 1, 1],
			icon: 'carbon:dot'
		},
		{
			name: 'right',
			positions: [0, 0, 1, 1],
			icon: 'carbon:arrow-right'
		},
		{
			name: 'bottom left',
			positions: [1, 0, 0, 1],
			icon: 'carbon:arrow-down-left'
		},
		{
			name: 'bottom',
			positions: [0, 0, 1, 1],
			icon: 'carbon:arrow-down'
		},
		{
			name: 'bottom right',
			positions: [0, 0, 1, 1],
			icon: 'carbon:arrow-down-right'
		}
	];

	const generateStyleString = () => {
		const styleString = `background-image: linear-gradient(
			to ${controls.angle},
      ${controls.colorList.join(',')}
		);
		color: ${controls.textColor};
    background-size: ${controls.size}% ${controls.size}%;
    --position: ${controls.position};
    --position-hover: ${controls.positionHover};
    `;

		return styleString;
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="grid md:grid-cols-2">
	<h1 class="col-span-full">sexy cta</h1>

	<button
		class="btn brand-gradient flex-col gap-0 py-3 shadow-lg place-self-center"
		style={`${generateStyleString()}`}
	>
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
			<div class="font-bold">Text:</div>
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
			<div class="font-bold">Subtext:</div>
			<input type="text" class="input" bind:value={subTextContent} />
		</label>

		<ColorPicker bind:colorList={controls.colorList} />

		<div class="grid grid-cols-3 place-items-center w-fit gap-2">
			{#each directions as direction}
				{#if direction.name === 'reset'}
					<button
						class="btn bg-base-2 w-14 h-14 p-3 rounded-full"
						onclick={() => themeManager.setTheme(themeManager.theme === 'light' ? 'dark' : 'light')}
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
		</div>

		<label>
			Size:
			{controls.size}
			<input type="range" bind:value={controls.size} min="100" max="800" step="25" />
		</label>
	</div>

	<pre>
    {cssString}
  </pre>
</section>

<style>
	h1 {
		width: 100%;
	}

	.brand-gradient {
		background-position: var(--position);
		transition:
			background-position 0.7s,
			transform 0.5s;
	}
	.brand-gradient:hover {
		background-position: var(--position-hover);
	}
</style>
