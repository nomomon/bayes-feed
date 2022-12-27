import { getRedirectResult } from "firebase/auth";
import { useRouter } from "next/router";
import { auth, signInWithGoogle } from "../components/firebase";


const Index = () => {
    const router = useRouter();

    (async () => {
        await getRedirectResult(auth)
        if (auth.currentUser === null) {
            await signInWithGoogle();
        } else {
            router.push("/");
        }
    })();

    return (<p>
        Redirecting...
    </p>)
}

export default Index;