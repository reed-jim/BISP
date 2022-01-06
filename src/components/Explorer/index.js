import { ThemeProvider } from 'styled-components';
import { useEffect } from 'react';
import { SortIcon, TrophyIcon } from '../../svg/index';
import { feedSample, rankingItems, tags } from '../../test/SampleData';
import { Badge, StyledButton, Text, TextWithIcon, DropDown, StyledRouteLink } from '../Frame';
import { AddModal } from '../Modal/Modal';
import { Question } from '../Question/Question';
import { CenteredFlex, ColumnFlex, Flex, StyledImage, YCenteredRowFlex } from '../style/style';
import { darkTheme } from '../style/theme';
import { getFeed } from '../../services/feed';
import { useState } from 'react';
import { lockScroll } from '../../js/util';



// Learn, Though, Video, Moment,...
const feeds = [];



export const Explorer = (props) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const _theme = props.theme;

    const openModal = () => {
        lockScroll(true);
        setIsOpenModal(true);
    }

    const closeModal = () => {
        lockScroll(false);
        setIsOpenModal(false);
    }

    useEffect(
        () => getFeed().then(
            data => feeds = data
        ), []
    )

    return (
        <ThemeProvider theme={darkTheme}>
            <CenteredFlex getTheme={true} mh='100vh' p='18px'>

                <ColumnFlex w='80%' g='18px'>

                    <Flex bg='#f80' h='250px' p='18px'>
                        Coming Soon
                        <StyledRouteLink to='question' text='Click here' bg='#f80' br='5px' /> 
                    </Flex>
                    {/* <AddModal theme={_theme} /> */}
                    {/* <Question theme={_theme} /> */}
                    <Flex g='18px' d=''>
                        {/* Entertainment */}
                        <Left />
                        {/* Knowledge */}
                        <ColumnFlex pos='' w='40%' g='18px'>
                            <ColumnFlex b='2px solid #444' br='5px' p='18px' g='18px'>
                                <Text text='Hello, Adam' />
                                <Text cl='#aaa' text='Have a great day!' />
                                <StyledButton bg='#666' br='5px' w='fit-content' p='9px' text='Placeholder Button'
                                    click={()=>openModal()}
                                />
                            </ColumnFlex>
                            {/* <StyledButton bg='#666' br='5px' p='9px' text='Share your Knowledge' /> */}
                            {/* Coming Soon */}
                            {/* Features */}
                            <Text fw='bold' text='Exlore the world' />
                            {
                                feedSample.map(
                                    (item, i) => <Post key={i} src={item[0]} name={item[1]} date={item[2]} title={item[3]} value={item[4]} />
                                )
                            }

                            {isOpenModal && <AddModal theme={_theme} close={()=>closeModal()} />}
                            
                        </ColumnFlex>
                        {/* Ranking */}
                        <Ranking items={rankingItems} />
                    </Flex>
                </ColumnFlex>

            </CenteredFlex>
        </ThemeProvider>
    )
}

const Post = (props) => {
    return (
        <ColumnFlex bg='#444' br='5px' p='18px' g='9px'>

            <YCenteredRowFlex bg='none' g='18px' style={{ paddingBottom: '9px', borderBottom: '2px solid #777' }}>

                <StyledImage src={props.src} br='50%' w='40px' h='40px' of='cover' />
                <ColumnFlex bg='none'>
                    <Text fw='bold' text={props.name} />
                    <Text cl='#bbb' text={props.date} />
                </ColumnFlex>

            </YCenteredRowFlex>

            <Text cl='#bbb' fw='700' text={props.title} />
            <Text fs='36px' fw='700' text={props.value} style={{ borderTop: '2px solid #777' }} />
            <Bar positive='75' />
            <DropDown />
            {/* <StyledButton bg='linear-gradient(45deg, #59C173, #a17fe0, #5D26C1)' br='5px' w='30%' p='9px' m='0 0 0 auto' text='Read' /> */}
        </ColumnFlex>
    )
}

const Bar = (props) => {
    const positive = props.positive;

    return (
        <Flex br='5px' o='hidden'>
            <Text bg='#7dff5c' cl='#092d00' fw='bold' w={positive + '%'} p='3px' text='Helpful' />
            <Text bg='#ff6666' cl='#540000' fw='bold' w={(100 - positive) + '%'} p='3px' text='Trash' />
        </Flex>
    )
}

const Ranking = (props) => {
    return (
        <ColumnFlex bg='#444' br='5px' p='18px' g='9px' gr='1'>
            <TextWithIcon
                svg={TrophyIcon({ scale: 0.005 })}
                id='trophy'
                text='Ranking'
                style={{ marginBottom: '18px' }}
            />

            {
                props.items.map(
                    (item, i) => <RankingItem key={i} src={item[0]} name={item[1]} />
                )
            }
        </ColumnFlex>
    )
}

const RankingItem = (props) => {
    return (
        <YCenteredRowFlex bg='none' g='18px'>
            <StyledImage src={props.src} br='50%' w='30px' h='30px' of='cover' />
            <Text fs='16px' fw='bold' text={props.name} />
            <Text fs='16px' fw='bold' m='0 0 0 auto' text='999' />
        </YCenteredRowFlex>
    )
}

const Left = () => {
    return (
        <ColumnFlex w='30%' g='18px'>
            {/* Entertainment */}
            <Entertainment />
            {/* Search */}

            {/* Sort */}
            <SortEngine />
        </ColumnFlex>
    )
}

const Entertainment = () => {
    return (
        <Badge
            bg='linear-gradient(45deg, #59C173, #a17fe0, #5D26C1)' br='5px'
            cl='#fff' fs='28px' fw='bold'
            h='fit-content' p='36px'
            text='Explore Now'
        />
    )
}

const SortEngine = () => {
    return (
        <ColumnFlex b='2px solid #444' br='5px' p='18px' g='18px'>

            <TextWithIcon
                svg={SortIcon({ scale: 0.005 })}
                id='sort'
                text='Sort Engine'
            />

            <Flex g='9px'>
                <StyledButton bg='#666' br='5px' p='9px' text='Top' />
                <StyledButton bg='#666' br='5px' p='9px' text='Lastest' />
                {/* <StyledButton bg='#666' br='5px' p='9px' text='' /> */}
            </Flex>

            <Text cl='#bbb' text='Tags' />
            <Flex g='9px'>
                {
                    tags.map(
                        (item, i) => <StyledButton key={i} p='0' text={'#' + item} />
                    )
                }

            </Flex>

        </ColumnFlex>
    )
}
