import { useHistory, useParams } from "react-router";
import { useQuery } from "../../hooks/useQuery";
import { appendPath } from "../../js/util";
import { questionCollections } from "../../test/SampleData";
import { StyledButton, Text, DropDown } from "../Frame";
import { Flex, CenteredColumnFlex, ColumnFlex, StyledInput, XCenteredColumnFlex, YCenteredRowFlex } from "../style/style";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useHandleInput } from "../../hooks/useHandleInput";
import { addQuestion } from "../../services/question";

const themeCollections = {
    // mapping: container, header, button
    light: ["#888", "#aaa", "#666"],
    dark: ["#222", "#444", "#aaa"]
}

// AddQuestionCollectionForm collection?id=1464

const AddQuestionManager = () => {
    const query = useQuery();

    const test = query.get("question");

    let component;

    switch (test) {
        case null: component = <QuestionCollection />; break;
        case "all": component = <QuestionCollectionDetail theme="dark" />; break;
        default: component = <QuestionDetail theme="dark" />; break;
    }

    return (
        component
    )
}

const QuestionCollection = () => {
    const history = useHistory();

    return (
        <XCenteredColumnFlex getTheme={true} mh="100vh">
            <ColumnFlex bg="#444" w="50%" p="18px" g="18px">
                <Text fs="36px" fw="bold" text="Add New" />

                <ColumnFlex>
                    <Text cl="#888" fs="16px" fw="bold" text="Title" />

                    <StyledInput cl="#888" phcl="#888" b="2px solid #888" p="9px" placeholder="Enter title" />
                </ColumnFlex>

                <ColumnFlex>
                    <Text cl="#888" fs="16px" fw="bold" text="Description" />
                    {/* <textarea /> */}
                    <StyledInput cl="#888" phcl="#888" b="2px solid #888" p="9px" placeholder="Enter title" />
                </ColumnFlex>

                <CenteredColumnFlex b="2px solid #888" br="5px" p="27px" hBg="#555"
                    onClick={() => appendPath(history, "collection?id=1464&question=all")}>
                    <Text fs="24px" fw="bold" text="Click here to add question" />

                    {/* <Flex>
                    
                        <StyledButton bg="#444" w="fit-content" m="0 0 0 auto" text="More" />
                    </Flex> */}
                </CenteredColumnFlex>

                <StyledButton bg="#444" w="fit-content" m="0 0 0 auto" text="Save" />
            </ColumnFlex>
        </XCenteredColumnFlex>
    )
}

const QuestionCollectionDetail = (props) => {

    const theme = props.theme;
    const themeCollection = themeCollections[theme];

    const { id } = useParams();

    return (
        <XCenteredColumnFlex bg={themeCollection[0]} mh="100vh" g="9px">

            <ColumnFlex w="70%" p="18px" g="9px" >
                <Text fs="36px" fw="bold" text={`Collection ${id}`} />

                {
                    ["0", "1", "2"].map(
                        (item, i) => <QuestionListItem key={i} id={i} no={i} />
                    )
                }
                <StyledButton text="Add" />
            </ColumnFlex>

        </XCenteredColumnFlex>
    )
}

const QuestionListItem = (props) => {
    const history = useHistory();

    return (
        <YCenteredRowFlex bg="#444" br="5px" p="9px" g="9px" hBg="#333" onClick={() => appendPath(history, props.id)}>
            <Text p="0 9px 0 0" text={props.no} style={{ borderRight: "2px solid #999" }} />
            <Text text="Content 0" />


        </YCenteredRowFlex>
    )
}

let inputs = { title: '', row0: '' };

const QuestionDetail = (props) => {
    const [chosen, choose] = useState(-1);
    const theme = props.theme;
    const themeCollection = themeCollections[theme];

    const inputHandler = useHandleInput(["", "", "", "", "", ""]);

    const post = () => {
        alert(inputHandler.input);

        // const data = Object.assign(inputHandler.input)
        // addQuestion(data);
    }

    const getDropDownValue = (value) => {
        inputHandler.getInput(5, value);
    }

    // Verified
    return (
        // <XCenteredColumnFlex bg={themeCollection[0]} mh="100vh" g="9px">

        //     <ColumnFlex w="70%" p="18px" g="9px" >
        //         <Text fs="36px" fw="bold" m='0 0 0 auto' text={`Question ${id}`} />

        //         <ColumnFlex>
        //             <Text cl="#888" fs="16px" fw="bold" text="Question" />

        //             <StyledInput cl="#888" phcl="#888" b="2px solid #555" p="9px" placeholder="Enter title" fb="2px solid #ccc" />
        //         </ColumnFlex>

        //         <ColumnFlex>
        //             <Text cl="#888" fs="16px" fw="bold" text="Answer" />

        //             <StyledInput cl="#888" phcl="#888" b="2px solid #555" p="9px" placeholder="Enter title" fb="2px solid #ccc" />
        //         </ColumnFlex>

        //         <StyledButton text="Save" />
        //     </ColumnFlex>

        // </XCenteredColumnFlex>


        <ColumnFlex bg="#444" br="5px" w="60%" p="18px" g="18px">
            <StyledInput cl="#fff" phcl="#666" fs="20px" fw="bold" b="0px solid #555" w='fit-content' p="0px" placeholder="Enter question"
                style={{ paddingBottom: "18px", borderBottom: "2px solid #666" }}
                onChange={(e) => inputHandler.getInput(0, e.target.value)}
            />
            {/* <Text fs="20px" fw="bold" text="Question" style={{ paddingBottom: "18px", borderBottom: "2px solid #666" }} /> */}

            <ColumnFlex>

                {
                    Array(4).join().split(',').map(
                        (item, i) =>

                            <YCenteredRowFlex key={i} bg={""} p="18px" g="18px" hBg="#00000030"
                                style={{ borderBottom: chosen == i ? "2px solid #fff" : "2px solid #666" }}
                                onClick={() => choose(i)}
                            >
                                <Text cl="#999" fs="20px" fw="bold" text={String.fromCharCode(65 + i)} />
                                <StyledInput cl="#fff" phcl="#666" fs="20px" fw="bold"
                                    b="0px solid #555" p="0px" placeholder="Enter Answer"
                                    style={{ borderBottom: "0px solid #666" }}
                                    onChange={(e) => inputHandler.getInput(i + 1, e.target.value)}
                                />


                            </YCenteredRowFlex>
                    )
                }

            </ColumnFlex>

            <YCenteredRowFlex pos="relative" g='18px'>
                <Text cl="#999" fs="16px" fw="bold" text='The correct answer is:' />
                {/* <StyledButton bg="#333" br="5px" p="9px" text="Choose" click={() => post()} /> */}

                <DropDown btnName="Choose" getValue={getDropDownValue} />
            </YCenteredRowFlex>
                
            <StyledButton bg="#333" br="5px" p="9px" m="0 0 0 auto" text="Submit" click={() => post()} />
        </ColumnFlex>
    )
}

export { AddQuestionManager };
