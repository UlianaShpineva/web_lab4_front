import {useEffect, useState} from "react";
import Header from "../../components/Header";
import ResultTable from "../../components/ResultTable";
import Graph from "../../components/Graph";
import Inputs from "../../components/Inputs";
import {Button} from "primereact/button";
import {getPassword, setPassword} from "../../redux/password";
import {getLogin, setLogin} from "../../redux/login";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useResize} from "../../redux/hooks";
import LogOut from "../../components/LogOut";
import {AuthorizationStore} from "../../redux/authorizationStore";
import {CoordinatesProvider} from "../../components/Inputs/Context";

function MainPage() {
    const navigate = useNavigate();
    const window1 = useResize();
    useEffect(() => {
        let state = AuthorizationStore.getState()
        if(getLogin(state).trim() === "" || getPassword(state).trim() === ""){
            navigate("/");
        }
    })
    if (window1.isScreenM || window1.isScreenL) {
        return (
            <CoordinatesProvider>
                <Header/>

                <div style={{display: 'flex'}}>
                    <Graph width={400} height={400}/>
                    <Inputs/>
                    <LogOut/>
                </div>
                <ResultTable/>
            </CoordinatesProvider>
        )
    }
    else {
        return (
            <CoordinatesProvider>
                <Header/>

                <div style={{display: 'flex'}}>
                    <Graph width={400} height={400}/>
                    <LogOut/>
                </div>
                <Inputs/>
                <ResultTable/>
            </CoordinatesProvider>
        )
    }
}

export default MainPage;