"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {JSX} from "react";

import {CurrencyOption} from "@/components/convertor";

interface ComboboxDemoProps {
  options: CurrencyOption[];
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
}

export function ComboboxDemo({
                               options,
                               selectedCurrency,
                               setSelectedCurrency
                             }: ComboboxDemoProps): JSX.Element {
  const [open, setOpen] = React.useState(false)


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-20 h-11 justify-between"
        >
          {selectedCurrency
            ? options.find((currency) => currency.value === selectedCurrency)?.label
            : "Select currency..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search currency..." />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {options.map((currency) => (
                <CommandItem
                  key={currency.value}
                  value={currency.value}
                  onSelect={(currentValue) => {
                    // setSelectedCurrency(currentValue === selectedCurrency ? "" : currentValue)
                      setSelectedCurrency(currentValue)
                    setOpen(false)
                  }}
                >
                  {currency.label}
                  <Check
                    className={cn(
                      "ml-auto",
                        selectedCurrency === currency.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}