#!/usr/bin/python3

import pytest
from brownie import chain
from brownie import MockToken, LaunchPool, Redeemer, Cert

@pytest.fixture(scope="function", autouse=True)
def isolate(fn_isolation):
    # perform a chain rewind after completing each test, to ensure proper isolation
    # https://eth-brownie.readthedocs.io/en/v1.10.3/tests-pytest-intro.html#isolation-fixtures
    pass


@pytest.fixture(scope="module")
def token(MockToken, accounts):
    #return MockToken.deploy("Test Token", "TST", 18, 1e21, {'from': accounts[0]})
    return MockToken.deploy({'from': accounts[0]})

@pytest.fixture(scope="module")
def launchtoken(MockToken, accounts):
    #return MockToken.deploy("Test Token", "TST", 18, 1e21, {'from': accounts[0]})
    return MockToken.deploy({'from': accounts[0]})


@pytest.fixture(scope="module")
def cert(Cert, accounts):
    #return MockToken.deploy("Test Token", "TST", 18, 1e21, {'from': accounts[0]})
    return Cert.deploy("aCert", 18, {'from': accounts[0]})



@pytest.fixture(scope="module")
def launch(LaunchPool, token, cert, accounts):
    start = chain.time()
    f = 10**18
    treasury = accounts[0]
    launchpool = LaunchPool.deploy(token.address, 100, start, 60*60*24, 100000 * f, 100 * f, treasury, {'from': accounts[0]})
    cert.addOwner(launchpool, {'from': accounts[0]})
    launchpool.setCert(cert)
    return launchpool

@pytest.fixture(scope="module")
def redeemer(Redeemer, launch, launchtoken, cert, token, accounts):    
    return Redeemer.deploy(cert.address, launchtoken.address, {'from': accounts[0]})
