import { useState } from 'react';
import axios from 'axios';
import styles from './UploadForm.module.css';

export function UploadForm() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  async function handleSubmitForm(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      const response = await axios.post(
        'http://54.232.172.200:5004/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 200) {
        alert('Upload realizado com sucesso!');
      }
      console.log(response.data); // retirar este console depois
    } catch (error) {
      console.error('Erro ao fazer o upload', error);
      alert(`Erro ao fazer o upload. O motivo do erro é: ${error}`);
    }
  }

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeImage(event) {
    setImage(event.target.files[0]);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmitForm}>
        <div className={styles.filters}>
          <label>Nome:</label>
          <input
            style={{ width: '100%' }}
            type="text"
            value={name}
            onChange={handleChangeName}
            required
          />
        </div>
        <div>
          <label>Imagem:</label>
          <input
            type="file"
            onChange={handleChangeImage}
            required
          />
        </div>
        <div className={styles.button}>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
}
