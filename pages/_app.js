import '../styles/globals.css'
import { css } from '@emotion/css'
import 'easymde/dist/easymde.min.css'
import PageProvider from "../src/PageProvider";
import { GlobalStyles } from "@mui/material";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {

  return (
    <div>
      <div className={container}>
        <ThemeProvider>
          <PageProvider>
            <GlobalStyles
                styles={css`
                  :root {
                    body {
                      background-color: #fff;
                      color: #121212;
                    }
                  }
    [data-theme="dark"] {
                    body {
                      background-color: #121212;
                      color: #fff;
                    }
                  }
                `}
              />
              <Component {...pageProps} />
          </PageProvider>
        </ThemeProvider>
      </div>
    </div>
  )
}

const container = css`
  padding: 40px;
`

export default MyApp