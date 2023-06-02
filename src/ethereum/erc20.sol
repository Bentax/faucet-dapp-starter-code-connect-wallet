// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.9.0/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.9.0/access/Ownable.sol";

/// @custom:security-contact a@shopfather.io
contract AntlawsDAOToken is ERC20, Ownable {
    constructor() ERC20("Antlaws DAO Token", "ADAO") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}