import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {filterByCategory, filterByPrice, filterByRating} from "../redux/productSlice";


const inputCategories = [
    {id: "men's clothing", title: "men's clothing"},
    {id: "women's clothing", title: "women's clothing"},
    {id: "jewelery", title: "jewelery"},
    {id: "electronics", title: "electronics"}
]

const inputRating = [
    {id: "high", title: "high"},
    {id: "low", title: "low"}
]

const Filter = () => {

    const dispatch = useDispatch();
    const {selectedCategory, sortRating, sortPrice} = useSelector((state: RootState) => state.products)

    const handleChangeFilter = (event: ChangeEvent<HTMLInputElement>, filterType: string) => {
        if (event.target.checked) {
            switch (filterType) {
                case 'category':
                    dispatch(filterByCategory(event.target.value));
                    break;
                case 'rating':
                    dispatch(filterByRating(event.target.value));
                    break;
                default:
                    break;
            }
        } else {
            switch (filterType) {
                case 'category':
                    dispatch(filterByCategory(''));
                    break;
                case 'rating':
                    dispatch(filterByRating(''));
                    break;
                default:
                    break;
            }
        }
    };

    const handleChangePrice = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newSortPrice = [...sortPrice];
        newSortPrice[index] = parseInt(event.target.value) || 0;
        dispatch(filterByPrice(newSortPrice));
    }


    return (
        <div className='m-10 sticky'>
            <div className='@apply block-filter'>
                <h3 className='@apply title-filter'>Category</h3>
                {inputCategories?.map((category) =>
                    <div key={category.id} className='flex pt-2'>
                        <input
                            className='@apply input-filter'
                            id={category.id}
                            type="checkbox"
                            value={category.title}
                            checked={category.title === selectedCategory}
                            onChange={event => handleChangeFilter(event, 'category')}

                        />
                        <label htmlFor={category.id} className='@apply label-filter'>{category.title}</label>
                    </div>
                )}
            </div>
            <div className='@apply block-filter'>
                <h3 className='@apply title-filter mt-5'>Price</h3>
                    <div className='flex justify-around'>
                        <input type="text"
                               className='@apply min-max-input'
                               onChange={event => handleChangePrice(event, 0)}
                               placeholder='low'/>
                        -
                        <input type="text"
                               className='@apply min-max-input'
                               onChange={event => handleChangePrice(event, 1)}
                               placeholder='high'/>
                    </div>
            </div>
            <div className='@apply block-filter'>
                <h3 className='@apply title-filter mt-5'>Rating</h3>
                {inputRating.map(rating =>
                    <div key={rating.id}>
                        <input type="checkbox"
                               id={rating.id}
                               value={rating.title}
                               checked={sortRating === rating.title}
                               onChange={event => handleChangeFilter(event, 'rating')}
                               className='@apply input-filter'/>
                        <label htmlFor={rating.id} className='@apply label-filter'>{rating.title}</label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filter;