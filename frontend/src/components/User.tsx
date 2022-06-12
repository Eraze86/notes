import axios from "axios";
import { useEffect, useState } from "react";
import { INotes } from "../interface/INotes";
import { Link, useNavigate } from "react-router-dom";

export function User() {

  const nav = useNavigate();

  const [notes, setNotes] = useState<INotes[]>([]);
  const [logg, setLogg] = useState(false)

  ////////// Hämta user på localStorage, skicka med för att hämta listan ////////////
  useEffect(() => {
    let ls = localStorage.getItem("user");
    if (ls) {
      let userId = JSON.parse(ls);
      setLogg(true)
      axios
        .get<INotes[]>("http://localhost:3000/checklist/"+ userId)
        .then((response) => {
          setNotes(response.data);
          localStorage.setItem("notes", JSON.stringify(response.data));
        }); 
    }
  }, []);
///////////// skriv ut listan /////////////////////

  let list = notes.map((note) => {
    let noteLink = `/user/${note.id}`;
    console.log(note.id)

    return (
      <>
        {logg && <div key={note.id}>
          <h2 >
            <Link to={noteLink}>{note.title}</Link>
          </h2>
        </div>}
      </>
    );
  });

  function addToList() {
    nav("/user/addDoc");
  }
  return (
    <>
      {logg &&<>
        <button onClick={addToList}>Skapa nytt document</button>
        <br />
        <br />
        {list}
      </>}
    </>
  );
}
