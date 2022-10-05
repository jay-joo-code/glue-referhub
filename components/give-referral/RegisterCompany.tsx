import {
  Container,
  Space,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core"
import Button from "components/glue/Button"
import Flex from "components/glue/Flex"
import useIsDevice from "hooks/glue/useIsDevice"
import api from "lib/glue/api"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { KeyedMutator } from "swr"

interface IRegisterCompanyProps {
  refetch: KeyedMutator<any>
}

const RegisterCompany = ({ refetch }: IRegisterCompanyProps) => {
  const { data } = useSession()
  const { isMobile } = useIsDevice()
  const theme = useMantineTheme()
  const [companyName, setCompanyName] = useState<string>("")
  const router = useRouter()

  const handleRegister = async () => {
    await api.post("/glue/company", {
      name: companyName,
      domain: data?.user?.email?.split("@")[1],
    })
    refetch()
  }

  return (
    <Container
      sx={(theme) => ({
        maxWidth: "500px",
      })}
    >
      <Space my={isMobile ? "3rem" : "5rem"} />
      <Title
        mb="md"
        sx={(theme) => ({
          fontSize: "3rem",
        })}
      >
        Register your company
      </Title>
      <Space my="2rem" />
      <TextInput
        label="Company name"
        value={companyName}
        onChange={(event) => setCompanyName(event?.target?.value)}
      />
      <Space my="2rem" />
      <Text size="md" color={theme.colors.text[2]} mb="sm" align="center">
        Please make sure{" "}
        <Text color="brand" component="span" weight={500}>
          {data?.user?.email}
        </Text>{" "}
        is your{" "}
        <Text color="brand" component="span" weight={500}>
          company email
        </Text>
      </Text>
      <Space my="3rem" />
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
          <Button
            color="button-gray"
            variant="light"
            fullWidth={true}
            onClick={() => {
              router.push({
                pathname: "/api/auth/signin",
                query: {
                  callbackUrl: window.location.href,
                },
              })
            }}
          >
            Sign in with a different email
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}

export default RegisterCompany
