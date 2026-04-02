type Props = {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
};

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}