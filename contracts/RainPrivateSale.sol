pragma solidity ^0.5.0;

import "./Crowdsale.sol";
import "./validation/CappedCrowdsale.sol";
import "./validation/TimedCrowdsale.sol";
import "./validation/IndividuallyCappedCrowdsale.sol";
import "./presets/IBEP20.sol";

contract RainPrivateSale is
    Crowdsale,
    CappedCrowdsale,
    TimedCrowdsale,
    IndividuallyCappedCrowdsale
{
    uint8 constant DECIMALS = 18;

    constructor(
        uint256 rate, // rate, in RAINbits
        address payable wallet, // wallet to send BNB
        IBEP20 token, // the token
        uint256 cap, // total cap, in number
        uint256 openingTime, // opening time in unix epoch seconds
        uint256 closingTime // closing time in unix epoch seconds
    )
        public
        CappedCrowdsale(cap * 10**uint256(DECIMALS))
        TimedCrowdsale(openingTime, closingTime)
        Crowdsale(rate, wallet, token)
    {
        // nice, we just created a crowdsale that's only open
        // for a certain amount of time
        // and stops accepting contributions once it reaches `cap`
    }
}
