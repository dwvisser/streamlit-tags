import React from "react"
import ReactDOM from "react-dom"
import CustomKeywords from "./keywords"

// Lots of import to define a Styletron engine and load the light theme of base ui
// @ts-ignore
import { Client as Styletron } from "styletron-engine-atomic"
import { Provider as StyletronProvider } from "styletron-react"
import { ThemeProvider, LightTheme } from "baseui"

const engine = new Styletron()

// Wrap your CustomSlider with the baseui them
ReactDOM.render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <ThemeProvider theme={LightTheme}>
        <CustomKeywords />
      </ThemeProvider>
    </StyletronProvider>
  </React.StrictMode>,
  document.getElementById("root")
)