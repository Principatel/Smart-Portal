import React, { useState } from "react";
import "../../Styles/dashboard/csvlist.css";

function Csvlist() {
  const [csvData, setCsvData] = useState([]);

  const parseCSV = (content) => {
    const rows = content.split("\n");
    if (rows.length < 2) {
      alert("Invalid CSV format. Please check the CSV file.");
      return [];
    }

    const headers = rows[0].split(",").map((header) => header.trim());

    const data = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(",").map((item) => item.trim());

      if (row.length === headers.length) {
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index];
        });
        data.push(rowData);
      }
    }

    return data;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        const parsedData = parseCSV(content);
        setCsvData(parsedData);
      };

      reader.readAsText(file);
    }
  };

  const isCsvDataEmpty = csvData.length === 0;

  return (
    <div>
      <div className="main-div-for-upload-csv-file">
        <div className="input-div-for-csv">
          <label>Upload File</label> &nbsp; &nbsp;
          <input
            className="input-csv-feild"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
          />
        </div>
      </div>
      <div className="display-csvfile-here">
        {isCsvDataEmpty ? (
          <p>Upload your CSV File</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Receiver address</th>
                  <th>Token amount</th>
                  <th>Token symbol</th>
                  <th>Chain id</th>
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, index) => (
                  <tr key={index}>
                    <td>{row["Receiver address"]}</td>
                    <td>{row["Token amount"]}</td>
                    <td>{row["Token symbol"]}</td>
                    <td>{row["Chain id"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {isCsvDataEmpty ? null : (
          <button className="button-to-submit-csv">Begin Payment</button>
        )}
      </div>
    </div>
  );
}

export default Csvlist;
