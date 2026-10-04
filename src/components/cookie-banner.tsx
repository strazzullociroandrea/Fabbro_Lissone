'use client'

import {useState, useEffect} from 'react'

const STORAGE_KEY = 'fabbro-lissone-cookie-consent'

function CookieBanner() {
    const [status, setStatus] = useState<'accepted' | 'rejected' | null>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const saved = window.localStorage.getItem(STORAGE_KEY)
        if (saved === 'accepted' || saved === 'rejected') {
            setStatus(saved as 'accepted' | 'rejected')
        }
    }, [])

    const handleChoice = (value: 'accepted' | 'rejected') => {
        window.localStorage.setItem(STORAGE_KEY, value)
        setStatus(value)
    }

    if (!isMounted) return null

    if (status) {
        return (
            <div className="fixed bottom-0 right-4 z-50">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setStatus(null)}
                        className="rounded-t-2xl translate-y-2/3 hover:translate-y-0 cursor-pointer bg-zinc-950/95 backdrop-blur-md border border-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-300 shadow-2xl transition-all hover:bg-zinc-900 hover:text-white"
                    >
                        🍪 Gestione Cookie
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-x-0 bottom-6 z-50 px-4 sm:px-6 lg:px-8">
            <div
                className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/95 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
                <button
                    onClick={() => handleChoice('rejected')}
                    aria-label="Chiudi banner"
                    className="cursor-pointer absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white border border-zinc-800"
                >
                    ✕
                </button>

                <div className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:justify-between sm:p-8">
                    <div className="space-y-2 text-center sm:text-left pr-4">
                        <h3 className="text-lg font-extrabold tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
                            🍪 Informativa Cookie
                        </h3>
                        <p className="max-w-xl text-[13px] leading-relaxed text-zinc-400 font-light">
                            Utilizziamo cookie tecnici essenziali e strumenti statistici anonimi per ottimizzare la tua
                            esperienza. Puoi consultare i dettagli nella nostra{' '}
                            <a href="/cookie-policy" className="text-sky-400 hover:underline font-medium">
                                Cookie Policy
                            </a>.
                        </p>
                    </div>
                    <div className="flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row sm:items-center">
                        <button
                            onClick={() => handleChoice('rejected')}
                            className="cursor-pointer rounded-2xl bg-red-500 hover:bg-red-400   border border-zinc-800 px-7 py-3 text-[13px] font-bold text-zinc-300 transition-all hover:text-white active:scale-95 shadow-sm"
                        >
                            Rifiuta
                        </button>
                        <button
                            onClick={() => handleChoice('accepted')}
                            className="cursor-pointer rounded-2xl bg-sky-500 hover:bg-sky-400 px-7 py-3 text-[13px] font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            Accetta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CookieBanner;