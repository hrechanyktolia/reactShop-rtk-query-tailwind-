import React, {useState} from 'react';
import {useGetAllProductsQuery} from "./redux/apiProducts";
import ProductItem from "./components/ProductItem";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";


function App() {
    const [open, setOpen] = useState<boolean>(false)

    const openCart = () => {
        setOpen(!open)
    }

    const {data: products, isLoading, error} = useGetAllProductsQuery(null)

    const {selectedCategory, sortRating, sortPrice, search} = useSelector((state: RootState) => state.products);

    // const filterByCategory = selectedCategory ? products?.filter(product => product.category === selectedCategory)
    //     : products
    //
    // const filterByRating = sortRating ? products?.filter(product => sortRating === 'high' ? product.rating.rate >= 3 :
    //     product.rating.rate <= 3) : products
    //
    // const filterByPrice = sortPrice ? products?.filter(product => product.price >= sortPrice[0] && product.price <= sortPrice[1])
    //     : products

    const filteredProducts = products?.filter((product) => {
        if (selectedCategory && product.category !== selectedCategory) {
            return false;
        }

        if (
            sortRating &&
            ((sortRating === "high" && product.rating.rate < 3) ||
                (sortRating === "low" && product.rating.rate >= 3))
        ) {
            return false;
        }

        if (
            sortPrice &&
            (product.price < sortPrice[0] || product.price > sortPrice[1])
        ) {
            return false;
        }

        if (search && !product.title.toLowerCase().includes(search.toLowerCase())) {
            return false;
        }
        return true;
    });


    if (error) {
        return <div>Oh no, there was an error</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="max-w-full">
            <Header openCart={openCart}/>
            {open && <Cart openCart={openCart}/>}
            <div className="flex">
                <Filter/>
                <div className="flex flex-wrap justify-center items-center w-[85%]">
                    {filteredProducts?.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
