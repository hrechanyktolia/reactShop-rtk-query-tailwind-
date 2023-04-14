import React, {ChangeEvent, useState} from 'react';
import {useGetCategoriesQuery} from "../redux/apiProducts";
import {useDispatch} from "react-redux";
import {filterByCategory} from "../redux/productSlice";


const Filter = () => {

    const [checkedCategories, setCheckedCategories] = useState<string[]>([]);

    const {data: categories} = useGetCategoriesQuery(null)

    const dispatch = useDispatch()

    const handleChangeCategory = (event:ChangeEvent<HTMLInputElement>) => {
        const category = event.target.value
        const isChecked = event.target.checked
        let newCheckedCategories = [...checkedCategories]

        if (isChecked) {
            newCheckedCategories.push(category)
        } else {
            newCheckedCategories = newCheckedCategories.filter((c) => c !== category)
        }

        setCheckedCategories(newCheckedCategories)

        if (newCheckedCategories.length > 0) {
            dispatch(filterByCategory(newCheckedCategories.join(',')))
        } else {
            dispatch(filterByCategory(''))
        }
    }
    return (
        <div className='m-10 sticky'>
            <div className='@apply block-filter'>
                <h3 className='@apply title-filter'>Category</h3>
                <div className='flex pt-2'>
                    <input
                        className='@apply input-filter'
                        id='all'
                        type="checkbox"
                        value=""
                        onChange={(event) => handleChangeCategory(event)}
                        checked={checkedCategories.length === 0}
                    />
                    <label htmlFor='all' className='@apply label-filter'>All</label>
                </div>
                {categories?.map((category) =>
                    <div key={category} className='flex pt-2'>
                        <input
                            className='@apply input-filter'
                            id={category}
                            type="checkbox"
                            value={category}
                            onChange={(event) => handleChangeCategory(event)}
                            checked={checkedCategories.includes(category)}
                        />
                        <label htmlFor={category} className='@apply label-filter'>{category}</label>
                    </div>
                )}
            </div>
            <div className='@apply block-filter'>
                <h3 className='@apply title-filter mt-5'>Price</h3>
                <div className='flex justify-around'>
                    <input type="text"
                           className='@apply min-max-input'
                           placeholder='low'/>
                    -
                    <input type="text"
                           className='@apply min-max-input'
                           placeholder='high'
                    />
                </div>
            </div>
            <div className='@apply block-filter'>
                <h3 className='@apply title-filter mt-5'>Rating</h3>
                <div>
                    <input type="checkbox"
                           id='high'
                           className='@apply input-filter'/>
                    <label htmlFor="high" className='@apply label-filter'>high</label>
                </div>
                <div>
                    <input type="checkbox"
                           id='low'
                           className='@apply input-filter'/>
                    <label htmlFor="low" className='@apply label-filter'>low</label>
                </div>
            </div>
        </div>
    );
};

export default Filter;