import React, { Component } from 'react';
import ArticleHeading from './ArticleHeading';
import Content from './Content';
import Datetime from './Datetime';
import { PageContext } from '../contexts/PageContext';

export default class Article extends Component {
  static context = PageContext;

  render() {
    return (
        <div className={"article article-" + this.context.theme}>
            <ArticleHeading title={this.props.heading} icon={this.props.icon} />
            <Content content={this.props.content} />
            <Datetime />
        </div>
    );
  }
}

Article.contextType = PageContext;