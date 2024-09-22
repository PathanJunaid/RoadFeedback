import React, { useContext } from 'react'
import { ContextProvider } from '../Context/Context'

const FormPage = () => {
    const {GetCurrentLocation,setMapRender,MapRender,setLoad} = useContext(ContextProvider)
    const HandleLocationClick = async() => {
        setLoad(true);
        await GetCurrentLocation();
        setLoad(false);
        setMapRender(!MapRender);
    }
    return (
        <div>
            <input type="text" name="" id="" />
            <div className=''>
                <label htmlFor="SearchLocation">Add Location</label>
                <button onClick={(e) => { HandleLocationClick(e) }}>Location</button>
            </div>
        </div>
    )
}

export default FormPage