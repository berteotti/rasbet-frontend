import {useState} from "react";
import {getUser, login} from "../api/api";
import {useQuery} from "@tanstack/react-query";
import {queryClient} from "../query";
import {router} from "next/client";
import {setCookie} from "../cookie";


export const useUpdateLogin = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleShowClick = () => setShowPassword(!showPassword);

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    return {showPassword,username,password, handleShowClick,handleUsernameChange,handlePasswordChange};
};

export const useLoginFetch  = () => {
    const { data, refetch: fetchUser } = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(token),
        enabled: false,
        onSuccess: (data) => {
            if (data && data.results) {
                queryClient.setQueryData(["user"], data.results[0]);
                router.push("/");
        }
    },

});  return fetchUser;};

const fetchUser = useLoginFetch();

export const useLoginTokenFetch = (fetchUser,username,password) => {
const { token, refetch } = useQuery({
    queryKey: ["token"],
    queryFn: () => login({ username, password }),
    enabled: false,
    onSuccess: (token) => {
        setCookie("token", token.access, 1);
        fetchUser();
    },
});};



