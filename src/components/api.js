import react from 'react';
import axios from 'axios'

export default class Data extends React.Component {
    state = {
      datas: []
    }
  
    componentDidMount() {
      axios.get(`https://localhost3000.com`)
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
