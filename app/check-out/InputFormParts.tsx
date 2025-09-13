import styles from './InputFormParts.module.scss';

type Props = {
  label: string;
  dataTestId: string;
  labelValue: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  value: string | number;
};

export default function InputFormParts(props: Props) {
  return (
    <div className={styles.inputFormParts}>
      <label htmlFor={props.label}>{props.labelValue}:</label>
      <input
        id={props.label}
        data-test-id={props.dataTestId}
        type={props.type}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}
