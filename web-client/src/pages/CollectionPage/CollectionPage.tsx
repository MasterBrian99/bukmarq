import CollectionHeader from "@/components/common/Headers/CollectionHeader";
import {Box, Flex} from "@mantine/core";
import BookmarkCard from "@/components/pages/BookmarkCard/BookmarkCard.tsx";

const CollectionPage = () => (
    <Box style={{
        position: "relative",
        height: "200vh",
        marginLeft: '260px',

    }}>
        <Box>
            <CollectionHeader/>
            <Box style={{
                paddingTop: '80px'
            }}>
                {/*<Box>*/}
                {/*    <BookmarkCard {...props}/>*/}
                {/*</Box>*/}
                <Box>
                    <Flex wrap={'wrap'} justify={'space-around'}>
                        <BookmarkCard />
                        <BookmarkCard />
                        <BookmarkCard />
                        <BookmarkCard />
                        <BookmarkCard />
                        <BookmarkCard />
                        <BookmarkCard />
                    </Flex>
                </Box>
            </Box>
        </Box>
    </Box>
);

export default CollectionPage;
