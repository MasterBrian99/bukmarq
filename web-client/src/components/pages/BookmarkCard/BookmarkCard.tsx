import {
    Card,
    Image,
    Text,
    Badge,
    Group,
    ActionIcon,

    Box,
    Flex,
} from '@mantine/core';
import {BsFillTrashFill} from "react-icons/bs";
import {AiTwotoneEdit} from "react-icons/ai";
import {LuExternalLink} from "react-icons/lu";

function BookmarkCard() {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder w={'340px'} m={'sm'}>
            <Card.Section>
                <Image
                    src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    height={160}
                    alt="Norway"
                />


            </Card.Section>

            <Group  mt="md" mb="xs">
                <Text weight={500}>Norway Fjord  asdasa ads sda LKSADla alsdkasdl</Text>
            </Group>

            <Text size="sm" color="dimmed" lineClamp={3}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias blanditiis est, excepturi fuga fugiat harum ipsam quia quibusdam unde. Alias amet dignissimos iure, officiis optio quia quibusdam quos vero.
            </Text>
            <Card.Section >
                <Group  mb="xs" mx={'lg'}>
                    <Box m={0}><Badge size={'xs'} color="pink" variant="light" mr={'xs'}>
                        #On Sale
                    </Badge>
                        <Badge  size={'xs'} color="pink" variant="light" mr={'xs'}>
                            #New
                        </Badge>
                        <Badge  size={'xs'} color="pink" variant="light" mr={'xs'}>
                            #Gamer
                        </Badge>
                        <Badge  size={'xs'} color="pink" variant="light" mr={'xs'}>
                            #lAMAS
                        </Badge></Box>
                </Group>
                <Box mx={'xs'} component={Flex} >
                    <Text size="xs" color="dimmed" underline={true} mx={'xs'}>Folder Name</Text>
                    <Text size="xs" color="dimmed" underline={true}  mx={'xs'}>https://mantine.dev/</Text>
                    <Text size="xs" color="dimmed" underline={true}  mx={'xs'}>22 May 2023</Text>

                </Box>
            </Card.Section>

            <Card.Section>
                <Group position={'right'} p={'sm'} align={'center'}>
                    <ActionIcon title="Open link in new tab" >
                        <LuExternalLink  size="1rem" />

                    </ActionIcon>
                    <ActionIcon  title="Edit">
                        <AiTwotoneEdit size="1rem" />
                    </ActionIcon>
                    <ActionIcon  title="Delete">
                        <BsFillTrashFill size="1rem" />
                    </ActionIcon>

                </Group>
            </Card.Section>
        </Card>
    );
}

export default BookmarkCard;