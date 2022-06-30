import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";
import { INotes } from "../interface/INotes";
import { useNavigate } from "react-router-dom";
import { MainButton } from "./Styled/button";
import { Article } from "./Styled/section";
import { Input } from "./Styled/form";

export function AddDoc() {
  const nav = useNavigate();
  const editorRef = useRef<any>(null);
  const [user, setUser] = useState<INotes>({
    id: 0,
    user: 0,
    title: "",
    content: "",
  });

  function handletitle(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name;
    let uppdate = { ...user, [name]: e.target.value };
    setUser(uppdate);
    console.log("titel",user);
  }

///////////////////// Spara i listan och skicka med //////////
  function save() {
    let ls = localStorage.getItem("user");
     let saveList = { 
      user: ls,
      title: user.title,
      content: editorRef.current.getContent(),
    };
  
    axios
      .post<INotes>("http://localhost:3000/checklist/add", saveList)
      .then((response) => {
        console.log("data", response.data);
      });
    nav("/user");
  }
  return (
    <> <Article>
      Titel: <Input type="text"
        name="title"
        value={user.title}
        onChange={handletitle}
      />
      <Editor
        apiKey="6hqytudlu870wzja968yokx4myr1nzyi3rr9f1424qxxbdp2"
        onInit={(evt, editor) => (editorRef.current = editor)}
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
      </Article>
    </>
  );
}
