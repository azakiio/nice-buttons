export const colorMode = () => {
  let theme = $state('light');

  $effect(() => {
    theme = document.documentElement.dataset.theme || 'light';
  })

  const setTheme = (newTheme: string) => {
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    document.documentElement.dataset.theme = newTheme;
    theme = newTheme;
  };

  return {
    get theme() {
      return theme;
    },
    setTheme,
  };
};
