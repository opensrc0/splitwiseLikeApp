import React, { Component } from 'react';

class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = { getSuggestionList: [] };
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

    filterFriends = (e) => {
        const { getSuggestions } = this.props;
        const getSuggestionList = getSuggestions(e.target.value);
        this.setState({ getSuggestionList: getSuggestionList});
    }

    render() {
        const { getSuggestionList } = this.state;
        const friends = getSuggestionList[0] ? getSuggestionList :(JSON.parse(localStorage.getItem('friendList')) || []);

        return (
            <div className="friend_list">
            <input placeholder="search" onChange={this.filterFriends}/>
            {
                friends.map((friend, index) => {
                    return (
                        <div key={`friend${index}`} style={{ display: 'flex', 'justify-content': 'space-between'}}>
                            <div>{friend.name}</div>
                            <div>{friend.amount}</div>
                        </div>
                    );
                })
            }
            </div>
    );
  }
}

export default FriendList;
