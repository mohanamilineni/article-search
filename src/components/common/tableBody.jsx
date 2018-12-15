import React, { Component } from "react";
import _ from "lodash";
import Moment from "react-moment";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    if (column.format && column.format === "date")
      return (
        <Moment format="D MMM YYYY" withTitle>
          {_.get(item, column.path)}
        </Moment>
      );

    const cellValue = _.get(item, column.path) || _.get(item, column.alt);

    if (column.urlRequired && item.url) {
      return (
        <a href={item.url} rel="noopener noreferrer" target="_blank">
          {cellValue}
        </a>
      );
    }
    return cellValue;
  };

  createKey = (item, column) => {
    return item.objectID + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item.objectID}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
