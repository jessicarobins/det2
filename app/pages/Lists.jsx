import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';
import ListsContainer from 'containers/Lists';

class Lists extends Component {
  render() {
    return (
      <Page {...this.getMetaData()}>
        <ListsContainer {...this.props} />
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

