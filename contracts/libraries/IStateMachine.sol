pragma solidity ^0.4.18;


contract IStateMachine {
    function currentState() public view returns (uint8);

    event StateChanged(uint8 oldState, uint8 newState);
}