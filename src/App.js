import { useContext, useEffect } from 'react';
import './App.css';
import Location from './Components/Location';
import { ContextProvider } from './Context/Context';
import './OlaMapsWebSDK/style.css';
import FormPage from './Components/FormPage';
import Loading from './Components/Loading/Loading';
function App() {
  const { GetCurrentLocation, Load, setLoad } = useContext(ContextProvider)
  useEffect(() => {
    // Fetch location when the component mounts
    const fetchLocation = async () => {
      setLoad(true); // Set loading to true before fetching
      const locationFetched = await GetCurrentLocation();
      setLoad(!locationFetched); // Set loading to false based on whether location was fetched successfully
    };

    fetchLocation();
  }, []);
  if (Load) {
    document.body.classList.add('scroll-none');

    return <Loading />
  }
  return (
    <>
      {/* <Loading/>   */}
      <div className="Container" id='Main'>
        <FormPage />
        <Location />
      </div>
    </>

  );

}

export default App;
