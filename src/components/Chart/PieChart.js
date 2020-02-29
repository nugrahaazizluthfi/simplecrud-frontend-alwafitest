import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const PieChart = ({data}) => {
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={{
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    width: 600,
                    style: {
                        'position': 'relative',
                        'margin': '0 auto'
                    }
                },
                title: {
                    text: 'Jumlah Meals dari Endpoint'
                },
                subtitle: {
                    text: 'http://api.wibs.sch.id/v2/meal/post/datatable.food-category'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.0f}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.0f}'
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data
                }]
            }}
        />
    )
}

export default PieChart;