import firebase from 'firebase/app';
import 'firebase/storage';
import {upload} from './upload';

const firebaseConfig = {
  apiKey: "AIzaSyBy-Rk1Y-l23FsNDdQEtv0BlRI1rewZeys",
  authDomain: "fe-upload-plugin-468ba.firebaseapp.com",
  projectId: "fe-upload-plugin-468ba",
  storageBucket: "fe-upload-plugin-468ba.appspot.com",
  messagingSenderId: "225055350952",
  appId: "1:225055350952:web:362474af596ac0e09c629d"
}

firebase.initializeApp(firebaseConfig)


const storage = firebase.storage()

upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif', '.tiff', '.pdf'], // список форматов доступный для загрузки
  onUpload(files, blocks) {
    files.forEach((file, index) => {
      // загрузка фалов
      const ref = storage.ref(`images/${file.name}`)
      const task = ref.put(file)

      // прогресс загрузки
      task.on('state_changed', snapshot => {
        const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
        const block = blocks[index].querySelector('.preview-info-progress')
        block.textContent = percentage
        block.style.width = percentage
      }, error => {
        console.log(error)
      }, () => {
        task.snapshot.ref.getDownloadURL().then(url => {
          console.log('Download URL:', url)
        })
      })
    })
  }
})
