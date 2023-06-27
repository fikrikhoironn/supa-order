import {Text, Card, Center} from "@chakra-ui/react";

interface Notification {
    orderId: number;
    notificationTitle: string;
}

export default function NotificationCard(props: Notification) {
    const {orderId, notificationTitle} = props;

    return (
        <Card
            minH="4rem"
            minW="24rem"
            margin="0.5rem"
            justifyContent="center"
            _hover={{
                background: 'white',
                color: 'teal.500',
            }}>
            <Center>
                    <Text fontSize="1rem" fontWeight="black" textAlign="center" mr="1">Order id: {orderId} for</Text>
                    <Text fontSize="1rem" fontWeight="400" textAlign="center">{notificationTitle}</Text>
            </Center>
        </Card>
    );
}
