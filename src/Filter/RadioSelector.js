import React from "react";

function RadioSelector({ availability, setAvailability }) {
    return(
        <div className="selector-box">
            <h3>Filtrer par status</h3>

                <input
                    type="checkbox"
                    checked={availability === true}
                    onChange={() => setAvailability(availability === true ? null : true)}
                />
                <label>Disponible</label>
                    
                <input
                    type="checkbox"
                    checked={availability === false}
                    onChange={() => setAvailability(availability === false ? null : false)}
                />
                <label>Indisponible</label>
            
        </div>
    )
}
    
    export default RadioSelector;
