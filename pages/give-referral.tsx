import RequestList from "components/give-referral/RequestList"
import Flex from "components/glue/Flex"
import GlueSplitScreen from "components/glue/SplitScreen"
import PageContainer from "components/glue/PageContainer"
import { useSession } from "next-auth/react"
import React from "react"
import Button from "components/glue/Button"
import Link from "next/link"

const GiveReferralPage = () => {
  const { status } = useSession()

  if (status === "authenticated") {
    return <RequestList />
  }

  return (
    <PageContainer variant="mobile-only">
      <GlueSplitScreen
        title="Start giving referrals"
        paragraphs={[
          "Sign in with your company email to start receiving referral requests anonymously.",
          "Your name and email will only be shown to a requestor if you accept their referral request.",
        ]}
        buttons={
          <Flex>
            <Link href="/api/auth/signin">
              <Button size="md">Get started</Button>
            </Link>
          </Flex>
        }
      />
    </PageContainer>
  )
}

export default GiveReferralPage
