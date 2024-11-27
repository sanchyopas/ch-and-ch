/**
 *** фнукции с api запросами
 **/

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erorr: ${response.status}`);
    }
    return await response.json();

  } catch (error) {
    throw error;
  }
}



