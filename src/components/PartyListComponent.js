import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup"; // To use <ConfirmPopup> tag
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PartyService from "../services/party.service";

const PartyListComponent = () => {
  const [Parties, setPartys] = useState([]);
  const navigate = useNavigate();

  const handleSelectId = (id) => {
    navigate(`/calendar/${id}`);
  };

  useEffect(() => {
    getAllParties();
  }, []);

  const confirmDelete = (event, id) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete Party id?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => deleteParty(id),
      reject: null,
    });
  };

  const getAllParties = () => {
    PartyService.getAllParties()
      .then((response) => {
        setPartys(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteParty = (id) => {
    PartyService.deleteParty(id)
      .then((response) => {
        getAllParties();
      })
      .catch((error) => {
        console.log(error.message.includes("403"));
        if (error.message.includes("403")) {
          return toast.error("Only admin have rights to delete party", {
            position: "top-center",
          });
        }
        console.log(error);
      });
  };

  return (
    <div>
      <h2 className="text-center">Party List</h2>
      <Link to="/add-Party" className="heading btn btn-outline-info mb-2">
        Add Party
      </Link>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Party Id</th>
            <th>Party Name</th>
            <th>Party Type</th>
            <th>Email Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Parties.map((Party) => (
            <tr key={Party.id}>
              <td>{Party.id}</td>
              <td className="text-start">
                <a href={`/edit-Party/${Party.id}`}>{Party.name}</a>
              </td>
              <td>{Party.partyType}</td>
              <td>{Party.emailId}</td>
              <td>
                {/* <Link
                  className="btn btn-outline-info"
                  to={`/edit-Party/${Party.id}`}
                >
                  Update
                </Link> */}
                <ToastContainer />
                <ConfirmPopup />
                <button
                  onClick={(e) => confirmDelete(e, Party.id)}
                  icon="pi pi-times"
                  label="Delete"
                  className="btn btn-outline-danger"
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
                {/* <button
                  label="Calendar"
                  className="btn btn-outline-info"
                  style={{ marginLeft: "10px" }}
                >
                  Calendar
                </button> */}
                <button
                  style={{ marginLeft: "10px" }}
                  className="btn btn-outline-info"
                  onClick={() => handleSelectId(Party.id)}
                >
                  Calendar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartyListComponent;
