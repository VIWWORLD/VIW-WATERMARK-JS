import Web3 from "web3";
import {WATERMARK_FACTORY_BI} from "./watermarkFactoryABI";
const web3 = new Web3(Web3.givenProvider);

const watermarkFactoryContractAddress = '0xf1b4E8722089D581EAEaAfAd7E40573cEeF27c3b';

const contractWatermarkFactory = new web3.eth.Contract(WATERMARK_FACTORY_BI, watermarkFactoryContractAddress);

// create based on ETH fee
const createWaterMarkContract = async (tokenName, tokenSymbol, owner, feeManager, feeAmount) => {
    const gasLimit = await contractWatermarkFactory.methods.createWaterMarkContractInETH(
        tokenName, tokenSymbol
    ).estimateGas({
        from: owner,
        value: feeAmount
    });
    return await contractWatermarkFactory.methods.createWaterMarkContractInETH(
        tokenName, tokenSymbol
    ).send({
        from: owner,
        value: feeAmount,
        gas: gasLimit
    });
};

// create based on VIW fee
const createWaterMarkContractVIW = async (tokenName, tokenSymbol, owner, feeManager, feeAmount) => {
    const gasLimit = await contractWatermarkFactory.methods.createWaterMarkContractInERC20(
        tokenName, tokenSymbol
    ).estimateGas({
        from: owner,
    });
    return await contractWatermarkFactory.methods.createWaterMarkContractInERC20(
        tokenName, tokenSymbol
    ).send({
        from: owner,
        gas: gasLimit
    });
};
