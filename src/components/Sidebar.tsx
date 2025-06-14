
import React from "react";

const categories = ["All", "Electronics", "Clothing", "Home"];

type Props = {
  category: string;
  onCategoryChange: (cat: string) => void;
  price: number;
  onPriceChange: (v: number) => void;
};

const Sidebar: React.FC<Props> = ({
  category,
  onCategoryChange,
  price,
  onPriceChange,
}) => {
  return (
    <aside className="w-64 min-w-[220px] bg-white rounded-xl shadow-lg p-6 flex flex-col gap-8">
      <section>
        <div className="text-lg font-semibold mb-4 text-gray-900">Filters</div>
        <div className="mb-6">
          <div className="font-medium mb-2">Category</div>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  className="accent-blue-500"
                  checked={category === cat}
                  onChange={() => onCategoryChange(cat)}
                  name="category"
                />
                <span className="text-gray-700">{cat}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <div className="font-medium mb-2">Price</div>
          <input
            type="range"
            min={0}
            max={1000}
            step={1}
            value={price}
            onChange={e => onPriceChange(Number(e.target.value))}
            className="w-full mb-1 accent-blue-500"
          />
          <div className="flex justify-between text-gray-600 text-xs">
            <span>$0</span>
            <span>${price}</span>
            <span>$1000</span>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
