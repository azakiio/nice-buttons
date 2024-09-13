import type { Handle } from "@sveltejs/kit";

// hooks.server.js
export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event, {
    transformPageChunk: ({ html }) => {
      // This section will modify the HTML 
      // before being returned to the client
      let currentTheme = event.cookies.get("theme");

      // Make sure the cookie was found, if not, set it to dark
      if (!currentTheme) {
        currentTheme = "light";
        event.cookies.set("theme", currentTheme, { path: '/', maxAge: 31536000 });
      }

      return html.replace(`data-theme=""`, `data-theme="${currentTheme}"`);
    }
  });

  return response;
}