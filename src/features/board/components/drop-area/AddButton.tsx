export interface AddButtonProps {
  onClick: (e: React.PointerEvent<HTMLButtonElement>) => void;
}

export default function AddButton(props: AddButtonProps) {
  return (
    <button type="button" {...props}>
      +
    </button>
  );
}
