// components/Button.tsx
type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

export default function Button({ label, onClick, className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition ${className}`}
    >
      {label}
    </button>
  );
}

