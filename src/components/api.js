import React from 'react';
import axios from 'axios'

export default class Data extends React.Component {
    state = {
      datas: []
    }
  
    componentDidMount() {
      axios.get(`https://localhost:7177/api/users`)
        .then(res => {
          const datas = res.data;
          this.setState({ datas });
        })
    }
  
    render() {
      return (
        <ul>
          {
            this.state.datas
              .map(data =>
                <li key={data.id}>{data.name}</li>
              )
          }
        </ul>
      )
    }
  }
