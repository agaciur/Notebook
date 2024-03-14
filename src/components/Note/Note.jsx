import styles from "./Note.module.css"
import { useParams, useLoaderData } from "react-router-dom"
import { Todolist } from "../Todolist/Todolist"
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs"
import React, { useContext } from "react"
import { isCLickAccount } from "../../hooks/IsClickAccountContext"
import { Editor } from "@tinymce/tinymce-react"
export function Note() {
  const { noteId } = useParams()
  const note = useLoaderData()
  const { setClickAccount } = useContext(isCLickAccount)

  function handleEditorChange(e) {
    console.log("zmieniono notatkę")
  }

  function handleFocusChange(e) {
    setClickAccount(false)
  }

  return (
    <>
      <div className={styles.note}>
        <Editor
          apiKey='srlddd1qxwh6gmrys6jtp47e5j4n0hl3g2p1c0i3g3hv9e60'
          key={note.id}
          onEditorChange={handleEditorChange}
          onFocus={handleFocusChange}
          init={{
            spellchecker_language: "pl",
            selector: "textarea",
            height: "100%",
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",

            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            ai_request: (request, respondWith) =>
              respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          }}
          initialValue={`<h3>${note.title}</h3> <p>${note.content}</p>`}
        />
      </div>
    </>
  )
}

//     <div className={styles.note}>
//       {/* <Breadcrumbs /> */}
//       {Array.isArray(note.content) ? (
//         <div key={note.id}>
//           <h3>{note.title}</h3>
//           <Todolist todoList={note.content} />
//         </div>

//   )
// }

// // if (Array.isArray(arr)) {
// //   return <Todolist />
// // } else {
// //   return (
// //     <div key={note.id}>
// //       <h3>{note.title}</h3>
// //       <p>{note.body}</p>
// //     </div>
// //   )
// // }
