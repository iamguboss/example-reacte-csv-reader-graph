import React, {
    Component
} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

    }

    componentDidMount() {
        this.fetchCsv()
    }

    fetchCsv = async () => {
        let response = await fetch('mockdata.csv')
        let text_response = await response.text()
        let convert_data =  this.parseCsvToJson(text_response)
        convert_data.shift()
        this.setState({
            data: convert_data
        })
    }

    parseCsvToJson(csvData) {
        const lines = csvData.split("\n");
        const headers = lines[0].split(",");

        let jsonData = [];

        lines.map((line, row) => {
            let obj = {};
            const currentline = line.split(",");
            headers.map((header, column) => {
                obj[header] = currentline[column];
            });

            jsonData.push(obj);
        });

        return jsonData;
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