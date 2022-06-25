import { Listbox } from '@headlessui/react';

interface SelectProps {
  value?: { value: string; label: string };
  options?: { value: string; label: string }[];
  onChange(value: { value: string; label: string }): void;
  placeholder: string;
}

export default function Select(props: SelectProps) {
  const { value, onChange, options, placeholder } = props;

  return (
    <div className="relative w-full">
      <Listbox value={value} onChange={onChange}>
        <Listbox.Button className="rounded-[0.3125rem] text-white bg-[#1BC5BD] flex items-center justify-between h-8 px-[0.875rem] w-full">
          <span className="truncate">{value?.label || placeholder}</span>
          <svg
            width="14"
            height="11"
            viewBox="0 0 14 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M7 11L0.937823 0.499999L13.0622 0.5L7 11Z" fill="white" />
          </svg>
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 text-white bg-[#1BC5BD] rounded-[0.3125rem] max-h-60 w-full overflow-auto py-1 focus-visible:outline-none">
          {options?.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option}
              className={({ active }) =>
                `relative cursor-default px-[0.875rem] py-1 text-white ${active ? 'bg-brand' : ''}`
              }
            >
              {option.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
