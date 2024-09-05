import { useEffect, useState } from "react"

const localCache = {

}

export const useFetch = (url) => {

  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null
  });

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null
    });
  }

  const getFetch = async() => {

    //Si ta tenemos guardado en el localCache los datos que se recuperan de esa url, no volvemos a hacer el fetch, sinó que recuperamos los datos del localCache
    if (localCache[url]) {      
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null
      });
      return
    }

    setLoadingState();
    const resp = await fetch(url);

    if (!resp.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: resp.status,
          message: resp.statusText
        }
      });
      return;
    }

    const data = await resp.json();

    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null
    });

    //En este objeto guardamos los datos recuperados tras cada llamada, para no tener que volver a hacer las llamadas si deseamos buscar de nuevo algo que ya se ha buscado
    localCache[url] = data;


  }  

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError
  }
}
