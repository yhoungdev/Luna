import { Connection, PublicKey } from '@solana/web3.js';

const RAYDIUM_V4_PROGRAM_ID = '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8'; // Example Raydium V4 program ID, replace with actual ID

export async function fetchPoolsByMint(connection: Connection, mintAddress: string): Promise<string>{
    const mintPublicKey = new PublicKey(mintAddress);
    const programId = new PublicKey(RAYDIUM_V4_PROGRAM_ID);
    const dataSize = 752;

    // Try with the first assumed offset
    let accounts = await connection.getProgramAccounts(programId, {
        filters: [
            {
                memcmp: {
                    offset: 400, // First assumed offset
                    bytes: mintPublicKey.toBase58()
                }
            },
            {
                dataSize: dataSize
            }
        ]
    });

    // If no accounts found, try with a different offset
    if (accounts.length === 0) {
        accounts = await connection.getProgramAccounts(programId, {
            filters: [
                {
                    memcmp: {
                        offset: 400 - 32, // Adjusted offset if the first fails
                        bytes: mintPublicKey.toBase58()
                    }
                },
                {
                    dataSize: dataSize
                }
            ]
        });
    }

    // Log found pools or indicate none found
    if (accounts.length > 0) {
        console.log("Found pools with mint address:", mintAddress);
        console.log(accounts[0].pubkey.toBase58());
        return accounts[0].pubkey.toBase58();

    } else {
        console.log("No pools found with the specified mint address.");
        return "";
    }
}