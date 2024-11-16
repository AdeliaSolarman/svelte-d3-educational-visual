import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				GeistMono: ['GeistMono', 'monospace']
			}
		}
	},

	plugins: [typography]
} satisfies Config;
