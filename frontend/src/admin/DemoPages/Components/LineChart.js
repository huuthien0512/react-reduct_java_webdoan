import React from 'react';
import {Line} from 'react-chartjs-2';

const LineChart = () => {
    return <div>
        <Line data={{labels:['1', '2', '3'],
    datasets:[
        {
            label: "# of votes",
            data: [12, 19, 11],
        }
    ]}} height={1000} width={1300}/>
    </div>
}

export default LineChart;