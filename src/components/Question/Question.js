import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../../css/style.css";
import { useHandleInput } from "../../hooks/useHandleInput";
import { useQuery } from "../../hooks/useQuery";
import { appendParam, getSessionStorage, pushPath, setSessionStorage, isNullOrUndefined } from "../../js/util";
import { getLastCollectionId, getQuestionCollections, getQuestions, sortBy } from "../../services/question";
import { CollectionResult } from "../../services/result.service";
import { CloseIcon } from '../../svg';
import { dogs } from "../../test/SampleData";
import { DropDown, StyledButton, SvgIcon, Text } from "../Frame";
import { Centered, ColumnFlex, Flex, XCenteredColumnFlex, YCenteredRowFlex } from "../style/style";



const COLLECTION_PER_PAGE = 8;

const themeCollections = {
    light: {
        questionRouter: ["#fff"],
        questionDashboard: ["#ddd", "#333"],
        qcDetail: ["#ddd", "#333", "#222"],
        question_list_item: ["#429241", "#ddd", "#ccc", "#222"],
        filterModal: ["#ddd", "#333", "#ccc"],
        questionDetail: ["#ddd", "#222", "#777", "#222", "#ccc"]
    },
    dark: {
        questionRouter: ["#333"],
        questionDashboard: ["#444", "#fff"],
        qcDetail: ["#444", "#555", "#fff"],
        question_list_item: ["#429241", "#444", "#555", "#fff"],
        filterModal: ["#444", "#fff", "#555"],
        questionDetail: ["#444", "#fff", "#666", "#bbb", "#555"]
    }
}

// Note: qc5 = question_collection with id = 5
// localhost:3000/eran/collection?id=0&question=all || localhost:3000/eran/collection?id=0
// localhost:3000/eran/collection?id=0&question=6

const QuestionRouter = (props) => {
    const query = useQuery();
    const theme = props.theme;
    const tc = themeCollections[props.theme].questionRouter;

    const collectionId = query.get("collection");
    const questionId = query.get("index");

    let component;

    if (collectionId == null && questionId == null) {
        component = <QuestionDashboard theme={theme} />
    }
    else if (collectionId != null && questionId == null) {
        component = <QuestionCollectionDetail theme={theme} />
    }
    else {
        component = <QuestionDetail theme={theme} />
    }

    return (
        <XCenteredColumnFlex bg={tc[0]} mh="100vh">
            {component}
        </XCenteredColumnFlex>
    )
}

const QuestionDashboard = (props) => {
    const history = useHistory();
    const [isFilterOpen, openFilter] = useState(false);
    const theme = props.theme;
    const tc = themeCollections[theme].questionDashboard;

    const getEndIndex = (start) => {
        const last = getSessionStorage("last_qc_id");
        let end = start + COLLECTION_PER_PAGE - 1;

        if (last < end) {
            end = last;
        }

        return end;
    }

    const renderQc = (start = 0) => {
        // const objs = getSessionStorage(`qc_from${start}_to${getEndIndex(start)}`)
        const objs = getSessionStorage("questionCollections");

        const arr = [];

        if (objs) {
            Object.entries(objs).forEach(([, value],) => arr.push(value));

            return arr.map((item, i) => <QuestionCollection key={i}
                id={item["_id"]} title={item["title"]} description={item["description"]}
                difficulty={i} creator={item["author"]} date={item["date"]} total={item["total"]}
                theme={theme}
            />)
        }
        else {
            // return "No collection";
            return <QuestionCollection difficulty={0} theme={theme} />
        }
    }

    useEffect(
        () => {
            getLastCollectionId().then(
                res => {
                    const lastId = res.data.index;

                    const storedLastId = getSessionStorage("last_qc_id");

                    if (storedLastId == null) {
                        setSessionStorage(`last_qc_id`, lastId);
                    }
                    else {
                        if (lastId != storedLastId) {
                            setSessionStorage(`last_qc_id`, lastId);
                        }
                    }

                    let end = COLLECTION_PER_PAGE - 1;

                    if (lastId < end) {
                        end = lastId;
                    }
                    // sort + limit

                    // sortBy("total").then(
                    //     res => {
                    //         const qcs = getSessionStorage("questionCollections") || {};

                    //         for (const key in res.data) {
                    //             const value = res.data[key];
                    //             const id = value._id;

                    //             qcs[id] = value;
                    //         }
                    //         setSessionStorage("questionCollections", qcs);    
                    //     }
                    // )


                    // if (storedLastId != lastId || storedLastId == null) {
                    //     getQuestionCollections(0, end).then(
                    //         res => {
                    //             setSessionStorage(`qc_from0_to${end}`, res.data);
                    //             setSessionStorage(`last_qc_id`, last);
                    //         }
                    //     )
                    // }
                }
            )

        }, []
    )

    return (
        <ColumnFlex w="70%" p="18px" g="18px" >

            <Flex g="18px">

                <Flex b={`2px solid ${tc[0]}`} br="5px" w="70%" h="150px">

                </Flex>

                <Flex b={`2px solid ${tc[0]}`} br="5px" w="30%" h="150px" gr="1">

                </Flex>
                {/* Limited */}
                {/* History */}
            </Flex>

            <Flex g="18px">
                <ColumnFlex w="70%" g="18px">

                    <Centered>
                        <Text cl={tc[1]} fw="bold" p="9px" text="Collections" />

                        {/* <StyledButton bg={tc[0]} br="5px" p="9px" m="0 0 0 auto" text="Add"
                            click={() => pushPath(history, "add")}
                        /> */}
                    </Centered>

                    <YCenteredRowFlex g="9px">
                        <StyledButton bg={tc[0]} br="5px" p="9px" m="0 0 0 auto" text="Add"
                            click={() => pushPath(history, "add")}
                        />
                        <StyledButton bg={tc[0]} br="5px" p="9px" text="Filter"
                            click={() => openFilter(true)}
                        />
                        <StyledButton bg={tc[0]} br="5px" p="9px" text="Sort"
                            click={() => pushPath(history, "add")}
                        />
                    </YCenteredRowFlex>

                    {
                        renderQc()
                    }

                </ColumnFlex>

                <ColumnFlex w="30%" g="18px">
                    <Centered>
                        <Text cl={tc[1]} fw="bold" p="9px 0" text="History" />
                    </Centered>

                    <ColumnFlex>
                        {/* <Text text="Your history goes here" /> */}

                        <Flex pos="relative">
                            <Flex bg="linear-gradient(45deg, #7838a9, #286f90)" br="5px" w="100%" h="150px" />
                            {/* <StyledImage src="https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616__340.jpg"
                            w="100%"
                        /> */}
                            <Text className="absolute-centered" cl={tc[1]} fs="24px" fw="bold" p="9px 0" text="No record" />
                        </Flex>
                    </ColumnFlex>
                </ColumnFlex>

            </Flex>

            {isFilterOpen && <FilterModal theme={theme} close={() => openFilter(false)} />}

        </ColumnFlex>
    )
}

const QuestionCollection = (props) => {
    const history = useHistory();
    const tc = themeCollections[props.theme].qcDetail;

    return (
        <ColumnFlex bg={tc[0]} br="5px" p="18px" g="18px" hBg={tc[1]}
            onClick={() => appendParam(history, `collection=${props.id}`)}
        >
            <ColumnFlex g="18px">
                {/* Title */}
                <YCenteredRowFlex g="9px">
                    <Text cl={tc[2]} fs="20px" fw="bold" p="5px" text={props.title} />
                    <Difficulty difficulty={props.difficulty} />
                </YCenteredRowFlex>

                {/* Author & Date */}
                <Flex g="18px">
                    <Text cl={tc[2]} text={props.creator} />
                    <Text cl={tc[2]} text={props.date} />
                </Flex>
                {/* Description */}
                <Text cl={tc[2]} ta="justify" text={props.descripton} />

                <YCenteredRowFlex g="9px">
                    <Text cl={tc[2]} fs="24px" fw="bold" p="0 9px 0 0" text={props.total + " Questions"} style={{ borderRight: "2px solid #fff" }} />
                    <Text cl={tc[2]} fs="24px" fw="bold" text="999" />
                    {/* <StyledButton br="5px" fs="24px" p="9px" m="0 0 0 auto" text="Eeen" /> */}

                </YCenteredRowFlex>

            </ColumnFlex>

        </ColumnFlex>
    )
}

const QuestionCollectionDetail = (props) => {
    const query = useQuery();

    const collectionId = query.get("collection");
    const theme = props.theme;
    const tc = themeCollections[theme].qcDetail;
    const [t, setT] = useState(false);

    const renderQuestions = () => {
        const questions = getSessionStorage(`qc${collectionId}`);
        
        if (questions && t) {
            return Object.values(questions).map(
                (item, i) => <QuestionListItem key={i} index={i} id={item._id} question={item.question}
                    isPassed={getSessionStorage("r").includes(item._id) ? true : false} theme={theme}
                />
            )
        }
        else {
            return <Text text="No question" />
        }
    }

    useEffect(
        () => {
            const cr = new CollectionResult();
            cr.get(0, collectionId).then(
                res => {
                    
                    const results = res.data.results;
                    
                    setSessionStorage("r", results);

                    setT(true);
                }
            )
            if (!getSessionStorage(`qc${collectionId}`)) {
                getQuestions(collectionId).then(
                    res => setSessionStorage(`qc${collectionId}`, res.data)
                )

                const questions = getSessionStorage(`qc${collectionId}`);

                // solution 2:
                // collectionAnswer: { _id, userid, collectionId, answers }

                

                

                // getUser(99).then(
                //     (user) => {
                //         const len = questions.length;
                //         const collectionAnswers = user.collectionAnswers;
                //         const collectionAnswer = Array(len).fill(false);
                //         // binary search
                //         // linear search
                //         for (let i = 0; i < collectionAnswers.length; i++) {
                //             if (collectionAnswers[i].collectionId == collectionId) {
                //                 const answers = collectionAnswers[i].answer;
                //                 for (let j = 0; j < len; j++) {
                //                     if (j < answers.length) {
                //                         if (answers[j] == true) {
                //                             // true
                //                         }
                //                     }
                //                 }
                //                 setSessionStorage(`qc_answer_${collectionId}`, answers);
                //                 break;
                //             }
                //         }
                //     }
                // )
            }
            
        }, []
    )

    return (
        <ColumnFlex w="50%" p="18px" g="9px" >
            <Text cl={tc[1]} fs="36px" fw="bold" text={`Collection ${collectionId}`} />

            {
                renderQuestions()
            }

        </ColumnFlex>
    )
}

const QuestionListItem = (props) => {
    const history = useHistory();
    const tc = themeCollections[props.theme].question_list_item;

    return (
        <YCenteredRowFlex bg={props.isPassed ? tc[0] : tc[1]} br="5px" p="9px" g="9px" hBg={tc[2]}
            onClick={() => appendParam(history, `index=${props.id}`)}>
            <Text cl={tc[3]} p="0 9px 0 0" text={props.index} style={{ borderRight: "2px solid #999" }} />
            <Text cl={tc[3]} text={props.question} />
        </YCenteredRowFlex>
    )
}

const QuestionDetail = (props) => {
    const query = useQuery();
    const [choice, choose] = useState(-1);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isSubmitModal, openSubmitModal] = useState(false);

    const collectionId = query.get("collection");
    const questionId = query.get("index");
    const detail = getSessionStorage(`qc${collectionId}`)[questionId];

    const tc = themeCollections[props.theme].questionDetail;

    const submit = () => {
        if (String.fromCharCode(65 + choice) == detail.correctAnswer) {
            const cr = new CollectionResult();

            const userId = 0;

            cr.get(userId, collectionId).then(
                res => {
                    const results = res.data.results;

                    if (results) {
                        let newCollectionResult = res.data;
                        newCollectionResult.results.push(questionId);
                    }
                    else {
                        cr.lastId().then(
                            res => {
                                const collectionResult = {
                                    id: res.data.index,
                                    userId: userId,
                                    collectionId: Number(collectionId),
                                    results: [questionId]
                                }

                                cr.add(collectionResult);
                            }
                        )
                    }
                }
            )
        }
        else {
            alert("Wrong")
        }
    }

    return (
        <ColumnFlex bg={tc[0]} br="5px" w="50%" p="18px" g="18px">
            <Text cl={tc[1]} fs="20px" fw="bold" text={detail.question} style={{ paddingBottom: "18px", borderBottom: "2px solid #666" }} />

            <ColumnFlex>

                {
                    Object.values(detail.answers).map(
                        (item, i) =>
                            <YCenteredRowFlex
                                key={i} bg={choice == i ? "#00000030" : ""} p="18px" g="18px" hBg="#00000030"
                                style={{ borderBottom: "2px solid #666" }}
                                onClick={() => choose(i)}
                            >
                                <Centered cl={tc[3]} style={{ fontSize: "28px", fontWeight: "bold" }}>
                                    {String.fromCharCode(65 + i)}
                                </Centered>

                                <Text cl={tc[1]} ta="justify" text={item} />
                            </YCenteredRowFlex>
                    )
                }

            </ColumnFlex>

            <YCenteredRowFlex>
                {isCorrect && <AnswerState />}
                <StyledButton hb={tc[4]} cl={tc[3]} br="5px" p="9px" m="0 0 0 auto" text="Submit" click={() => openSubmitModal(true)} />
            </YCenteredRowFlex>

            {isSubmitModal && <PromptModal close={() => openSubmitModal(false)} submit={submit} />}
        </ColumnFlex>
    )
}

const AnswerState = () => {
    return (
        <YCenteredRowFlex>
            <Text text="Correct" />
            <StyledButton text="Back to collection" />
        </YCenteredRowFlex>
    )
}

const PromptModal = (props) => {

    const submit = (params) => {
        // if (props.choice == 0) {
        //     props.setIsCorrect(true);
        //     // saveCorrectAnswer
        // }
        // else {
        //     props.setIsCorrect(false);
        // }
        // props.close();
        // props.setIsCorrect(true);
        props.close();
        props.submit();
    }

    return (
        <Centered pos="absolute" top="0" left="0" bg="#000000c0" w="100%" h="100%">
            <XCenteredColumnFlex bg="#555" br="5px" w="70%" p="9px" g="18px">
                <Text text="sure?" />
                <Flex g="18px">
                    <StyledButton bg="#333" text="Ok" click={submit} />
                    <StyledButton bg="#333" text="Cancel" click={props.close} />
                </Flex>
            </XCenteredColumnFlex>
        </Centered>
    )
}

const Difficulty = (props) => {
    const dif = props.difficulty;

    const difficulties = [
        ["#559c3d", "Very Easy"], ["#0264ca", "Easy"], ["#ff5454", "Hard"]
    ]

    return (
        <Text bg={difficulties[dif][0]} cl="#fff" br="5px" fs="20px" p="5px" fw="bold" text={difficulties[dif][1]} />
    )
}

const FilterModal = (props) => {
    const { input, getInput } = useHandleInput(["", "", ""]);
    const [updateTime, update] = useState(0)
    const tc = themeCollections[props.theme].filterModal;

    const getDropDownInput = (i, val) => {
        getInput(i, val);
        update(updateTime + 1);
    }

    return (
        <Centered pos="absolute" top="0" left="0" bg="#000000c0" w="100%" h="100%">
            <ColumnFlex bg={tc[0]} br="5px" w="40%" p="9px" g="9px">
                <YCenteredRowFlex>
                    <Text cl={tc[1]} fs="24px" fw="bold" text="Filter" />

                    <SvgIcon svg={CloseIcon({ scale: 0.004 })} cpId='close' bg={tc[1]} w={512} scale={0.04} m='0 0 0 auto'
                        click={props.close}
                    />
                </YCenteredRowFlex>
                <ColumnFlex g="9px">
                    {
                        Array(3).fill(0).map(
                            (item, i) =>
                                <YCenteredRowFlex key={i} bg={tc[2]} br="5px" p="9px">
                                    <Text cl={tc[1]} fw="bold" text="Difficulty" />
                                    <DropDown btnName="Choose" m="0 0 0 auto" setTo={i} getValue={getDropDownInput} />
                                </YCenteredRowFlex>
                        )
                    }
                </ColumnFlex>
                <Centered>
                    <StyledButton className="br5-p9-btn" cl={tc[1]} b={`2px solid ${tc[2]}`} w="100%" hb={tc[2]}
                        text="Apply" click={() => alert(input)} />
                </Centered>
            </ColumnFlex>
        </Centered>
    )
}

export { QuestionRouter, QuestionDashboard, QuestionDetail, QuestionCollectionDetail };
