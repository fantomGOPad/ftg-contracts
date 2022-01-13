#!/usr/bin/python3

from brownie import network, accounts


def main():
    print("run")
    print(network)
    # Token.deploy("Test Token", "TST", 18, 1e21, {'from': accounts[0]})
