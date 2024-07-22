
import React, { useEffect, useState } from 'react';

function Products({ ProductsEndpoint }) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    // const [selectedProduct, setSelectedProduct] = useState(null);
    const [filterBrand, setFilterBrand] = useState('');
    const [filterPriceMin, setFilterPriceMin] = useState('');
    const [filterPriceMax, setFilterPriceMax] = useState('');

    // Fetch products initially based on ProductsEndpoint
    useEffect(() => {
        fetchProducts(ProductsEndpoint);
    }, [ProductsEndpoint]);

    // Function to fetch products from the server using props to pass endpoints dynanmically
    const fetchProducts = (endpoint) => {
        fetch(`http://localhost:8081${endpoint}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setProducts(data);
                // Apply filters after fetching new data
                applyFilters();
            })
            .catch(err => console.error('Error fetching products:', err));
    };



    // Apply filters based on filterBrand, filterPriceMin, and filterPriceMax
    useEffect(() => {
        applyFilters();
    }, [products, filterBrand, filterPriceMin, filterPriceMax]);

    //function applies filter 
    function applyFilters(){
        let filtered = products.filter(product => {

            // Filter by brand based on if filterBrand is found in product brand if false return those
            if (filterBrand && !product.Brand.toLowerCase().includes(filterBrand.toLowerCase())) {
                return false;
            }

            // Filter by price range
            const price = parseFloat(product.Price);//set price to the price of the product in decimal
            const minPrice = filterPriceMin ? parseFloat(filterPriceMin) : Number.NEGATIVE_INFINITY;
            const maxPrice = filterPriceMax ? parseFloat(filterPriceMax) : Number.POSITIVE_INFINITY;
            if (price < minPrice || price > maxPrice) {
                return false;
            }
            return true;
        });
        setFilteredProducts(filtered);
    };

    // Clear all filters
    function clearFilters(){
        setFilterBrand('');
        setFilterPriceMin('');
        setFilterPriceMax('');
    };

    // Handle clicking on a product
    // const handleProductClick = (product) => {
    //     setSelectedProduct(product);
    // };

    return (
        <div className="container mx-auto py-8">
            <h1 className="font-bold text-3xl text-center mb-8">Products</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                <div className="flex items-center mb-4 md:mb-0">
                    <label className="text-gray-700">Brand:</label>
                    <input type="text" value={filterBrand} onChange={e => setFilterBrand(e.target.value)} className="px-2 py-1 border border-gray-300 rounded-md ml-2" />
                </div>
                <div className="flex items-center mb-4 md:mb-0">
                    <label className="text-gray-700">Price Range:</label>
                    <input type="number" placeholder="Min" value={filterPriceMin} onChange={e => setFilterPriceMin(e.target.value)} className="px-2 py-1 border border-gray-300 rounded-md ml-2 w-24" />
                    <span className="text-gray-700 mx-2">-</span>
                    <input type="number" placeholder="Max" value={filterPriceMax} onChange={e => setFilterPriceMax(e.target.value)} className="px-2 py-1 border border-gray-300 rounded-md w-24" />
                </div>
                <button onClick={clearFilters} className="text-gray-700 hover:text-blue-500 focus:outline-none ml-2">Clear Filters</button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-4">
                {filteredProducts.map((product, index) => (
                    <div key={index} className="flex justify-center">
                        <div className="border border-gray-200 p-4 rounded-lg overflow-hidden shadow-xl w-64">
                            <img
                                src={product.Image_URL}
                                alt="Product"
                                className="h-48 w-full object-contain cursor-pointer"
                                // onClick={() => handleProductClick(product)}
                            />
                            <div className="p-4">
                                <h2 className="text-xl mb-2 font-semibold">{product.Product_Name}</h2>
                                <p className="text-gray-700 mb-2">${product.Price}</p>
                                <p className="text-gray-700">{product.Brand}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Products;
