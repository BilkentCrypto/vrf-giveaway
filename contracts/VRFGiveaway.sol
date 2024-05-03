// SPDX-License-Identifier: MIT

/* By Bilkent Blockchain */

pragma solidity ^0.8.19;

import {IVRFCoordinatorV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/interfaces/IVRFCoordinatorV2Plus.sol";
import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

contract VRFGiveaway is VRFConsumerBaseV2Plus {
    bool public giveawayExecuted;
    bool public giveawayDone;
    uint256 public randomSeed;

    mapping(address => bool) public authorized;

    modifier onlyAuthorized() {
        require(authorized[msg.sender] == true, "only authorized");
        _;
    }

    //CHAINLINK - Sepolia Network
    uint256 s_subscriptionId;
    IVRFCoordinatorV2Plus COORDINATOR;
    bytes32 constant keyHash =
        0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;
    address constant vrfCoordinator =
        0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B;
    uint32 constant callbackGasLimit = 100000;
    uint16 constant requestConfirmations = 3;
    uint32 constant numWords = 1;

    //Liner Time Complexity Unique Randomness with Lehmer RNG algorithm
    uint256 constant RANDOM_PRIME = 17317251233367793178749;
    uint256 constant MOD_OF_RANDOM = 30000000000000000000000;

    //giveaway
    bytes32[] public participants;
    mapping(bytes32 => bool) public participantExists;

    event ParticipantAdded(bytes32 indexed hash);

    constructor(uint256 subscriptionId) VRFConsumerBaseV2Plus(vrfCoordinator) {
        COORDINATOR = IVRFCoordinatorV2Plus(vrfCoordinator);
        s_subscriptionId = subscriptionId;
        authorized[msg.sender] = true;
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords()
        external
        onlyAuthorized
        returns (uint256 requestId)
    {
        require(giveawayExecuted == false, "already executed");
        giveawayExecuted = true;

        uint256 requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );

        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        randomSeed = _randomWords[0] % MOD_OF_RANDOM;
        giveawayDone = true;
    }

    function authorize(address _address) external onlyAuthorized {
        authorized[_address] = true;
    }

    //no removing participants function to ensure trust
    function addParticipant(bytes32 newHash) external onlyAuthorized {
        require(giveawayExecuted == false, "giveaway finished");
        require(participantExists[newHash] == false, "already participated");
        participantExists[newHash] = true;
        participants.push(newHash);
        emit ParticipantAdded(newHash);
    }

    function getAllParticipants() external view returns (bytes32[] memory) {
        bytes32[] memory allParticipants = participants;
        return allParticipants;
    }

    //Deterministic random algorithm, winners should check their prize via this function after giveaway executed(seed determined)
    function getPrize(uint256 index) public view returns (uint256) {
        uint256 result = (index * RANDOM_PRIME + randomSeed) %
            participants.length;
        return result;
    }
}
