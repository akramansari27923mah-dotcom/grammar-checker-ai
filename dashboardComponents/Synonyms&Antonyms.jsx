'use client'

import { ArrowLeftRight, BookOpenText, LoaderCircle, Search, SearchX, Trash } from 'lucide-react'
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

    const enterKeyPress = (e) => {
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault()
            searchWord()
        }
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
        <div className="max-w-5xl mx-auto rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm p-8 ">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
            <ArrowLeftRight className="w-8 h-8 text-blue-600" />

            <div>
            <h2 className="text-3xl font-bold">{synData?.word}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {synData?.partOfSpeech}
            </p>
            </div>
        </div>

        {/* Meaning */}
        <div className="mb-8">
            <h3 className="font-semibold text-lg mb-2">Meaning</h3>

            <p className="text-gray-700 dark:text-gray-300">
            {synData?.meaning}
            </p>
        </div>

        {/* Synonyms & Antonyms */}
        <div className="grid md:grid-cols-2 gap-8">
            {/* Synonyms */}
            <div>
            <h3 className="text-xl font-semibold text-green-600 mb-4">
                Synonyms
            </h3>

            <div className="flex flex-wrap gap-3">
                {synData?.synonyms?.map((word) => (
                <span
                    key={word}
                    className="px-4 py-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                >
                    {word}
                </span>
                ))}
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
                    className="px-4 py-2 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                >
                    {word}
                </span>
                ))}
            </div>
            </div>
        </div>

        {/* Example */}
        <div className="mt-10 border-t pt-6 dark:border-slate-700">
            <h3 className="font-semibold text-lg mb-2">Example</h3>

            <blockquote className="italic text-gray-600 dark:text-gray-300 border-l-4 border-blue-500 pl-4">
            &quot;{synData?.example}&quot;
            </blockquote>
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