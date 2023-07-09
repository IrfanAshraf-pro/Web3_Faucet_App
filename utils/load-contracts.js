import contract from "@truffle/contract"

export const loadContract = async (contractname, provider) => {
    const res = await fetch(`/contracts/${contractname}.json`)
    const Artifact = await res.json()
    const _contract = contract(Artifact)
    _contract.setProvider(provider);
    let deployedContract
    try {
        deployedContract = await _contract.deployed()
    } catch (error) {
        console.log('YOu are connected to wrong network ');
    }

    return deployedContract
}