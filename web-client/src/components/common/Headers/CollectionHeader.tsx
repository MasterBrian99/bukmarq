import {ActionIcon, Box, Flex, Group, rem, TextInput, Title, Tooltip, useMantineTheme} from "@mantine/core";

import {IoAdd} from "react-icons/io5";
import CollectionMenu from "@/components/common/Headers/CollectionMenu.tsx";

const CollectionHeader = () => {
    const theme = useMantineTheme();
    return (
        <Box
            mb={300}
            style={{
                position: "fixed",
                width: "calc(100% - 260px)",
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[8]
                        : theme.white,
                borderBottom: `${rem(1)} solid ${
                    theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
                }`,
            }}

        >
            <Flex direction={'column'} p={'lg'}>
                <Flex align={'center'}  justify={'space-between'}>
                    <Box>
                        <Group>
                            <Title order={3}>CollectionHeader</Title>
                        </Group>

                    </Box>
                    <Group>
                        <TextInput
                            placeholder="Search"
                            size={'sm'}
                        />
                        <Tooltip label={'Add new item to collection'}>
                            <ActionIcon size={'lg'} variant="default" radius={'md'}>
                                <IoAdd size="1.5rem" />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label={'More'}>
                            <CollectionMenu/>

                        </Tooltip>

                    </Group>
                </Flex>

            </Flex>
        </Box>
    )

};

export default CollectionHeader;
