// SPDX-License-Identifier: MIT
pragma solidity <0.9.0;

import "./Owned.sol";

contract Faucet is Owned {
    mapping(address => bool) public funders;
    mapping(uint => address) public lutFunders;
    uint public numOfFunders;

    modifier limitWithdraw(uint withdrawAmount) {
        require(
            withdrawAmount <= 100000000000000000,
            "Cannot withdraw more than 0.1 ether"
        );
        _;
    }

    receive() external payable {}

    function addFunds() external payable {
        address funder = msg.sender;
        if (!funders[funder]) {
            funders[msg.sender] = true;
            lutFunders[numOfFunders] = msg.sender;
            numOfFunders++;
        }
    }

    function withdraw(
        uint withdrawAmount
    ) external limitWithdraw(withdrawAmount) onlyOwner {
        payable(msg.sender).transfer(withdrawAmount);
    }

    function getFunderAtIndex(uint index) external view returns (address) {
        return lutFunders[index];
    }

    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numOfFunders);
        for (uint i = 0; i < numOfFunders; i++) {
            _funders[i] = lutFunders[i]; //since array starts from
        }
        return (_funders);
    }
}

// const instance= await Faucet.deployed()

// instance.addFunds({value:"2000000000000000000",from:accounts[2]})
// instance.getFunderAtIndex()
// instance.getAllFunders()
// instance.withdraw("100000000000000000",{from:accounts[1]})

//  if(contributors[msg.sender]==0){
//             noOfContributors++;
//         }
//         contributors[msg.sender]+=msg.value;
//         raisedAmount+=msg.value;
