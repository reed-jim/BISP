import { CenteredFlex, ColumnFlex, Flex, CenteredColumnFlex, XCenteredColumnFlex, YCenteredRowFlex } from "../style/style";
import { StyledButton, Text, TextWithIcon } from "../Frame";
import { dogs } from "../../test/SampleData";
import { useState } from "react";
import { questionCollections } from "../../test/SampleData";
import { useHistory, useParams } from "react-router";
import { appendPath } from "../../js/util";

const themeCollections = {
    // mapping: container, header, button
    light: ["#888", "#aaa", "#666"],
    dark: ["#222", "#444", "#aaa"]
}

const QuestionDashboard = (props) => {
    const theme = props.theme;
    const themeCollection = themeCollections[theme];

    return (
        <XCenteredColumnFlex bg={themeCollection[0]} mh="100vh">
            {/* <ColumnFlex bg={themeCollection[0]} br="5px" w="60%" p="18px"></ColumnFlex> */}

            <ColumnFlex w="70%" p="18px" g="18px" >

                <Flex g="18px">

                    <Flex b="2px solid #444" br="5px" p="18px" w="70%" h="150px">

                    </Flex>

                    <Flex b="2px solid #444" br="5px" p="18px" h="150px" gr="1">

                    </Flex>
                    {/* Limited */}
                    {/* History */}
                </Flex>

                <Text text="Collections" />

                <Flex g="18px">
                    <ColumnFlex w="70%" g="18px">

                        {
                            questionCollections.map(
                                (item, i) => <QuestionCollection key={i} title={item[0]} id={1464 + i}
                                    difficulty={item[1]} creator={item[2]} descripton={item[3]} total={item[4]}

                                    theme={theme} />
                            )
                        }

                    </ColumnFlex>

                    <ColumnFlex gr={1}>
                        <StyledButton bg="#80f" br="5px" p="9px" text="Add" />
                    </ColumnFlex>
                </Flex>

            </ColumnFlex>

        </XCenteredColumnFlex>
    )
}

const QuestionCollection = (props) => {
    const history = useHistory();
    const themeCollection = themeCollections[props.theme];

    return (
        <ColumnFlex bg={themeCollection[1]} br="5px" p="18px" g="18px" hBg="#555" onClick={() => appendPath(history, props.id)}>
            <ColumnFlex g="18px">
                {/* Title */}
                <YCenteredRowFlex g="9px">
                    <Text fs="20px" fw="bold" text={props.title} />
                    <Difficulty difficulty={props.difficulty} />
                </YCenteredRowFlex>

                {/* Author & Date */}
                <Flex g="18px">
                    <Text text={props.creator} />
                    <Text cl={themeCollection[2]} text="24/5/2022" />
                </Flex>
                {/* Description */}
                <Text cl={themeCollection[2]} ta="justify" text={props.descripton} />

                <YCenteredRowFlex g="9px">
                    <Text fs="24px" fw="bold" p="0 9px 0 0" text={props.total + " Questions"} style={{ borderRight: "2px solid #fff" }} />
                    <Text fs="24px" fw="bold" text="999" />
                    {/* <StyledButton br="5px" fs="24px" p="9px" m="0 0 0 auto" text="Eeen" /> */}

                </YCenteredRowFlex>

            </ColumnFlex>

        </ColumnFlex>
    )
}


const QuestionCollectionDetail = (props) => {
    const theme = props.theme;
    const themeCollection = themeCollections[theme];

    const { id } = useParams();

    return (
        <XCenteredColumnFlex bg={themeCollection[0]} mh="100vh" g="18px">


            <ColumnFlex w="70%" p="18px" g="18px" >
                <Text fs="36px" fw="bold" text={`Collection ${id}`} />

                {
                    ["0", "1", "2"].map(
                        (item, i) => <QuestionListItem key={i} id={i} />
                    )
                }


            </ColumnFlex>

        </XCenteredColumnFlex>
    )
}

const QuestionListItem = (props) => {
    const history = useHistory();

    return (
        <YCenteredRowFlex bg="#444" br="5px" p="9px" g="9px" hBg="#333" onClick={() => appendPath(history, props.id)}>
            <Text p="0 9px 0 0" text="0" style={{ borderRight: "2px solid #999" }} />
            <Text text="Content 0" />


        </YCenteredRowFlex>
    )
}

const QuestionDetail = () => {
    const [chosen, choose] = useState(-1);

    return (
        <ColumnFlex bg="#444" br="5px" w="60%" p="18px" g="18px">
            <Text fs="20px" fw="bold" text="Question" style={{ paddingBottom: "18px", borderBottom: "2px solid #666" }} />

            <ColumnFlex>

                {
                    dogs.map(
                        (item, i) =>
                            <YCenteredRowFlex key={i} bg={chosen == i ? "#00000030" : ""} p="18px" g="18px" hBg="#00000030"
                                style={{ borderBottom: "2px solid #666" }}
                                onClick={() => choose(i)}
                            >
                                <Text cl="#999" fs="20px" fw="bold" text={String.fromCharCode(65 + i)} />
                                {/* <StyledInput type="checkbox" /> */}
                                <Text ta="justify" text={item} />

                            </YCenteredRowFlex>
                    )
                }

            </ColumnFlex>

            <StyledButton bg="#333" br="5px" p="9px" m="0 0 0 auto" text="Submit" />
        </ColumnFlex>
    )
}

const Difficulty = (props) => {
    const dif = props.difficulty;

    const difficulties = [
        ["#84fff4", "Very Easy"], ["#6eff54", "Easy"], ["#ff5454", "Hard"]
    ]

    return (
        <Text bg={difficulties[dif][0]} cl="#222" br="5px" fs="20px" p="5px" fw="bold" text={difficulties[dif][1]} />
    )
}

export { QuestionDashboard, QuestionDetail, QuestionCollectionDetail }
