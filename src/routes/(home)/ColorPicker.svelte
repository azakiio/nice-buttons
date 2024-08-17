<script lang="ts">
	interface Color {
		colorList: string[];
		range?: { start?: number; end?: number };
	}

	import { buttonColors, getColor } from '$lib/colors';
	let { colorList = $bindable() }: Color = $props();
	let usePattern = $state(false);
	let step = $state(0);
	let currentDrag = $state(-1);

	$effect(() => {
		console.log(colorList, step);
	});

	let pattern = [
		[3, 3],
		[1, 0],
		[-3, -3]
	];
	let pattern2 = [
		[0, 1],
		[3, 0],
		[0, -1]
	];

	// function makePatternDraggable() {
	// 	const spans = document.querySelectorAll('.draggable');

	// 	spans.forEach((span) => {
	// 		span.addEventListener('dragstart', (e) => {
	// 			console.log('dragstart');
	// 			e.target.id;
	// 			e.dataTransfer.setData('text/plain', e.target.innerText);
	// 		});

	// 		span.addEventListener('dragenter', (e) => {
	// 			console.log(e.target.id);
	// 			e.target.style.backgroundColor = 'black';
	// 		});

	// 		span.addEventListener('drop', (e) => {
	// 			e.preventDefault();
	// 			console.log('dropped');

	// 			console.log(e.dataTransfer.getData('text/plain'));
	// 		});
	// 	});
	// }
	// $effect(() => {
	// 	makePatternDraggable();
	// });
</script>

<div
	class="grid grid-flow-col z-99 shadow-xl border-2 border-base-content rounded-lg overflow-hidden w-fit"
>
	{#each buttonColors as hues, hueIndex}
		<div class="flex flex-col">
			{#each hues as color, toneIndex}
				<button
					id={`${hueIndex} + ${toneIndex}`}
					draggable="true"
					ondragstart={(e) => {
						if (!e.currentTarget.innerText) {
							e.preventDefault();
						} else {
							currentDrag = Number(e.currentTarget.innerText) - 1;
						}
					}}
					ondragenter={(e) => {
						if (currentDrag !== -1) {
							colorList[currentDrag] = color;
						}
					}}
					ondragover={(e) => {
						e.preventDefault();
					}}
					ondrop={(e) => {
						console.log('dropped');
					}}
					onclick={() => {
						if (usePattern) {
							colorList = getColor(hueIndex, toneIndex, pattern2, buttonColors);
						} else {
							colorList[step] = color;
							step = (step + 1) % 4;
						}
					}}
					class="draggable w-8 h-8 ring-white hover:scale-110 hover:ring-2 hover:z-100 group relative"
					class:ring-2={colorList.includes(color)}
					class:z-99={colorList.includes(color)}
					class:hover:cursor-grab={colorList.includes(color)}
					style="background-color: {color}"
				>
					<!-- <div
						class="opacity-0 group-hover:opacity75 absolute bg-black/20 w-full h-full z-10 inset-0 grid place-items-center pointer-events-none"
					>
						{step + 1}
					</div> -->
					{#if colorList.includes(color)}
						{colorList.indexOf(color) + 1}
					{/if}
				</button>
			{/each}
		</div>
	{/each}
</div>
