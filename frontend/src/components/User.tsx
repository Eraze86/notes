import axios from "axios";
import { useEffect, useState } from "react";
import { INotes } from "../interface/INotes";
import { Link, useNavigate } from "react-router-dom";
import { Button, LinkList, MainButton } from "./Styled/button";
import { Article, Section } from "./Styled/section";

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
        {logg && <Article key={note.id}>
          <h2 >
            <LinkList to={noteLink}>{note.title}</LinkList>
          </h2>
        </Article>}
      </>
    );
  });

  function addToList() {
    nav("/user/addDoc");
  }
  return (
    <>
      {logg &&<><Section>
        <MainButton onClick={addToList}>Skapa nytt document</MainButton>
        <br />
        <br />
        {list}
        </Section>
      </>}
    </>
  );
}
