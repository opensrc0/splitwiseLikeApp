import React, { Component } from 'react';
import AddFriend from './AddFriend';
import FriendList from './FriendList';
import SplitBill from './SplitBill';
import './App.css';

class App extends Component {
  state = {
    isAddFriend: false,
    isShowSplitBill: false
  }

  addFriend = () => {
    this.setState({ isAddFriend: true });
  }

  showFriendList = () => {
    this.setState({ isAddFriend: false, isShowSplitBill: false });
  }

  showSplitBill = () => {
    this.setState({ isShowSplitBill: true });
  }

  escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions = (value) => {
      const friends = JSON.parse(localStorage.getItem('friendList')) || [];
      const escapedValue = this.escapeRegexCharacters(value.trim());

      if (escapedValue === '') return [];

      const regex = new RegExp('^' + escapedValue, 'i');

      return friends.filter(friend => regex.test(friend.name));
  }

  render() {
    const { isAddFriend, isShowSplitBill } = this.state;
    return (
      <div className="App">
        {
          !isAddFriend ? (
            <React.Fragment>
              <ul>
                <li onClick={this.showFriendList}>Friend List</li>
                <li onClick={this.showSplitBill}>Split Bill</li>
              </ul>
              <div>
                {
                  isShowSplitBill ? (
                    <div>
                      <SplitBill 
                        showFriendList={this.showFriendList} 
                        getSuggestions={this.getSuggestions}
                      />
                    </div>
                  ) : (
                    <div>
                      <FriendList getSuggestions={this.getSuggestions} />
                      <button onClick={this.addFriend}>
                        Add Friend
                      </button>
                    </div>
                  )
                }
              </div>
            </React.Fragment>
         ): null
        }
        {
          isAddFriend ? (
            <AddFriend
              showFriendList={this.showFriendList}
            />
         ): null
        }
      </div>
    );
  }
}

export default App;
