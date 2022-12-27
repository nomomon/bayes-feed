import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../firebase";

const makeSureUserIsLoggedIn = () => {
    const router = useRouter();
    useEffect(() => {
        console.log(auth.currentUser ? ">>> User is logged in" : ">>> User is NOT logged in")

        if (auth.currentUser === null && router) {
            router.push("/login");
        }
    }, [auth.currentUser])
}

export default makeSureUserIsLoggedIn;