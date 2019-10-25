import React from "react";
import axios from "axios";

export default class GetPhotos extends React.Component {
  constructor() {
    super();

    this.state = {
      photos: [],
      search: "",
      searchUser: ""
    };
  }
  componentDidMount() {
    this.getPhotos();
  }

  search = event => {
    this.setState({ search: event.target.value });
  };

  getPhotos = async () => {
    let res = await axios.get(
      `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}`
    );
    this.setState({ photos: res.data });
  };

  searchUser = () => {
    const user = this.state.search;
    axios
      .get(
        `https://api.unsplash.com/search/users?client_id=${process.env.REACT_APP_ACCESS_KEY}&query=${user}`
      )
      .then(res => {
        this.setState({ searchUser: res.data });
      });
      console.log(this.state.searchUser)
  };

  render() {
      console.log(this.state.search)

    const mappedPhotos = this.state.photos.map((photo, i) => {
      return (
        <div key={i}>
          <img src={photo.urls.regular} atl="img" width="90%" />
        </div>
      );
    });

    const mappedUsers = this.state.photos.map((photo, i) => {
      return (
        <div key={i}>
          <p>{photo.user.name}</p>
        </div>
      );
    });

    return (
      <>
        <h1>Unsplash</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              paddingLeft: "3%",
              justifyContent: "center"
            }}
          >
            <input
              type="text"
              placeholder="Search"
              onChange={this.search}
              value={this.state.search}
            />
            <button onClick={() => this.searchUser()}>Search</button>

            {mappedUsers}
          </div>
          <div
            style={{
              paddingLeft: "3%",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {mappedPhotos}
          </div>
        </div>
      </>
    );
  }
}
