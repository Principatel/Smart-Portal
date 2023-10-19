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

    // Split the first row to get header names
    const headers = rows[0].split(",").map((header) => header.trim());

    const data = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(",").map((item) => item.trim());

      if (row.length === headers.length) {
        // Create an object using header names as keys
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

  return (
    <div>
      <div className="main-div-for-upload-csv-file">
        <div className="input-div-for-csv">
          <label>Upload File</label> &nbsp; &nbsp;
          <input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
      </div>
      <div className="display-csvfile-here">
        {csvData.length > 0 && (
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
        )}
      </div>
    </div>
  );
}

export default Csvlist;
