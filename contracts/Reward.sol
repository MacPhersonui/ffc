// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Reward is Ownable {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    bool private start = true;
    IERC20 public tor;
    uint256 public LPtotal;
    uint256 public TORtotal;
    uint256[] public timeline;
    mapping(address => uint256) public investments;

    struct Invitee {
		address inviter;
        uint256 date;
	}

    struct Referrer {
		address leader;
        uint256 date;
	}

    struct User {
		Invitee[] invitee;
        Referrer referrer;
        uint256 LPtotal;
        uint256 TORtotal;
        uint256[] LPvalue;
        uint256[] TORvalue;
	}

    mapping (address => User) public users;

    constructor(address _tor) {
        tor = IERC20(_tor);
    }

    modifier checkStart() {
        require(start, "pause");
        _;
    }

    function getLPtotal(address _account) public view returns(uint256){
        return users[_account].LPtotal;
    }

    function getTORtotal(address _account) public view returns(uint256){
        return users[_account].TORtotal;
    }

    function getReferrer(address _account) public view returns(address){
        return users[_account].referrer.leader;
    }

    function setTimeline(uint256 _time) public onlyOwner{
        timeline.push(_time);
    }

    function setTimelineByIndex(uint256 _index, uint256 _time) public onlyOwner{
        timeline[_index] = _time;
    }

    function getTimelineLength() public view returns(uint256){
        return timeline.length;
    }

    function getTimelineByIndex(uint256 _index) public view returns(uint256){
        return timeline[_index];
    }
    
    function setInviteByUser(address _inviter) public {
        require(
            users[msg.sender].referrer.leader == 0x0000000000000000000000000000000000000000 ,
            "You can't invite 0x0"
        );
        require(
            _inviter != msg.sender,
            "You can't invite yourself"
        );
        require(
            users[_inviter].referrer.leader != msg.sender,
            "Your inviter's inviter can't be you"
        );
        users[_inviter].invitee.push(Invitee(msg.sender, block.timestamp));
        users[msg.sender].referrer = Referrer(_inviter, block.timestamp);
    }

    function setInvite(address[] memory _inviter, address[] memory _account) public onlyOwner{
        require(_inviter.length == _account.length, "Not equal");
        for(uint256 i = 0; i < _inviter.length; i++ ){
            users[_inviter[i]].invitee.push(Invitee(_account[i], block.timestamp));
            users[_account[i]].referrer = Referrer(_inviter[i], block.timestamp);
        }
    }

    function setLPvalue(address[] memory _account, uint256[] memory _value) public onlyOwner{
        require( _account.length == _value.length, "Not equal");
        uint256 LPValues = 0;
        for(uint256 i = 0; i < _account.length; i++ ){
            if(timeline.length > 1 && (users[_account[i]].LPvalue.length.add(1)) < timeline.length){
                for(
                    uint256 j = users[_account[i]].LPvalue.length.add(1); 
                    j < timeline.length.sub(1); j++
                ){
                    users[_account[i]].LPvalue.push(0);
                }
            }
            users[_account[i]].LPvalue.push(_value[i]);
            LPValues = LPValues.add(_value[i]);
        }
        LPtotal = LPtotal.add(LPValues);
    }

    function setLPvalueByIndex(address[] memory _account, uint256[] memory _value, uint256 _index) public onlyOwner{
        require( _account.length == _value.length, "Not equal");
        for(uint256 i = 0; i < _account.length; i++ ){
            users[_account[i]].LPvalue[_index] = _value[i];
        }
    }

    function setTORvalue(address[] memory _account, uint256[] memory _value) public onlyOwner{
        require(_account.length == _value.length, "Not equal");
        uint256 TORtotals = 0;
        for(uint256 i = 0; i < _account.length; i++ ){
            if(timeline.length > 1 && (users[_account[i]].TORvalue.length.add(1)) < timeline.length){
                for(
                    uint256 j = users[_account[i]].TORvalue.length.add(1); 
                    j < timeline.length.sub(1); j++
                ){
                    users[_account[i]].TORvalue.push(0);
                }
            }
            users[_account[i]].TORvalue.push(_value[i]);
            TORtotals = TORtotals.add(_value[i]);
        }
        TORtotal = TORtotal.add(TORtotals);
    }

    function setTORvalueByIndex(address[] memory _account, uint256[] memory _value, uint256 _index) public onlyOwner{
        require(_account.length == _value.length, "Not equal");
        for(uint256 i = 0; i < _account.length; i++ ){
            users[_account[i]].TORvalue[_index] = _value[i];
        }
    }

    function getInviteLength(address _account) public view returns(uint256){
        return users[_account].invitee.length;
    }

    function getInviteByIndex(address _account, uint256 _index) public view returns(address){
        return users[_account].invitee[_index].inviter;
    }

    function getLPReward(address _account) public view returns(uint256 otherReward){
        Invitee[] memory invitee = users[_account].invitee;
        for(uint256 k =0; k < users[_account].LPvalue.length; k++){
            uint256 reward = users[_account].LPvalue[k];
            if(reward != 0){
                if( 
                    users[_account].referrer.leader != 0x0000000000000000000000000000000000000000 &&
                    users[users[_account].referrer.leader].referrer.leader == 0x0000000000000000000000000000000000000000 &&
                    users[_account].referrer.date <= timeline[k]
                ){
                    reward = users[_account].LPvalue[k].mul(85).div(100);
                }
                if(
                    users[_account].referrer.leader != 0x0000000000000000000000000000000000000000 && 
                    users[users[_account].referrer.leader].referrer.leader != 0x0000000000000000000000000000000000000000 && 
                    users[_account].referrer.date <= timeline[k] &&
                    users[users[_account].referrer.leader].referrer.date <= timeline[k]
                ){
                    reward = users[_account].LPvalue[k].mul(80).div(100);
                }
            }
            otherReward = otherReward.add(reward);
            for(uint256 i = 0; i < invitee.length; i++){
                if(invitee[i].date <= timeline[k]){
                    if(users[invitee[i].inviter].LPvalue.length > 0){
                        otherReward = otherReward.add(
                            users[invitee[i].inviter].LPvalue[k].mul(15).div(100)
                        );
                    }
                }
                Invitee[] memory sub_invitee = users[invitee[i].inviter].invitee;
                for(uint j = 0; j < sub_invitee.length; j++){
                    if(sub_invitee[j].date <= timeline[k]){
                        if(users[sub_invitee[j].inviter].LPvalue.length > 0){
                            otherReward = otherReward.add(
                                users[sub_invitee[j].inviter].LPvalue[k].mul(5).div(100)
                            );
                        }
                    }
                }
            }
        }
        return otherReward;
    }

    function getLPL2Reward(address _account) public view returns(uint256 otherReward){
        Invitee[] memory invitee = users[_account].invitee;
        for(uint256 k =0; k < users[_account].LPvalue.length; k++){
            for(uint256 i = 0; i < invitee.length; i++){
                if(invitee[i].date <= timeline[k]){
                    if(users[invitee[i].inviter].LPvalue.length > 0){
                        otherReward = otherReward.add(
                            users[invitee[i].inviter].LPvalue[k].mul(15).div(100)
                        );
                    }
                }
            }
        }
        return otherReward;
    }

    function getLPL2Amount(address _account) public view returns(uint256 inviteLength){
        return users[_account].invitee.length;
    }

    function getLPL3Reward(address _account) public view returns(uint256 otherReward){
        Invitee[] memory invitee = users[_account].invitee;
        for(uint256 k =0; k < users[_account].LPvalue.length; k++){
            for(uint256 i = 0; i < invitee.length; i++){
                Invitee[] memory sub_invitee = users[invitee[i].inviter].invitee;
                for(uint j = 0; j < sub_invitee.length; j++){
                    if(sub_invitee[j].date <= timeline[k]){
                        if(users[sub_invitee[j].inviter].LPvalue.length > 0){
                            otherReward = otherReward.add(
                                users[sub_invitee[j].inviter].LPvalue[k].mul(5).div(100)
                            );
                        }
                    }
                }
            }
        }
        return otherReward;
    }

    function getLPL3Amount(address _account) public view returns(uint256 inviteLength){
        Invitee[] memory invitee = users[_account].invitee;
        for(uint256 i = 0; i < invitee.length; i++){
            inviteLength = inviteLength.add(users[invitee[i].inviter].invitee.length);
        }
        return inviteLength;
    }

    function getTORReward(address _account) public view returns(uint256 otherReward){
        Invitee[] memory invitee = users[_account].invitee;
        for(uint256 k =0; k < users[_account].TORvalue.length; k++){
            uint256 reward = users[_account].TORvalue[k];
            if(reward != 0){
                if( 
                    users[_account].referrer.leader != 0x0000000000000000000000000000000000000000 &&
                    users[users[_account].referrer.leader].referrer.leader == 0x0000000000000000000000000000000000000000 &&
                    users[_account].referrer.date <= timeline[k]
                ){
                    reward = users[_account].TORvalue[k].mul(85).div(100);
                }
                if(
                    users[_account].referrer.leader != 0x0000000000000000000000000000000000000000 && 
                    users[users[_account].referrer.leader].referrer.leader != 0x0000000000000000000000000000000000000000 && 
                    users[_account].referrer.date <= timeline[k] &&
                    users[users[_account].referrer.leader].referrer.date <= timeline[k]
                ){
                    reward = users[_account].TORvalue[k].mul(80).div(100);
                }
            }
            otherReward = otherReward.add(reward);
            for(uint256 i = 0; i < invitee.length; i++){
                if(invitee[i].date <= timeline[k]){
                    if(users[invitee[i].inviter].TORvalue.length > 0){
                        otherReward = otherReward.add(
                            users[invitee[i].inviter].TORvalue[k].mul(15).div(100)
                        );
                    }
                }
                Invitee[] memory sub_invitee = users[invitee[i].inviter].invitee;
                for(uint j = 0; j < sub_invitee.length; j++){
                    if(sub_invitee[j].date <= timeline[k]){
                        if(users[sub_invitee[j].inviter].TORvalue.length > 0){
                            otherReward = otherReward.add(
                                users[sub_invitee[j].inviter].TORvalue[k].mul(5).div(100)
                            );
                        }
                    }
                }
            }
        }
        return otherReward;
    }

    function getTORL2Reward(address _account) public view returns(uint256 otherReward){
        Invitee[] memory invitee = users[_account].invitee;
        for(uint256 k =0; k < users[_account].TORvalue.length; k++){
            for(uint256 i = 0; i < invitee.length; i++){
                if(invitee[i].date <= timeline[k]){
                    if(users[invitee[i].inviter].TORvalue.length > 0){
                        otherReward = otherReward.add(
                            users[invitee[i].inviter].TORvalue[k].mul(15).div(100)
                        );
                    }
                }
            }
        }
        return otherReward;
    }

    function getTORL3Reward(address _account) public view returns(uint256 otherReward){
        Invitee[] memory invitee = users[_account].invitee;
        for(uint256 k =0; k < users[_account].TORvalue.length; k++){
            for(uint256 i = 0; i < invitee.length; i++){
                Invitee[] memory sub_invitee = users[invitee[i].inviter].invitee;
                for(uint j = 0; j < sub_invitee.length; j++){
                    if(sub_invitee[j].date <= timeline[k]){
                        if(users[sub_invitee[j].inviter].TORvalue.length > 0){
                            otherReward = otherReward.add(
                                users[sub_invitee[j].inviter].TORvalue[k].mul(5).div(100)
                            );
                        }
                    }
                }
            }
        }
        return otherReward;
    }

    function getReward() public checkStart{
        uint256 LPAmount = getLPReward(msg.sender);
        uint256 TORAmount = getTORReward(msg.sender);
        uint256 rewardAmount = LPAmount.add(TORAmount).sub(users[msg.sender].LPtotal).sub(users[msg.sender].TORtotal);
        require( rewardAmount > 0, "zero");
        tor.transfer(msg.sender, rewardAmount);
        users[msg.sender].LPtotal = LPAmount;
        users[msg.sender].TORtotal = TORAmount;
    }

    function withdrawCoin() public onlyOwner{
        uint256 torBalance = tor.balanceOf(address(this)); 
        if(torBalance > 0){
            tor.transfer(msg.sender,torBalance);
        }
    }

}
