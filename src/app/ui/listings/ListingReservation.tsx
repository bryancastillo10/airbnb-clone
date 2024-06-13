"use client";

import { Range } from "react-date-range";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { Button, Calendar } from "@/app/components";

interface ListingReservationProps{
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}:ListingReservationProps) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          {formatCurrency(price)} &nbsp; <span className="font-light text-neutral-600">per night</span>
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value)=> onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="p-4 flex flex-row justify-between items-center font-semibold text-lg">
        <div>Total</div>
        <div>{formatCurrency(totalPrice)}</div>
      </div>
    </div>
  )
}

export default ListingReservation;
