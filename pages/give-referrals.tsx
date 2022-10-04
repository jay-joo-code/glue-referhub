import RequestList from "components/give-referral/RequestList"
import Flex from "components/glue/Flex"
import SplitScreen from "components/glue/SplitScreen"
import PageContainer from "components/glue/PageContainer"
import { useSession } from "next-auth/react"
import React from "react"
import Button from "components/glue/Button"
import Link from "next/link"
import Image from "next/image"
import { Space } from "@mantine/core"
import GlueResponsiveRender from "components/glue/GlueResponsiveRender"
import useIsMobile from "hooks/glue/isMobile"

const GiveReferralsPage = () => {
  const { status } = useSession()
  const isMobile = useIsMobile()

  if (status === "authenticated") {
    return <RequestList />
  }

  return (
    <PageContainer variant="responsive">
      <Space my={isMobile ? "3rem" : "5rem"} />
      <SplitScreen
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
        illust={
          <Image
            src="/illust/professors.svg"
            alt="professor illustration"
            width={340}
            height={340}
          />
        }
      />
    </PageContainer>
  )
}

export default GiveReferralsPage
