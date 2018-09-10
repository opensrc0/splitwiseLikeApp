import React, { Component } from 'react';

class AddFriend extends Component {
    constructor(props) {
        super(props);
        this.obj = {};
    }

    addFriend = () => {
        if(!this.obj['name']) return null;
        const { showFriendList } = this.props;
        var names = [];
        names.push(this.obj);
        const friends = JSON.parse(localStorage.getItem('friendList')) || [];
        localStorage.setItem('friendList', JSON.stringify([...friends, ...names]));
        showFriendList();
    }

    setFields = (fieldName) => (e) => {
        this.obj[fieldName] = e.target.value;
        this.obj.amount = 0;
    }

    render() {
        return (
            <div>
                <input name="name" onBlur={this.setFields('name')} placeholder="Enter Friend Name"/>
                <button onClick={this.addFriend}>Add Friend</button>
            </div>
        );
    }
}

export default AddFriend;
