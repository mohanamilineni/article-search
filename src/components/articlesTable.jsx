import React, { Component } from "react";
import Table from "./common/table";

class ArticlesTable extends Component {
  columns = [
    { path: "title", alt: "story_text", label: "Title", urlRequired: true },
    { path: "author", label: "Author" },
    { path: "points", label: "Points" },
    { path: "num_comments", label: "No of Comments" },
    { path: "created_at", format: "date", label: "Published On" }
  ];
  render() {
    const { articles, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={articles}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ArticlesTable;
