let Dataset = artifacts.require("Dataset")
let Kernel = artifacts.require("Kernel")
let WorkerNode = artifacts.require("WorkerNode")
let CognitiveJob = artifacts.require("CognitiveJob")
let Pandora = artifacts.require("PandoraHooks") // *** NB: version with hooks (for testing) instead of normal contract)
let CognitiveJobFactory = artifacts.require("CognitiveJobFactory")
let WorkerNodeFactory = artifacts.require("WorkerNodeFactory")
let StateMachineLib = artifacts.require("StateMachineLib")

module.exports = function(deployer, network, accounts) {
  let workerOwners = [ ]

             deployer.deploy(Dataset, 'QmSFdikKbHCBnTRMgxcakjLQD5E6Nbmoo69YbQPM9ACXJj', 100, 100, 1, 1)
  .then(_ => deployer.deploy(Kernel, 'QmZ2ThDyq5jZSGpniUMg1gbJPzGk4ASBxztvNYvaqq6MzZ', 100, 1000, 1))
  .then(_ => deployer.deploy(CognitiveJobFactory))
  .then(_ => deployer.deploy(WorkerNodeFactory))
  .then(_ => deployer.deploy(StateMachineLib))
  .then(_ => deployer.link(StateMachineLib, [ WorkerNode, CognitiveJob ]))
  .then(_ => deployer.deploy(Pandora, CognitiveJobFactory.address, WorkerNodeFactory.address, workerOwners))
  .catch(e => console.error(e))
}
