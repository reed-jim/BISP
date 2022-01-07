import { useEffect, useState } from "react";
import { changePath, getSessionStorage, setSessionStorage, capitalizeFirstLetter } from "../../js/util";
import { UserService } from "../../services/user";
import { CenteredText, StyledButton, Text } from "../Frame";
import { Avatar } from "../Friend/Friend";
import { YCenteredRowFlex, m_l_a } from "../style/style";
import { useHistory } from "react-router";

let account = "";

const themeCollections = {
    light: {
        header: ["#eee", "#222", "#ddd", "#eee"]

    },
    dark: {
        header: ["#222", "#fff", "#555", "#444"]
    }
}

const Header = (props) => {
    const [connected, connect] = useState(false);
    const history = useHistory();

    const theme = props.theme;
    const tc = themeCollections[props.theme].header;

    useEffect(
        () => {
            if (getSessionStorage("user") != undefined) {
                connect(true);
            }
        }, []
    )

    // const con = () => {
    //     getAccount().then(
    //         accounts => {
    //             const l = accounts[0].length;
    //             account = accounts[0].slice(0, 3) + "..." + accounts[0].slice(l - 4, l - 1);
    //             connect(true);
    //         }
    //     )
    // }

    // const getAccount = async () => {
    //     const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

    //     return accounts;
    // }

    const login = () => {
        const uc = new UserService();

        uc.isExist("0x00").then(
            res => {
                const user = res.data;

                if (user) {
                    setSessionStorage("user", user);

                    connect(true);
                }
                else {
                    new UserService().lastId().then(
                        res => {
                            const id = res.data.index;

                            const user = {
                                id: id,
                                key: "0x00",
                                gem: 0,
                                learn: 0,
                                bonus: 0,
                                lastLearnTime: null,
                                name: "",
                                desc: "",
                                friends: []
                            };

                            new UserService().add(user);
                        }
                    )
                }
            }
        )
    }

    return (
        <YCenteredRowFlex bg={tc[0]} pos="sticky" top="0" h="50px" z={1}>
            <Text cl={tc[1]} m="0 18px" text="BISP" />

            <StyledButton className="br-5-p-9" bg={tc[2]} hb={tc[3]} cl={tc[1]} text={theme == "dark" ? "Light Mode" : "Dark Mode"}
                click={() => props.setTheme(props.theme == "light" ? "dark" : "light")}
            />

            {
                connected ?
                    <YCenteredRowFlex p="0 9px" m={m_l_a} g="9px"
                        onClick={() => changePath(history, "/user")}
                    >
                        <Text cl={tc[1]} fw="bold" text={getSessionStorage("user").key} />

                        <Avatar text={getSessionStorage("user").name} />
                    </YCenteredRowFlex>
                    :
                    <StyledButton className="br-5-p-9" bg={tc[2]} hb={tc[3]} cl={tc[1]} m="0 9px 0 auto"
                        text={connected ? getSessionStorage("user").key : "Login"}
                        click={() => login()}
                    />
            }
        </YCenteredRowFlex>
    )
}

export { Header };

