import React, {
    Component
} from 'react';
import * as d3 from 'd3';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        };

    }

    componentDidMount() {
        this.fetchCsv()
    }

    fetchCsv = () => {
        d3.csv('mockdata.csv', (data) => {
            return data
        }).then((data) => {
            this.setState({
                data: data
            })
        })
    }

    render() {
        return ( 
            <div>
<LineChart width={2048} height={500} data={this.state.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="count" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
  </div>
        )
    }

}