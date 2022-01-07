import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { useComponentLifetimeStorage } from "../../hooks/useComponentLifetimeStorage";
import { useHandleInput } from "../../hooks/useHandleInput";
import { useQuery } from "../../hooks/useQuery";
import { convertDate, getCurrentDate, getSessionStorage, gradientColor, gradientPropeties, lockScroll, pushPath, setSessionStorage } from "../../js/util";
import { FeedService } from "../../services/feed";
import { UserService } from "../../services/user";
import { CloseIcon, GemIcon, SearchIcon } from "../../svg";
import { SortIcon, TrophyIcon } from "../../svg/index";
import { tags } from "../../test/SampleData";
import { Badge, StyledButton, SvgIcon, Text, TextWithIcon } from "../Frame";
import { Avatar, FriendDetail } from "../Friend/Friend";
import { AddModal } from "../Modal/Modal";
import { Centered, CenteredFlex, ColumnFlex, Flex, ml_9, m_l_a, StyledImage, StyledInput, YCenteredRowFlex } from "../style/style";

const themeCollections = {
    light: {
        explorer: ["#fff", "#222", "#ddd", "#ccc", "#777", "#ff1a1a"],
        post: ["#ddd", "#222", "#999", "#aaa", "#ccc", "#999"],
        questionCollection: ["#ddd", "#333", "#222", "#bbb", "#bbb"],
        questionCollectionDetail: ["#ddd"],
        questionDetail: ["#ddd", "#222", "#777", "#222", "#ccc"],
        dropDown: ["#ccc", "#bbb", "#222"],
        collectionItem: ["#ccc", "#bbb"],
        gift: ["#ddd", "#222", "#ccc"],
        searchBar: ["#ddd", "#222", "#ccc"],
        friendList: ["#fff", "#222", "#ddd"],
        friendListItem: ["#ccc", "#222"],
        friendDetail: ["#ccc", "#333", "#777", "#aaa", "#999"]
    },
    dark: {
        explorer: ["#333", "#fff", "#444", "#555", "#999", "#ff9999"],
        post: ["#444", "#fff", "#888", "#555", "#333", "#666"],
        questionCollection: ["#444", "#fff", "#ddd", "#666", "#666"],
        questionCollectionDetail: ["#444"],
        questionDetail: ["#444", "#fff", "#666", "#bbb", "#555"],
        dropDown: ["#555", "#666", "#fff"],
        collectionItem: ["#555", "#666"],
        gift: ["#444", "#fff", "#555"],
        searchBar: ["#444", "#fff", "#555", "#666"],
        friendList: ["#333", "#fff", "#444"],
        friendListItem: ["#555", "#fff"],
        friendDetail: ["#444", "#fff", "#aaa", "#666", "#555"]
    }
}

const FEED_PER_FETCH = 20;

const ExplorerRouter = (props) => {
    // const history = useHistory();
    const query = useQuery();

    const theme = props.theme;
    const tc = themeCollections[theme].explorer;


    return (
        <Centered pos="absolute" top="0" bg={tc[0]} w="100%" mh="100vh">

            <Switch>
                <Route path="/explore/user">
                    <FriendDetail theme={theme} />
                </Route>

                <Route path="/explore/">
                    <Explorer theme={theme} />
                </Route>
            </Switch>

        </Centered>
    )
}

const Explorer = (props) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isRewardModal, openRewardModal] = useState(false);
    const [updateTime, update] = useState(0);
    const { storage, store } = useComponentLifetimeStorage();
    const tRef = useRef({});


    const theme = props.theme;
    const tc = themeCollections[theme].explorer;


    const TRIGGER_DOWN_POS = 5;
    const TRIGGER_UP_POS = 3;
    const MAX_NUM_REPLACED = 3;


    // fetch data
    useEffect(
        () => {
            if (!getSessionStorage("latestFeed")) {
                new FeedService().sortInRange("date", 0).then(
                    res => {
                        setSessionStorage("latestFeed", res.data);

                        setSessionStorage("latestFeedPage", 0);

                        store("pool", res.data);
                    }
                )
            }
            else {
                store("pool", getSessionStorage("latestFeed"));

                update(2)
            }
        }, []
    )

    // this is for learning
    useEffect(
        () => {
            // track() can't be here. Find out why!!!
        }, []
    )

    // change scroll position
    useEffect(
        () => {
            if (tRef.current[0] != undefined) {
                const distance = tRef.current[0].getBoundingClientRect().height + 18;

                const reserveBottom = storage["reserveBottom"];
                const reserveTop = storage["reserveTop"];

                if (storage["loadNext"]) {
                    const numReplaced = reserveBottom.length > MAX_NUM_REPLACED ? MAX_NUM_REPLACED : reserveBottom.length;
                    tRef.current["container"].scrollTop -= (numReplaced - 1) * distance;
                }

                if (storage["loadPrev"]) {
                    const numReplaced = reserveTop.length > MAX_NUM_REPLACED ? MAX_NUM_REPLACED : reserveTop.length;
                    tRef.current["container"].scrollTop += (numReplaced - 1) * distance;
                }
            }
        }
    )


    const init = () => {
        const pool = [];

        for (let i = 0; i < 5; i++) {
            pool[i] = {
                _id: 0,
                title: "Pool " + i,
                content: ["Real Madrid won 13th C1 trophy on 21/6/2020", "We dump 2.12 billion tons of waste every year"
                    , "Black hole reflects no light"],
                userId: 0,
                userDetail: { 0: { name: "Jonathan" } }
            }
        }

        const reserveBottom = [];

        for (let i = 0; i < 1; i++) {
            reserveBottom[i] = {
                _id: 0,
                title: "Reserve " + i,
                content: ["Real Madrid won 13th C1 trophy on 21/6/2020", "We dump 2.12 billion tons of waste every year"
                    , "Black hole reflects no light"],
                userId: 0
            }
        }

        store("pool", pool);
        store("reserveTop", []);
        store("reserveBottom", reserveBottom);
    }

    const add = (input) => {
        const user = getSessionStorage("user");

        if (user != undefined) {
            const feed = new FeedService();

            const _content = Object.values(input).slice(1);

            feed.lastId().then(
                res => {
                    const doc = {
                        id: res.data.index,
                        title: input.title,
                        content: _content,
                        userId: user._id,
                        date: getCurrentDate(),
                        gem: 0
                    }

                    feed.add(doc);
                }
            )
        }
        else {
            alert("Please Login!")
        }
    }

    const openModal = () => {
        lockScroll(true);
        setIsOpenModal(true);
    }

    const closeModal = () => {
        lockScroll(false);
        setIsOpenModal(false);
    }

    const track = () => {
        setInterval(() => {
            const pool = storage["pool"];
            const reserveTop = storage["reserveTop"];
            const reserveBottom = storage["reserveBottom"];


            const triggerDownRect = tRef.current[TRIGGER_DOWN_POS].getBoundingClientRect();

            if (triggerDownRect.y + triggerDownRect.height < 0) {
                if (reserveBottom.length > 0) {
                    const numReplaced = reserveBottom.length > MAX_NUM_REPLACED ? MAX_NUM_REPLACED : reserveBottom.length;

                    for (let i = 0; i < numReplaced; i++) {
                        reserveTop.push(pool[i]);

                        pool.shift();
                        pool.push(reserveBottom[i]);

                        reserveBottom.pop();
                    }
                    console.log("trigger down!");
                    store("pool", pool);
                    store("loadNext", true);
                    update(updateTime + 1);
                }
                else {
                    const nextPage = getSessionStorage("latestFeedPage") + 1;
                    new FeedService().sortInRange("date", nextPage).then(
                        res => {
                            setSessionStorage("latestFeedPage", nextPage);

                            store("reserveBottom", res.data);
                        }
                    )
                }
            }

            if (reserveTop.length > 0) {
                const triggerUpRect = tRef.current[TRIGGER_UP_POS].getBoundingClientRect();

                if (triggerUpRect.y > 0) {
                    const numReplaced = reserveTop.length > MAX_NUM_REPLACED ? MAX_NUM_REPLACED : reserveTop.length;

                    for (let i = 0; i < numReplaced; i++) {
                        reserveBottom.push(pool[pool.length - 1 - i]);

                        pool.pop();
                        pool.unshift(reserveTop[i]);

                        reserveTop.pop();
                    }
                    console.log("trigger up!");
                    store("pool", pool)
                    store("loadPrev", true);
                    update(updateTime + 1);
                }
            }
        }, 5000);
    }

    const checkReward = () => {
        if (!getSessionStorage("reward")) {
            setSessionStorage("reward", new Date() + 5000);
        }
        else {
            setTimeout(
                () => {
                    openRewardModal(true);
                }, 5000)

            // const t = setInterval(
            //     () => {
            //         if (new Date()-   new Date(getSessionStorage("reward"))) {
            //             openRewardModal(true);

            //             clearInterval(t);
            //         }
            //     }, 20000
            // )
        }
    }

    const render = () => {
        const { start, step } = gradientPropeties();

        if (storage["pool"] != undefined) {
            const arr = Object.values(storage["pool"]).map(
                (item, i) =>
                    <Post
                        tref={el => tRef.current[i] = el} key={i} index={i}
                        userDetail={item.userDetail[0]}
                        id={item._id} feed={item} title={item.title} content={item.content} date={item.date} gem={item.gem}
                        theme={theme}
                        start={start} step={step}
                    />
            )

            return arr
        }
        else {
            return "No feed"
        }
    }

    const applyQuery = (data) => {
        store("pool", data);

        update(updateTime + 1);
    }


    if (storage["pool"] == undefined) {
        init();
        // track();
        // checkReward();
    }


    return (
        <ColumnFlex w="80%" g="18px">
            <Flex bg="#f80" h="250px" p="18px">
                Coming Soon
                {/* <StyledRouteLink to="question" text="Click here" bg="#f80" br="5px" /> */}
            </Flex>
            {/* <AddModal theme={theme} /> */}
            {/* <Question theme={theme} /> */}
            <Flex g="18px" d="">
                {/* Entertainment */}
                {/* <Left applySort={applyQuery} applySearch={applyQuery} theme={props.theme} /> */}
                {/* Knowledge */}
                <ColumnFlex pos="" w="50%" g="18px">
                    <ColumnFlex b={`2px solid ${tc[4]}`} br="5px" p="18px" g="18px">
                        <Text cl={tc[1]} fs="20px" text={`Hello, ${getSessionStorage("user") != undefined ? getSessionStorage("user").name : ""}`} />

                        <Text cl={tc[4]} text="Have a great day!" />

                        <StyledButton
                            cl={tc[4]} bg={tc[2]} hb={tc[3]} fs="20px" br="5px" w="fit-content" p="9px" m={m_l_a}
                            text="Share your knowledge"
                            click={() => openModal()}
                        />
                    </ColumnFlex>
                    {/* Coming Soon */}
                    {/* Features */}
                    <Text cl={tc[1]} fw="bold" text="Exlore the world" />

                    <Text
                        cl={tc[5]} fw="bold" ta="justify" b={`2px solid ${tc[5]}`} br="5px" p="9px"
                        text="We recommend you learn more from the Internet"
                    />

                    <ColumnFlex ref={el => tRef.current["container"] = el} className="hide-scrollbar" g="36px" o="auto">
                        {
                            render()
                        }
                    </ColumnFlex>

                    <Flex h="300px"></Flex>

                </ColumnFlex>
                {/* Ranking */}
                {/* <Ranking items={rankingItems} /> */}
            </Flex>

            {isOpenModal && <AddModal theme={theme} close={() => closeModal()} submit={add} />}

            {isRewardModal && <Gift theme={theme} close={() => openRewardModal(false)} />}
        </ColumnFlex>
    )
}

const Post = (props) => {
    const history = useHistory();

    const gc = gradientColor(props.index, props.start, props.step)
    const theme = props.theme;
    const tc = themeCollections[theme].post;

    const giveGem = () => {
        const user = getSessionStorage("user");

        if (user) {
            let feed = props.feed;

            feed.gem++;

            const feeds = getSessionStorage("latestFeed");

            for (const key in feeds) {
                if (feeds[key]._id == feed._id) {
                    feeds[key] = feed; break;
                }
            }

            setSessionStorage("latestFeed", feeds)

            new FeedService().update(feed);

            const us = new UserService();

            user.learn += 1 + user.bonus;
            user.bonus++;
            user.lastLearnTime = getCurrentDate();

            setSessionStorage("user", user);

            us.update(user);

            // update gem for author

            // const readHistory = {
            //     id: getSessionStorage("read_history_last_id"),
            //     feedId: feed._id,
            //     userId: user._id
            // }

            // ReadHistory().add(readHistory);
        }
        else {

        }
    }

    const viewUser = () => {
        setSessionStorage("selectedUser", props.userDetail)
        pushPath(history, `user?id=${props.userId}&feedId=${props.id}`)
    }

    return (
        <ColumnFlex top={props.top} ref={props.tref} bg={tc[0]}
            b={`2px solid ${gc}`}
            br="5px" p="18px" g="12px"
        >
            <YCenteredRowFlex br="5px 5px 0 0" hBg={tc[4]} g="12px" style={{ padding: "9px", borderBottom: `2px solid ${tc[2]}` }}
                onClick={() => viewUser()}
            >
                <Avatar text={props.userDetail.name} />

                <ColumnFlex>
                    <Text cl={tc[1]} fw="bold" text={props.name} />
                    <Text cl={tc[1]} text={convertDate(props.date)} />
                </ColumnFlex>
            </YCenteredRowFlex>

            <Text cl={tc[1]} fw="700" text={props.title} />

            <ColumnFlex g="12px">
                {
                    props.content.map(
                        (item, i) =>
                            <YCenteredRowFlex key={i} g="12px">
                                <Text cl={tc[1]} m={ml_9} text="&#9670;" />

                                <Text
                                    className="feed-row"
                                    key={i} cl={tc[1]} hBg={tc[3]} ta="justify" b={`2px solid ${tc[2]}`} br="5px"
                                    p={"9px"} text={item}
                                />
                            </YCenteredRowFlex>
                    )
                }
            </ColumnFlex>

            {/* <Bar positive="50" /> */}
            {/* Footer */}
            {
                !props.isEditMode ?
                    getSessionStorage("user") ?
                        <YCenteredRowFlex g="9px">
                            <Centered bg={tc[3]} hBg={tc[5]} br="5px" w="fit-content" p="9px" onClick={() => giveGem()}>
                                <SvgIcon svg={GemIcon({ scale: 0.0035 })} cpId="gem" bg={tc[1]} w={512} scale={0.035} />
                            </Centered>

                            <Text cl={gc} fw="bold" text={`${props.gem} gem${props.gem > 1 ? "s" : ""}`} />
                        </YCenteredRowFlex>
                        :
                        <StyledButton className="br-5-p-9" bg={tc[3]} w="fit-content" text="Login" />
                    :
                    <Flex g="9px">
                        <StyledButton className="br-5-p-9" bg={tc[3]} hb={tc[2]} m={m_l_a} text="Edit" click={props.edit} />
                        <StyledButton className="br-5-p-9" bg={tc[3]} hb={tc[2]} text="Delete" click={props.edit} />
                    </Flex>
            }
        </ColumnFlex>
    )
}

const Bar = (props) => {
    const positive = props.positive;

    return (
        <Flex br="5px" o="hidden">
            <Text bg="#7dff5c" cl="#092d00" fw="bold" w={positive + "%"} p="3px" text="Positive" />
            <Text bg="#ff6666" cl="#540000" fw="bold" w={(100 - positive) + "%"} p="3px" text="Negative" />
        </Flex>
    )
}

const Ranking = (props) => {
    return (
        <ColumnFlex bg="#444" br="5px" p="18px" g="9px" gr="1">
            <TextWithIcon
                svg={TrophyIcon({ scale: 0.005 })}
                id="trophy"
                text="Ranking"
                style={{ marginBottom: "18px" }}
            />

            {
                props.items.map(
                    (item, i) => <RankingItem key={i} src={item[0]} name={item[1]} />
                )
            }
        </ColumnFlex>
    )
}

const RankingItem = (props) => {
    return (
        <YCenteredRowFlex bg="none" g="18px">
            <StyledImage src={props.src} br="50%" w="30px" h="30px" of="cover" />
            <Text fs="16px" fw="bold" text={props.name} />
            <Text fs="16px" fw="bold" m="0 0 0 auto" text="999" />
        </YCenteredRowFlex>
    )
}

const Left = (props) => {
    return (
        <ColumnFlex w="30%" g="18px">
            {/* Entertainment */}
            <Entertainment />
            {/* Search */}

            {/* Sort */}
            <SortEngine applySort={props.applySort} applySearch={props.applySearch} theme={props.theme} />
        </ColumnFlex>
    )
}

const Entertainment = () => {
    return (
        <Badge
            bg="linear-gradient(45deg, #59C173, #a17fe0, #5D26C1)" br="5px"
            cl="#fff" fs="28px" fw="bold"
            h="fit-content" p="36px"
            text="Explore Now"
        />
    )
}

const SortEngine = (props) => {
    const [sort, setSort] = useState("Top");

    const handleSort = (item) => {
        const fs = new FeedService();

        let field, storage;

        switch (sort) {
            case "Top": field = "gem"; storage = "topFeed"; break;
            case "Latest": field = "date"; storage = "latestFeed"; break;
        }

        if (!getSessionStorage(`${storage}_l${FEED_PER_FETCH}`)) {
            fs.sortInRange(field, 0).then(
                res => {
                    props.applySort(res.data);
                    setSort(item)
                }
            )
        }
    }

    return (
        <ColumnFlex b="2px solid #444" br="5px" p="18px" g="18px">

            <TextWithIcon
                svg={SortIcon({ scale: 0.005 })}
                id="sort"
                text="Sort Engine"
                cl="#fff"
            />

            <Flex g="9px">
                {
                    ["Top", "Lastest"].map(
                        (item, i) => <StyledButton key={i} bg={sort == item ? "#fff" : "#444"} cl={sort == item ? "#444" : "#fff"}
                            hb={sort == item ? "" : "#555"} br="5px" p="9px"
                            text={item}
                            click={() => handleSort(item)}
                        />
                    )
                }
            </Flex>

            <Text cl="#bbb" text="Tags" />

            <SearchBar applySearch={props.applySearch} theme={props.theme} />

            {/* <Flex g="18px" style={{ flexWrap: "wrap" }}>
                {
                    categories.map(
                        (item, i) => <StyledButton key={i} p="0" text={`<${item} />`} />
                    )
                }
            </Flex> */}

            {/* <Flex g="9px">
                {
                    tags.map(
                        (item, i) => <StyledButton key={i} p="0" text={"#" + item} />
                    )
                }
                <Text className="br-5-p-9" bg="#666" text="Show all" />
            </Flex> */}

        </ColumnFlex>
    )
}

const SearchBar = (props) => {
    const { input, getInput } = useHandleInput({});

    const tc = themeCollections[props.theme].searchBar;

    const handleSearch = (item) => {
        // const fs = new FeedService();

        // fs.search(query).then(
        //     res => {
        //         props.applySort(res.data);
        //     }
        // )
    }

    return (
        <YCenteredRowFlex className="br-5-p-9" bg={tc[0]} g="9px">
            {/* <SvgIcon svg={GemIcon({ scale: 0.0035 })} cpId="gem" bg="#fff" w={512} scale={0.035} /> */}
            <StyledInput cl={tc[1]} b="0" w="70%" placeholder="seach tag..."
                onChange={e => getInput("q", e.target.value)}
            />
            <CenteredFlex className="br-5-p-9" bg={tc[2]} hBg={tc[3]} m={m_l_a}>
                <SvgIcon svg={SearchIcon({ scale: 0.0035 })} cpId="search" bg={tc[1]} w={512} scale={0.035}
                    click={() => console.log(input.q)}
                />
            </CenteredFlex>
        </YCenteredRowFlex>
    )
}

const Gift = (props) => {
    const tc = themeCollections[props.theme].gift;

    return (
        <CenteredFlex pos="absolute" top="0" left="0" bg="#000000ff" w="100vw" h="100vh" z="1">
            <ColumnFlex bg={tc[0]} b="2px solid #ff0" br="5px" w="30%" h="fit-content" o="hidden">

                <CenteredFlex bg={tc[2]} h="50px">
                    <Text cl={tc[1]} text="Congr" />
                </CenteredFlex>

                <ColumnFlex p="18px" g="18px">
                    <Text cl={tc[1]} text="596 TEST" />
                    <StyledButton className="br-5-p-9" bg={tc[2]} w="fit-content" text="Submit"
                        click={props.close}
                    />
                </ColumnFlex>

            </ColumnFlex>
        </CenteredFlex>
    )
}

export { ExplorerRouter, Explorer, SearchBar, Post }
