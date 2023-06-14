import React, {useState} from "react";

const RowTambahMahasiswa = (props) => {

    // state utk data inputan form
    const[formInput, setFormInput] = useState({
        nim: "",
        nama: "",
        jurusan: "",
        asal: ""
    });

    // state utk menampung pesan error
    const [errors, setErrors] = useState({
        nim: "",
        nama: "",
        jurusan: "",
        asal: ""
    });

    // function utk memeriksa apakah ada nim yang sama atau tidak
    const cekDuplikasiNim = () => {
        return (props.mahasiswas.find((mahasiswa) => mahasiswa.nim === formInput.nim));
    }

    // function utk membuat 2 ways binding antara form dengan state
    const handleInputChange = (event) => {
        setFormInput({ ...formInput, [event.target.name]: event.target.value})
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let pesanErrors = {};

        // validasi nim
        if (formInput.nim.trim() === "") {
            pesanErrors.nim = "Nim tidak boleh kosong";
        }
        else if (!/^[0-9]{8}$/.test(formInput.nim)) {
            pesanErrors.nim = "Nim harus 8 karakter angka";
        }
        else if (cekDuplikasiNim()) {
            pesanErrors.nim = "Nim sudah dipakai";
        }
        else {
            pesanErrors.nim = "";
        }

        // validasi nama
        if (formInput.nama.trim() === "") {
            pesanErrors.nama = "Nama tidak boleh kosong";
        }
        else {
            pesanErrors.nama = "";
        }

        // validasi jurusan
        if (formInput.jurusan.trim() === "") {
            pesanErrors.jurusan = "Jurusan tidak boleh kosong";
        }
        else {
            pesanErrors.jurusan = "";
        }

        // validasi asal
        if (formInput.asal.trim() === "") {
            pesanErrors.asal = "Kota asal tidak boleh kosong";
        }
        else {
            pesanErrors.asal = "";
        }

        // update error state
        setErrors(pesanErrors);

        // cek apakah seluruh form valid atau masih ada error
        let formValid = true;
        for (let inputName in pesanErrors) {
            if (pesanErrors[inputName].length > 0) {
                formValid = false;
            }
        }

        // proses data jika form valid
        if (formValid) {
            props.onTambahMahasiswa(formInput);
            console.log(formInput);

            // kosongkan inputan form
            setFormInput({
                nim: "",
                nama: "",
                jurusan: "",
                asal: "",
            })
        }
    }

    return (
            <tr>
                <td colSpan="5">
                  <form onSubmit={handleFormSubmit}>
                    <div className="row row-cols-5 g-3">
                      <div className="col">
                        <input type="text" className="form-control" name="nim" placeholder="00000000" onChange={handleInputChange} value={formInput.nim} />
                        {errors.nim && <small className="text-danger">{errors.nim}</small>}
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" name="nama" placeholder="Nama Anda" onChange={handleInputChange} value={formInput.nama} />
                            {errors.nama && <small className="text-danger">{errors.nama}</small>}
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" name="jurusan" placeholder="Jurusan Anda" onChange={handleInputChange} value={formInput.jurusan} />
                            {errors.jurusan && <small className="text-danger">{errors.jurusan}</small>}
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" name="asal" placeholder="Kota Asal" onChange={handleInputChange} value={formInput.asal} />
                            {errors.asal && <small className="text-danger">{errors.asal}</small>}
                      </div>
                      <div className="col">
                        <button type="submit" className="btn btn-primary">Tambah</button>
                      </div>
                    </div>
                  </form>
                </td>
            </tr>
    )
}

export default RowTambahMahasiswa;