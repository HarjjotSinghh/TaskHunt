import "./App.css"
import { Anchor, Button, Flex } from "@mantine/core"

function IndexPage() {
    return (
        <>
            <Flex justify={"center"} gap={"lg"} align={"center"} miw={"100vw"}>
                <Anchor component="a" href="/register">
                    <Button size="lg" variant="filled">
                        Register
                    </Button>
                </Anchor>
                <Anchor component="a" href="/login">
                    <Button size="lg" variant="filled">
                        Login
                    </Button>
                </Anchor>
            </Flex>
        </>
    )
}

export default IndexPage
