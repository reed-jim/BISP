import { useEffect } from "react";
import { useHistory } from "react-router";
import { useQuery } from "../../hooks/useQuery";
import { useShowThenHideEffect } from "../../hooks/useShowThenHideEffect";
import { changePath, getSessionStorage, setSessionStorage } from "../../js/util";
import { UserService } from "../../services/user";
import { BackIcon, CopyIcon, EnterIcon, KnowledgeIcon, GemIcon } from "../../svg";
import { CenteredText, StyledButton, SvgIcon, Text } from "../Frame";
import { Status } from "../Question/addQuestion";
import { Centered, CenteredFlex, ColumnFlex, Flex, m_l_a, StyledImage, XCenteredColumnFlex, YCenteredColumnFlex, YCenteredRowFlex } from "../style/style";
import "../../css/animation.css";
import { pushPath } from "../../js/util";
const basicThemes = require("../../theme/theme.json");

const themeCollections = {
    light: {
        landing: ["#fff", "#222", "#777", "#ccc", "#bbb", "linear-gradient(45deg,#c330ff,#3167ff)"],
        landingItem: ["#ccc", "#222", "#bbb"],
        friendDetail: ["#ccc", "#333", "#777", "#aaa", "#999"]
    },
    dark: {
        landing: ["#333", "#fff", "#aaa", "#444", "#555", "linear-gradient(45deg,#c330ff,#3167ff)"],
        friendListItem: ["#555", "#fff", "#666"],
        friendDetail: ["#444", "#fff", "#aaa", "#666", "#555"]
    }
}

const Landing = (props) => {
    const history = useHistory();
    const tc = themeCollections[props.theme].landing;
    const bt = basicThemes[props.theme];

    return (
        <Centered bg={tc[0]} w="100%" mh="100vh">
            <XCenteredColumnFlex bg={tc[0]} w="70%" mdw="100%" mh="100vh" p="126px 18px 18px 18px" g="126px" tr="width 0.5s">

                <Flex w="100%" g="0px" o="hidden" style={{ minHeight: "300px", paddingBottom: "0", borderBottom: `3px solid ${tc[3]}` }}>
                    <YCenteredColumnFlex g="27px" style={{ flexGrow: 1 }}>
                        <CenteredText cl={tc[1]} fs="60px" fw="bold" text="Placeholder" />

                        <Text cl={tc[2]} fs="20px" fw="" ta="left" w="100%" text="Explore the beauty of science right now!"
                            style={{ overflowWrap: "break-word" }}
                        />

                        <YCenteredRowFlex className="br-5-p-9" bg={tc[3]} hBg={tc[4]} w="fit-content">
                            <SvgIcon svg={EnterIcon({ scale: 0.008 })} cpId="enter" bg={tc[1]} w={512} scale={0.08} />

                            <StyledButton cl={tc[1]} fs="24px" fw="bold" w="fit-content" text="Enter App"
                                click={() => pushPath(history, "explore")}
                            />
                        </YCenteredRowFlex>
                    </YCenteredColumnFlex>

                    {/* <Flex bg={tc[3]} w="25%" smw="0"  /> */}
                </Flex>

                {/* How it works */}
                <ColumnFlex w="100%" g="18px">
                    <Text cl={tc[1]} fs="24px" fw="bold" text="How it works" />

                    <ColumnFlex g="18px">
                        {
                            [
                                ["Easy", "Very easy to understand", KnowledgeIcon, "knowledge"],
                                ["Fast", "Incredible speed", GemIcon, "gem"],
                                ["Fun", "Simple yet Fascinating", KnowledgeIcon, "knowledge"]
                            ].map(
                                (item, i) =>
                                    <ColumnFlex key={i} bg={tc[3]} br="5px" p="18px" g="18px" >
                                        <YCenteredRowFlex m={i % 2 == 0 ? "" : m_l_a} g="9px">
                                            <SvgIcon svg={item[2]({ scale: 0.006 })} cpId={item[3]} bg={tc[1]} w={512} scale={0.06} />

                                            <CenteredText cl={tc[1]} fs="24px" fw="bold" text={item[0]} />
                                        </YCenteredRowFlex>


                                        <Text cl={tc[2]} ta="left" m={i % 2 == 0 ? "" : m_l_a} text={item[1]}
                                        />
                                    </ColumnFlex>
                            )
                        }
                    </ColumnFlex>
                </ColumnFlex>

                {/* Stat */}
                <ColumnFlex w="100%" g="18px">
                    <Text cl={tc[1]} fs="24px" fw="bold" text="Explore" />

                    <Flex g="18px" style={{ flexWrap: "wrap" }}>
                        {
                            ["Lessons", "Works", "Users"].map(
                                (item, i) =>
                                    <XCenteredColumnFlex key={i} b={`2px solid ${tc[3]}`} br="5px" p="18px" g="18px" style={{ flexGrow: 1 }}  >
                                        <Text cl={tc[1]} fs="60px" text={i * 100} />
                                        <Text cl={tc[2]} text={item} />
                                    </XCenteredColumnFlex>

                            )
                        }
                    </Flex>
                </ColumnFlex>

                {/* Category */}
                <ColumnFlex g="18px">
                    <Text cl={bt.text} fs="24px" fw="bold" text="Category" />

                    <Flex g="18px" wr="wrap">
                        {
                            [
                                ["Math", "https://cdn.pixabay.com/photo/2015/11/15/07/47/geometry-1044090__480.jpg"],
                                ["Physics", "https://cdn.pixabay.com/photo/2018/03/29/19/34/northern-lights-3273425__480.jpg"],
                                ["Astronomy", "https://cdn.pixabay.com/photo/2019/03/31/07/37/black-hole-4092609__340.jpg"]
                            ].map(
                                (item, i) =>
                                    <Flex key={i} pos="relative" br="5px" h="150px" o="hidden" style={{ flexGrow: 1 }}>
                                        <StyledImage src={item[1]}
                                            w="100%" style={{ objectFit: "cover" }} />

                                        <Text bg="#00000070" className="br-5-p-9" text={item[0]}
                                            style={{ position: "absolute", top: "9px", left: "9px" }} />
                                    </Flex>
                            )
                        }
                    </Flex>
                </ColumnFlex>

                {/* Call to Action */}
                <Flex bg={tc[5]} br="5px" h="fit-content" o="hidden" wr="wrap">
                    <ColumnFlex w="40%" smw="100%" p="18px" g="60px" style={{ minHeight: "200px" }}>
                        <Text cl="#fff" fs="20px" ta="justify"
                            text="❝ A Dyson sphere is a hypothetical megastructure that
                             completely encompasses a star and captures a large percentage of its power output ❞"
                            style={{ overflowWrap: "break-word" }}
                        />

                        <StyledButton className="br-5-p-9" bg="#00000030" hb="#00000050"
                            cl="#fff" fs="24px" fw="bold" w="fit-content" m="auto 0 0 0" text="Explore Now"
                            click={() => pushPath(history, "explore")}
                        />
                    </ColumnFlex>

                    <StyledImage src="https://cdn.pixabay.com/photo/2018/08/15/13/10/galaxy-3608029__340.jpg" w="50%"
                        style={{ flexGrow: 1 }}
                    />
                </Flex>

                {/* Footer */}
                <Flex w="100%">
                    <Text cl={tc[1]} text="© Bisp. All Rights Reserved" />
                </Flex>
            </XCenteredColumnFlex>
        </Centered>
    )
}

export { Landing };
