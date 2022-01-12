#!/usr/bin/python3
import brownie
from brownie import Cert

def test_launch(launch, token, launchtoken, redeemer, accounts):
    assert launch.address != 0
    
    assert launch.numInvested() == 0
    assert launch.numWhitelisted() == 0
    assert launch.saleEnabled() == False

    f = 10 ** 18

    with brownie.reverts():
        launch.invest(100 * f, {"from": accounts[0]})

    launch.addWhitelist(accounts[1], {"from": accounts[0]})

    assert launch.whitelisted(accounts[1]) == True
    
    with brownie.reverts():
        launch.invest(100 * f, {"from": accounts[0]})

    token.transfer(accounts[1], 100 * f, {"from": accounts[0]})

    launch.enableSale({"from": accounts[0]})
    with brownie.reverts():
        launch.invest(100 * f, {"from": accounts[1]})

    token.approve(launch.address, 100 * f, {"from": accounts[1]})

    launch.invest(100 * f, {"from": accounts[1]})

    with brownie.reverts():
        launch.invest(100 * f, {"from": accounts[0]})

    assert launch.investorInfoMap(accounts[1])[0] == 100 * f

    assert token.balanceOf(launch.address) == 100 * f
    cert = Cert.at(launch.cert())
    assert cert.issuedSupply() == 100 * f

    cert.addOwner(redeemer.address, {"from": accounts[0]})

    launchtoken.approve(redeemer.address, 100 * f, {"from": accounts[0]})
    redeemer.depositLaunchtoken(100 * f, {"from": accounts[0]})

    with brownie.reverts():
        redeemer.redeem({"from": accounts[1]})

    redeemer.enableRedeem({"from": accounts[0]})

    redeemer.redeem({"from": accounts[1]})


