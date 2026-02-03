import { useState } from 'react'

function App() {
  const [searchInput, setSearchInput] = useState("");

  function handleSearch() {

    console.log(searchInput);
  }

  return (

    <div className="container mt-5"> <div className="row"> <div className="col-12"> <div className="input-group">

      <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)} className="form-control" placeholder="Cerca..." />

      <button className="btn btn-dark" onClick={handleSearch}> Cerca </button> </div> </div> </div> </div>

  );

}

export default App
