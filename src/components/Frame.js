import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CenteredFlex, BasicButton, StyledText, StyledImage, Centered, YCenteredRowFlex, Flex, ColumnFlex } from "./style/style";
import { br_5, px_9 } from "./style/style";

import { useCustomTheme } from '../hooks/useTheme';


const StyledButton = (props) => {
    return (
        <BasicButton
            bg={props.bg || 'transparent'} cl={props.cl} br={props.br} w={props.w} h={props.h}
            p={props.p || px_9} m={props.m}
            hb={props.hb} hc={props.hc}
            style={props.style}
            onClick={() => props.click()}
            ref={props.iref}
        >
            <Centered>
                <StyledText fs={props.fs} fw='bold'>{props.text}</StyledText>
            </Centered>
        </BasicButton>
    )
}

const IconButton = (props) => {
    return (
        <CenteredFlex bg={props.bg || "transparent"} br={props.br} w={props.w} h={props.h} hBg={props.hBg} onClick={() => props.click()}>
            <BasicButton bg='transparent' cl={props.cl} h={props.iconH}>
                <StyledImage h="100%" src={props.src} alt='' />
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
            <StyledText fs={props.fs || '14px'} fw={props.fw}>{props.text}</StyledText>
        </CenteredFlex>
    )
}

const StyledRouteLink = (props) => {
    return (
        <Link to={props.to} style={{ textDecoration: 'none' }}>
            <Badge bg={props.bg} cl={props.cl} br={br_5} w={props.w} h={props.h} p={props.p} hb={props.hb} hc={props.hc} fw='bold'
                text={props.text}
            />
        </Link>
    )
}

const SvgIcon = (props) => {
    let size = props.w || props.h;
    size *= 1 * props.scale;
    size += 'px';

    return (
        <CenteredFlex bg='none' m={props.m} onClick={props.click}>
            {props.svg}
            <img
                style={{
                    clipPath: `url(#${props.cpId})`,
                    background: props.bg,
                    width: size,
                    height: size,
                }}
                alt=''
            />
        </CenteredFlex>
    )
}

const Text = (props) => {
    return (
        <StyledText
            className={props.class} bg={props.bg} cl={props.cl} br={props.br} fs={props.fs} fw={props.fw} ta={props.ta} w={props.w} p={props.p} m={props.m} style={props.style}
        >
            {props.text}
        </StyledText>
    )
}

const TextWithIcon = (props) => {
    return (
        <YCenteredRowFlex bg={props.cbg || 'none'} g='9px'>
            <SvgIcon svg={props.svg} cpId={props.id} bg='#fff' w={512} scale={0.05} />

            <Text
                bg={props.bg} br={props.br}
                cl={props.cl} fs={props.fs} fw={props.fw} ta={props.ta}
                w={props.w} p={props.p} m={props.m}
                text={props.text}
            />
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
    }

    // const themeCollection = useCustomTheme(dropDownThemeCollections, 'light');

    return (
        <ColumnFlex pos="relative" g={isExpand ? '9px' : '0'} tr='gap 0.5s'>
            <StyledButton bg='#555' br='5px' fs='16px' w='fit-content' p='9px' hb='#666' text={chosen || props.btnName} click={() => expand(!isExpand)} />

            <ColumnFlex pos="absolute" top='40px' bg='#888' br='5px' h='fit-content' style={{ maxHeight: isExpand ? '200px' : '0' }} o='hidden' tr='all 0.5s'>
                {
                    Array(3).join().split(',').map(
                        (item, i) =>
                            // <Text key={i} bg='#333' p='18px' text="Test" onClick={()=>console.log('das')} /> 
                            <Flex key={i} bg='#333' cl="#fff" p='18px' hBg="#444" onClick={() => chooseOption('a value')}>
                                Test
                            </Flex>
                    )
                }
            </ColumnFlex>
        </ColumnFlex>
    )
}

export { StyledButton, IconButton, Badge, StyledRouteLink, SvgIcon, Text, TextWithIcon, DropDown }
