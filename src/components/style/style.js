import styled from "styled-components";


const Customizer = styled.div`
    display: ${props => props.d};
    overflow: ${props => props.o};

    position: ${props => props.pos};
    top: ${props => props.top || 0};
    right: ${props => props.right};
    left: ${props => props.left || 0};

    background: ${props => props.bg || (props.getTheme ? props.theme.div : '')};
    color: ${props => props.cl};
    border: ${props => props.b};
    border-bottom: ${props => props.bb};
    border-radius: ${props => props.br};
    box-shadow: ${props => props.bs};

    width: ${props => props.w};
    height: ${props => props.h}; 
    min-height: ${props => props.mh};

    padding: ${props => props.p};
    margin: ${props => props.m};

    z-index: ${props => props.z};

    transition: ${props => props.tr};

    &:hover {
        background: ${props => props.hBg};
        color: ${props => props.hc};
        border: ${props => props.hb};
    }

    @media (max-width: 992px) {
        display: ${props => props.lgDisplay};
        width: ${props => props.lgw};
    }
    @media (max-width: 768px) {
        display: ${props => props.mdDisplay};
        width: ${props => props.mdw};
    }
    @media (max-width: 576px) {
        display: ${props => props.smDisplay + ' !important'};
        width: ${props => props.smWidth};
    }
    @media (max-width: 768px) {
        ${props => props.mdStyle};
    }
    @media (max-width: 576px) {
        ${props => props.smStyle};
    }
    @media (max-width: 1230px) {
        ${props => props.xl};
    }
`

const Flex = styled(Customizer)`
    display: ${props => props.d || 'flex'};
    flex-direction: ${props => props.dir};
    flex-grow: ${props => props.gr};
    flex-wrap: ${props => props.wr};
    gap: ${props => props.g};
    box-sizing: border-box;
`

const ColumnFlex = styled(Flex)`
    flex-direction: column;
`

const CenteredFlex = styled(Flex)`
    justify-content: center;
    align-items: center;
`

const Centered = styled(CenteredFlex)`
background: ${props => props.bg || 'none'};
`

const YCenteredRowFlex = styled(CenteredFlex)`
    justify-content: unset; 
`

const CenteredColumnFlex = styled(CenteredFlex)`
    flex-direction: column;
`

const XCenteredColumnFlex = styled(CenteredFlex)`
    flex-direction: column;
    justify-content: unset;
`

const YCenteredColumnFlex = styled(CenteredFlex)`
    flex-direction: column;
    align-items: unset; 
`

// const ColFlexWrapper = styled(ColumnFlex)`
//     border-radius: 5px;
// `

const BasicButton = styled.button`
    background: ${props => props.bg};
    color: ${props => props.cl};
    border: ${props => props.b || "none"};
    border-radius: ${props => props.br || "0"};
    width: ${props => props.w};
    height: ${props => props.h};
    padding: ${props => props.p};
    margin: ${props => props.m};

    transition: ${props => props.t};

    &:hover {
        background-color: ${props => props.hb};
        color: ${props => props.hc};
    }
`

const StyledText = styled.p`
    display: ${props => props.d};
    background: ${props => props.bg || ""};
    color: ${props => props.cl || props.theme.text};
    border-radius: ${props => props.br};
    width: ${props => props.w || "fit-content"};
    // height: 100%;
    max-width: 100%;
    font-size: ${props => props.fs};
    font-weight: ${props => props.fw};
    font-family: system-ui;
    // font-family: monospace;
    text-align: ${props => props.ta || 'center'};
    padding: ${props => props.p};   
    margin: ${props => props.m || "0"};
    z-index: ${props => props.z};
`

const StyledImage = styled.img`
    display: ${props => props.display};
    position: ${props => props.pos}; 
    background: ${props => props.bg || 'none'};
    border-radius: ${props => props.br};  
    width: ${props => props.w};
    max-width: 100%;
    height: ${props => props.h};
    padding: ${props => props.p};
    margin: ${props => props.m};
    object-fit: ${props => props.of};
    z-index: ${props => props.z}; 

    &:hover {
        opacity: ${props => props.hoverOpacity};
    }
`

const StyledInput = styled.input`
    background: ${props => props.bg || "transparent"};
    color: ${props => props.cl || props.theme.inputColor};
    border: ${props => props.b || "2px solid " + props.theme.inputBorder};
    border-radius: ${props => props.br}; 
    outline: none;
    font-size: ${props => props.fs};
    font-weight: ${props => props.fw};
    width: ${props => props.w};
    height: ${props => props.h};
    padding: ${props => props.p || "0 5px 0 5px"};
    margin: ${props => props.m};

    ::placeholder {
        color: ${props => props.phcl};
        font-family: system-ui;
    }

    &:focus {
        border: ${props => props.fb};
    }
`

const StyledLink = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    position: ${props => props.pos};
    background: ${props => props.bg || "transparent"};
    color: ${props => props.cl};
    border-radius: ${props => props.br};
    text-decoration: none; 
    font-size: ${props => props.fs};
    font-weight: ${props => props.fw};
    width: ${props => props.w};
    height: ${props => props.h};
    padding: ${props => props.p};
    margin: ${props => props.m};

    &:hover {
        background: ${props => props.hb};
    }
`

export {
    Flex, ColumnFlex, CenteredFlex, YCenteredRowFlex, CenteredColumnFlex, XCenteredColumnFlex, YCenteredColumnFlex,
    BasicButton, StyledText, StyledImage, StyledInput, StyledLink, Centered
}


const br_5 = "5px";

const p_5 = "5px";
const p_9 = "9px";
const p_18 = "18px";
const p_36 = "36px";
const px_9 = "0 9px 0 9px";
const px_18 = "0 18px 0 18px";
const py_9 = "9px 0 9px 0";
const py_18 = "18px 0 18px 0";
const py_36 = "36px 0 36px 0";

const m_9 = "9px";
const mt_9 = "9px 0 0 0";
const mr_5 = "0 5px 0 0";
const mr_9 = "0 9px 0 0";
const mr_18 = "0 18px 0 0";
const mb_5 = "0 0 5px 0";
const mb_9 = "0 0 9px 0";
const mb_18 = "0 0 18px 0";
const mb_36 = "0 0 36px 0";
const ml_9 = "0 0 0 9px";
const mx_9 = "0 9px 0 9px";
const my_9 = "9px 0 9px 0";
const my_18 = "18px 0 18px 0";

export {
    br_5, p_5, p_9, p_18, p_36, px_9, px_18, py_9, py_18, py_36, m_9, mt_9, mr_5, mr_9, mr_18, mb_5, mb_9, mb_18, mb_36,
    ml_9, mx_9, my_9, my_18
};
