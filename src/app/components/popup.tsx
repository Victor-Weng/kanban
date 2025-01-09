'use client';
import { useContext } from "react";
import "./popup.css";
import TaskForm from './task-form';
import AuthContext from "@/AuthContext";

type PopupProps = {
    togglePopupAction: (event: React.MouseEvent<HTMLElement>) => void;
    updateKanban: () => void;
}

export const Popup: React.FC<PopupProps> = ({ togglePopupAction, updateKanban }) => {
    const { user } = useContext(AuthContext); // Get user from AuthContext
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        togglePopupAction(event);
        updateKanban();
    };


    return (
        <div className="Overlay">
            <div className="PopupCard">
                <TaskForm user={user} />
                <button className="ClickButton" onClick={handleClick}>Close</button>
            </div>
        </div>
    );
};