import React, {useState} from "react";

const RowMahasiswa = (props) => {

    // simpan props mahasiswa kedalam state agar mudah diakses
    const [formInput, setFormInput] = useState({
        nim: props.mahasiswa.nim,
        nama: props.mahasiswa.nama,
        jurusan: props.mahasiswa.jurusan,
        asal: props.mahasiswa.asal
    });

    // state utk menampung pesan error
    const [errors, setErrors] = useState({
        nama: "",
        jurusan: "",
        asal: ""
    });

    // state utk penanda "edit mode"
    const [editStatus, setEditStatus] = useState(false);

    // state utk menampung nilai form sebelum "edit mode"
    const [dataReset, setDataReset] = useState({});

    // function utk membuat 2 ways binding antara form dengan state
    const handleInputChange = (event) => {
        setFormInput({...formInput, [event.target.name] : event.target.value})
    }

    // tombol edt diklik
    const handleEditClick = () => {

        // simpan data utk proses reset
        setDataReset({...formInput});

        // masuk ke "edit mode"
        setEditStatus(true);
    }

    // tombol batal diklik
    const handleFormReset = (e) => {
        e.preventDefault();

        // kembalikan isi form ke ke posisi sebelum tombol diklik
        setFormInput({...dataReset})

        // hapus pesan error (jika ada)
        setErrors({});

        // keluar dari "edit mode"
        setEditStatus(false);
    }

    // form submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // setEditStatus(false);
        let pesanErrors = {};

        // validasi nama
        if (formInput.nama.trim() === "") {
            pesanErrors.nama = "Nama tidak boleh kosong";
        }
        else {
            pesanErrors.nama = "";
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
        for (let propName in pesanErrors) {
            if (pesanErrors[propName].length > 0) {
                formValid = false;
            }
        }

        // proses data jika form valid
        if (formValid) {
            props.onEditMahasiswa(props.mahasiswa.id, formInput);
            setEditStatus(false);
        }
    }

    return (
        <React.Fragment>
            {/* tampilkan form jika tombol edit diklik, atau tampilkan row normal */}
            {editStatus ?
                <tr>
                    <td colSpan="5">
                        <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
                            <div className="row row-cols-5 g-3">
                                <div className="col">
                                    <input type="text" className="form-control" disableddefaultValue={formInput.nim} name="nama" />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" name="nama" onChange={handleInputChange} value={formInput.nama} />
                                    {errors.nama && <small className="text-danger">{errors.nama}</small>}
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" name="jurusan" onChange={handleInputChange} value={formInput.jurusan} />
                                    {errors.jurusan && <small className="text-danger">{errors.jurusan}</small>}
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" name="asal" onChange={handleInputChange} value={formInput.asal} />
                                    {errors.asal && <small className="text-danger">{errors.asal}</small>}
                                </div>
                                <div className="col">
                                    <button className="btn btn-success m-2" type="submit">
                                        Simpan
                                    </button>
                                    <button className="btn btn-warning" type="reset">
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </form>
                    </td>
                </tr>
                :
                <tr>
                    <td>{formInput.nim}</td>
                    <td>{formInput.nama}</td>
                    <td>{formInput.jurusan}</td>
                    <td>{formInput.asal}</td>
                    <td>
                        <button className="btn btn-secondary m-2" onClick={handleEditClick}>Edit</button>
                        <button className="btn btn-danger" id={props.mahasiswa.id} onClick={props.onHapusMahasiswa}>Hapus</button>
                    </td>
                </tr>
            }
        </React.Fragment>
        
    )
}

export default RowMahasiswa;