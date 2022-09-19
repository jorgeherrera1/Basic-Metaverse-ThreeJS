import abi from "./abi/abi.js";

// http://remix.ethereum.org/ --> deploy of smart contract
// https://faucet.polygon.technology/ --> get test tokens
// 0xAC0942cA1848A75B07323755b62DaC529f19E008


const blockchain = new Promise((res, rej) => {
    // if Metamask is not available
    if (typeof window.ethereum == "undefined") {
        rej("You should install Metamask to use it");
    }

    // Web3 instance
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0xAC0942cA1848A75B07323755b62DaC529f19E008");

    // Get my Metamask address
    web3.eth.requestAccounts().then((accounts) => {
        console.log("-> My account is: ", accounts[0]);
    });

    // Get current supply of NFT Tokens
    web3.eth.requestAccounts().then((accounts) => {
        contract.methods.totalSupply().call({from: accounts[0]}).then((supply) => {
            console.log("Current supply of NFT tokens is ", supply);
        })
    });

    // Get maximum supply of NFT tokens
    web3.eth.requestAccounts().then((accounts) => {
        contract.methods.maxSupply().call({from: accounts[0]}).then((maxSupply) => {
            console.log("Maximum supply of NFT tokens is ", maxSupply);
        })
    });

    // Get your buildings made in the metaverse 
    web3.eth.requestAccounts().then((accounts) => {
        contract.methods.getOwnerBuldings().call({from: accounts[0]}).then((buildings) => {
            console.log("Your builindgs: ", buildings);
        })
    });

    // Get all buildings made in the metaverse 
    web3.eth.requestAccounts().then((accounts) => {
        contract.methods.totalSupply().call({from: accounts[0]}).then((supply) => {
            contract.methods.getBuildings().call({from: accounts[0]}).then((data) => {
                res({supply: supply, buildings: data});
            });
        });
    });
});

export default blockchain