import React from 'react';
import { Table } from 'reactstrap';

const Tables = (props) => {
  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Ticker</th>
          <th>P/L</th>
          <th>DY</th>
          <th>Table 4</th>
          <th>Table 5</th>
          <th>Table 6</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Tables; 