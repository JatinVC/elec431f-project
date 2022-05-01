// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Events {

    uint256 eventCount;

    event Event(address sender, string date, string message);

    struct EventStruct{
        address sender;
        string date;
        string message;
    }

    EventStruct[] events;

    function addToBlockchain(address sender, string memory date, string memory message) public {
        eventCount += 1;
        events.push(EventStruct(sender, date, message));

        emit Event(sender, date, message);
    }

    function getAllEvents() public view returns (EventStruct[] memory){
        return events;
    }

    function getEventCount() public view returns (uint256){
        return eventCount;
    }
}