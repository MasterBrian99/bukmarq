import React from 'react';
import {ActionIcon, Menu, rem} from "@mantine/core";
import {BsThreeDots} from "react-icons/bs";
import {FaPencil} from "react-icons/fa6";
import {BiCopy, BiMove} from "react-icons/bi";

function CollectionMenu() {
    return (
        <Menu position={'bottom-end'}>
            <Menu.Target>
                <ActionIcon size={'lg'} variant="default" radius={'md'}>
                    <BsThreeDots size="1.5rem" />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item icon={<FaPencil size={rem(14)} />} >
                    Rename
                </Menu.Item>
                <Menu.Item icon={<BiMove size={rem(14)} />} >
                    Move to another folder
                </Menu.Item>
                <Menu.Item icon={<BiCopy size={rem(14)} />} >
                    Copy to another folder
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default React.forwardRef(CollectionMenu);