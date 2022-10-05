import { Space } from "@mantine/core"
import Button from "components/glue/Button"
import PageContainer from "components/glue/PageContainer"
import SplitScreen from "components/glue/SplitScreen"
import useIsDevice from "hooks/glue/useIsDevice"

const Index = () => {
  const { isMobile } = useIsDevice()

  return (
    <PageContainer title="Job referrals at Cornell" variant="responsive">
      <Space my={isMobile ? "3rem" : "5rem"} />
      <SplitScreen
        title="Job referrals, simplified"
        paragraphs={[
          "ReferHub is matches students looking for job referrals with alums who are actively looking to give referrals 🙌",
          "Sign up for early access to try out ReferHub to get job referrals November 2022",
        ]}
        buttons={[
          <a
            key="request-early-access"
            href="https://tinyurl.com/referhub-student-early"
            target="_blank"
            rel="noreferrer"
          >
            <Button size="md">Request early access</Button>
          </a>,
        ]}
        illustPath="/illust/landing.svg"
      />
    </PageContainer>
  )
}

export default Index
