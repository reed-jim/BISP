import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import "../../css/animation.css";
import "../../css/style.css";
import { useComponentLifetimeStorage } from "../../hooks/useComponentLifetimeStorage";
import { useHandleInput } from "../../hooks/useHandleInput";
import { useQuery } from "../../hooks/useQuery";
import { changePath, getSessionStorage, lockScroll, pushPath, setSessionStorage } from "../../js/util";
import { FeedService } from "../../services/feed";
import { UserService } from "../../services/user";
import { Post, SearchBar } from "../Explorer/Explorer";
import { CenteredText, StyledButton, Text } from "../Frame";
import { FriendDetail, FriendList } from "../Friend/Friend";
import { AddModal } from "../Modal/Modal";
import { Centered, ColumnFlex, Flex, m_l_a, StyledInput, YCenteredRowFlex } from "../style/style";
import { Status } from "../Question/addQuestion";
import { useShowThenHideEffect } from "../../hooks/useShowThenHideEffect";
import { Avatar } from "../Friend/Friend";
import { EditIcon, KnowledgeIcon, FriendIcon } from "../../svg";
import { SvgIcon } from "../Frame";

const themeCollections = {
    light: {
        userRouter: ["#ddd"],
        userDashboard: ["#ccc", "#333", "#777", "#aaa", "#999"],
        question_list_item: ["#fff", "#333", "#666"],
        customizer: ["#ccc", "#333", "#888", "#666"]
    },
    dark: {
        userRouter: ["#333"],
        userDashboard: ["#444", "#fff", "#aaa", "#666", "#555"],
        question_list_item: ["#444", "#fff", "#aaa"],
        customizer: ["#444", "#fff", "#555", "#666"]
    }
}

const UserRouter = (props) => {
    const history = useHistory();
    const query = useQuery();

    const theme = props.theme;
    const tc = themeCollections[theme].userRouter;


    const routeFriendComponent = () => {
        const friendId = query.get("id");

        if (friendId != undefined) {
            return <FriendDetail theme={theme} />
        }
        else {
            return <FriendList theme={theme} />
        }
    }


    return (
        <Centered bg={tc[0]} w="100%" mh="calc(100vh - 50px)" p="18px">

            <Switch>
                <Route path="/user/feed">
                    <FeedManager theme={theme} />
                </Route>

                <Route path="/user/customize">
                    <Customize theme={theme} />
                </Route>

                <Route path="/user/friend">
                    {routeFriendComponent()}
                </Route>

                <Route path="/">
                    <UserDashboard theme={theme} />
                </Route>
            </Switch>

        </Centered>
    )
}

const UserDashboard = (props) => {
    const history = useHistory()
    const [isF, setF] = useState(false);

    const theme = props.theme;
    const tc = themeCollections[theme].userDashboard;
    const user = getSessionStorage("user");

    return (
        <ColumnFlex bg={tc[0]} br="5px" w="50%" p="27px" g="18px">
            <YCenteredRowFlex g="9px">
                <Avatar text={user.name} />
                <CenteredText cl={tc[1]} fs="24px" fw="bold" text={user.name == "" ? "Click <Customize> to edit profile" : `Hi, ${user.name}`} />
            </YCenteredRowFlex>


            <Text cl={tc[2]} text={`${user.desc}`} />

            <ColumnFlex g="48px">
                <ColumnFlex g="18px">
                    <Centered b={`2px solid ${tc[3]}`} br="5px" h="80px" style={{ flexGrow: 1, minWidth: 0 }}>
                        <Text cl={tc[1]} className="default-cursor" fs="36px" fw="bold" text={`${user.key}`} />
                    </Centered>

                    <Flex g="18px">
                        <Centered b={`2px solid ${tc[3]}`} br="5px" h="80px" style={{ flexGrow: 1, minWidth: 0 }}>
                            <Text cl={tc[1]} className="default-cursor" fs="24px" fw="bold" text={`${user.learn} learn points`} />
                        </Centered>

                        <Centered b={`2px solid ${tc[3]}`} br="5px" h="80px" style={{ flexGrow: 1, minWidth: 0 }}>
                            <Text cl={tc[1]} className="default-cursor" fs="24px" fw="bold" text={`${user.gem} gems`} />
                        </Centered>
                    </Flex>
                </ColumnFlex>

                <Flex g="9px">
                    {
                        // minWidth: 40% is a ha linear-gradient(45deg, #59C173, #a17fe0, #5D26C1)
                        [
                            ["Your work", "feed", KnowledgeIcon, "knowledge"],
                            ["Customize", "customize", EditIcon, "edit"],
                            ["Friend", "friend", FriendIcon, "friend"]
                        ]
                            .map(
                                (item, i) =>
                                    <Centered
                                        key={i} className="user-btn br-5-p-9" bg={tc[4]} hBg={tc[3]} w="45%" h="80px" g="9px"
                                        style={{ flexGrow: 1 }}
                                        onClick={() => pushPath(history, item[1])}
                                    >
                                        <SvgIcon svg={item[2]({ scale: 0.004 })} cpId={item[3]} bg={tc[1]} w={512} scale={0.04} />
                                        <CenteredText cl={tc[1]} className="default-cursor" fs="24px" fw="bold" text={item[0]} />
                                    </Centered>
                            )
                    }
                </Flex>

            </ColumnFlex>

            {isF && <FeedManager />}
        </ColumnFlex>
    )
}

const FeedManager = (props) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { storage, store } = useComponentLifetimeStorage();

    const theme = props.theme;
    // const tc = themeCollections[theme].explorer;

    const userId = 0;
    // const userId = getSessionStorage("user")._id;

    const openModal = (id) => {
        store("selectedFeedId", id)
        lockScroll(true);
        setIsOpenModal(true);
    }

    const closeModal = () => {
        lockScroll(false);
        setIsOpenModal(false);
    }

    const update = (data) => {
        new FeedService().update(storage["selectedFeedId"], data);
    }

    const remove = (id) => {
        new FeedService().delete(id);
    }

    const renderFeed = () => {
        if (getSessionStorage(`user_feed_${userId}`)) {
            return Object.values(getSessionStorage(`user_feed_${userId}`)).map(
                (item, i) =>
                    <Post key={i} isEditMode={true} edit={() => openModal(item._id)} content={item.content} theme="dark" />
            )
        }
        else {
            return "No Feed"
        }
    }

    const getFeedById = () => {
        const items = getSessionStorage(`user_feed_${userId}`);

        for (const key in items) {
            const item = items[key];

            if (item._id == storage["selectedFeedId"]) {
                return item
            }
        }
    }

    // limit
    useEffect(
        () => {
            const userId = 0;

            if (!getSessionStorage(`user_feed_${userId}`)) {
                new FeedService().get(userId).then(
                    res => {
                        setSessionStorage(`user_feed_${userId}`, res.data)
                    }
                )
            }
        }, []
    )

    return (
        <ColumnFlex w="40%" g="18px">
            <Text fw="bold" text="Feed Manager" />

            <SearchBar theme={theme} />

            {
                renderFeed()
            }

            {isOpenModal &&
                <AddModal rowsToEdit={getFeedById().content} theme={theme}
                    close={() => closeModal()} submit={update}
                />
            }
        </ColumnFlex>
    )
}

const QuestionCollectionManager = (props) => {
    const theme = props.theme;
    const tc = themeCollections[theme].userDashboard;

    return (
        <ColumnFlex bg={tc[1]} w="50%" h="100%" p="18px" g="18px">
            <Flex h="50px" />
            <Text text="Collection" />

            <ColumnFlex g="9px">
                {
                    Array(3).fill(0).map(
                        (i) => <Item />
                    )
                }

            </ColumnFlex>

        </ColumnFlex>
    )
}

const Item = () => {
    const history = useHistory();

    return (
        <YCenteredRowFlex bg="#444" br="5px" p="9px" hBg="#555" onClick={() => changePath(history, "question-collection?id=5")}>
            <Text text="Title" />
            <Text bg="#888" br="5px" p="9px" m="0 0 0 auto" text="Draft" />
        </YCenteredRowFlex>
    )
}

const Customize = (props) => {
    const [selected, select] = useState(-1);
    const { input, getInput } = useHandleInput({});
    const history = useHistory();
    const saveStatusDisplayer = useShowThenHideEffect(1);

    const tc = themeCollections[props.theme].customizer;

    const submit = () => {
        const user = getSessionStorage("user");

        user.name = input["Name"];
        user.desc = input["Description"];

        new UserService().update(user);

        setSessionStorage("user", user);

        saveStatusDisplayer.show();
    }

    return (
        <ColumnFlex bg={tc[0]} br="5px" w="40%" p="18px" g="18px">
            <Text cl={tc[1]} fw="bold" text="Customize" />

            {
                ["Name", "Description"].map(
                    (item, i) =>
                        <ColumnFlex key={i} g="3px">
                            <Text cl={tc[1]} fw="bold" text={item} />

                            <StyledInput cl={tc[1]}
                                b={`2px solid ${selected == i ? tc[1] : tc[2]}`} p="9px" placeholder={`Enter ${item}`}
                                onClick={() => select(i)}
                                onChange={e => getInput(item, e.target.value)}
                            />
                        </ColumnFlex>
                )
            }

            <YCenteredRowFlex g="9px">
                <CenteredText cl={tc[1]} fs="16px" text="Test" />

                <StyledInput type="checkbox" w="20px" h="20px" m="0"
                    onChange={e => getInput("checked", e.target.checked)}
                />
            </YCenteredRowFlex>

            <YCenteredRowFlex g="9px">
                <Status status="Profile Updated!" isShow={saveStatusDisplayer.isShow} />

                <StyledButton cl={tc[1]} hb={tc[2]} className="br-5-p-9" m={m_l_a} text="Discard"
                    click={() => changePath(history, "/user")}
                />

                <StyledButton bg={tc[2]} hb={tc[3]} cl={tc[1]} className="br-5-p-9" text="Apply" click={submit} />
            </YCenteredRowFlex>

        </ColumnFlex>
    )
}

// const Task = (props) => {
//     const [selected, select] = useState(-1);
//     const { input, getInput } = useHandleInput({});

//     const tc = themeCollections[props.theme];

//     return (
//         <ColumnFlex bg="#555" br="5px" w="40%" p="18px" g="18px">
//             <Text text="Task" />



//         </ColumnFlex>
//     )
// }

export { UserRouter, QuestionCollectionManager };
