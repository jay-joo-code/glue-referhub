import { useMantineTheme } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { NotificationsProvider } from "@mantine/notifications"
import AppDefaultHead from "components/glue/AppDefaultHead"
import AppShell from "components/glue/AppShell"
import MantineConfigProvider from "components/glue/MantineConfigProvider"
import SWRProvider from "components/glue/SWRProvider"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import ReactGA from "react-ga4"
import "react-loading-skeleton/dist/skeleton.css"
import { ThemeProvider } from "styled-components"
import * as amplitude from "@amplitude/analytics-browser"
import "styles/glue/reset.css"
import { GlueRouterTransition } from "components/glue/GlueRouterTransition"

const App = ({ Component, pageProps }: AppProps) => {
  // NOTE: uncomment to persist scroll position on route change
  // const router = useRouter()
  // useScrollRestoration(router)
  const theme = useMantineTheme()

  if (process.env.NEXT_PUBLIC_GA_ID) {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID)
  }

  if (process.env.NEXT_PUBLIC_AMPLITUDE_ID) {
    amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_ID)
  }

  return (
    <SessionProvider session={pageProps.session}>
      <MantineConfigProvider>
        <GlueRouterTransition />
        <ThemeProvider theme={theme}>
          <NotificationsProvider>
            <ModalsProvider>
              <SWRProvider>
                <AppShell>
                  <AppDefaultHead />
                  <Component {...pageProps} />
                </AppShell>
              </SWRProvider>
            </ModalsProvider>
          </NotificationsProvider>
        </ThemeProvider>
      </MantineConfigProvider>
    </SessionProvider>
  )
}

export default App
