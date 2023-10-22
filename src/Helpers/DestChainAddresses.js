export const getDestChainAddress = async (chainName) => {
  switch (chainName) {
    case "ethereum-2":
      return "0xA3db0888120C96071FB31a9B459dA09535972E47";
      break;
    case "Polygon":
      return "0xA3db0888120C96071FB31a9B459dA09535972E47";
      break;
    case "Avalanche":
      return "0xA3db0888120C96071FB31a9B459dA09535972E47";
      break;
    case "Moonbeam":
      return "0x7F72a40ECc94C3D1f5561492186A9EEA9c11C967";
      break;
    case "arbitrum":
      return "0xA3db0888120C96071FB31a9B459dA09535972E47";
      break;
    case "celo":
      return "0xA3db0888120C96071FB31a9B459dA09535972E47";
      break;
  }
};
