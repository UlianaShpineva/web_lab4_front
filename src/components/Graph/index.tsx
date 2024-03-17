import './index.css';
import React, {useContext, useEffect, useRef} from "react";
import {DotsFormContext} from "../Inputs/Context";
import Printer from "./Printer";
import {AuthorizationStore} from "../../redux/authorizationStore";
import {getLogin} from "../../redux/login";
import {getPassword} from "../../redux/password";
import toast from "react-hot-toast";



function Graph({width, height}: {width: number, height: number}) {
    const context = useContext(DotsFormContext);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    function fetchCoordinates(x: number, y: number, r: number):void{
        let formData = new FormData();
        formData.append("x", x.toFixed(2))
        formData.append("y", y.toFixed(2))
        formData.append("r", r.toFixed(2))
        fetch("/api/dots", {
            method: "POST",
            headers: {"Authorization": "Basic " + btoa(getLogin(AuthorizationStore.getState()) + ":" + getPassword(AuthorizationStore.getState()))},
            body: formData
        })
            .then(response => {
                if (response.ok) return response
                else throw new Error(response.statusText)
            })
            .then(response => response.json())
            .then(response => {
                context?.addDot(response)
            })
            .catch(e => toast.error(e.message));
    }

    function parseClick(event: React.MouseEvent<HTMLCanvasElement>){
        if(!canvasRef.current) return
        const xPixels = event.clientX - canvasRef.current.getBoundingClientRect().left - 15;
        const yPixels = event.clientY - canvasRef.current.getBoundingClientRect().top - 15;
        const SIZE = 400;
        const WIDTH_IN_POINTS = 10;
        const pointInPixels = SIZE / WIDTH_IN_POINTS;
        const x = (- (SIZE / 2 - xPixels) / pointInPixels)
        const y = ((SIZE / 2 - yPixels) / pointInPixels)


        sendCoordinates(x, y)
    }

    function sendCoordinates(x: number, y: number){
        if(!context) return
        let formData = new FormData();
        formData.append("x", x.toFixed(2))
        formData.append("y", y.toFixed(2))
        formData.append("r", context.getR.toString())
        fetch("/api/dots", {
            method: "POST",
            headers: {"Authorization": "Basic " + btoa(getLogin(AuthorizationStore.getState()) + ":" + getPassword(AuthorizationStore.getState()))},
            body: formData
        })
            .then(response => {
                if (response.ok) return response
                else throw new Error(response.statusText)
            })
            .then(response => response.json())
            .then(response => {
                context.addDot(response)
            })
            .catch(e => toast.error(e.message));
    }


    useEffect(() => {
        if (!canvasRef?.current?.getContext('2d')) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if(ctx === null) return;
        const printer = new Printer(canvas, ctx, context?.getR, context?.getDots, fetchCoordinates);
        printer.drawStart();
    }, [context?.getR, context?.getDots]);

    return (
        <canvas ref={canvasRef}
                width={width}
                height={height}
                key={context?.getR}
                onClick={parseClick}
        />
    );
}

export default Graph;