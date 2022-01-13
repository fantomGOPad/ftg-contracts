#!/usr/bin/python3

from brownie import network, chain, MockToken, Cert, LaunchPool, accounts


def main():
    print("run")
    print(network)
    accounts.add("4dbcf5c938d2126fabcdc06e8cf6b9326e3ee0bb81bce6a00aca0c60232cb30e")
    print("balance ", accounts[0].balance())

    # mocktoken = MockToken.deploy({'from': accounts[0]})
    # print("deployed ", mocktoken)

    investToken = "0xB11d0f757f4bdce7f431895e3E8b5e01FE4a48a8"

    start = chain.time()+60*60
    duration = 60*60*24
    f = 10**18
    totalraise = 100000 * f
    mininvest = 100 * f
    treasury = accounts[0]
    #export ETHERSCAN_TOKEN=6QTQHW78K14537RUJZXJXRGGJVGKG13WBA
    launchpool = LaunchPool.at("0xfF3a067105204719195553DD2379ce471bAC8727")
    print("launchpool deployed at ", launchpool)

    print("startTime ", launchpool.startTime())
    #cert = Cert.deploy("test Cert", 18, {'from': accounts[0]})
    #print(cert)

    # Token.deploy("Test Token", "TST", 18, 1e21, {'from': accounts[0]})
