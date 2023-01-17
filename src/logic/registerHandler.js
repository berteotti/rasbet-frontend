import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {register} from "../api/api";
import { useEffect } from 'react';
import {router} from "next/client";
export const useUpdateRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastnName] = useState("");
    const [email, setEmail] = useState("");
    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handlefnameChange = (event) => setFirstName(event.target.value);
    const handlelnameChange = (event) => setLastnName(event.target.value);
    const handleemailChange = (event) => setEmail(event.target.value);

    const handleClick = () => setShowPassword(!showPassword);

    return {
        showPassword,
        username,
        password,
        firstName,
        lastName,
        email,
        handleUsernameChange,
        handlePasswordChange,
        handlefnameChange,
        handlelnameChange,
        handleemailChange,
        handleClick,
    };
};





export const useRefetch = (username, firstName, lastName, email, password) => {
    const { refetch } = useQuery({
        queryKey: [],
        queryFn: () =>
            register({
                username,
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            }),
        enabled: false,
        onSuccess: () => router.push("/"),
    });

    return refetch;
};



