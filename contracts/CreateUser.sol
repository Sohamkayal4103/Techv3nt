//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./User.sol";

contract CreateUser {
    User[] public _users;
    

    event UserCreated(User indexed newuser, address indexed walletAddress);
    mapping(address => uint) checkusers;

    function userscount() public view returns (uint256) {
        return _users.length;
    }

    function checkUser(address walletAddress) public view returns (bool){
        return checkusers[walletAddress] > 0;
    }

    function createUser(
        string memory name,
        string memory email,
        string memory location,
        address walletAddress
    ) public {
        User newuser = new User(
            name,
            email,
            location
        );
        _users.push(newuser);
        checkusers[walletAddress]++;
        emit UserCreated(newuser, walletAddress);
    }
}
