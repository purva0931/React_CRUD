import axios from "axios";
import React, { useEffect, useState } from "react";

const Albums = () => {
  const [albums, setAlbum] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/albums/1/photos")
      .then((response) => {
        console.log(response);
        setAlbum(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "200",
        height: "200",
      }}
    >
      {Array.isArray(albums) &&
        albums.map((album) => (
          <div
            key={album.id}
            style={{
              border: "1px solid black",
              margin: "20px",
              padding: "20px",
              width: "300px",
              height: "300px",
            }}
          >
            <span>{album.id}</span>
            <br />
            <span>{album.title}</span>
            <br />
            <img src={album.url} height="200" width="200" />
          </div>
        ))}
    </div>
  );
};

export default Albums;
