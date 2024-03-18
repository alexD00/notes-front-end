import React, { useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import { Link, useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

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
    await axios.delete(`http://localhost:8080/api/notes/${id}`);
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
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editNote/${note.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        window.confirm(
                          `Are you sure you want to delete: ${note.title}`
                        )
                      ) {
                        deleteNote(note.id);
                      }
                    }}
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
