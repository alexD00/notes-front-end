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
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Content:</b>
              <textarea
                className="form-control"
                style={{ height: "300px" }}
                value={note.content}
                readOnly
              />
            </li>
          </ul>

          <Link className="btn btn-primary my-2" to={"/"}>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
