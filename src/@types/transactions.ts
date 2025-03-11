export type Transaction = {
    id: number;
    name: string;
    type: "INCOME" | "OUTCOME";
    description: string;
    inserted_at: string; 
    updated_at: string;
    amount: string; 
    transaction_date: string; 
    subtype: string; 
    proof_url: string | null;
    wallet_id: number;
};