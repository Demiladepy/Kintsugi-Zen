type TxLinkProps = {
  signature: string;
};

export function TxLink({ signature }: TxLinkProps) {
  const short = `${signature.slice(0, 6)}...${signature.slice(-6)}`;
  return (
    <a href={`https://solscan.io/tx/${signature}?cluster=devnet`} target="_blank" rel="noreferrer" className="text-sm text-primary underline-offset-2 hover:underline">
      {short}
    </a>
  );
}
