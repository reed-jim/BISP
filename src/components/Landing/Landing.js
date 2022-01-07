import { useEffect } from "react";
import { useHistory } from "react-router";
import { useQuery } from "../../hooks/useQuery";
import { useShowThenHideEffect } from "../../hooks/useShowThenHideEffect";
import { changePath, getSessionStorage, setSessionStorage } from "../../js/util";
import { UserService } from "../../services/user";
import { BackIcon, CopyIcon, EnterIcon } from "../../svg";
import { CenteredText, StyledButton, SvgIcon, Text } from "../Frame";
import { Status } from "../Question/addQuestion";
import { Centered, CenteredFlex, ColumnFlex, Flex, m_l_a, StyledImage, XCenteredColumnFlex, YCenteredColumnFlex, YCenteredRowFlex } from "../style/style";


const themeCollections = {
    light: {
        landing: ["#fff", "#222", "#777", "#ccc", "#bbb"],
        landingItem: ["#ccc", "#222", "#bbb"],
        friendDetail: ["#ccc", "#333", "#777", "#aaa", "#999"]
    },
    dark: {
        landing: ["#333", "#fff", "#aaa", "#444", "#555"],
        friendListItem: ["#555", "#fff", "#666"],
        friendDetail: ["#444", "#fff", "#aaa", "#666", "#555"]
    }
}

const Landing = (props) => {
    const tc = themeCollections[props.theme].landing;

    return (
        <Centered bg={tc[0]} w="100%" mh="100vh">
            <XCenteredColumnFlex bg={tc[0]} w="75%" mh="100vh" p="126px" g="126px">

                <Flex br="5px" w="100%" g="18px" o="hidden" style={{ minHeight: "300px", paddingBottom: "0", borderBottom: `2px solid ${tc[3]}` }}>
                    <YCenteredColumnFlex w="50%" g="18px">
                        <CenteredText cl={tc[1]} fs="60px" fw="bold" text="Placeholder" />

                        <Text cl={tc[2]} fs="20px" fw="" ta="left" w="100%" text="Explore the beauty of science right now!"
                            style={{ overflowWrap: "break-word" }}
                        />

                        <YCenteredRowFlex className="br-5-p-9" bg={tc[3]} hBg={tc[4]} w="fit-content">
                            <SvgIcon svg={EnterIcon({ scale: 0.005 })} cpId="enter" bg={tc[1]} w={512} scale={0.05} />

                            <StyledButton cl={tc[1]} fs="24px" fw="bold"
                                w="fit-content" text="Enter App" />
                        </YCenteredRowFlex>
                    </YCenteredColumnFlex>

                    <Flex bg={tc[3]} w="50%" />
                </Flex>

                {/* How it works */}
                <ColumnFlex w="100%" g="18px">
                    <Text cl={tc[1]} fs="24px" fw="bold" text="How it works" />

                    <ColumnFlex g="18px">
                        {
                            [
                                ["Easy", "Very easy to understand"],
                                ["Fast", "Incredible speed"],
                                ["Fun", "Simple yet Fascinating"]
                            ].map(
                                (item, i) =>
                                    <ColumnFlex key={i} bg={tc[3]} br="5px" p="18px" g="18px" >
                                        <YCenteredRowFlex m={i % 2 == 0 ? "" : m_l_a} g="18px">
                                            <SvgIcon svg={CopyIcon({ scale: 0.004 })} cpId="copy" bg={tc[1]} w={512} scale={0.04} />

                                            <Text cl={tc[1]} fs="24px" fw="bold" text={item[0]} />
                                        </YCenteredRowFlex>


                                        <Text cl={tc[2]} ta="left" m={i % 2 == 0 ? "" : m_l_a} text={item[1]}
                                        />
                                    </ColumnFlex>
                            )
                        }
                    </ColumnFlex>
                </ColumnFlex>


                <ColumnFlex w="100%" g="18px">
                    <Text cl={tc[1]} fs="24px" fw="bold" text="Explore" />

                    <Flex g="18px">
                        {
                            ["Lessons", "Works", "Users"].map(
                                (item, i) =>
                                    <XCenteredColumnFlex key={i} b={`2px solid ${tc[3]}`} br="5px" p="36px" g="18px" style={{ flexGrow: 1 }}  >
                                        <Text cl={tc[1]} fs="60px" text={i * 100} />
                                        <Text cl={tc[2]} text={item} />
                                    </XCenteredColumnFlex>

                            )
                        }
                    </Flex>
                </ColumnFlex>

                <Centered bg={tc[3]} br="5px" w="100%" h="150px" p="27px">

                </Centered>

                <Flex w="100%">
                    <Text text="© Bisp. All Rights Reserved" />
                </Flex>
            </XCenteredColumnFlex>
        </Centered>
    )
}

export { Landing };
