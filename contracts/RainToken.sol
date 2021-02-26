pragma solidity 0.5.16;

import "./BEP20Token.sol";

contract RainToken is BEP20Token {
    uint8 constant DECIMALS = 18;
    uint256 constant TOTAL_SUPPLY = 800_000 * 10**uint256(DECIMALS);

    constructor(string memory name_, string memory symbol_)
        public
        BEP20Token(name_, symbol_, DECIMALS, TOTAL_SUPPLY)
    {
        require(_msgSender() != address(0));
    }
}
