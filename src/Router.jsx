import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainScreen from "./assets/Screens/MainScreen/MainScreen";
import ExchangesScreen from "./assets/Screens/ExchangesScreen/Exchanges";
import AboutUsScreen from "./assets/Screens/AboutUsScreen/AboutUsScreen"

const Router = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<MainScreen/>} path="/"/>
                <Route element={<ExchangesScreen />} path="/Exchanges"/>
                <Route element={<AboutUsScreen/>} path="/AboutUs"/>
                <Route path="*" element={<div>Not Found</div>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;