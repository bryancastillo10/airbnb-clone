"use client";
import Select from "react-select";
import { useCountries } from "../hooks";


export type CountrySelectValue = {
    latlng: number[];
    label: string;
    region: string;
    value: string;
    flag: string;
}

interface CountrySelectProps{
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = ({value,onChange}:CountrySelectProps) => {
    const { getAll } = useCountries();
    return (
    <div>
        <Select
            options={getAll()}   
            placeholder="Anywhere"
            isClearable
            value={value}
            onChange={(value) => onChange(value as CountrySelectValue)}
            formatOptionLabel={(options: any) => (
            <div className="flex flex-row items-center gap-3">
                <div className="">
                  {options.flag}      
                </div>
                <div className="">
                  {options.label}, <span className="text-rose-500 ml-1">{options.region}</span>
                </div>    
            </div>
            )}
            classNames={{
                control: () => "p-3 border-2",
                input: () => "text-lg",
                option: () => "text-lg"
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                    ...theme.colors,
                    primary: "black",
                    primary25:"#FFE4E6",
                }
            })}
        />
    </div>
  )
}

export default CountrySelect;
