import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewNote() {
  const [note, setNote] = useState({
    content: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadNote();
  }, []);

  const loadNote = async () => {
    const result = await axios.get(`http://localhost:8080/api/notes/${id}`);
    setNote(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Note Details</h2>
          <div className="card" style={{ marginBottom: "20px" }}>
            <div className="card-header">
              Details of note with id: {id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Content:</b>
                  {note.content}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
