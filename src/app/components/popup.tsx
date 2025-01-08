import "./popup.css";
import {TaskForm} from './task-form';

type Popup = {
    togglePopup: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Popup = ({ togglePopup } : Popup) => (
            <div className="Overlay">
                <div className="PopupCard">
                    <div>task-form</div>
                    <button className="ClickButton" onClick={togglePopup}>Close</button>
                </div>
          </div>
      );