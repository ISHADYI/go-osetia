export default function Container({ children, className}) {
    return (
        <div className={`mx-auto px-15 w-full ${className}`}>
            {children}
        </div>
    );
}