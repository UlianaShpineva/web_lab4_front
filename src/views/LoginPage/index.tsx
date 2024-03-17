import React from "react";
import LoginForm from "../../components/LoginForm";
import Header from "../../components/Header";

function LoginPage(){
    return (
        <div>
            <Header/>
            <div>
                <LoginForm/>
            </div>
        </div>
    );
}

export default LoginPage;