export const colorMode = () => {
	let theme = $state('dark');

	const setTheme = (newTheme: string) => {
		document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
		document.documentElement.dataset.theme = newTheme;
		theme = newTheme;
	};

	return {
		get theme() {
			return theme;
		},
		setTheme
	};
};
