export default function FormInput({
    label,
    value,
    onChange,
    onBlur,
    error,
    placeholder,
    type = "text",
    rows = 3,
    disabled = false,
}) {
    return (
        <div>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text font-bold">{label}</span>
                </div>
                {type === "textarea" ? (
                    <textarea
                        placeholder={placeholder}
                        onBlur={onBlur}
                        rows={rows}
                        disabled={disabled}
                        onChange={onChange}
                        className="textarea textarea-bordered w-full"
                    >
                        {value}
                    </textarea>
                ) : type === "number" ? (
                    <input
                        type="number"
                        min={0}
                        placeholder={placeholder}
                        value={value}
                        disabled={disabled}
                        onBlur={onBlur}
                        onChange={onChange}
                        className="input input-bordered w-full"
                    />
                ) : (
                    <input
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        disabled={disabled}
                        onBlur={onBlur}
                        onChange={onChange}
                        className="input input-bordered w-full"
                    />
                )}
            </label>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
