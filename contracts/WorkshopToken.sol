// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WorkshopToken is ERC20 {
    constructor() ERC20("WorkshopToken", "WST") {
        _mint(msg.sender, 1_000_000 ether);
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal override {
        uint burnAmount = amount / 100;
        super._burn(sender, burnAmount);
        amount -= burnAmount;
        super._transfer(sender, recipient, amount);
    }
}
