import React from 'react';
import AlWafiCard from '../../components/AlWafiCard';
import MealsTable from './table';


const Meals = () => {
    const crumbs = [
        { name: 'Home' },
        { name: 'Meals' },
        { name: 'List Of Meals' }
    ];

    return (
        <AlWafiCard crumbs={crumbs}>
            <MealsTable />
        </AlWafiCard>
    )
}

export default Meals;