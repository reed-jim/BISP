import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Explorer } from './components/Explorer/index';
import { Header } from './components/Header/Header';
import { Admin } from './components/Admin';
import { QuestionDashboard, QuestionCollectionDetail, QuestionDetail } from './components/Question/Question';
import { AddQuestionManager } from './components/Question/addQuestion';
import { AddModal } from './components/Modal/Modal';

import { DropDown } from './components/Frame';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './components/style/theme';

export const App = () => {
    const [theme, setTheme] = useState('dark');

    return (
        <ThemeProvider theme={darkTheme}>
            {/* <button onClick={()=>setTheme('dark')} >Theme</button> */}
            <Header />
            {/* <DropDown />
            <AddModal theme={theme} /> */}
            
            <BrowserRouter>
                <Switch>
                    <Route exact path='/exlorer'>
                        <Explorer theme={theme} />
                    </Route>

                    <Route path='/question/add'>
                        <AddQuestionManager theme={theme} />
                    </Route>

                    {/* <Route path='/question/add/?id=1464&question=5'>
                        <QuestionDetail theme={theme} />
                    </Route> */}

                    <Route path='/question/:id/:id'>
                        <QuestionDetail theme={theme} />
                    </Route>

                    <Route path='/question/:id'>
                        <QuestionCollectionDetail theme={theme} />
                    </Route>

                    

                    <Route path='/question'>
                        <QuestionDashboard theme={theme} />
                    </Route>

                   
                    
                    <Route exact path='/'>
                        {/* <LandingPage /> */}
                    </Route>
                    <Route exact path='/admin'>
                        <Admin />
                    </Route>
                </Switch>
            </BrowserRouter>

            {/* <Explorer theme={theme} /> */}
        </ThemeProvider>
    )
}