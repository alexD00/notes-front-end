import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [notes, setNotes] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const result = await axios.get("http://localhost:8080/api/notes");
    setNotes(result.data);
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:8080/api/notes/${id}`);
    loadNotes();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Content</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{note.content}</td>
                <td>
                  <button className="btn btn-primary mx-2">View</button>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editNote/${note.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
