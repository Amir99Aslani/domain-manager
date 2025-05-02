import DomainTable from "./Components/Pages/DomainTable.tsx";
import "./Components/styles/GlobalStyle.scss";
import {useEffect, useState} from "react";

import LoaderSvg from "./Components/styles/ICO/LoaderSvg.tsx";

function App() {

    const [animationTiming, setAnimationTiming] = useState<boolean>(false);
    const [loadingAnimation, setLoadingAnimation] = useState<boolean>(true);

    const LoadingScreen = () => {

        return (
            <div className={`LoadingContainer firstImpression stroke-path ${animationTiming ? "fill-shape" : ""}`}>
                <LoaderSvg/>
            </div>
        );
    };

    useEffect(() => {
        const hasVisited : boolean = sessionStorage.getItem("visited");

        if (hasVisited) {
            setLoadingAnimation(false);
        } else {
            setTimeout(() => {
                setAnimationTiming(true);

            }, 1600);
            setTimeout(() => {
                setLoadingAnimation(false);
                sessionStorage.setItem("visited", "true");
            }, 3100);
        }
    }, []);

    console.log(animationTiming);

    return (
        <div className="appContainer">
            {
                loadingAnimation ?
                    <LoadingScreen/>
                    :
                    <DomainTable/>
            }
        </div>
    )
}

export default App;
