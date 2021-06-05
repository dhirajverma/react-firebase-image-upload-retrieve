import React, { Component } from 'react';
import firebase from './firebase';

const db = firebase.database();

class ImageOps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgName: '',
      imgURL: '',
      files: null,
      progress: 0,
      url: '',
    };
  }

  handleChange = (files) => {
    this.setState({
      files: files,
    });
  };
  handleSave = () => {
    let bucketName = 'images';
    let imgName = document.getElementById('namebox').value;
    if (imgName !== null && imgName !== '') {
      let file = this.state.files[0];
      let storageRef = firebase.storage().ref(`${bucketName}/` + imgName + '.png');
      let uploadTask = storageRef.put(file); // to store the image in DataBase

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({ progress });
        },

        (error) => {
          console.log('@error is ', error);
        },
        //
        () => {
          storageRef.getDownloadURL().then((url) => {
            db.ref('Pictures/ ' + imgName).set({
              name: imgName,
              Link: url,
            });
            console.log('Image saved in DB URL is : ', url);
            alert(
              'image added succeessfully on firebase storage and link (see in console) saved in firebase db',
            );
          });
        },
      );
    } else alert('Please select image and insert image name');
  };

  showImage = () => {
    let imageName = document.getElementById('namebox').value;
    db.ref('Pictures/ ' + imageName).on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        document.getElementById('new-img').src = snapshot.val().Link || 'http://via.placeholder.com/400x300';
      } else alert('no image found with the given image name');
    });
  };

  render() {
    return (
      <div>
        <progress value={this.state.progress} max="100" />
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={(e) => {
            this.handleChange(e.target.files);
          }}
        />
        Image name <input type="text" id="namebox" />
        <button onClick={this.handleSave}>Save/Upload</button>
        <button onClick={this.showImage}>Show Image</button>
        <img id="new-img" height="300" width="400" />
      </div>
    );
  }
}

export default ImageOps;
