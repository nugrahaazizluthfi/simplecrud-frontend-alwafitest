import React, { useState, useEffect } from 'react';
import AlWafiCard from '../../components/AlWafiCard';
import axios from 'axios';
import PieChart from '../../components/Chart/PieChart';
import _ from 'lodash';

const Home = () => {
    const [dataChart, setDataChart] = useState([{
        name: 'Meals',
        y: 100,
        sliced: true,
    }]);
    const endpoint = { meals: 'http://api.wibs.sch.id/v2/meal/post/datatable.food-category' }
    const crumbs = [{ name: 'Home' },];

    useEffect(() => {
        const _handelLoadChart = () => {
            axios({
                method: 'post',
                url: endpoint.meals,
                headers: {
                    'Application-Token': 'geSzgVahOlowulcgHEtQmu9Ybofk1lRnPFd3V5atSEu1SD1dt2'
                }
            })
            .then(function (response) {
                const { data } = response.data;
                var i = 0;
                var result = _(data)
                    .groupBy('name')
                    .map(function (item, itemId) {
                        var obj = {};
                        obj["name"] = itemId
                        obj["y"] = _.countBy(item, 'name')[itemId]
                        if(i === 0){
                            obj["sliced"] = true;
                            obj["selected"] = true;
                        }
                        i++;
                        return obj
                    }).value();

                setDataChart(_.orderBy(result, ['y'],['desc']));
            })
            .catch(function (error) {
                console.log(error);
            });
        }

        _handelLoadChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const style = {
        display: 'block',
        width: '100%',
        position: 'relative',
        margin: '0 auto',
        overflow: 'auto',
        align: 'center',
    }

    return (
        <AlWafiCard crumbs={crumbs}>
            <div style={style}>
                <PieChart data={dataChart} />
            </div>
        </AlWafiCard>
    )
}

export default Home;