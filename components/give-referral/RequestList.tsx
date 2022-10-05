import { Badge, Container, Space, Text, Title } from "@mantine/core"
import Flex from "components/glue/Flex"
import useGlueQuery from "hooks/glue/useGlueQuery"
import { useSession } from "next-auth/react"
import Image from "next/image"
import RegisterCompany from "./RegisterCompany"

const RequestList = () => {
  const { data: sessionData } = useSession()

  const { data: companies, refetch } = useGlueQuery({
    url: "/glue/company",
    args: {
      where: {
        domain: sessionData?.user?.email?.split("@")[1],
      },
    },
  })

  if (companies?.length === 0) {
    return <RegisterCompany refetch={refetch} />
  }

  const company = companies && companies[0]

  return (
    <Container>
      <Badge>{company?.name}</Badge>
      <Title>Referral requests</Title>
      <Space my="6rem" />
      <Flex direction="column" align="center">
        <Image
          src="/illust/no-requests.svg"
          width={200}
          height={200}
          alt="Referral request empty state illustration"
        />
        <Space mb=".3rem" />
        <Text>There are no referral requests yet!</Text>
      </Flex>
    </Container>
  )
}

export default RequestList
