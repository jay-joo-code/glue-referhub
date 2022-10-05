import { Container, Space } from "@mantine/core"
import RequestList from "components/give-referral/RequestList"
import Button from "components/glue/Button"
import Flex from "components/glue/Flex"
import PageContainer from "components/glue/PageContainer"
import SplitScreen from "components/glue/SplitScreen"
import useIsDevice from "hooks/glue/useIsDevice"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"

const GiveReferralsPage = () => {
  const { status } = useSession()
  const { isMobile } = useIsDevice()
  const router = useRouter()

  return (
    <PageContainer
      title="Give referrals"
      variant={status === "authenticated" ? "mobile-only" : "responsive"}
    >
      {status === "authenticated" ? (
        <RequestList />
      ) : (
        <Container>
          <Space my={isMobile ? "3rem" : "5rem"} />
          <SplitScreen
            title="Start giving referrals"
            paragraphs={[
              "Sign in with your company email to start receiving referral requests anonymously.",
              "Your name and email will only be shown to a requestor if you accept their referral request.",
            ]}
            buttons={[
              <Button
                key="get-started"
                size="md"
                onClick={() => {
                  router.push({
                    pathname: "/api/auth/signin",
                    query: {
                      callbackUrl: window.location.href,
                    },
                  })
                }}
              >
                Get started
              </Button>,
            ]}
            illustPath="/illust/give-referral.svg"
          />
        </Container>
      )}
    </PageContainer>
  )
}

export default GiveReferralsPage
