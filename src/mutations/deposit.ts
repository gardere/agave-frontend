import { useMutation, useQueryClient, UseMutationResult } from "react-query";
import { IMarketData } from "../utils/constants";
import { Web3Provider } from '@ethersproject/providers';
import { AgaveLendingABI__factory } from "../contracts";
import { BigNumber } from "@ethersproject/bignumber";
import { internalAddresses } from "../utils/contracts/contractAddresses/internalAddresses";
import { ethers } from "ethers";
import { useApproved } from "../hooks/approved";
import { useBalance } from "../hooks/balance";
import { useApprovalMutation } from "./approval";

export interface UseDepositMutationProps {
  asset: IMarketData | undefined;
  amount: number;
  onSuccess: () => void;
};

export interface UseDepositMutationDto {
  depositMutation: UseMutationResult<BigNumber | undefined, unknown, BigNumber, unknown>;
  depositMutationKey: readonly [string | null | undefined, Web3Provider | undefined, IMarketData | undefined, number];
};

export const useDepositMutation = ({asset, amount, onSuccess}: UseDepositMutationProps): UseDepositMutationDto => {
  const queryClient = useQueryClient();
  // FIXME: would be nice not to invoke a list of hooks just to get query keys
  const { approvedQueryKey } = useApproved(asset);
	const { approvalMutationKey } = useApprovalMutation({ asset, amount, onSuccess: () => {}});
  const { balanceQueryKey } = useBalance(asset);
  const assetQueryKey = [asset?.name] as const; 
  
  const depositMutationKey = [...approvedQueryKey, amount] as const;
  const depositMutation = useMutation<BigNumber | undefined, unknown, BigNumber, unknown>(
    depositMutationKey,
    async (unitAmount): Promise<BigNumber | undefined> => {
      const [address, library, asset, ] = depositMutationKey;
      if (!address || !library || !asset) {
        throw new Error("Account or asset details are not available");
      }
      const contract = AgaveLendingABI__factory.connect(
        internalAddresses.Lending,
        library.getSigner()
      );
      const referralCode = 0;
      console.log("depositMutationKey:deposit");
      console.log(Number(ethers.utils.formatEther(unitAmount)));
      const tx = await contract.deposit(
        asset.contractAddress,
        unitAmount,
        address,
        referralCode
      );
      const receipt = await tx.wait();
      return receipt.status ? BigNumber.from(unitAmount) : undefined;
    },
    {
      onSuccess: async (unitAmountResult, vars, context) => {
        await Promise.allSettled([
          queryClient.invalidateQueries(approvedQueryKey),
          queryClient.invalidateQueries(approvalMutationKey),
          queryClient.invalidateQueries(balanceQueryKey),
          queryClient.invalidateQueries(assetQueryKey),
        ]);
      },
    }
  );

  return { depositMutation, depositMutationKey };
};
