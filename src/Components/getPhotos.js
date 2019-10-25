import React from "react";
import axios from "axios";

export default class GetPhotos extends React.Component {
  constructor() {
    super();

    this.state = {
      photos: []
    };
  }
  componentDidMount() {
    this.getPhotos();
  }

  getPhotos = async () => {
    let res = await axios.get(
      `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}`
    );
    this.setState({ photos: res.data });
  };

  render() {
    console.log(this.state.photos);

    const mappedPhotos = this.state.photos.map((photo, i) => {
      return (
        <div key={i}>
          <img src={photo.urls.regular} atl="img" />
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
        <div style={{ display: "flex", padding: "0, 20%" }}>
          <div style={{paddingLeft: "20%" }}>
            <input type="text" placeholder="Search" />

            {mappedUsers}
          </div>
          <div
            style={{
              paddingLeft: "20%",
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
