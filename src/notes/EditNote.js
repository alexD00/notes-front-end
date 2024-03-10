import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditNote() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const { title, content } = note;

  const onInputChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadNote();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/notes/${id}`, note);
    navigate("/");
  };

  const loadNote = async () => {
    const result = await axios.get(`http://localhost:8080/api/notes/${id}`);
    setNote(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Note</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <div>
                <label htmlFor="Name" className="form-label">
                  Title
                </label>
                <input
                  className="form-control"
                  placeholder="Type the title"
                  name="title"
                  value={title}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <label htmlFor="Name" className="form-label">
                Content
              </label>
              <div style={{ marginBottom: "20px" }}>
                <textarea
                  className="form-control"
                  style={{ height: "200px" }}
                  placeholder="Type your note"
                  name="content"
                  value={content}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <Link className="btn btn-outline-danger mx-2" to={"/"}>
                Cancel
              </Link>
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
