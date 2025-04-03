"use client";

import { ComboboxDemo } from '@/components/currencyCombobox';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {Calculator} from 'lucide-react';

const MINIMUM_CONVERSION_LIMIT = 0.02;

export interface CurrencyOption {
    value: string;
    label: string;
    name: string;
}

interface ConvertorProps {
    currencyOptions: CurrencyOption[];
}

export default function Convertor({ currencyOptions }: ConvertorProps) {

    const [currentCurrency, setCurrentCurrency] = useState<string>('usd');
    const [targetCurrency, setTargetCurrency] = useState<string>('uah');

    const [rate, setRate] = useState<number>(0);

    const [currentAmount, setCurrentAmount] = useState<number>(100);
    const [targetAmount, setTargetAmount] = useState<number>(0);

    const currentCurrencyName = currencyOptions.find(e => e.value === currentCurrency) || { value: '', name: '' };
    const targetCurrencyName = currencyOptions.find(e => e.value === targetCurrency) || { value: '', name: '' };

    const fetchExchangeRate = async () => {
        try {
            const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currentCurrency}.json`);
            const data = await response.json();

            const exchangeRate = data[currentCurrency]?.[targetCurrency];
            if (exchangeRate) {
                if ((currentAmount * exchangeRate) < MINIMUM_CONVERSION_LIMIT) {
                    setTargetAmount(currentAmount * exchangeRate);
                }
                else {
                    setTargetAmount(
                        parseFloat((currentAmount * exchangeRate).toFixed(3))
                    );
                }
                setRate(exchangeRate);
            }
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
        }
    };

    const convert = () => {
        if ((currentAmount * rate) < MINIMUM_CONVERSION_LIMIT) {
            setTargetAmount(currentAmount * rate);
        }
        else {
            setTargetAmount(
                parseFloat((currentAmount * rate).toFixed(3))
            );
        }
    };

    useEffect(() => {
        fetchExchangeRate();
    }, [currentCurrency, targetCurrency]);

    return (
        <div className="flex flex-col gap-4">
            <div>
                <div className="text-lg">
                    1 {currentCurrencyName.name || currentCurrencyName.value} equals
                </div>
                <div className="text-3xl">{rate >= MINIMUM_CONVERSION_LIMIT ? rate.toFixed(3) : rate}</div>
                <div className="text-3xl">
                    {targetCurrencyName.name || targetCurrencyName.value}
                </div>
            </div>
            <div className="flex">
                <Input
                    className="mr-1"

                    placeholder="Amount"
                    value={currentAmount}
                    onChange={e => {
                        const sanitizedValue = e.target.value.replace(/\D/g, "");
                        setCurrentAmount(Number(sanitizedValue));
                    }}
                />
                <ComboboxDemo
                    options={currencyOptions}
                    selectedCurrency={currentCurrency}
                    setSelectedCurrency={setCurrentCurrency}
                />
            </div>
            <div className="flex">
                <Input
                    className="mr-1"
                    disabled
                    placeholder="Converted Amount"
                    value={targetAmount}
                    onChange={e => setTargetAmount(Number(e.target.value))}
                />
                <ComboboxDemo
                    options={currencyOptions}
                    selectedCurrency={targetCurrency}
                    setSelectedCurrency={setTargetCurrency}
                />
            </div>
            <Button className="max-w-80 h-11" onClick={convert}>
                <Calculator />
            </Button>
        </div>
    );
}
