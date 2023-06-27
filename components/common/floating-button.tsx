import {Box, Button} from "@chakra-ui/react";
import Link from "next/link";


interface Props {
    text?: string;
    url: string;
}
export default function FloatingButton(props: Props) {
    const {text, url} = props;
    return (
        <Box
            position="fixed"
            bottom={4}
            right={16}
            zIndex={999}
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="14rem"
            height="48px"
            borderRadius="2xl"
            boxShadow="lg"
            bg="teal.500"
            color="white"
            cursor="pointer"
            transition="all 0.3s ease"
            _hover={{
                transform: 'scale(1.1)',
                boxShadow: 'xl',
            }}
        >
            <Button
                variant="unstyled"
                size="md"
                aria-label="Scroll to top"
            >
                <Link href={url}>
                    {text}
                </Link>
            </Button>
        </Box>
        )
}