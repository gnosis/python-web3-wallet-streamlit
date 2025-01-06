import {
  Streamlit,
  withStreamlitConnection,
  ComponentProps,
} from "streamlit-component-lib";
import { type Hex, formatEther, formatGwei, formatUnits, getAddress, parseEther } from 'viem';
import React, { useCallback, useEffect, useMemo, useState, ReactElement } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import '@rainbow-me/rainbowkit/styles.css';
import { useAccount, useSendTransaction, useWriteContract, useChainId, useContractWrite, useWaitForTransactionReceipt, BaseError } from "wagmi";
import { abi } from './abi';
import { stringToHex } from 'viem';
import { waitForTransactionReceipt } from "viem/actions";
/**
 * This is a React-based component template. The passed props are coming from the 
 * Streamlit library. Your custom args can be accessed via the `args` props.
 */
function PythonWeb3Wallet({ args, disabled, theme }: ComponentProps): ReactElement {
  const { recipient, amountInEther, data } = args;


  const { sendTransaction } = useSendTransaction();
  const {
    data: hash,
    error,
    isPending,
    writeContract
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const chainId = useChainId();
  const account = useAccount();

  const [isFocused, setIsFocused] = useState(false)

  const style: React.CSSProperties = useMemo(() => {
    if (!theme) return {}

    // Use the theme object to style our button border. Alternatively, the
    // theme style is defined in CSS vars.
    const borderStyling = `1px solid ${isFocused ? theme.primaryColor : "gray"}`
    return { border: borderStyling, outline: borderStyling }
  }, [theme, isFocused]);

  // setFrameHeight should be called on first render and evertime the size might change (e.g. due to a DOM update).
  // Adding the style and theme here since they might effect the visual size of the component.
  useEffect(() => {
    Streamlit.setFrameHeight()
  }, [style, theme]);


  const d = () => {
    console.log('entered d');
    console.log('data', data as Hex);
    writeContract({
      abi,
      address: getAddress('0xd422e0059ed819e8d792af936da206878188e34f'),
      functionName: 'sendMessage',
      args: [
        getAddress(recipient),
        data as Hex,
      ],
      value: parseEther(amountInEther),
    });

    console.log('executed tx hash', hash);


    console.log('confirmed tx', isConfirmed);

  };



  return (
    <>
      <button
        style={{
          backgroundColor: !account.isConnected ? 'gray' : 'blue',
          color: 'white',
          padding: '15px 30px',
          fontSize: '18px',
          border: 'none',
          borderRadius: '10px',
        }}
        onClick={() =>
          sendTransaction({
            to: getAddress(recipient),
            value: parseEther(amountInEther),
            data: data as Hex
          })
        }
        disabled={!account.isConnected}
      >
        Send transaction
      </button>
      <button
        onClick={d}
      >
        Transfer123
      </button>
      <p>chainId {chainId}</p>
      <p>amountInEther {amountInEther}</p>
      <p>pending {isPending}</p>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}


      <div
        style={{
          paddingBottom: '500px'
        }}
      >
        <ConnectButton />
      </div>
    </>
  )
}

export default withStreamlitConnection(PythonWeb3Wallet)