"use client";

interface MenuItemProps{
    onClick: () => void;
    label: string;
}

const MenuItem= ({onClick,label}:MenuItemProps) => {
  return (
      <div
          onClick={onClick}
          className="px-4 py-3 hover:bg-rose-200 transition font-semibold">
      {label}
    </div>
  )
}

export default MenuItem;
