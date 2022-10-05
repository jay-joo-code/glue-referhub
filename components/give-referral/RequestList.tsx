import prisma from "lib/glue/prisma"
import { GetServerSideProps } from "next"
import React, { useState } from "react"
import useGlueQuery from "hooks/glue/useGlueQuery"
import { signOut, useSession } from "next-auth/react"
import SplitScreen from "components/glue/SplitScreen"
import {
  Container,
  Input,
  Space,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core"
import useIsDevice from "hooks/glue/useIsDevice"
import Link from "next/link"
import Button from "components/glue/Button"
import Flex from "components/glue/Flex"
import { useRouter } from "next/router"

const RequestList = () => {
  const { data } = useSession()
  const { isMobile } = useIsDevice()
  const theme = useMantineTheme()
  const [companyName, setCompanyName] = useState<string>("")
  const router = useRouter()
  console.log("router", router)

  console.log("data", data)
  const {} = useGlueQuery({})
  // TODO: get company list by user domain
  // if company domain not in DB,
  // enter

  const handleRegister = () => {}
  return (
    <Container
      sx={(theme) => ({
        maxWidth: "500px",
      })}
    >
      <Space my={isMobile ? "3rem" : "5rem"} />
      <Title
        mb="lg"
        sx={(theme) => ({
          fontSize: "3rem",
        })}
      >
        Register your company
      </Title>
      <Text size="md" color={theme.colors.text[2]} mb="sm">
        Please make sure{" "}
        <Text color="brand" component="span" weight={500}>
          {data?.user?.email}
        </Text>{" "}
        is your{" "}
        <Text color="brand" component="span" weight={500}>
          company email
        </Text>
      </Text>
      <Space my="2rem" />
      <Input
        value={companyName}
        onChange={(event) => setCompanyName(event?.target?.value)}
      />
      <Space my="2rem" />
      <Flex justify="center">
        <Flex
          direction="column"
          align="center"
          sx={(theme) => ({
            width: "260px",
          })}
        >
          <Button fullWidth={true} onClick={handleRegister}>
            Register company
          </Button>
          <Link href="/api/auth/signin">
            <Button
              color="button-gray"
              variant="light"
              fullWidth={true}
              // onClick={() => {
              //   router.push(
              //     `/api/auth/signin?callbackUrl=${window.location.origin}/give-referrals`
              //   )
              //   signOut()
              // }}
            >
              Sign in with a different email
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  )
}

export default RequestList
