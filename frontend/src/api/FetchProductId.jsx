export default async function FetchProductId(id) {
    try {
        let res = await fetch(`https://dummyjson.com/products/${id}`)
        let data = await res.json();
        return data;
    }
    catch (error) {
        console.log("Failed to Fetch Products")
        return null;
    }
}