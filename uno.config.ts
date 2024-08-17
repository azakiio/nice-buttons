// uno.config.ts
import { defineConfig, presetUno, presetWebFonts, transformerDirectives } from 'unocss';
import extractorSvelte from '@unocss/extractor-svelte';

export default defineConfig({
	presets: [
		presetUno(),
		presetWebFonts({
			provider: 'fontshare',
			fonts: {
				header: 'Poppins',
				// sans: {
				//   name: "Montserrat",
				//   provider: "google",
				//   weights: ["400", "500", "600", "700"],
				// },
				serif: 'Sentient',
				mono: ['Fira Code', 'Fira Mono:400,700']
			}
		})
	],
	extractors: [extractorSvelte()],
	transformers: [transformerDirectives()],
	variants: [
		(input) => {
			const match = input.match(/^not-print:(.*)$/);
			return match ? { matcher: match[1], parent: '@media not print' } : input;
		}
	],
	theme: {
		colors: {
			primary: {
				0: 'oklch(from var(--p0) l c h / <alpha-value>)',
				1: 'oklch(from var(--p1) l c h / <alpha-value>)',
				2: 'oklch(from var(--p2) l c h / <alpha-value>)',
				3: 'oklch(from var(--p3) l c h / <alpha-value>)',
				4: 'oklch(from var(--p4) l c h / <alpha-value>)',
				5: 'oklch(from var(--p5) l c h / <alpha-value>)',
				6: 'oklch(from var(--p6) l c h / <alpha-value>)',
				7: 'oklch(from var(--p7) l c h / <alpha-value>)',
				8: 'oklch(from var(--p8) l c h / <alpha-value>)',
				9: 'oklch(from var(--p9) l c h / <alpha-value>)',
				content: 'oklch(from var(--p0) l c h / <alpha-value>)'
			},
			base: {
				0: 'oklch(from var(--b0) l c h / <alpha-value>)',
				1: 'oklch(from var(--b1) l c h / <alpha-value>)',
				2: 'oklch(from var(--b2) l c h / <alpha-value>)',
				3: 'oklch(from var(--b3) l c h / <alpha-value>)',
				4: 'oklch(from var(--b4) l c h / <alpha-value>)',
				5: 'oklch(from var(--b5) l c h / <alpha-value>)',
				6: 'oklch(from var(--b6) l c h / <alpha-value>)',
				7: 'oklch(from var(--b7) l c h / <alpha-value>)',
				8: 'oklch(from var(--b8) l c h / <alpha-value>)',
				9: 'oklch(from var(--b9) l c h / <alpha-value>)',
				content: 'oklch(from var(--b9) l c h / <alpha-value>)'
			}
		}
	},
	shortcuts: [
		{
			layout: 'grid px-4 py-12 max-w-4xl mx-auto',
			btn: 'flex gap-2 items-center py-2 px-4 font-medium rounded-lg whitespace-nowrap transition-property-transform duration-[0.3s] hover:-translate-y-1 justify-center disabled:opacity-50 will-change-transform cursor-pointer active:scale-95',
			input:
				'flex w-full rounded-md border-2 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:ring-3 focus:ring-primary-4/10 disabled:opacity-50 bg-transparent',
			'card-shadow': 'shadow-primary/15 shadow-[-0.5em_0.5em_0.2em]'
		},
		[/^variant-(.*)$/, ([, c]) => `bg-${c} text-${c}-content `]
	]
});
