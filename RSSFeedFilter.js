const RssFeedEmitter = require('rss-feed-emitter');

class RSSFeedFilter {
  constructor(filter = [], cycleMilliseconds = 60000) {
    this.feederList = new RssFeedEmitter();
    this.filter = filter;
    this.cycleMilliseconds = cycleMilliseconds;
  }

  addList(url) {
    this.feederList.add({
      url: url,
      refresh: this.cycleMilliseconds
    });
  }

  checkItem(item) {
    return this.filter.every((filterItem) => {
      const regex = new RegExp(filterItem.regex);

      return regex.test(item[filterItem.type]);
    });
  }

  setNewItemHandler(callback) {
    this.feederList.on('new-item', callback, this);
  }

  list() {
    return this.feederList;
  }

  destroy() {
    this.feederList.destroy();
  }
}

module.exports = RSSFeedFilter;
