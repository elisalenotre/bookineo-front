import React from "react";

function RadioSelector() {
    return(
        <div className="box selector-box">
                <h3>Filtrer par status</h3>

                    <input type="checkbox" id="available" name="available" value="available" />
                    <label for="available">Disponible</label>
            
                    <input type="checkbox" id="unavailable" name="unavailable" value="unavailable" />
                    <label for="unavailable">Indisponible</label>
                
        </div>
    )
}
    
    export default RadioSelector;
