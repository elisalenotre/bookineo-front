import React from "react";

function RadioSelector({ availability, setAvailability }) {
    return(
        <div className="selector-box">
            <h3>Filtrer par status :</h3>

                <div className="checkbox-section">
                    <input
                        type="checkbox"
                        checked={availability === true}
                        onChange={() => setAvailability(availability === true ? null : true)}
                    />
                    <label>Disponible</label>
                </div>

                <div className="checkbox-section">
                    <input
                        type="checkbox"
                        checked={availability === false}
                        onChange={() => setAvailability(availability === false ? null : false)}
                    />
                    <label>Indisponible</label>
                </div>
            
        </div>
    )
}
    
    export default RadioSelector;
