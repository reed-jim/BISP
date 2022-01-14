import { useEffect } from "react";
import { useHistory } from "react-router";
import { useQuery } from "../../hooks/useQuery";
import { useShowThenHideEffect } from "../../hooks/useShowThenHideEffect";
import { changePath, getSessionStorage, setSessionStorage } from "../../js/util";
import { UserService } from "../../services/user";
import { BackIcon, CopyIcon } from "../../svg";
import { CenteredText, StyledButton, SvgIcon, Text } from "../Frame";
import { Status } from "../Question/addQuestion";
import { Centered, CenteredFlex, ColumnFlex, Flex, m_l_a, YCenteredRowFlex } from "../style/style";


const themeCollections = {
    light: {
        friendList: ["#fff", "#222", "#ddd"],
        friendListItem: ["#ccc", "#222", "#bbb"],
        friendDetail: ["#ccc", "#333", "#777", "#aaa", "#999"]
    },
    dark: {
        friendList: ["#333", "#fff", "#444"],
        friendListItem: ["#555", "#fff", "#666"],
        friendDetail: ["#444", "#fff", "#aaa", "#666", "#555"]
    }
}

const FriendList = (props) => {
    const tc = themeCollections[props.theme].friendList;

    useEffect(
        () => {
            new UserService().getFriendList(getSessionStorage("user").friends).then(
                res => {
                    setSessionStorage("friends", res.data)
                }
            );
        }, []
    )

    const render = () => {
        if (getSessionStorage("friends") != undefined) {
            return getSessionStorage("use").friends.map(
                (item, i) =>
                    <FriendListItem key={i} theme={props.theme}
                        name="Name"
                    />
            )
        }
        else {
            return "No record"
        }
    }

    return (
        <Centered pos="absolute" top="0" bg={tc[0]} w="100%" mh="100vh">
            <ColumnFlex bg={tc[2]} br="5px" w="40%" p="18px" g="18px">
                <YCenteredRowFlex g="9px">
                    <SvgIcon svg={BackIcon({ scale: 0.004 })} cpId="back" bg={tc[1]} w={512} scale={0.04} />
                    <Text cl={tc[1]} fw="bold" text="Friend List" />
                </YCenteredRowFlex>

                {
                    render()
                }
            </ColumnFlex>
        </Centered>
    )
}

const FriendListItem = (props) => {
    const history = useHistory();
    const tc = themeCollections[props.theme].friendListItem;

    return (
        <YCenteredRowFlex className="br-5-p-18" bg={tc[0]} hBg={tc[2]} g="18px"
            onClick={() => changePath(history, "friend?id=0")}
        >
            <Avatar text={props.name} />

            <Text cl={tc[1]} fw="bold" text={props.name} />

            <FriendListStatus status={0} />
        </YCenteredRowFlex>
    )
}

const FriendListStatus = (props) => {
    const statuses = [
        ["#47ff4d", "Online"], ["#0264ca", "Busy"], ["#ff5454", "Hard"]
    ]

    return (
        <YCenteredRowFlex m={m_l_a} g="9px">
            <Flex bg={statuses[props.status][0]} br="50%" w="13px" h="13px" />
            {/* <CenteredText cl={"#fff"} fw="bold" text={statuses[props.status][1]} /> */}
        </YCenteredRowFlex>
    )
}

const FriendDetail = (props) => {
    const query = useQuery();
    const saveStatusDisplayer = useShowThenHideEffect(1);

    const theme = props.theme;
    const tc = themeCollections[theme].friendDetail;

    const getUser = () => {
        return getSessionStorage("selectedUser");
    }

    const addFriend = () => {
        // const us = UserService();

        // const user = getSessionStorage("user");

        // user.friends.push(getUser()._id);

        // us.update(user);

        saveStatusDisplayer.show();
    }

    return (
        <ColumnFlex bg={tc[0]} br="5px" w="50%" lgw="75%" mdw="100%" p="27px" g="18px">

            <YCenteredRowFlex g="9px">
                <Avatar text={getUser().name} />
                <Text cl={tc[1]} fs="24px" fw="bold" text={getUser().name} />
            </YCenteredRowFlex>


            <Text cl={tc[2]} text="Placeholder" />

            <ColumnFlex g="48px">
                <ColumnFlex g="18px">
                    <CenteredFlex pos="relative" b={`2px solid ${tc[3]}`} br="5px" h="80px" p="0 9px">
                        <CenteredText cl={tc[1]} className="default-cursor" fs="36px" fw="bold" text={getUser().key} />

                        <Flex pos="absolute" right="9px" hBg="#666" br="50%" p="9px">
                            <SvgIcon svg={CopyIcon({ scale: 0.004 })} cpId="copy" bg={tc[1]} w={512} scale={0.04} />
                        </Flex>
                    </CenteredFlex>

                    <Flex g="18px">
                        <Centered b={`2px solid ${tc[3]}`} br="5px" h="80px" style={{ flexGrow: 1, minWidth: 0 }}>
                            <Text cl={tc[1]} className="default-cursor" fs="24px" fw="bold" text={`${getUser().learn} learn points`} />
                        </Centered>

                        <Centered b={`2px solid ${tc[3]}`} br="5px" h="80px" style={{ flexGrow: 1, minWidth: 0 }}>
                            <Text cl={tc[1]} className="default-cursor" fs="24px" fw="bold" text={`${getUser().gem} gems`} />
                        </Centered>
                    </Flex>
                </ColumnFlex>
            </ColumnFlex>

            <Flex g="9px">
                <Status status="Friend Added!" isShow={saveStatusDisplayer.isShow} />

                <StyledButton className="br-5-p-9" bg={tc[4]} hb={tc[3]} cl={tc[1]} w="fit-content" m={m_l_a} text="Add Friend"
                    click={addFriend}
                />
            </Flex>

        </ColumnFlex>
    )
}

const Avatar = (props) => {
    const theme = props.theme;
    // const tc = themeCollections[theme].friendDetail;

    const convertName = () => {
        if (props.text != "" && props.text != undefined) {
            return props.text.match(/\b(\w)/g).join('');
        }

        return "N"
    }

    return (
        <Centered bg="#777" br="50%" w="40px" h="40px">
            <Text cl="#fff" text={convertName()} />
        </Centered>
    )
}

export { FriendList, FriendDetail, Avatar };
