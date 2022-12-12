import Web3 from "web3";
import {WATERMARK_MINT_ABI} from "./watermarkMintABI";

const web3 = new Web3(Web3.givenProvider);

const watermarkContractAddress = ''; // put your own watermark contract address

// mint based on ETH fee
const mintOriginalWaterMarkByETH = async (address, feeEthAmount, metaOriginalUrl, metaWatermarkUrl, callback) => {
    const contractWatermark = new web3.eth.Contract(WATERMARK_MINT_ABI, watermarkContractAddress);
    const gasLimit = await contractWatermark.methods.mintOriginalWaterMarkByETH(
        address, metaOriginalUrl, metaWatermarkUrl
    ).estimateGas({
        from: address,
        value: feeEthAmount
    });
    return await contractWatermark.methods.mintOriginalWaterMarkByETH(
        address, metaOriginalUrl, metaWatermarkUrl
    ).send({
        from: address,
        gas: gasLimit,
        value: feeEthAmount
    }, function (err, res) {
        callback(err, res);
    });
}

// mint based on VIW fee
const mintOriginalWaterMarkByVIW = async (address, metaOriginalUrl, metaWatermarkUrl, callback) => {
    const contractWatermark = new web3.eth.Contract(WATERMARK_MINT_ABI, watermarkContractAddress);
    const gasLimit = await contractWatermark.methods.mintOriginalWaterMarkByERC20(
        address, metaOriginalUrl, metaWatermarkUrl
    ).estimateGas({
        from: address,
    });
    return await contractWatermark.methods.mintOriginalWaterMarkByERC20(
        address, metaOriginalUrl, metaWatermarkUrl
    ).send({
        from: address,
        gas: gasLimit
    }, function (err, res) {
        callback(err, res);
    });
}

