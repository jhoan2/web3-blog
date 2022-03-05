const main = async () => {
    const nftContractFactory = await hre.ethers.getContractFactory('NFTMinter');
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    
  
    // Call the function.
    let txn = await nftContract.safeMint('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 'bafyreiauqwy62jflbtubnxmjar43vamqhl4f7lkeddhomjj2vhawjudpyy/metadata.json')
    // Wait for it to be mined.
    await txn.wait()
    console.log("Contract deployed to:", nftContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();