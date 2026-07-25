'use client'

import { ArrowLeftRight, BookOpenText, Check, Copy, LoaderCircle, Search, SearchX, Trash, Volume2 } from 'lucide-react'
import React, { useState } from 'react'
import { everyWearCon } from '@/contexts/everyWear'
import { api } from '@/lib/axios'
import { errorShow } from '@/lib/toast'
import { removeFromLocalStorage, saveInLocalStorage } from '@/lib/storageFunctions'

const SynonymsAntonymsPage = () => {

    const { synData, setSynData, setSynDataUpdate} = everyWearCon()
    const [loader, setLoader] = useState(false)
    const [word, setWord] = useState('')
    const [error, setError] = useState(false)
    const [speechLoader, setSpeechLoader] = useState(false)
    const [copied, setCopied] = useState(false)
    const [synCopied, setSynCopied] = useState(false)
    const [antCopied, setAntCopied] = useState(false)
    
    const searchWord = async() => {
        if(!word?.trim()) return errorShow('Please enter a word.')
        try{
            setLoader(true)
            setSynDataUpdate(true)
            const {data} = await api.post('/groq/ant&syn', {word})
            if(data?.data === undefined) return setWord('') || setError(true)
            setSynData(data?.data)
            saveInLocalStorage("word", data?.data)
        }
        catch(err){

        }
        finally{
            setLoader(false)
            setSynDataUpdate(false)
            setWord('')
        }
    }

    const removeWord = () => {
        removeFromLocalStorage('word')
        setSynDataUpdate(true)
    }

    const textToSpeech = async(word) => {
        if(!word) resourceUsage
        try{
        setSpeechLoader(true)
            const {data} = await api.post(
            "/groq/text-to-speech",
            { word },
            {
                responseType: "blob",
            }
            );

            const url = URL.createObjectURL(data);

            const audio = new Audio(url);

            await audio.play();

            audio.onended = () => {
            URL.revokeObjectURL(url);
            };
        }
        catch(err){
            console.error(err.message);
        }
        finally{
        setSpeechLoader(false)
        }
    }

    const enterKeyPress = (e) => {
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault()
            searchWord()
        }
    }

    const copyText = (word) => {
        setCopied(true)
        window.navigator.clipboard.writeText(word)
        setTimeout(() => setCopied(false), 1000)
    }

    const copySynandAnt = (word, type) => {
        type === 'syn' ? 
        setSynCopied(true) : setAntCopied(true)

       const text = word.map(words => words).join(", ")
       
        window.navigator.clipboard.writeText(text)
        setTimeout(() =>  type === 'syn' ? 
        setSynCopied(false) : setAntCopied(false), 
        1000)
    }



  return (
    <div className='w-full min-h-screen bg-white pb-5'>
        <nav className='flex justify-between items-center h-16 bg-white shadow px-5'>
            <div className='flex justify-center items-center gap-3'>
                <div className='w-10 h-10 bg-blue-500 flex justify-center items-center rounded-xl text-white'>
                <BookOpenText />
                </div>
                <span className='font-semibold text-2xl'>
                    Synonyms & Antonyms
                </span>
            </div>
            <button onClick={removeWord} className='px-4 py-2 rounded-md bg-red-500 text-white flex justify-center items-center gap-2 font-semibold hover:bg-red-400 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-100'>
                <Trash size={18} />
                <span>
                    Clean
                </span>
            </button>
        </nav>

    {/* search bar */}
    <div className="flex justify-center items-center m-10 ">
        <input
            type="text"
            onChange={(e) => setWord(e?.target?.value)}
            value={word}
            onKeyDown={enterKeyPress}
            placeholder="Enter a word..."
            className="px-4 py-3 w-full max-w-2xl border rounded-l-lg "
        />
        <button  disabled={loader || !word?.trim()} onClick={searchWord} className="px-5 py-3 bg-blue-600 text-white rounded-r-lg cursor-pointer tracking-wider disabled:cursor-not-allowed">
            {
                loader ? (
                    <div className='flex justify-center items-center gap-2 animate-pulse'>
                    <LoaderCircle className='animate-spin' />
                    <span>
                        Finding...
                    </span>
                    </div>
                )
                :
                'Find'
            }
        </button>
    </div>


   {
    synData?.word ? (
        <div className="max-w-5xl mx-auto rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm ">
        {/* Header */}
        <div className="flex items-center gap-5 mb-6 border-b h-25 px-8">
            <div onClick={() => textToSpeech(synData?.word)} className='bg-gray-100 w-15 h-15 flex justify-center items-center rounded-lg border border-gray-200 cursor-pointer'>
            {
            speechLoader ? 
                <LoaderCircle className="w-8 h-8 text-blue-600 animate-spin" /> :
                <Volume2 className="w-8 h-8 text-blue-600" />
            }
            </div>

            <div className='flex flex-col gap-2'>
                <div className='flex justify-center items-center gap-5'>
                    <h2 className="text-3xl font-semibold">{synData?.word}</h2>
                     <span className='text-indigo-800 text-sm font-semibold bg-gray-100 px-2 py-1 rounded-3xl'>
                        {synData?.partOfSpeech}
                    </span>
                </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {synData?.meaning}
                    </p>
            </div>
            </div>


        {/* Synonyms & Antonyms */}
        <div className="grid md:grid-cols-2 gap-8 p-4">
            {/* Synonyms */}
            <div>
            <h3 className="text-xl font-semibold text-green-600 mb-4">
                Synonyms
            </h3>

            <div className="flex flex-wrap gap-3">
                {synData?.synonyms?.map((word) => (
                <span
                    key={word}
                    className="px-4 py-2 rounded-sm border border-green-200 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                >
                    {word}
                </span>
                ))}
                <button onClick={() => copySynandAnt(synData?.synonyms, 'syn')} className='w-full inline-flex mt-5 text-green-500 border border-green-500 px-4 py-2 rounded-md justify-center items-center gap-2 cursor-pointer'>
                     {
                    synCopied ? <Check /> :
                    <>
                        <Copy size={15} />
                        <span>
                        Copy Synonyms
                        </span>
                    </>
                }
                </button>

            </div>
            </div>

            {/* Antonyms */}
            <div>
            <h3 className="text-xl font-semibold text-red-600 mb-4">
                Antonyms
            </h3>

            <div className="flex flex-wrap gap-3">
                {synData?.antonyms?.map((word) => (
                <span
                    key={word}
                    className="px-4 py-2 rounded-sm border border-red-200 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                >
                    {word}
                </span>
                ))}
                 <button onClick={() => copySynandAnt(synData?.antonyms)} className='w-full inline-flex mt-5 text-red-500 border border-red-500 px-4 py-2 rounded-md justify-center items-center gap-2 cursor-pointer'>
                     {
                    antCopied ? <Check /> :
                    <>
                        <Copy size={15} />
                        <span>
                        Copy Antonyms
                        </span>
                    </>
                }
                </button>
            </div>
            </div>
        </div>

        {/* Example */}
        <div className="mt-10 border-t pt-6 dark:border-slate-700 p-5 flex justify-between items-center">
            <div>
            <h3 className="font-semibold text-lg mb-2">Example</h3>

            <blockquote className="italic text-gray-600 dark:text-gray-300 border-l-4 border-blue-500 pl-4">
            &quot;{synData?.example}&quot;
            </blockquote>
            </div>

            <button onClick={() => copyText(synData?.example)} className='px-4 py-2 flex justify-center items-center gap-2 bg-white text-indigo-500 shadow rounded-sm text-sm cursor-pointer'>
                {
                    copied ? <Check /> :
                    <>
                        <Copy size={15} />
                        <span>
                        Copy Sentence
                        </span>
                    </>
                }
            </button>
        </div>
        </div>
    ) :
    (
        <div className="text-gray-500 italic text-center">
            {
                loader ? (
                     <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto rounded-3xl border border-white/10 bg-white/10 px-10 py-8 shadow-2xl backdrop-blur-xl animate-pulse">
                            <LoaderCircle className="h-12 w-12 animate-spin text-blue-500" />
                            <div className="space-y-1 text-center ">
                              <p className="text-lg font-semibold text-black/70">
                                Finding...
                              </p>
                              <p className="text-sm text-black/70">
                                Please wait a moment
                              </p>
                            </div>
                          </div>
                ) : error ? (
                   <div className="flex flex-col items-center justify-center py-16 text-center">
                        <SearchX className="w-14 h-14 text-gray-400 mb-4" />

                        <h2 className="text-xl font-semibold">
                            No results found
                        </h2>

                        <p className="mt-2 text-gray-500 max-w-sm">
                            We couldn&apos;t find any synonyms or antonyms for this word.
                            Please check the spelling or try another English word.
                        </p>
                    </div>
                        ) : 
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <Search className="w-14 h-14 text-slate-400" />

                                <h2 className="mt-4 text-xl font-semibold">
                                Find the perfect word
                                </h2>

                                <p className="mt-2 text-slate-500 max-w-md text-center">
                                Search for any English word to discover its meaning, synonyms,
                                antonyms, and example sentence.
                                </p>
                        </div>
                    }
        </div>
    )
   }
    </div>
  )
}

export default SynonymsAntonymsPage