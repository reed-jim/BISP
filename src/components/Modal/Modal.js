import { useEffect, useState } from 'react';
import '../../css/animation.css';
import { StyledButton, Text, SvgIcon } from '../Frame';
import { Flex, CenteredFlex, ColumnFlex, StyledInput, XCenteredColumnFlex } from '../style/style';
import { useHandleInput, useHandleInputChanged } from '../../hooks/useHandleInput';
import { addFeed } from '../../services/feed';
import { CloseIcon } from '../../svg';



// camelCase

const add_row_effect = () => {
    const row = document.getElementById('last-row');

    if (row) row.classList.toggle('hide');
}

const themeCollections = {
    // mapping: container, header, button
    light: ['#888', '#aaa', '#666'],
    dark: ['#444', '#666', '#666']
}

let inputs = { title: '', row0: '' };



const AddModal = (props) => {
    const [numRow, setRow] = useState(1);

    const themeCollection = themeCollections[props.theme];

    useEffect(() => add_row_effect())

    const post = () => {
        console.log(inputs);
        addFeed(inputs);
    }

    const getInput = (e, field) => {
        inputs[field] = e.target.value
    }

    return (
        <CenteredFlex pos='absolute' bg='#000000d0' w='100vw' h='100vh' z='1'>
            <XCenteredColumnFlex bg={themeCollection[0]} br='5px' w='30%' h='fit-content' o='hidden'>

                <CenteredFlex bg={themeCollection[1]} w='100%' p='18px'>
                    <Text fs='24px' fw='bold' text='Add new item' />
                    {/* --- Add new item --- */}

                    <SvgIcon svg={CloseIcon({ scale: 0.0035 })} cpId='close' bg='#fff' w={512} scale={0.035} m='0 0 0 auto' 
                        click={props.close}
                    />
                </CenteredFlex>

                <ColumnFlex w='100%' p='18px' g='27px'>

                    <ColumnFlex g='3px'>
                        <Text fw='bold' text='Title' />

                        <StyledInput cl='#666' b='2px solid #666' p='9px' placeholder='Enter title'
                            onChange={e => getInput(e, 'title')}
                        />
                    </ColumnFlex>
                    {/* Content */}
                    <ColumnFlex g='3px' style={{ paddingBottom: '27px', borderBottom: '2px solid #666' }}>
                        <Text fw='bold' text='Content' />

                        <ColumnFlex g='18px'>
                            {
                                Array(numRow).join().split(',').map(
                                    (item, i) =>
                                        i > 0 && i === numRow - 1 ?
                                            <StyledInput
                                                key={i}
                                                id='last-row' className='hide' style={{ maxHeight: '100px', transition: 'all 0.3s' }}
                                                cl='#666' b='2px solid #666' p='9px' placeholder='Enter'
                                                onChange={e => getInput(e, 'row' + i)}
                                            />
                                            :
                                            <StyledInput
                                                key={i}
                                                cl='#666' b='2px solid #666' p='9px' placeholder='Enter'
                                                onChange={e => getInput(e, 'row' + i)}
                                            />
                                )
                            }

                            <StyledButton bg={themeCollection[2]} br='5px' w='30%' p='9px' text='Add Row' click={() => { setRow(numRow + 1); }} />
                        </ColumnFlex>
                    </ColumnFlex>

                    <StyledButton bg={themeCollection[2]} br='5px' w='30%' p='9px' m='0 0 0 auto' hBg='#333' text='Read' click={() => post()} />
                </ColumnFlex>
                {/* Preview */}
            
            </XCenteredColumnFlex>
        </CenteredFlex>      
    )
}

export { AddModal };
