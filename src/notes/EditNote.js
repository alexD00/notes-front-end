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
    await axios.put(`http://localhost:8080/api/notes/${id}`, note, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    });
    navigate("/home");
  };

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
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Note</h2>
          <hr />
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <div className="text-start">
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
              <div className="text-start" style={{ marginTop: "20px" }}>
                <label htmlFor="Name" className="form-label">
                  Content
                </label>

                <textarea
                  className="form-control"
                  style={{ height: "200px" }}
                  placeholder="Type your note"
                  name="content"
                  value={content}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div style={{ marginTop: "40px" }}>
                <Link
                  className="btn btn-secondary mx-2"
                  to={"/home"}
                  style={{ width: "100px" }}
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100px" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
