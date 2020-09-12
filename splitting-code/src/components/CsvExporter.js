import React from 'react';
import { CSVLink, CSVDownload } from 'react-csv';

const csvData = [
  ['firstname', 'lastname', 'email'],
  ['John', 'Doe', 'john.doe@xyz.com'],
  ['Jane', 'Doe', 'jane.doe@xyz.com']
];

const CsvExporter = () => {
  return (
    <div>
      <CSVLink
        data={csvData}
        filename={'my-file.csv'}
        suffix={true}
        className="ui primary button"
      >
        export to csv
      </CSVLink>
    </div>
  );
};

export default CsvExporter;
