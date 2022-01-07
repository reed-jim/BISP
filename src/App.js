import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ExplorerRouter, Explorer, FriendList } from "./components/Explorer/Explorer";
import { Header } from "./components/Header/Header";
import { Admin } from "./components/Admin";
import { QuestionRouter, QuestionDashboard, QuestionCollectionDetail, QuestionDetail } from "./components/Question/Question";
import { AddQuestionManager } from "./components/Question/addQuestion";
import { AddModal } from "./components/Modal/Modal";

import { DropDown } from "./components/Frame";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./components/style/theme";
import { UserRouter, QuestionCollectionManager } from "./components/User/User";
import { Landing } from "./components/Landing/Landing";

export const App = () => {
    const [theme, setTheme] = useState("dark");

    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <Header theme={theme} setTheme={setTheme} />

                <Switch>                
                    <Route path="/explore">
                        <ExplorerRouter theme={theme} />
                    </Route>

                    <Route path="/question/add">
                        <AddQuestionManager theme={theme} />
                    </Route>
                    
                    <Route path="/question">
                        <QuestionRouter theme={theme} />
                    </Route>

                    <Route path="/user">
                        <UserRouter theme={theme} />
                    </Route>

                    <Route exact path="/admin">
                        <Admin />
                    </Route>

                    <Route path="/">
                        <Landing theme={theme} />
                    </Route>
                </Switch>
            </BrowserRouter>

        </ThemeProvider>
    )
}
