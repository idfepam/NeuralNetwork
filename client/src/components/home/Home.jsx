import {useState} from "react";
import {FileUploadBlock} from "../fileUploadBlock/FileUploadBlock.jsx";
import './Home.css';
import {PredictionHistoryBlock} from "../predictionHistoryBlock/PredictionHistoryBlock.jsx";

export const Home = () => {
    return (
        <div className="content-wrapper">
            <FileUploadBlock/>
            <PredictionHistoryBlock/>
        </div>
    );
}
