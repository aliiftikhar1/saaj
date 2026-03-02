import type { Preview } from "@storybook/nextjs-vite";
import "../.storybook/storybook.css";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        light: {
          name: "light",
          value: "#ffffff",
        },

        dark: {
          name: "dark",
          value: "#333333",
        },

        gray: {
          name: "gray",
          value: "#f5f5f5",
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },

  initialGlobals: {
    backgrounds: {
      value: "light",
    },
  },
};

export default preview;
