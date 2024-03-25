import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewNote() {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadNote();
  }, []);

  const loadNote = async () => {
    const result = await axios.get(`http://localhost:8080/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    });
    setNote(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow target-container">
          <h2 className="text-center m-4">{note.title}</h2>
          <hr />
          <ul className="list-group list-group-flush">
            <li className="list-group-item target-container">
              <div style={{ marginBottom: "20px" }}>
                {note.createdAt &&
                  typeof note.createdAt === "string" &&
                  note.createdAt.substring(5, 7) +
                    "-" +
                    note.createdAt.substring(8, 10) +
                    "-" +
                    note.createdAt.substring(0, 4)}
              </div>
              <textarea
                className="form-control"
                style={{ height: "300px" }}
                value={note.content}
                readOnly
              />
            </li>
          </ul>

          <div style={{ marginTop: "20px" }}>
            <Link className="btn btn-primary my-2" to={"/home"}>
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
