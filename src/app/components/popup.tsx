'use client';
import { useContext } from "react";
import "./popup.css";
import TaskForm from './task-form';
import AuthContext from "@/AuthContext";

type PopupProps = {
    togglePopupAction: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Popup: React.FC<PopupProps> = ({ togglePopupAction }) => {
    const { user } = useContext(AuthContext); // Get user from AuthContext

    return (
        <div className="Overlay">
            <div className="PopupCard">
                <TaskForm user={user} />
                <button className="ClickButton" onClick={togglePopupAction}>Close</button>
            </div>
        </div>
    );
};