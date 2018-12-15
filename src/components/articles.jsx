import React, { Component } from "react";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import { getArticles } from "../services/articleService";
import ArticlesTable from "./articlesTable";
import _ from "lodash";

class Articles extends Component {
  state = {
    articles: [],
    page: 1,
    hitsPerPage: 10,
    nbPages: 0,
    query: "",
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    await this.populateArticles();
  }

  async populateArticles(requestParams) {
    const {
      data: { hits: articles, page, nbPages }
    } = await getArticles(requestParams || this.state);

    this.setState({ articles, page, nbPages });
  }

  handleDelete = article => {
    const articles = this.state.articles.filter(
      a => a.objectID !== article.objectID
    );
    this.setState({ articles });
  };

  handlePageChange = page => {
    if (page === this.state.page) return;
    const requestParams = { ...this.state };
    requestParams.page = page;

    this.populateArticles(requestParams);
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ query });
    const requestParams = { ...this.state };
    requestParams.query = query;
    requestParams.page = 1;

    this.populateArticles(requestParams);
  };

  getSortedData = () => {
    const { hitsPerPage, nbPages, sortColumn, articles } = this.state;

    const sortedArticles = _.orderBy(
      articles,
      [sortColumn.path],
      [sortColumn.order]
    );

    return { totalCount: hitsPerPage * nbPages, data: sortedArticles };
  };
  render() {
    const { length: count } = this.state.articles;
    const { hitsPerPage, page, nbPages, query, sortColumn } = this.state;

    const { data: articles } = this.getSortedData();

    return (
      <React.Fragment>
        <SearchBox value={query} onChange={this.handleSearch} />
        <ArticlesTable
          articles={articles}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
        <Pagination
          nbPages={nbPages}
          hitsPerPage={hitsPerPage}
          page={page}
          onPageChange={this.handlePageChange}
        />
        {count === 0 && <center>No articles found</center>}
      </React.Fragment>
    );
  }
}

export default Articles;
