import { useState } from "react";
import { StyledButton, StyledRouteLink, Text } from "./Frame";
import { br_5, CenteredFlex, Flex, YCenteredRowFlex, Centered, p_9, py_9, mb_5, mb_18, mb_9, mr_9, p_18, StyledImage, StyledText } from "./style/style";

import { addFeed } from "../services/feed";

const webFieldNames = ['title', 'short', 'img', 'src', 'category', 'sub-category'];
const dropItems = [null, null, null, null, ['category','t1','t2','t2'], ['category','t1','t2']];



const Admin = () => {
    const [isModal, open] = useState(false);

    return (
        <Flex bg="linear-gradient(#ddd, #ccc)" mh='100vh'>            
           <StyledButton bg="#888" cl="#fff" br={br_5} w="80px" h="40px" m={mr_9} text="Add" click={()=>open(true)} />       

            {isModal && <AddModal fieldNames={webFieldNames} add={'addWeb'} click={()=>open(false)} />}
        </Flex>
    )
}


const AddModal = (props) => {
    const fieldNames = props.fieldNames;

    const initialFieldState = {};

    for(let i = 0; i < fieldNames.length; i++) {
        const fieldName = fieldNames[i];
        initialFieldState[fieldName] = '';
    }

    const [fields, setFields] = useState(initialFieldState);

    const handleChanged = [];

    for(let i=0;i<fieldNames.length;i++) {
        handleChanged[i] = e => {
            setFields(
                {
                    ...fields,
                    [fieldNames[i]] : e.target.value
                }
            )          
        } 
    }
    // show preview Image
    return (
        <CenteredFlex pos="absolute" bg="#00000080" w='100%' h="fit-content" mh='100vh' z={1}>

            <Flex dir="column" bg="#fff" br={br_5} w="300px" h="fit-content" p={p_18}>
                <CenteredFlex m={mb_18}>
                    <StyledText>Add New Item</StyledText>
                    <StyledImage h="20px" m="0 0 0 auto" src={'close'} onClick={props.click} />
                </CenteredFlex>

                {
                    fieldNames.map(
                        (field, i) => (
                            dropItems[i]==null ?
                            <InputArea key={i} name={field} img={'copy'} ph={"Enter "+field} change={handleChanged[i]} 
                                bb='1px solid #34489d'
                            />
                            :
                            <DropDownInput key={i} name={field} img={'copy'} ph={"Enter "+field} change={handleChanged[i]} 
                                bb='1px solid #34489d'
                                dropItems={dropItems[i]}
                            />
                        )
                    )
                }
                                        
                <StyledButton bg="#34489d" cl="#fff" br={br_5} h="34px" hc='#ccc' name="Add"                  
                    click={()=>props.add({...fields})}
                />

            </Flex>
        </CenteredFlex>
    )
}

export const InputArea = (props) => {
    return (
        <Flex dir="column" bb={props.bb} m={mb_18}>
            <StyledText m={mb_5}>{props.name}</StyledText>

            <YCenteredRowFlex bg="#ddd" p={py_9}>
                {/* <StyledImage h="30px" src={props.img} /> */}
                <input type={props.inputType} placeholder={props.ph} onChange={props.change}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        padding: '0 5px 0 5px',
                    }}
                />
            </YCenteredRowFlex>
        </Flex>
    )
}

export const DropDownInput = (props) => {
    const dropItems = props.dropItems;
    const [isDrop, drop] = useState(false);
    const [text, change] = useState('');

    return (
        <Flex dir="column" pos='relative' bb={props.bb} m={mb_18}>
            <StyledText m={mb_5}>{props.name}</StyledText>

            <YCenteredRowFlex bg="#ddd" p={py_9} onClick={()=>drop(!isDrop)}>
                <input type={props.inputType} placeholder={text} onChange={props.change}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        padding: '0 5px 0 5px',
                    }}
                />
            </YCenteredRowFlex>

            <DropDown items={dropItems} isOpen={isDrop} change={item=>change(item)} />
        </Flex>
    )
}

const DropDown = (props) => {
    const items = props.items;
    const isOpen = props.isOpen;

    return (
        <Flex dir='column' pos='' cl='#fff' br={br_5} w='100%' h={isOpen? '144px':'0'} z={1}
        
        style={{margin: isOpen?'9px 0 9px 0':'', transition: 'all 0.3s', overflow: 'auto'}}>
            {   
                items.map(
                    (item, i) => (
                        <Flex key={i} w='100%'>
                            <Centered bg='#222' w='100%' h='30px' p={p_9} hBg='#444' onClick={()=>props.change(item)}>
                                <Text name={item} />
                            </Centered>
                        </Flex>
                    )
                )
            }
        </Flex>
    )
}

export { Admin };
