//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract UserInfo {
    struct User {
        string name;
        string email;
        string location;
        address owner;
    }

    mapping(address => User) public users;

    function addPerson(
        string memory _name,
        string memory _email,
        string memory _location,
        address _user
    ) public {
        users[_user] = User(_name, _email, _location, _user);
    }

    function getUser(address _user) public view returns (User memory) {
        return users[_user];
    }
}
