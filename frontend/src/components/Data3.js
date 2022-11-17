//Set data values for Query 3
import React from "react";
import axios from "axios";

class Data3 extends React.Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/getQuery3')
      .then((response) => {
        console.log(response.data.rows);
        this.setState({
            data: response.data.rows
        });
      });
  }
  render() {

    return (
        <div>
            TupleNumber--crash_ID--unit_number--person_number--citation--died--age--ethnicity--gender--not_injured
            {
            this.state.data.map((item, index) => {
                return (
                <div key={index}>{index}--{item[0]}--{item[1]}--{item[2]}--{item[3]}--{item[4]}--{item[5]}--{item[6]}--{item[7]}--{item[8]}</div>
                )
            })
            }
        </div>
    );
  }
}

export default Data3;