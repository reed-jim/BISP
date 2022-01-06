import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../../css/style.css";
import { useHandleInput } from "../../hooks/useHandleInput";
import { useQuery } from "../../hooks/useQuery";
import { appendParam, changePath, getSessionStorage, pushPath, setSessionStorage } from "../../js/util";
import { addQuestionCollection, updateQuestionCollection, getLastCollectionId, getLastQuestionId, addQuestion } from "../../services/question";
import { DropDown, StyledButton, Text } from "../Frame";
import { Centered, CenteredColumnFlex, CenteredFlex, ColumnFlex, m_l_a, StyledInput, XCenteredColumnFlex, YCenteredRowFlex } from "../style/style";
import { useShowThenHideEffect } from "../../hooks/useShowThenHideEffect";

const themeCollections = {
    light: {
        router: ["#fff"],
        questionCollection: ["#ddd", "#333", "#222", "#bbb", "#bbb"],
        questionCollectionDetail: ["#ddd"],
        questionDetail: ["#ddd", "#222", "#777", "#222", "#ccc"],
        dropDown: ["#ccc", "#bbb", "#222"],
        collectionItem: ["#ccc", "#bbb"]

    },
    dark: {
        router: ["#333"],
        questionCollection: ["#444", "#fff", "#ddd", "#666", "#666"],
        questionCollectionDetail: ["#444"],
        questionDetail: ["#444", "#fff", "#666", "#bbb", "#555"],
        dropDown: ["#555", "#666", "#fff"],
        collectionItem: ["#555", "#666"]
    }
}

// AddQuestionCollectionForm collection?id=1464

const AddQuestionManager = (props) => {
    const query = useQuery();

    const theme = props.theme;
    const tc = themeCollections[theme].router;

    const questionId = query.get("question");

    let component;

    switch (questionId) {
        case null: component = <QuestionCollection theme={theme} />; break;
        case "all": component = <QuestionCollectionDetail theme={theme} />; break;
        default: component = <QuestionDetail theme={theme} />; break;
    }

    return (
        <XCenteredColumnFlex bg={tc[0]} mh="100vh" p="18px" g="18px">
            {component}
        </XCenteredColumnFlex>
    )
}

const QuestionCollection = (props) => {
    const [chosen, choose] = useState(-1);
    const history = useHistory();
    const { input, getInput } = useHandleInput({});
    const saveStatusDisplayer = useShowThenHideEffect(1);

    const tc = themeCollections[props.theme].questionCollection;
    const collectionId = getSessionStorage("collectionId");
    const qc = getSessionStorage(`qc${collectionId}`);

    useEffect(
        () => {
            if (!getSessionStorage("collectionId")) {
                getLastCollectionId().then(
                    res => {
                        setSessionStorage("collectionId", res.data.index)
                    }
                )
            }
        }, []
    )

    const save = () => {
        let data;

        const id = getSessionStorage("collectionId");

        if (!getSessionStorage(`qc${id}`)) {
            data = {
                id: id,
                title: input.title,
                description: input.description,
                author: "someone",
                date: Date.now()
            };

            addQuestionCollection(data);
        }
        else {
            updateQuestionCollection(id, data)
        }

        saveStatusDisplayer.show();
        setSessionStorage(`qc${id}`, data);
    }

    const discard = () => {

    }

    const toCollection = () => {
        const id = getSessionStorage("collectionId") || 9;
        pushPath(history, `collection?id=${id}&question=all`)
    }

    return (
        <>
            <Status isShow={saveStatusDisplayer.isShow} />

            <ColumnFlex bg={tc[0]} br="5px" w="50%" p="18px" g="18px">
                <Text cl={tc[1]} fs="36px" fw="bold" text={qc ? "Edit" : "Add New"} />
                {/* Title */}
                <ColumnFlex>
                    <Text cl={tc[1]} fs="16px" fw="bold" text="Title" />

                    <StyledInput cl={tc[1]} phcl={tc[1]} b={chosen == 0 ? `2px solid ${tc[2]}` : `2px solid ${tc[3]}`} p="9px"
                        placeholder={qc ? qc.title : "Enter title"}
                        onClick={() => choose(0)}
                        onChange={(e) => getInput("title", e.target.value)}
                    />
                </ColumnFlex>
                {/* Description */}
                <ColumnFlex>
                    <Text cl={tc[1]} fs="16px" fw="bold" text="Description" />
                    {/* <textarea /> */}
                    <StyledInput cl={tc[1]} phcl={tc[1]} b={chosen == 1 ? `2px solid ${tc[2]}` : `2px solid ${tc[3]}`} p="9px"
                        placeholder="Enter description"
                        onClick={() => choose(1)}
                        onChange={(e) => getInput("description", e.target.value)}
                    />
                </ColumnFlex>
                {/* Questions */}
                <CenteredColumnFlex b={`2px solid ${tc[3]}`} br="5px" p="27px" hBg={tc[3]}
                    onClick={() => toCollection()}
                >
                    <Text cl={tc[1]} fs="24px" fw="bold" text={"Click here to add question"} />
                </CenteredColumnFlex>

                <StyledButton bg="none" hb={tc[4]} cl={tc[1]} br="5px" w="fit-content" p="9px" m={m_l_a} text="Save" click={() => save()} />
            </ColumnFlex>
        </>
    )
}

const QuestionCollectionDetail = (props) => {
    const history = useHistory();
    const query = useQuery();

    const theme = props.theme;
    const tc = themeCollections[theme].questionCollectionDetail;

    const qc = getSessionStorage(`qc${query.get("id")}`) || "";
    const questions = getSessionStorage("add_questions");

    const save = () => {
        const id = getSessionStorage("collectionId");

        let questionIds = {};
        for (const item in questions) {
            questionIds.push(item.id);
        }

        qc.questionIds = questionIds;

        if (qc) {
            updateQuestionCollection(id, qc)
        }
        else {
            qc._id = id;
            addQuestionCollection(qc);
        }
    }

    return (
        <ColumnFlex bg={tc[0]} w="50%" br="5px" p="18px" g="18px" >
            <Text fs="36px" fw="bold" text={`Collection ${query.get("id")}`} />

            <Text fs="16px" fw="bold" text={qc.title || "Title"} />
            <Text fs="16px" text={qc.description || "Description"} />

            {
                questions &&
                <ColumnFlex g="9px">
                    {
                        Object.values(questions).slice(0, Object.keys(questions).length - 1).map(
                            (item, i) => <QuestionListItem key={i} id={i} no={i} content={item.question}
                                themeCollection={themeCollections[theme].collectionItem}
                            />
                        )
                    }
                </ColumnFlex>
            }

            {
                !questions &&
                <Centered bg="linear-gradient(45deg, #333, #222)" cl="#fff" br="5px" h="200px">
                    <Text fs="24px" fw="bold" text="No Collection" />
                </Centered>
            }

            <YCenteredRowFlex g="9px">
                <StyledButton className="br-5-p-9" bg="#555" m={m_l_a} text="Add"
                    click={() => changePath(history, `collection?id=${query.get("id")}&question=new`)} />
                <StyledButton className="br-5-p-9" bg="#f82f2f" text="Discard" />
            </YCenteredRowFlex>
        </ColumnFlex>
    )
}

const QuestionListItem = (props) => {
    const history = useHistory();

    const tc = props.themeCollection;

    return (
        <YCenteredRowFlex bg={tc[0]} br="5px" p="9px" g="9px" hBg={tc[1]} onClick={() => pushPath(history, props.id)}>
            <Text p="0 9px 0 0" text={props.no} style={{ borderRight: "2px solid #999" }} />
            <Text text={props.content} />


        </YCenteredRowFlex>
    )
}

const QuestionDetail = (props) => {
    const [chosen, choose] = useState(-1);
    const query = useQuery();
    const { input, getInput } = useHandleInput({});
    const saveStatusDisplayer = useShowThenHideEffect(1);

    const theme = props.theme;
    const tc = themeCollections[theme].questionDetail;

    useEffect(
        () => {
            if (!getSessionStorage("questionId")) {
                getLastQuestionId().then(
                    res => setSessionStorage("questionId", res.data.index)
                )
            }
        }, []
    )

    const save = () => {
        // // save to db
        // const collectionId = getSessionStorage("collectionId");
        // const questionId = getSessionStorage("questionId");
        // let qc = getSessionStorage(`qc${collectionId}`);

        // if (collectionId == null || !questionId == null) {
        //     console.log("Can't fetch id");
        //     return
        // }

        // if (!qc) {
        //     qc = {
        //         id: collectionId,
        //         title: `Collection ${collectionId}`,
        //         description: "Simply a Intesting collection",
        //         author: getSessionStorage("user") || "0x00",
        //         date: Date.now()
        //     }
        //     addQuestionCollection(qc);
        //     setSessionStorage(`qc${collectionId}`, qc)
        // }

        // let question = input;
        // question.id = questionId;
        // question.collectionId = collectionId;

        // addQuestion(question);
        // setSessionStorage("questionId", questionId + 1)
        // // save to session storage
        // let questions = getSessionStorage("add_questions");

        // if (questions) {
        //     questions.index++;
        //     const index = questions.index
        //     questions[index] = input;
        // }
        // else {
        //     questions = {};
        //     questions.index = 0;
        //     const index = questions.index
        //     questions[index] = input;
        // }

        // setSessionStorage("add_questions", questions);
        saveStatusDisplayer.show();
    }

    const getDropDownValue = (value) => {
        getInput("correctAnswer", value);
    }

    // Verified
    return (
        <>
        <Status isShow={saveStatusDisplayer.isShow} />
        
        <ColumnFlex bg={tc[0]} br="5px" w="50%" p="18px" g="18px">
            
            <StyledInput
                cl={tc[1]} phcl={tc[2]} fs="20px" fw="bold" b="0" w='fit-content' p="0px"
                placeholder="Enter question"
                style={{ paddingBottom: "18px", borderBottom: `2px solid ${tc[2]}` }}
                onChange={(e) => getInput("question", e.target.value)}
            />

            <ColumnFlex>
                {
                    Array(4).fill("").map(
                        (item, i) =>
                            <YCenteredRowFlex
                                key={i} bg={""} p="18px" g="18px" hBg="#00000030"
                                style={{ borderBottom: chosen == i ? `2px solid ${tc[1]}` : `2px solid ${tc[2]}` }}
                                onClick={() => choose(i)}
                            >
                                <CenteredFlex cl={tc[3]} style={{ fontSize: "28px", fontWeight: "bold" }}>
                                    {String.fromCharCode(65 + i)}
                                </CenteredFlex>

                                <StyledInput
                                    cl={tc[1]} phcl={tc[2]} fs="16px" fw="bold" b="0"
                                    p="0px" placeholder="Enter Answer"
                                    onChange={e => getInput(`answer${i}`, e.target.value)}
                                />
                            </YCenteredRowFlex>
                    )
                }
            </ColumnFlex>

            <YCenteredRowFlex pos="relative" g='18px'>
                <Text cl={tc[3]} fs="16px" fw="bold" text='The correct answer is:' />

                <DropDown btnName="Choose"
                    options={["A", "B", "C", "D"]}
                    themeCollection={themeCollections[theme].dropDown}
                    getValue={getDropDownValue} />
            </YCenteredRowFlex>

            <StyledButton hb={tc[4]} cl={tc[3]} br="5px" p="9px" m={m_l_a} text="Submit" click={() => save()} />
        </ColumnFlex>
        </>
    )
}

const Status = (props) => {
    const isShow = props.isShow
    // style={{ opacity: isShow ? 1 : 0 }}
    return (
        <CenteredFlex bg="#51a934" br="5px" w="100%" p="9px" tr="all 0.5s"
            style={{ opacity: isShow ? "1" : 0 }}
        >
            <Text text={props.status} />
        </CenteredFlex>
    )
}

export { AddQuestionManager, QuestionCollectionDetail, Status };
