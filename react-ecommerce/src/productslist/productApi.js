// A mock function to mimic making an async request for data
export function fetchAllProducts(amount = 1) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

// A mock function to mimic making an async request for data
// export function fetchProductsByFilters(filter) {
//   // filter={"category":"smartphone"}
//   let queryString= "";
//   for(let key in filter){
//     queryString += `${key}=${filter[key]}&`
//   }
//   queryString = queryString.slice(0, -1); // Remove the trailing '&'
//   console.log("Query String:", queryString);

//   return new Promise(async (resolve) => {
//     const response = await fetch("http://localhost:8080/products?"+queryString);
//     const data = await response.json();
//     resolve({ data });
//   });
// }

export function fetchProductsByFilters(filter,sort) {
  //filter ={"category":["smartphone",]}
  //sort ={_sort:price,_order="desc"}
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 1) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for(let key in sort){
    queryString+= `${key}=${sort[key]}&`
  }
  queryString = queryString.slice(0, -1); // Remove the trailing '&'
  console.log("Query String:", queryString);

  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        "http://localhost:8080/products?" + queryString
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("API Response:", data);
      resolve({ data });
    } catch (error) {
      console.error("Fetch error:", error);
      resolve({ data: [] });
    }
  });
}
