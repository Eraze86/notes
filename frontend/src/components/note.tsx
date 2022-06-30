import axios from "axios";
import { INotes } from "../interface/INotes";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Article, Section } from "./Styled/section";
import {  H1Title } from "./Styled/Htext";
import { MainButton } from "./Styled/button";
export function Note() {

  const nav = useNavigate();
  const editorRef = useRef<any>(null)
  let params = useParams();

  const [note, setNote] = useState<INotes[]>([]);
  const [noteId, setNoteId] = useState(0);
  const [change, setChange] = useState(false);
  const [doc, setDoc] = useState(true);

  useEffect(() => {
    let ls = localStorage.getItem("notes");
    if (ls) {setNote(JSON.parse(ls));}
  }, []);

  useEffect(() => {
    if (params.id) setNoteId(+params.id);
  }, []);
  
//////////////////// Skriv ut rätt note på listan ////////////////////

  let showNote = note?.map((note: INotes) => {
    let localS = JSON.parse(localStorage.getItem("notes") || "");

    for (let i = 0; i < localS.length; i++) {
      if (noteId === note.id) {
        return (
          <>
            {doc && <><Section key={note.id}>
      
              <H1Title>{note.title} </H1Title>
              <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
              <MainButton onClick={changeDoc}>Redigera</MainButton>
              <MainButton onClick={deleteBtn}>Radera</MainButton>
              <MainButton onClick={back}>Tillbaka</MainButton>
            </Section></>}
                    

            {change && (
              <><Article>
               
                <Editor
                  apiKey="6hqytudlu870wzja968yokx4myr1nzyi3rr9f1424qxxbdp2"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={note.content}
                  init={{
                    height: 200,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],

                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
                <MainButton onClick={save}>Spara</MainButton>
                </Article></>
            )}
          </>
        );
      }
    }
  });

  function changeDoc() {
    setChange(true);
    setDoc(false)
  }
  function back(){
    nav("/user");
  }
  //////////////////// uppdatera inlägg ///////////////////////

  function save() {
    setChange(false)
    setDoc(true)
    let local = localStorage.getItem("user");
    
  let newList= {
    id: noteId ,
    user:  local,
    content: editorRef.current.getContent()
  }
      axios.post<INotes>("http://localhost:3000/checklist/uppdate", newList )
      .then(response => {console.log("data", response.data)})
      nav("/user")
  }
  /////////////////// radera inlägg ///////////////////////

  function deleteBtn(){

    axios.delete<INotes>("http://localhost:3000/checklist/" + noteId )
    .then(response =>{console.log("Vilket blir deletad ",response.data)
    nav("/user")
  })
  }

  return <>{showNote}</>;
}
