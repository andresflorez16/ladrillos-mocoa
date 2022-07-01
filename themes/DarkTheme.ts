import { createTheme } from "@nextui-org/react"

export const darkTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      primaryWhite: '#fff'
    } // override dark theme colors
  }
});
