import React, { useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import { Link, useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { MdNoteAlt } from "react-icons/md";

export default function Home() {
  const [search, setSearch] = useState("");

  const [filteredNotes, setFilteredNotes] = useState([]);

  const [numNotes, setNumNotes] = useState(null);

  const [addNoteLabel, setAddNoteLabel] = useState(false);

  useEffect(() => {
    filterNotes();
  }, [search]); // Trigger filterNotes whenever the search state changes

  useEffect(() => {
    if (numNotes !== null) {
      if (numNotes === 0) {
        setAddNoteLabel(true);
      }
    }
  }, [numNotes]);

  const loadNumNotes = async () => {
    const result = await axios.get(`http://localhost:8080/api/users/numNotes`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    });
    setNumNotes(result.data);
  };

  const filterNotes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/notes/filter?keyword=${search}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        }
      );
      setFilteredNotes(response.data); // Update state with filtered notes data
      loadNumNotes();
    } catch (error) {
      console.error("Error fetching filtered notes:", error);
    }
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:8080/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    });
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div class="input-group mb-3">
          <span
            class="input-group-text search-bar"
            id="inputGroup-sizing-default"
          >
            <BsSearch />
          </span>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Search notes"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table
          className="table table-striped border shadow"
          style={{ backgroundColor: "grey", color: "white" }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Content Preview</th>
              <th scope="col">Created</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotes.map((note, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{note.title}</td>
                <td>{note.content.substring(0, 35)}</td>
                <td>
                  {note.createdAt.substring(5, 7)}-
                  {note.createdAt.substring(8, 10)}-
                  {note.createdAt.substring(0, 4)}
                </td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewNote/${note.id}`}
                  >
                    <LuEye /> View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editNote/${note.id}`}
                  >
                    <MdEditDocument /> Edit
                  </Link>

                  <button
                    type="button"
                    class="btn btn-danger mx-2"
                    data-bs-toggle="modal"
                    data-bs-target={`#deleteModal-${note.id}`}
                  >
                    <MdDelete /> Delete
                  </button>

                  <div
                    className="modal fade"
                    id={`deleteModal-${note.id}`}
                    tabIndex="-1"
                    aria-labelledby={`deleteModalLabel-${note.id}`}
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header modal-cont">
                          <h1
                            className="modal-title fs-5"
                            id={`deleteModalLabel-${note.id}`}
                          >
                            Delete Note
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body modal-cont">
                          Are you sure you want to delete note titled:
                          {note.title}
                        </div>
                        <div class="modal-footer modal-cont">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                            style={{ width: "100px" }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary"
                            style={{ width: "100px" }}
                            onClick={(e) => {
                              deleteNote(note.id);
                            }}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {addNoteLabel && (
          <div style={{ marginTop: "80px" }}>
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow target-container">
                  <h2 className="text-center m-4">You do not have any notes</h2>
                  <Link type="button" class="btn btn-primary" to="/addNote">
                    <MdNoteAlt /> Add note
                  </Link>
                  <div className="mb-3">
                    <div className="text-start">
                      <label htmlFor="Name" className="form-label"></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
