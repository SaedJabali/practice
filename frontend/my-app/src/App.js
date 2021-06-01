import React, { Component } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
      favData: [],
      deletedData: [],
    }
  }

  componentDidMount = () => {
    this.getData();
    this.getFavData();
  }
  getData = async () => {
    const url = `http://localhost:6060/artic`
    const apiDataArr = await axios.get(url)
    this.setState({
      apiData: apiDataArr.data
    })
  }

  postData = async (dataObj) => {
    await axios.post(`http://localhost:6060/post`, dataObj)
  }
  getFavData = async () => {
    const url = `http://localhost:6060/post`
    const apiDataArr = await axios.get(url)
    this.setState({
      favData: apiDataArr.data
    })
  }
  deleteData = async (title) => {
    const deleteArr = this.state.favData.filter((b,idx)=>{
      return title !== idx;
    })
    this.setState({
      deletedData: deleteArr
    })
    await axios.delete(`http://localhost:6060/post/${title}`)
  }

//   showUpdateForm = (desc, slug) => {
//     this.setState({
//         description: desc,
//         slugName: slug,
//         showUpdateForm: true
//     })
// }
// updateDescriptionState = (e) => this.setState({ description: e.target.value })

// updateItem = async (e) => {
//     e.preventDefault();

//     const request = await axios.put(`${this.state.url}/art/favorite/${this.state.slugName}`, { description: this.state.description });

//     this.setState({
//         apiCrudData: request.data,
//     });



// }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>

            <div>

              {this.state.apiData.map(element => {
                return (
                  <div>
                    <p>
                      {element.title}
                    </p>
                    <img src={element.thumbnail} alt='' />
                    <p>
                      {element.author}
                    </p>
                    <p>
                      {element.credit}
                    </p>
                    <button onClick={e => { this.postData(element) }}>
                      add to fav
              </button>
                  </div>
                )
              })
              }
            </div>
          </Route>
          <Route exact path='/fav'>
            <div>
              {this.state.favData.map((element, index) => {
                return (
                  <div>
                    <p>
                      {element.title}
                    </p>
                    <img src={element.thumbnail} alt='' />
                    <p>
                      {element.author}
                    </p>
                    <p>
                      {element.credit}
                    </p>
                    <button onClick={this.deleteData(index)}>
                      remove from fav
              </button>
                  </div>
                )
              })
              }
            </div>

          </Route>

        </Switch>
      </Router>
    )
  }
}

export default App
