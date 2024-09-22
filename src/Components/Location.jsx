import React, { useContext, useEffect, useState } from 'react';
// import { OlaMaps } from '../OlaMapsWebSDK/olamaps-js-sdk.es';
import '../OlaMapsWebSDK/style.css';
import { ContextProvider } from '../Context/Context';
const Location = () => {
    const { Marker, maps, HandleMapClick,CustomLoad,HandleDrag,MapRender,setCustomLoad } = useContext(ContextProvider);
    const [Pointer,setPointer] = useState(null);
    useEffect(() => {
        if (maps) {
            const myMap = maps.init({
                style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
                container: 'Map',
                center: [Marker.lng, Marker.lat],
                zoom: 14,
            });
            const data = maps.addMarker({ offset: [0, 0], anchor: 0, draggable: true }).setLngLat([Marker.lng, Marker.lat]).addTo(myMap)
            setPointer(data)
            data.on('drag',(e)=>{setCustomLoad(!CustomLoad)})
            // setMarker({mark:data});
            myMap.on('click', (e) => {
                HandleMapClick(e, myMap);
            })
        } else {
            console.log("Error")
        }

    }, [MapRender])
    useEffect(()=>{
        console.log(Pointer)
        if(Pointer!==null){
            Pointer.on('drag',(e)=>HandleDrag(e))
        }
    },[CustomLoad])
    console.log(Marker)
    return (
        <div id='' className='Map-Container'>
            <div className="latlong">
                <p>Lat : {Marker.lat}</p>
                <p>Lng : {Marker.lng}</p>
            </div>
            <div id="Map"></div>
        </div>
    );
};

export default Location;