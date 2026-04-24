export default function Container({ children }) {
    return (
        <div className="mx-auto px-15 w-full">
            {children}
        </div>
    );
}