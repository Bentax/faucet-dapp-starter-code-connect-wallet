// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the ERC20 interface and SafeMath library
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Faucet {
    using SafeMath for uint256;

    // Address of the ERC20 token contract
    address public tokenAddress;

    // Mapping to keep track of the last request time of each user
    mapping(address => uint256) public lastRequestTime;

    // Event emitted when a user requests tokens
    event TokensSent(address indexed user, uint256 amount);

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    // Modifier to check if the user is eligible to request tokens
    modifier canRequestTokens() {
        require(
            lastRequestTime[msg.sender].add(1 hours) <= block.timestamp,
            "You can only request tokens once per hour"
        );
        _;
    }

    // Function to allow users to request tokens
    function requestTokens(uint256 amount) external canRequestTokens {
        // Transfer the requested tokens from the contract to the user
        IERC20 token = IERC20(tokenAddress);
        token.transfer(msg.sender, amount);

        // Update the last request time of the user
        lastRequestTime[msg.sender] = block.timestamp;

        // Emit an event to indicate that tokens have been sent to the user
        emit TokensSent(msg.sender, amount);
    }
}
