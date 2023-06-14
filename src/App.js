import React, {useState, useEffect} from "react";
import RowMahasiswa from './components/RowMahasiswa';
import RowTambahMahasiswa from './components/RowTambahMahasiswa';

// const arrMahasiswas = [
//   {
//     nim: "09786354",
//     nama: "Eka Putra",
//     jurusan: "Teknik Informatika",
//     asal: "Jakarta"
//   },
//   {
//     nim: "09786355",
//     nama: "Abdul Wahab",
//     jurusan: "Teknik Informatika",
//     asal: "Medan"
//   },
//   {
//     nim: "09786356",
//     nama: "Bayu Uzumaki",
//     jurusan: "Teknik Informatika",
//     asal: "Jakarta"
//   },
//   {
//     nim: "09786357",
//     nama: "Pragos",
//     jurusan: "Teknik Informatika",
//     asal: "Bandung"
//   },
//   {
//     nim: "09786358",
//     nama: "Krishna",
//     jurusan: "Teknik Informatika",
//     asal: "Bogor"
//   }
// ];

let url = "https://data-siswa-d2dd1-default-rtdb.asia-southeast1.firebasedatabase.app"
url += "/mahasiswas.json"

const App = () => {
  const [mahasiswas, setMahasiswas] = useState([]);
  const [submitCount, setSubmitCount] = useState(0);

  // Use Effect utk mengakses data dari API firebase
    useEffect(() => {
    const myFetch = async () => {
      let response = await fetch(url);
      let responseData = await response.json();
      
      const initMahasiswas = [];
      for (const key in responseData) {
        initMahasiswas.push({
          id: key,
          nim: responseData[key].nim,
          nama: responseData[key].nama,
          jurusan: responseData[key].jurusan,
          asal: responseData[key].asal
        })
      }
      setMahasiswas(initMahasiswas);
      }
      myFetch();
    }, [submitCount]);


  // handler utk mengedit data mahasiswa
  const handleEditMahasiswa = async (id, data) => {
    let url = "https://data-siswa-d2dd1-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url += `/mahasiswas/${id}.json`;

    await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data)
    })
    setSubmitCount(setSubmitCount + 1);
  }


  // handler utk menambah data mahasiswa
  const handleTambahMahasiswa = async (data) => {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data)
    })
    setSubmitCount(submitCount + 1);
  }


  // handler untuk menghapus data mahasiswa di komponen RowMahasiswa
  const handleHapusMahasiswa = async (e) => {
    
    let url = "https://data-siswa-d2dd1-default-rtdb.asia-southeast1.firebasedatabase.app/";
    url += `/mahasiswas/${e.target.id}.json`;

    await fetch(url, {
      method: "DELETE"
    })
    setSubmitCount(submitCount + 1);
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col">
          <h1 className="text-center">Tabel Mahasiswa</h1>

          <table className="table mt-4">
            <thead>
              <tr>
                <th>NIM</th>
                <th>Nama</th>
                <th>Jurusan</th>
                <th>Kota Asal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                mahasiswas.map((mahasiswa) => 
                  <RowMahasiswa 
                    key={mahasiswa.nim}
                    mahasiswa={mahasiswa}
                    onEditMahasiswa={handleEditMahasiswa}
                    onHapusMahasiswa={handleHapusMahasiswa}
                  />
                )
              }

              <RowTambahMahasiswa 
              mahasiswas={mahasiswas}
              onTambahMahasiswa={handleTambahMahasiswa} 
              />

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App;