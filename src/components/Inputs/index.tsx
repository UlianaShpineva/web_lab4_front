import './index.css';
import {Button} from "primereact/button";
import {Slider} from "primereact/slider";
import React, {FormEvent, useContext, useEffect, useState} from "react";
import {SelectButton} from "primereact/selectbutton";
import {AuthorizationStore} from "../../redux/authorizationStore";
import {getLogin} from "../../redux/login";
import {getPassword} from "../../redux/password";
import toast from "react-hot-toast";
import {DotsFormContext} from "./Context";

function Inputs() {
    const context = useContext(DotsFormContext);

    useEffect(() => {
        fetch("/api/dots", {
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(getLogin(AuthorizationStore.getState()) + ":"
                    + getPassword(AuthorizationStore.getState()))
            }
        })
            .then(r => r.json())
            .then(r => context?.setDots(r))
    }, [])


    // var selectedX;
    // var selectedY;
    const [selectedX, setNewX] = useState<number>();
    const [selectedY, setNewY] = useState<number | [number, number]>(2);
    const [selectedR, setNewR] = useState();
    const xNums = [
        {name: '-4', code: -4},
        {name: '-3', code: -3},
        {name: '-2', code: -2},
        {name: '-1', code: -1},
        {name: '0', code: 0},
        {name: '1', code: 1},
        {name: '2', code: 2},
        {name: '3', code: 3},
        {name: '4', code: 4}
    ]

    //onChange={(e) => setValue(e.value)}
    // const context = useContext(DotsFormContext);

    let validateX = (x: number) => x <= 4 && x >= -4;
    let validateY = (y: number) => y <= 5 && y >= -3;
    let validateR = (r: number) => r <= 4 && r >= 0;

    function parseFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!context || context.getX == null || context.getY == null || !context.getR == null){
            toast.error("Fill all coordinates")
            return
        }
        if(!validateX(context.getX) || !validateY(context.getY) || !validateR(context.getR)){
            toast.error("Coordinates are not valid")
            return
        }
        let formData = new FormData();
        formData.append("x", context.getX.toString())
        formData.append("y", context.getY.toString())
        formData.append("r", context.getR.toString())
        fetch("/api/dots", {
            method: "POST",
            headers: {"Authorization": "Basic " + btoa(getLogin(AuthorizationStore.getState()) + ":" + getPassword(AuthorizationStore.getState()))},
            body: formData
        })
            .then(r => {
                if (r.ok) return r
                else throw new Error(r.statusText)
            })
            .then(r => r.json())
            .then(r => {
                context.addDot(r)
            })
            .catch(e => toast.error(e.message));
    }

    function sendClear(){
        fetch("/api/dots", {
            method: "DELETE",
            headers: {"Authorization": "Basic " + btoa(getLogin(AuthorizationStore.getState()) + ":" + getPassword(AuthorizationStore.getState()))},
        })
            .then(r => {
                if (r.ok) {
                    context?.setDots([])
                }
            })
    }

    const handleSlide = (e: any) => {
        context?.setY(e.value);
    };

    if (!context) return (<></>);
    return (
        <form className="inpts" onSubmit={parseFormSubmit}>
            <div className="btnsX">
                <label>X:</label>
                {/*onChange={(e) => setNewX(e.value)}*/}
                <SelectButton optionLabel="name" optionValue="code" value={context.getX} options={xNums} onChange={(e) => context.setX(e.value)}/>
            </div>
            <div>
                <p>Y: {context.getY}</p>
                <Slider defaultValue={2} min={-3} max={5} step={0.1} color={"#dfd3e3"} value={context.getY} onChange={handleSlide} className="sliderY"/>
            </div>
            <div className="btnsR">
                <label>R:</label>
                <SelectButton optionLabel="name" optionValue="code" value={context.getR} options={xNums} onChange={(e) => context?.setR(e.value)}/>
            </div>
            <div>
                <Button className="submitBtn" type="submit" label="Submit"/>
                <Button className="submitBtn" type="reset" label="Clear" onClick={sendClear}/>
            </div>
        </form>
    );
}

export default Inputs;