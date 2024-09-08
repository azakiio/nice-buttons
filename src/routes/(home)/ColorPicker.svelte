<script lang="ts">
	interface Props {
		colorList: Color[];
		pattern: number[][];
	}

	import { buttonColors, getColor, getPattern, type Color } from '$lib/colors';
	let { colorList = $bindable(), pattern = $bindable() }: Props = $props();
	let currentDrag = $state(-1);

	$effect(() => {
		pattern = getPattern(colorList);
	});
</script>

<div>
	<div class="font-bold mb-1">Colors:</div>
	<div
		class="grid grid-flow-col grid-cols-12 z-99 shadow-xl border-2 border-base-content rounded-lg overflow-hidden w-full mb-2"
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
								colorList[currentDrag] = { hueIndex, toneIndex, color };
							}
						}}
						ondragover={(e) => {
							e.preventDefault();
						}}
						ondrop={(e) => {
							console.log('dropped');
						}}
						onclick={() => {
							if (colorList.length === 4) {
								colorList = getColor(hueIndex, toneIndex, pattern, buttonColors);
							} else {
								colorList.push({ hueIndex, toneIndex, color });
							}
						}}
						class="draggable w-full aspect-square ring-white hover:scale-110 hover:ring-2 hover:z-100 group relative text-white"
						class:ring-2={colorList.some((item) => item.color === color)}
						class:z-99={colorList.some((item) => item.color === color)}
						class:hover:cursor-grab={colorList.some((item) => item.color === color)}
						style="background-color: {color}"
					>
						<!-- <div
          class="opacity-0 group-hover:opacity75 absolute bg-black/20 w-full h-full z-10 inset-0 grid place-items-center pointer-events-none"
					>
          {step + 1}
					</div> -->
						{#if colorList.some((item) => item.color === color)}
							{colorList.findIndex((item) => item.color === color) + 1}
						{/if}
					</button>
				{/each}
			</div>
		{/each}
	</div>

	<p>
		Choose a <b>starting color</b> above and a <b>pattern</b> below.
		<br /> You can also <b>drag</b> the numbers to make your own pattern.
	</p>
</div>
<!-- 
      <button onclick={() => navigator.clipboard.writeText(JSON.stringify(pattern))}>
        {JSON.stringify(pattern)}
</button> -->
