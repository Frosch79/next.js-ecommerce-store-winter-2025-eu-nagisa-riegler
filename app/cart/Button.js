'use client';

export default function Button(props) {
  return (
    <div>
      <button
        data-test-id={props.dataTestId}
        type={props.type}
        onClick={props.onClick}
        formAction={props.formAction}
      >
        {props.buttonName}
      </button>
    </div>
  );
}
