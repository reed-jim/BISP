// import '../../css/animation.css';
import { useState } from 'react';
import { StyledButton, Text } from '../Frame';
import { YCenteredRowFlex } from '../style/style';


let account = '';

const Header = () => {
    const [connected, connect] = useState(false);



    const con = () => {
        getAccount().then(
            accounts => {
                const l = accounts[0].length;
                account = accounts[0].slice(0, 3) + '...' + accounts[0].slice(l - 4, l - 1);
                connect(true);
            }
        )
    }

    const getAccount = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        return accounts;
    }


    return (
        <YCenteredRowFlex bg='#fff' pos='sticky' top='0' h='50px'>
            <Text text='Placeholder' />

            {
                connected ?
                    <Text m='0 9px 0 auto' text={account} />
                    :
                    <StyledButton m='0 9px 0 auto' text='Signup' click={() => con()} />
            }

        </YCenteredRowFlex>
    )
}

export { Header };
