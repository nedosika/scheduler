import React from "react";
import {
    Assignment,
    Business,
    CallToAction,
    Security,
    Slideshow,
    SettingsApplications as SettingsIcon,
    Language as LanguageIcon
} from "@mui/icons-material";

const getMenuItems = () => {
    return [
        {
            primaryText: 'Administration',
            value: '/users',
            visible: true,
            primaryTogglesNestedList: true,
            leftIcon: <Slideshow/>,
            nestedItems: [
                {
                    value: '/admin',
                    visible: true,
                    primaryText: 'Admin',
                    leftIcon: <Security/>,
                },
                {
                    value: '/companies',
                    visible: 'read_companies',
                    primaryText: 'Companies',
                    leftIcon: <Business/>,
                },
                {
                    value: '/tasks',
                    visible: true,
                    primaryText: 'Tasks',
                    leftIcon: <Assignment/>,
                },
                {
                    value: '/posts',
                    visible: true,
                    primaryText: 'Posts',
                    leftIcon: <CallToAction/>,
                },
            ],
        },
        {
            visible: true,
            primaryText: 'settings',
            primaryTogglesNestedList: true,
            leftIcon: <SettingsIcon />,
            nestedItems: [
                {
                    visible: true,
                    primaryText: 'language',
                    secondaryText: 1,
                    primaryTogglesNestedList: true,
                    leftIcon: <LanguageIcon />,
                    nestedItems: [

                    ],
                },
            ],
        },
    ]
}

export default getMenuItems;