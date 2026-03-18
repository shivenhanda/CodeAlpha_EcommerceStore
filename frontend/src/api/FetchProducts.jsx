export default async function FetchProducts() {
    try {
        let res = await fetch("https://dummyjson.com/products?limit=100")
        let data = await res.json();
        return data.products;
    }
    catch (error) {
        console.log("Failed to Fetch Products")
        return [];
    }
}