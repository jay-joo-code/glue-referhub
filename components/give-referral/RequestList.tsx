import prisma from "lib/glue/prisma"
import { GetServerSideProps } from "next"
import React, { useState } from "react"
import useGlueQuery from "hooks/glue/useGlueQuery"
import { signOut, useSession } from "next-auth/react"
import SplitScreen from "components/glue/SplitScreen"
import {
  Badge,
  Container,
  Input,
  Space,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core"
import useIsDevice from "hooks/glue/useIsDevice"
import Link from "next/link"
import Button from "components/glue/Button"
import Flex from "components/glue/Flex"
import { useRouter } from "next/router"
import RegisterCompany from "./RegisterCompany"
import Image from "next/image"

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

  const company = companies[0]

  return (
    <Container>
      <Badge>Referring for</Badge>
      <Title>{company?.name}</Title>
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
