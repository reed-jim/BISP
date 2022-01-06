import { useEffect, useState } from "react";
import "../../css/animation.css";
import { StyledButton, Text, SvgIcon } from "../Frame";
import { Flex, CenteredFlex, ColumnFlex, StyledInput, XCenteredColumnFlex, m_l_a, YCenteredRowFlex } from "../style/style";
import { useHandleInput, useHandleInputChanged } from "../../hooks/useHandleInput";
import { addFeed } from "../../services/feed";
import { CloseIcon } from "../../svg";
import { useRef } from "react";
import { useComponentLifetimeStorage } from "../../hooks/useComponentLifetimeStorage";
import { isNullOrUndefined } from "../../js/util";
import { Status } from "../Question/addQuestion";
import { useShowThenHideEffect } from "../../hooks/useShowThenHideEffect";


// camelCase

const add_row_effect = () => {
    const row = document.getElementById("last-row");

    if (row) row.classList.toggle("hide");
}

const themeCollections = {
    // mapping: container, header, button
    light: ["#ddd", "#aaa", "#222", "#888"],
    dark: ["#444", "#666", "#bbb", "#555"]
}

let inputs = { title: "", row0: "" };



const AddModal = (props) => {
    const [numRow, setRow] = useState(1);
    const [selected, select] = useState(-1);
    const { storage, store } = useComponentLifetimeStorage();
    const { input, getInput } = useHandleInput({});
    const saveStatusDisplayer = useShowThenHideEffect(1.3);

    const tc = themeCollections[props.theme];
    const rowsToEdit = props.rowsToEdit || [];

    // add row effect
    useEffect(() => {
        if (!isNullOrUndefined(storage.prevNumRow)) {
            if (storage.prevNumRow != numRow) {
                store("prevNumRow", numRow);
                add_row_effect();
            }
        }
        else {
            store("prevNumRow", numRow);
        }
    })
    // set initial input value
    useEffect(() => {
        for (let i = 0; i < rowsToEdit.length; i++) {
            getInput(`row${i}`, rowsToEdit[i]);
        }
    }, [])

    const renderRowsToEdit = () => {
        if (rowsToEdit != undefined) {
            return rowsToEdit.map(
                (item, i) => inputField(i, false, true, item)
            )
        }
    }

    const renderNewRows = () => {
        let numRowToEdit = 0;

        if (rowsToEdit != undefined) {
            numRowToEdit = rowsToEdit.length;
        }

        return Array(numRow).fill().map(
            (item, i) =>
                i > 0 && i === numRow - 1 ?
                    inputField(i + numRowToEdit, true) : inputField(i + numRowToEdit, false)
        )
    }

    const submit = () => {
        props.submit(input);

        saveStatusDisplayer.show();
    }

    const inputField = (i, isLast, isEdit, placeholder) => {
        return (
            <StyledInput
                key={i}
                id={isLast ? "last-row" : ""} className={isLast ? (storage.prevNumRow != numRow ? "hide" : "") : ""}
                cl={tc[2]} phcl={isEdit ? tc[2] : ""} b={`2px solid ${selected == i + 1 ? tc[2] : tc[1]}`} p="9px"
                style={{ maxHeight: "100px", transition: "all 0.3s" }}
                placeholder={placeholder || "Great lesson goes here..."}
                onClick={() => select(i + 1)}
                onChange={e => getInput("row" + i, e.target.value)}
            />
        )
    }

    return (
        <CenteredFlex pos="fixed" top="0" left="0" bg="#000000f0" w="100vw" h="100vh" z="1">
            <XCenteredColumnFlex bg={tc[0]} br="5px" w="50%" h="fit-content" o="hidden">

                <CenteredFlex bg={tc[1]} w="100%" p="18px">
                    <Text cl={tc[2]} fs="24px" fw="bold" text="Add new item" />

                    <SvgIcon svg={CloseIcon({ scale: 0.0035 })} cpId="close" bg={tc[2]} w={512} scale={0.035} m={m_l_a}
                        click={props.close}
                    />
                </CenteredFlex>

                <ColumnFlex w="100%" p="18px" g="18px">
                    {/* Title */}
                    <ColumnFlex g="3px">
                        <Text cl={tc[2]} fw="bold" text="Title" />

                        <StyledInput cl={tc[2]}
                            b={`2px solid ${selected == 0 ? tc[2] : tc[1]}`} p="9px" placeholder="Enter title"
                            onClick={() => select(0)}
                            onChange={e => getInput("title", e.target.value)}
                        />
                    </ColumnFlex>
                    {/* Content */}
                    <ColumnFlex g="3px" style={{ paddingBottom: "18px", borderBottom: "2px solid #666" }}>
                        <Text cl={tc[2]} fw="bold" text="Content" />

                        <ColumnFlex g="18px">

                            {
                                renderRowsToEdit()
                            }

                            {
                                renderNewRows()
                            }

                            <StyledButton bg={tc[1]} cl={tc[2]} br="5px" p="9px" text="Add Row" click={() => { setRow(numRow + 1); }} />
                        </ColumnFlex>
                    </ColumnFlex>

                    <YCenteredRowFlex g="9px">
                        <Status status="Feed Added!" isShow={saveStatusDisplayer.isShow} />

                        <StyledButton bg={tc[1]} hb={tc[3]} cl={tc[2]} br="5px" p="9px" m={m_l_a} hBg="#333" text="Submit"
                            click={() => submit()}
                        />
                    </YCenteredRowFlex>

                </ColumnFlex>
                {/* Preview */}

            </XCenteredColumnFlex>
        </CenteredFlex>
    )
}

const name = (params) => {

}

export { AddModal };
