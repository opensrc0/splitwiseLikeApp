import React, { Component } from 'react';

class SplitBill extends Component {
    constructor(props) {
        super(props);
        this.state = { getSuggestionList: [] };
        this.obj = {amount: 0};
        this.selectedFriends = [];
        this.myRef = React.createRef();
    }

    setFields = (fieldName) => (e) => {
        this.obj[fieldName] = e.target.value;
    }

    splitBill = () => {
        const { showFriendList } = this.props;
        const splitPerson = Array.from(new Set(this.selectedFriends));
        const splitAmount = (this.obj.amount / (splitPerson.length+1));
        const friends = JSON.parse(localStorage.getItem('friendList')) || [];
        const updateFriendAmount = friends.map((friend) => {
            if(splitPerson.indexOf(friend.name) >= 0) {
                return {...friend, amount: friend.amount + splitAmount};
            }
            return friend;
        });
       localStorage.setItem('friendList', JSON.stringify(updateFriendAmount));
       showFriendList();
    }

    addFriendInBill = (e) => {
        const { getSuggestions } = this.props;
        const getSuggestionList = getSuggestions(e.target.value);
        this.setState({ getSuggestionList: getSuggestionList});
    }

    selectFriend = (e) => {
        this.selectedFriends.push(e.target.innerHTML);
        this.setState({getSuggestionList: []})
    }

    render() {
        const friends = JSON.parse(localStorage.getItem('friendList')) || [];
        const { getSuggestionList } = this.state;

        return (
        <div className="split_bill">
            <div>
                <input name="description" placeholder="Enter Description" onBlur={this.setFields('description')} />
            </div>
            <div>
                <input name="amount" placeholder="Enter Amount" onBlur={this.setFields('amount')} />
            </div>
            <div className="friendSuggestion">
                {this.selectedFriends.join(',')}
                <input name="friends"  placeholder="Add friends" onChange={this.addFriendInBill} />
                {
                    getSuggestionList.map((friend) => {
                        return (<div key={friend.name} onClick={this.selectFriend}>{friend.name}</div>);
                    })
                }
            </div>
            <button onClick={this.splitBill}>Submit</button>
        </div>
        );
    }
}

export default SplitBill;
