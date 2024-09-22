import React, { createContext, useState } from 'react';
import { OlaMaps } from '../OlaMapsWebSDK/olamaps-js-sdk.es';

// Create a Context
export const ContextProvider = createContext(null);

const Context = ({ children }) => {
    // Define some state or value to be shared across components
    const [Marker, setMarker] = useState({
        lat: 0, lng: 0, status: false, mark: false
    });
    const [MapRender,setMapRender] = useState(false);
    const [Load, setLoad] = useState(true);
    const [CustomLoad, setCustomLoad] = useState(false)
    const GetCurrentLocation = () => {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // Success callback function
                        const lati = position.coords.latitude;
                        const longi = position.coords.longitude;
                        setMarker({ lat: lati, lng: longi });
                        resolve(true); // Successfully retrieved position
                    },
                    (error) => {
                        // Error callback function
                        console.error("Error getting location: ", error);
                        resolve(false); // Failed to retrieve position
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                resolve(false); // Geolocation not supported
            }
        });
    }
    const maps = new OlaMaps({
        apiKey: process.env.REACT_APP_OLA_API,
    })
    const HandleMapClick = (e, myMap) => {
        if (Marker.mark === false) {
            // const data = maps.addMarker({ offset: [0, 0], anchor: 0, draggable: true }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(myMap)
            // setMarker({ mark: data });
        } else {
            console.log("Already");
        }
    }
    const HandleDrag = (e) => {
        console.log(e.target._lngLat);
        setMarker({lat:e.target._lngLat.lat,lng:e.target._lngLat.lng})
        setCustomLoad(!CustomLoad)
    }
    const Values = {
        Marker, setMarker,
        GetCurrentLocation,
        Load, setLoad,
        maps,
        HandleMapClick,
        HandleDrag,
        CustomLoad, setCustomLoad,
        MapRender,setMapRender
    }
    return (
        // Provide the context value to child components
        <ContextProvider.Provider value={Values}>
            {children}
        </ContextProvider.Provider>
    );
};

export default Context;
