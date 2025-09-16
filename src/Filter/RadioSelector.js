import React from "react";

function RadioSelector() {
    return(
        <div>
                <h3>Filtrer par status</h3>

                    <input type="radio" id="available" name="available" value="available" />
                    <label for="available">Disponible</label>
            
                    <input type="radio" id="unavailable" name="unavailable" value="unavailable" />
                    <label for="unavailable">En location</label>
                
        </div>
    )
}
    
    export default RadioSelector;
