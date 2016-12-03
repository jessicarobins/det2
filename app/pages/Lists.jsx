import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';
// import VoteContainer from 'containers/Lists';

class Lists extends Component {
  render() {
    return (
      <Page {...this.getMetaData()}>
      </Page>
    );
  }

  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Lists';
  }

  pageMeta() {
    return [
      { name: "description", content: "Lists" }
    ];
  }

  pageLink() {
    return [];
  }
}

export default Lists;

