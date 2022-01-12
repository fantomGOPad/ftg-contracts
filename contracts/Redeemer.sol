// SPDX-License-Identifier: MIT
pragma solidity 0.8.5;

import "./Cert.sol";
import "OpenZeppelin/openzeppelin-contracts@4.3.0/contracts/token/ERC20/ERC20.sol";
import "OpenZeppelin/openzeppelin-contracts@4.3.0/contracts/access/Ownable.sol";

// *********************************
// Redeemer
// *********************************

contract Redeemer is Ownable {

    // the token to be launched
    address public launchToken;

    // redeem is possible
    bool public redeemEnabled;

    // the certificate
    Cert public cert;

    // how much was redeemed
    uint256 public totalredeem;

    event Redeem(address investor, uint256 amount);
    event RedeemEnabled(bool enabled, uint256 time);

    constructor(address _cert_address, address _launchToken){
        redeemEnabled = false;
        cert = Cert(_cert_address);
        launchToken = _launchToken;
    }

    // redeem all tokens
    function redeem() public {        
        require(redeemEnabled, "redeem not enabled");
        //require(block.timestamp > endTime, "not redeemable yet");
        uint256 redeemAmount = cert.balanceOf(msg.sender);
        require(redeemAmount > 0, "no amount issued");
        // InvestorInfo storage investor = investorInfoMap[msg.sender];
        // require(!investor.claimed, "already claimed");
        require(
            ERC20(launchToken).transfer(
                msg.sender,
                redeemAmount
            ),
            "transfer failed"
        );

        cert.redeem(msg.sender, redeemAmount);

        totalredeem += redeemAmount;        
        emit Redeem(msg.sender, redeemAmount);
        //investor.claimed = true;
    }

    // -- admin functions --
    
    function depositLaunchtoken(uint256 amount) public onlyOwner {
        require(
            ERC20(launchToken).transferFrom(msg.sender, address(this), amount),
            "transfer failed"
        );
    }

    // withdraw in case some tokens were not redeemed
    function withdrawLaunchtoken(uint256 amount) public onlyOwner {
        require(
            ERC20(launchToken).transfer(msg.sender, amount),
            "transfer failed"
        );
    }

    function enableRedeem() public onlyOwner { 
        require(launchToken != address(0), "launch token not set");
        redeemEnabled = true;
        emit RedeemEnabled(true, block.timestamp);
    }


}