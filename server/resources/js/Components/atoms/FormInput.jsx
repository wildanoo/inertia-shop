export default function FormInput({
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  type = 'text',
  rows = 3,
  disabled = false,
  size = 'normal',
}) {
  return (
    <div>
      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text font-bold'>{label}</span>
        </div>
        {type === 'textarea' ? (
          <textarea
            placeholder={placeholder}
            onBlur={onBlur}
            rows={rows}
            disabled={disabled}
            onChange={onChange}
            className={[
              'textarea textarea-bordered text-base w-full',
              size === 'small' ? 'textarea-sm' : '',
              size === 'large' ? 'textarea-lg' : '',
            ].join(' ')}
          >
            {value}
          </textarea>
        ) : type === 'number' ? (
          <input
            type='number'
            min={0}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onBlur={onBlur}
            onChange={onChange}
            className={[
              'input input-bordered w-full',
              size === 'small' ? 'input-sm' : '',
              size === 'large' ? 'input-lg' : '',
            ].join(' ')}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onBlur={onBlur}
            onChange={onChange}
            className={[
              'input input-bordered w-full ',
              size === 'small' ? 'input-sm' : '',
              size === 'large' ? 'input-lg' : '',
            ].join(' ')}
          />
        )}
      </label>
      {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
    </div>
  );
}
