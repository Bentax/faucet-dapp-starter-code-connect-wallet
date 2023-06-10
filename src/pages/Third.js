import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import DAOContract from './contracts/DAOContract.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";

const web3 = new Web3(Web3.givenProvider);
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

function Third() {
  const [account, setAccount] = useState('');
  const [daoContract, setDAOContract] = useState(null);
  const [memberBalance, setMemberBalance] = useState(0);
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState('');

  useEffect(() => {
    loadBlockchainData();
  }, []);

  async function loadBlockchainData() {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = DAOContract.networks[networkId];
    const dao = new web3.eth.Contract(DAOContract.abi, deployedNetwork.address);
    setDAOContract(dao);

    const balance = await dao.methods.getMemberBalance(accounts[0]).call();
    setMemberBalance(balance);

    const proposalCount = await dao.methods.getProposalCount().call();
    const proposalList = [];
    for (let i = 1; i <= proposalCount; i++) {
      const proposal = await dao.methods.getProposal(i).call();
      proposalList.push(proposal);
    }
    setProposals(proposalList);
  }

  async function createProposal() {
    await daoContract.methods.createProposal(newProposal).send({ from: account });
    setNewProposal('');
    loadBlockchainData();
  }

  async function vote(proposalId, inFavor) {
    await daoContract.methods.vote(proposalId, inFavor).send({ from: account });
    loadBlockchainData();
  }

  return (
    <div className="container mt-4">
      <h1>DAO Voting App</h1>
      <h3>Account: {account}</h3>
      <h5>Member Balance: {memberBalance}</h5>

      <div className="mt-4">
        <h2>Proposals</h2>
        {proposals.map((proposal) => (
          <div key={proposal.id} className="card my-2">
            <div className="card-body">
              <h5 className="card-title">Proposal {proposal.id}</h5>
              <p className="card-text">{proposal.description}</p>
              {proposal.status === 'Vote' && (
                <div>
                  <button className="btn btn-success" onClick={() => vote(proposal.id, true)}>
                    Vote in Favor
                  </button>
                  <button className="btn btn-danger ml-2" onClick={() => vote(proposal.id, false)}>
                    Vote Against
                  </button>
                </div>
              )}
              {proposal.status === 'InProgress' && <p className="text-success">In Progress</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h2>Create Proposal</h2>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter proposal description"
            value={newProposal}
            onChange={(e) => setNewProposal(e.target.value)}
          />
          <button className="btn btn-primary ml-2" onClick={createProposal}>
            Create
          </button>
        </div>
      </div>
      </div>  
      );
}

export default Third;