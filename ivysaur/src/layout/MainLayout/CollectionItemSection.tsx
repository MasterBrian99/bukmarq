import { NavLink } from '@mantine/core';
import { hasChildren } from '@/utils/utils.ts';

interface CollectionItemProps {
    id: number;
    title: string;
    children?: CollectionItemProps[];
}

const listItems:CollectionItemProps[] = [
    {
        id: 1,
        title: 'First parent link',
        children: [
            {
                id: 2,
                title: 'First child link',
            },
            {
                id: 3,
                title: 'Second child link',
            },
            {
                id: 4,
                title: 'Nested parent link',
                children: [
                    {
                        id: 5,
                        title: 'First child link',
                    },
                    {
                        id: 6,
                        title: 'Second child link',
                    },
                    {
                        id: 7,
                        title: 'Third child link',
                    },
                ],
            },
        ],
    },
    {
        id: 8,
        title: 'Second parent link',
    },
];
export default function CollectionItemSection() {
    return (
        <>
            {listItems.map((item) => (
                <CollectionItem key={item.id} {...item} />
            ))}
        </>
    );
}

const CollectionItem = (item:CollectionItemProps) => {
const Component = hasChildren<CollectionItemProps>(item?.children) ? MultiCollectionItem : SingleCollectionItem;
    return (

        <>
        <Component {...item} />
        </>
        // <div>
        //     <NavLink
        //       label="First parent link"
        //       childrenOffset={28}
        //       draggable
        //     >
        //         <NavLink label="First child link" />
        //         <NavLink label="Second child link" />
        //         <NavLink label="Nested parent link" childrenOffset={28}>
        //             <NavLink label="First child link" />
        //             <NavLink label="Second child link" />
        //             <NavLink label="Third child link" />
        //         </NavLink>
        //     </NavLink>
        //
        //     <NavLink
        //       label="Second parent link"
        //       childrenOffset={28}
        //       defaultOpened
        //     >
        //         <NavLink label="First child link" />
        //         <NavLink label="Second child link" />
        //         <NavLink label="Third child link" />
        //     </NavLink>
        // </div>
    );
};
const SingleCollectionItem = (item:CollectionItemProps) => (
        <>
            <NavLink
              key={item.id}
              label={item.title}
              variant="filled"
              childrenOffset={28}

            />
        </>
    );
const MultiCollectionItem = (item:CollectionItemProps) => (

        <NavLink
          key={item.id}
          label={item.title}
          variant="filled"
          childrenOffset={8}
            // rightSection={<span />}
        >
            {item &&
                item.children &&
                item.children.map((child, key) => (
                    <CollectionItem key={key} {...child} />
                ))}
        </NavLink>
    );
