// A mock function to mimic making an async request for data
export function fetchAllProducts(amount = 1) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    // TODO :Server will filter delted products
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
// pagination add in this api
export function fetchProductsByFilters(filter, sort, pagination) {
  //filter ={"category":["smartphone",]}
  //sort ={_sort:price,_order="desc"}
  // TODO :Server will filter delted products
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  console.log(pagination); // this line add
  queryString = queryString.slice(0, -1); // Remove the trailing '&'
  console.log("Query String:", queryString);

  // add this new code in this api
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}$`;
  }

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

// CREATE API FOR FETCHBRANDS
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}
// Product api
// export function createProduct(product) {
//   return new Promise(async (resolve) => {
//     const response = await fetch("http://localhost:8080/products/",{
//       method:'POST',
//       body:JSON.stringify(product),
//       headers:{'content-type':'application/json'}
//     })
//    const data =await response.json();
//    resolve({data});

//   });
// }

export function createProduct(product) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/products/", {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "content-type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      console.error("Error creating product:", error);
      reject(error);
    }
  });
}

// CREATE API FOR FETCHCATEGORIES
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
