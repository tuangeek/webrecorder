import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { InfoWidget} from 'containers';

import BookmarkListItem from 'components/controls/BookmarkListItem';
import OutsideClick from 'components/OutsideClick';
import TimeFormat from 'components/TimeFormat';


class BookmarkList extends Component {
  static propTypes = {
    bookmarks: PropTypes.object,
    params: PropTypes.object,
    recordingIndex: PropTypes.number,
    timestamp: PropTypes.string,
    url: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = { showList: false };
  }

  componentDidMount() {
    this.liHeight = Math.ceil(this.bookmarkList.querySelector('li').getBoundingClientRect().height);
  }

  close = () => {
    if(this.state.showList)
      this.setState({ showList: false });
  }

  toggle = (evt) => {
    evt.stopPropagation();
    const nextState = !this.state.showList;
    const { recordingIndex } = this.props;

    this.setState({ showList: nextState });

    if(nextState) {
      this.bookmarkList.scrollTop = (recordingIndex > 2 ? recordingIndex - 2 : 0) * this.liHeight;
    }
  }

  render() {
    const { bookmarks, params, timestamp, url } = this.props;
    const { showList } = this.state;

    const listClasses = classNames('bookmark-list', { open: showList });

    return (
      <OutsideClick handleClick={this.close}>
        <div className={listClasses} title="Bookmark list">
          <input type="text" onClick={this.toggle} className="form-control dropdown-toggle" name="url" aria-haspopup="true" value={url} autoComplete="off" />

          <ul ref={(obj) => { this.bookmarkList = obj; }} className="dropdown-menu">
            {
              bookmarks.map((page, idx) =>
                <BookmarkListItem
                  key={`${page.get('timestamp')}${page.url}${idx}`}
                  page={page}
                  params={params}
                  ts={timestamp}
                  url={url}
                  closeList={this.close} />
              )
            }
          </ul>

          <div className="wr-replay-info">
            <InfoWidget />
            <span className="replay-date main-replay-date hidden-xs" onClick={this.toggle}>
              <TimeFormat dt={timestamp} />
              <span className="glyphicon glyphicon-triangle-bottom" />
            </span>
          </div>
        </div>
      </OutsideClick>
    );
  }
}

export default BookmarkList;
