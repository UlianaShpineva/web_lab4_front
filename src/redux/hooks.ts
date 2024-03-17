import {AppDispatch} from "./authorizationStore";
import {useDispatch} from "react-redux";
import { useState, useEffect } from 'react';

export const useResize = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = (event: any) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        width,
        isScreenS: width >= 0,
        isScreenM: width > 810,
        isScreenL: width >= 1191
    };
};

export const useAppDispatch: () => AppDispatch = useDispatch;