export default function Footer() {
    return (
        <footer className="  p-4 text-center flex justify-center items-center border-t-2">
            <p className=" font-fira ">&copy; {new Date().getFullYear()} MOZ. All rights reserved.</p>
        </footer>
    )
}