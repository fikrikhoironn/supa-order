import { extendTheme } from "@chakra-ui/react";
import {  DM_Sans } from 'next/font/google'

const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["400", "700"] });

const theme = extendTheme({
    fonts: {
        heading: dm_sans.style.fontFamily,
        body: dm_sans.style.fontFamily,
    },
    colors: {
        biru: {
            50: "#E2F4F6",
            100: "#B6E4EA",
            200: "#89D1DD",
            300: "#64BFD2",
            400: "#4CB2CC",
            500: "#39A5C6",
            600: "#3098BA",
            700: "#2686A8",
            800: "#237495",
            900: "#144457",
        },
        netral: {
            50: "#FAFAFA",
            100: "#F5F5F5",
            200: "#EEEEEE",
            300: "#E0E0E0",
            400: "#BDBDBD",
            500: "#9E9E9E",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
        }
    },
    components: {
        Container: {
            baseStyle: {
                maxW: "container.xl",
            },
        },
        Button: {
            variants: {
                primary: {
                    color: "white",
                    backgroundColor: "biru.800",
                    borderRadius: "24px",
                    px: "24px",
                    _hover: {
                        backgroundColor: "biru.900",
                        _disabled: {
                            backgroundColor: "gray.400",
                        },
                    },
                    _disabled: {
                        backgroundColor: "gray.400",
                        color: "gray.700",
                    },
                },
                angry: {
                    color: "white",
                    backgroundColor: "red.500",
                    borderRadius: "24px",
                    px: "24px",
                    _hover: {
                        backgroundColor: "red.600",
                        color: "gray.100"
                    }
                },
                secondary: {
                    color: "biru.800",
                    backgroundColor: "white",
                    borderRadius: "24px",
                    px: "24px",
                    borderColor: "biru.800",
                    border: "1px",
                    _hover: {
                        borderColor: "biru.900",
                        color: "biru.900",
                        backgroundColor: "biru.50",
                    }
                },
                text: {
                    px: "24px",
                },
            },
        },
    },
});

export default theme;
