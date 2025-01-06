import "./popup.css";

type Popup = {
    togglePopup: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Popup = ({ togglePopup } : Popup) => (
            <div className="Overlay">
                <div className="PopupCard">
                    <button className="ClickButton" onClick={togglePopup}>Close</button>
                </div>
          </div>
      );