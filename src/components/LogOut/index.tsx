import {Button} from "primereact/button";
import {useAppDispatch} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";
import {setLogin} from "../../redux/login";
import {setPassword} from "../../redux/password";
import './index.css';

function LogOut() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    function logOut() {
        dispatch(setLogin(""));
        dispatch(setPassword(""));
        navigate("/");
    }
    return (
        <Button label="Log out" onClick={(e)=> logOut()} className="logOutBtn"/>
    )
}

export default LogOut;