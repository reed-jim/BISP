import { useState } from "react";
import { Link } from "react-router-dom";
import { CenteredFlex, BasicButton, StyledText, StyledImage, Centered, YCenteredRowFlex, Flex, ColumnFlex } from "./style/style";
import { br_5, px_9 } from "./style/style";

import { useCustomTheme } from "../hooks/useTheme";


const StyledButton = (props) => {
    return (
        <BasicButton
            className={props.className}
            bg={props.bg || "transparent"} b={props.b} br={props.br} w={props.w} h={props.h}
            p={props.p} m={props.m}
            hb={props.hb} hc={props.hc}
            style={props.style}
            onClick={() => props.click()}
            ref={props.iref}
        >
            <Centered>
                <StyledText cl={props.cl} hc={props.hc} fs={props.fs} fw="bold">{props.text}</StyledText>
            </Centered>
        </BasicButton>
    )
}

const IconButton = (props) => {
    return (
        <CenteredFlex bg={props.bg || "transparent"} br={props.br} w={props.w} h={props.h} hBg={props.hBg} onClick={() => props.click()}>
            <BasicButton bg="transparent" cl={props.cl} h={props.iconH}>
                <StyledImage h="100%" src={props.src} alt="" />
            </BasicButton>
        </CenteredFlex>
    )
}

const Badge = (props) => {
    return (
        <CenteredFlex
            bg={props.bg} cl={props.cl} br={br_5} w={props.w} h={props.h || "25px"}
            p={props.p || px_9} m={props.m}
            hBg={props.hb} hc={props.hc}
        >
            <StyledText fs={props.fs || "14px"} fw={props.fw}>{props.text}</StyledText>
        </CenteredFlex>
    )
}

const StyledRouteLink = (props) => {
    return (
        <Link to={props.to} style={{ textDecoration: "none" }}>
            <Badge bg={props.bg} cl={props.cl} br={br_5} w={props.w} h={props.h} p={props.p} hb={props.hb} hc={props.hc} fw="bold"
                text={props.text}
            />
        </Link>
    )
}

const SvgIcon = (props) => {
    let size = props.w || props.h;
    size *= 1 * props.scale;
    size += "px";

    return (
        <CenteredFlex bg="none" m={props.m} onClick={props.click}>
            {props.svg}
            <img
                style={{
                    clipPath: `url(#${props.cpId})`,
                    background: props.bg,
                    width: size,
                    height: size,
                }}
                alt=""
            />
        </CenteredFlex>
    )
}

const Text = (props) => {
    return (
        <StyledText
            className={props.className} bg={props.bg} hBg={props.hBg} cl={props.cl} hc={props.hc} b={props.b} br={props.br}
            fs={props.fs} fw={props.fw} ta={props.ta} w={props.w} p={props.p} m={props.m} style={props.style}
        >
            {props.text}
        </StyledText>
    )
}

const TextWithIcon = (props) => {
    return (
        <YCenteredRowFlex bg={props.cbg || "none"} g="9px">
            <SvgIcon svg={props.svg} cpId={props.id} bg={props.bg} w={512} scale={0.05} />

            <Flex
                cl={props.cl} br={props.br}
                w={props.w} p={props.p} m={props.m}
                style={{ fontFamily: "sans-serif", fontSize: props.fs, fontWeight: props.fw, textAlign: props.ta }}
            >
                {props.text}
            </Flex>
        </YCenteredRowFlex>
    )
}

// const dropDownThemeCollections = {
//     light: []
// }

const DropDown = (props) => {
    const [isExpand, expand] = useState(false);
    const [chosen, choose] = useState(null);

    const chooseOption = (value) => {
        props.getValue(value);
        choose(value);
        expand(false);
    }

    const tc = props.themeCollection;

    return (
        <ColumnFlex pos="relative" m={props.m} g={isExpand ? "9px" : "0"} tr="gap 0.5s">
            <StyledButton bg={tc[0]} cl={tc[2]} br="5px" fs="16px" p="9px" hb={tc[1]}
                text={chosen || props.btnName} click={() => expand(!isExpand)}
            />

            <ColumnFlex pos="absolute" top="110%" br="5px" w="100%" h="" o="auto" z="2" tr="all 0.3s"
                style={{ transform: isExpand ? "scaleY(1)" : "scaleY(0)", transformOrigin: "top", maxHeight: "150px" }}>
                {
                    props.options.map(
                        (item, i) =>
                            <Centered key={i} bg={tc[0]} w="100%" p="18px" hBg={tc[1]} onClick={() => chooseOption(item)}>
                                <Text cl={tc[2]} text={item} />
                            </Centered>
                    )
                }
            </ColumnFlex>
        </ColumnFlex>
    )
}

const CenteredText = (props) => {
    return (
        <Flex
            bg={props.bg} cl={props.cl} br={props.br}
            w={props.w} p={props.p} m={props.m}
            style={{ fontFamily: "system-ui", fontSize: props.fs, fontWeight: props.fw, textAlign: props.ta }}
        >
            {props.text}
        </Flex>
    )
}

export { StyledButton, IconButton, Badge, StyledRouteLink, SvgIcon, Text, CenteredText, TextWithIcon, DropDown }
