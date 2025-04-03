import Convertor from "@/components/convertor";
import {CurrencyOption} from "@/components/convertor";

export default async function Home() {
    try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
        if (!response.ok) {
            throw new Error('Failed to fetch currency data');
        }
        const currencyData = await response.json();
        const mappedCurrencyData: CurrencyOption[] = Object.entries(currencyData).map(([key, value]) => ({
            value: key,
            label: key,
            name: value as string,
        }));

        return (
            <div
                className="grid  items-center justify-items-center gap-6 p-8 font-[family-name:var(--font-geist-sans)]">
                <header>
                    <h2 className='text-center text-6xl font-bold'>
                        Currency Converter
                    </h2>
                </header>
                <main className="flex flex-col gap-[32px] pt-10  row-start-2 items-center">
                    <Convertor currencyOptions={mappedCurrencyData}/>
                </main>
            </div>
        );
    } catch (error) {
        console.error("Error while fetching currencies:", error);
        return <div>Error loading currency data. Please try again later.</div>;
    }
}