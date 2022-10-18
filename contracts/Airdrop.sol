pragma solidity 0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


contract Airdrop is Ownable {
    using SafeERC20 for IERC20;
    using SafeMath for uint;

    bool private start = false;
    IERC20 public tor;

    mapping(address => uint256) public airdrops;

    modifier checkStart() {
        require(start, "pause");
        _;
    }

    constructor(address _tor) public{
        tor = IERC20(_tor);
    }

    function setStart(bool _start) public onlyOwner{
        start = _start;
    }

    function setAirdrop(address[] memory _account, uint256[] memory _amount) public onlyOwner{
        require(_account.length == _amount.length, "Not equal");
        for(uint256 i = 0; i < _account.length; i++ ){
            airdrops[_account[i]] = _amount[i];
        }
    }

    function getReward() public checkStart{
        uint256 torAmount = airdrops[msg.sender];
        require(torAmount > 0 , "zero");
        tor.transfer(msg.sender, torAmount);
        airdrops[msg.sender] = 0;
    }

    function withdrawCoin() public onlyOwner{
        uint256 torBalance = tor.balanceOf(address(this)); 
        if(torBalance > 0){
            tor.transfer(msg.sender,torBalance);
        }
    }
}