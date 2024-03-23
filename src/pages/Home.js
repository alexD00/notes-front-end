import React, { useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import { Link, useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import { LuEye } from "react-icons/lu";

export default function Home() {
  const [search, setSearch] = useState("");

  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    filterNotes();
  }, [search]); // Trigger filterNotes whenever the search state changes

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
    // loadNotes();
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">
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
        <table className="table border shadow">
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
                <td>{note.createdAt.substring(0, 10)}</td>
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
                    data-bs-target="#staticBackdrop"
                  >
                    <MdDelete /> Delete
                  </button>

                  <div
                    class="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1
                            class="modal-title fs-5"
                            id="staticBackdropLabel"
                            style={{ color: "red" }}
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
                        <div class="modal-body">
                          Are you sure you want to delete note titled:
                          {note.title}
                        </div>
                        <div class="modal-footer">
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
                              console.log("Clicked Confirm");
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
      </div>
    </div>
  );
}
