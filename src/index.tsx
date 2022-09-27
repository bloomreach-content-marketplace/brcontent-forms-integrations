import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UiExtension, {UiScope} from "@bloomreach/ui-extension";
import CmsDialog from "./CmsDialog";
import {GoogleFormPickerDialog} from "./GoogleFormPickerDialog";
import UiField from "./UiField";
import CmsField from "./CmsField";

async function render() {

    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );

    try {
        const ui: UiScope = await UiExtension.register();

        const routing = (
            <BrowserRouter>
                <Routes>
                    <Route path="/dialog" element={<CmsDialog ui={ui}/>}/>
                    <Route path="/" element={<CmsField ui={ui}/>}/>
                </Routes>
            </BrowserRouter>
        );

        root.render(routing)

    } catch (error: any) {
        console.log(error);
        console.error('Failed to register extension:', error.message);
        console.error('- error code:', error.code);

        const routing = (
            <BrowserRouter>
                <Routes>
                    <Route path="/dialog"
                           element={<GoogleFormPickerDialog onOk={(items: any[]) => console.log('selected', items)}
                                                            clientId={'123'}
                                                            apiKey={'456'}/>}/>
                    <Route path="/"
                           element={<UiField onChange={items => console.log(items)} items={[]} editMode={true}
                                             onOpenDialog={items => console.log('open dialog')}/>}/>
                </Routes>
            </BrowserRouter>
        );

        root.render(routing)

    }
}

render();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
