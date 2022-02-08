import React, { Component } from 'react';
import ArticleHeading from './ArticleHeading';
import Content from './Content';
import Datetime from './Datetime';

export default class Article extends Component {
  render() {
    return (
        <div className="article">
            <ArticleHeading title={this.props.heading} icon={this.props.icon} />
            <Content content={this.props.content} />
            <Datetime />
        </div>
    );
  }
}
