// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface untuk token warisan berdasarkan ABI
interface TokenWarisan {
    function transfer(address to, uint256 amount) external returns (bool);
}
