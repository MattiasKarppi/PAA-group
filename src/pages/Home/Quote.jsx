import { useState, useEffect } from "react"
import { useAuthContext } from "../../context/AuthContext"

export default function Quote() {
    console.log("quote")

    const auth = useAuthContext()
    const [quote, setQuote] = useState(null);
    const [error, setError] = useState(false);

    const loadQuote = async () => {
        try {
            const res = await fetch("https://zenquotes.io/api/today")
            console.log(res)
            if (!res.ok) throw "";
            const quote = await res.json();
            setQuote(quote)
        } catch (_) {
            setError(true)
        }
    }

    useEffect(() => {
        loadQuote()
    }, []);

    if (!auth.user) return "";


    if (!error && !quote) return "Loading quote...";
    if (error) return "Failed loading quote :(";
    return (
        <div id="quote">
            <p>"{quote.q}"</p>
            <p><i>- {quote.a}</i></p>
        </div>
    )
}