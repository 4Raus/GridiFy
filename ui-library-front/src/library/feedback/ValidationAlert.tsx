type ValidationAlertProps = {
    title?: string;
    messages: string[];
    variant?: 'error' | 'warning';
};

export default function ValidationAlert({
                                            title,
                                            messages,
                                            variant = 'error',
                                        }: ValidationAlertProps) {
    if (messages.length === 0) {
        return null;
    }

    return (
        <div className={`validation-alert validation-alert--${variant}`}>
            {title && <div className="validation-alert__title">{title}</div>}

            <ul className="validation-alert__list">
                {messages.map((message, index) => (
                    <li key={`${message}-${index}`}>{message}</li>
                ))}
            </ul>
        </div>
    );
}