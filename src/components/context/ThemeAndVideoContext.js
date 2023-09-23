import React from 'react'

const ThemeAndVideoContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
})

export default ThemeAndVideoContext
