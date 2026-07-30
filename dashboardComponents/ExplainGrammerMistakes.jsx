'use client'

import { everyWearCon } from '@/contexts/everyWear'
import { api } from '@/lib/axios'
import { errorShow } from '@/lib/toast'
import { changeIconOrColor } from '@/lib/changeColorOrBg'
import {
  BadgeCheck,
  BookOpen,
  Check,
  CircleCheck,
  Copy,
  Eye,
  Lightbulb,
  LoaderCircle,
  Search,
  SearchX,
  Sparkles,
  Trash,
  WandSparkles,
  X,
} from "lucide-react";
import React, { useState } from 'react'
import { removeFromSessionStorage, saveInSessionStorage } from '@/lib/storageFunctions'

const ExplainGrammerMistakesPage = () => {

     const [sentence, setSentence] = useState('')
        const { explainGrammer, setExplainGrammer, setExplainGrammerUpdate} = everyWearCon()
        const [loader, setLoader] = useState(false)
        const [error, setError] = useState(false)
        const [share, setShare] = useState(false)
        const [copied, setCopied] = useState('')
        const [dataForDil, setDataForDil] = useState('')
        const [openRule, setOpenRule] = useState(false)
        const [openExplain, setOpenExplain] = useState(false)


        const explainSentence = async() => {
            try{
                if(!sentence.trim()) return errorShow('Please enter sentence!');
                setLoader(true)
                
                const {data} = await api.post('/groq/explainGrammarMistakes', {sentence})
                                
                if(!data?.result?.success) return setError(true)
                    setError(false)
                setExplainGrammer(data?.result)
                saveInSessionStorage('explainGrammer', data?.result)
            }
            catch(err){
                console.error(err.message)
            }
            finally{
                setLoader(false)
                setExplainGrammerUpdate(true)
            }
        }
        

      const showRuleAndExample = (type, data) => {
            setDataForDil(data);

            if (type === "rule") return  setOpenRule(true);
            if (type === "explain") return setOpenExplain(true);
        };
        

        const copyCorrectText = (text) => {
            setCopied(true)

            window.navigator.clipboard.writeText(text)

            setTimeout(() => {
                setCopied(false)
            }, 1000)
        }

  return (
    <div>
         <nav className="flex items-center justify-between h-20 md:px-8 px-4 bg-linear-to-r from-white via-indigo-50 to-purple-50 border-b border-slate-200">
        <div className="flex items-center gap-4">
            
            <div className="flex md:h-14 md:w-14 h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
            <Sparkles className="text-white" size={28} />
            </div>

            <div>
            <div className="flex items-center gap-2">
                <h1 className="md:text-2xl font-bold text-slate-800">
                Explain Grammar
                </h1>

                <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                AI
                </span>
            </div>

            <p className="mt-1 text-xs text-slate-500 hidden md:block">
                We find mistakes, explain why they&lsquo;re wrong, and help improve.
            </p>
            </div>
        </div>

        <div className='flex justify-center items-center gap-5'>
        <div className="hidden md:flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 shadow-sm">
            <BadgeCheck className="text-indigo-600" size={18} />
            <span className="text-sm font-medium text-slate-700">
            AI Powered
            </span>
        </div>

        <button onClick={() => {removeFromSessionStorage('explainGrammer'),setExplainGrammerUpdate(!explainGrammer)}} className="flex items-center gap-2 rounded-full border border-indigo-200 bg-red-500 px-4 py-2 shadow-sm text-white cursor-pointer">
            <Trash size={18} />
            <span className="text-sm font-medium">
            Clean Result
            </span>
        </button>
        </div>
        </nav>

                {
                    (openRule || openExplain) && (
                        <div className='fixed top-0 p-5 w-full h-screen  rounded-md bg-black/50 backdrop-blur-xs flex justify-center items-center'>

                                
                        <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    {openRule ? <BookOpen size={20} /> : <Lightbulb size={20} />}
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                    {openRule ? "Grammar Rule" : "Explanation"}
                                    </h3>

                                    <span className="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                                    Mistake #{dataForDil?.id}
                                    </span>
                                </div>
                                </div>

                            <div className='flex justify-center items-center gap-5'>

                                <button
                                onClick={() => {window.navigator.clipboard.writeText(openRule ? dataForDil?.rule : dataForDil?.explanation)}}
                                className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 active:scale-95 cursor-pointer"
                                >
                                <Copy size={16} className="transition-transform group-hover:rotate-6" />
                                Copy
                                </button>
                                <button
                                onClick={() => {setOpenExplain(false), setOpenRule(false)}}
                                className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-red-500 px-4 py-2 text-sm font-medium text-white cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
                                >
                                <X size={16} className="transition-transform group-hover:rotate-6" />
                                Cancel
                                </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-5">
                                <p className="leading-8 text-slate-700">
                                {openRule ? dataForDil?.rule : dataForDil?.explanation}
                                </p>
                            </div>

                        </div>
                           
                        </div>
                    )
                }


        <div className='p-5'>
            <div className="w-full max-w-7xl mx-auto mb-5 rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
                    <textarea
                        placeholder="Type or paste your sentence here..."
                        maxLength={500}
                        value={sentence}
                        onChange={(e) => setSentence(e?.target?.value)}
                        className="min-h-20 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                    {error && <span className='md:text-sm text-xs text-red-500'>Please provide a valid sentence</span>}
                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Character Counter */}
                        <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-medium text-slate-500">
                            {sentence.length} / 500 Characters
                        </span>
                        </div>
            
                        {/* Buttons */}
                        <div className="flex items-center justify-between gap-3">
                        <button
                        onClick={() => setSentence('')}
                            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100"
                        >
                            <X size={16} />
                            Clear
                        </button>
            
                        <button
                        onClick={explainSentence}
                        disabled={loader || !sentence.trim()}
                            className="group flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed text-nowrap"
                        >
                            {
                                loader? (
                            <>
                                <LoaderCircle
                                size={16}
                                className="animate-spin"
                                />
                                 Analyzing your sentence...
                            </>
                                ) :
                                <>
                            <WandSparkles
                            size={16}
                            className="transition-transform duration-300 group-hover:rotate-12"
                            />
                            Explain Mistakes
                            </>
                            }
                        </button>
                        </div>
                    </div>
            </div>
            

        {
            explainGrammer?.mistakes ? (
                <div className='md:px-6'>

                    <div className='flex justify-between items-center p-4 rounded-md bg-green-50 border border-green-200'>
                        <div className='flex justify-center items-center gap-2'>
                            <div className='w-15 h-15 rounded-full flex justify-center items-center bg-green-500 text-white'>
                                <CircleCheck size={30} />
                            </div>
                            <div>
                                <label className='text-sm font-semibold'>Correct Sentence</label>
                                <p className='font-semibold text-green-500'>{explainGrammer?.correctedSentence}</p>
                            </div>
                        </div>

                        <div onClick={() => copyCorrectText(explainGrammer?.correctedSentence)} className='w-15 h-15 rounded-md flex justify-center items-center bg-green-100 border border-green-200 text-green-500 cursor-pointer'>
                            {
                                copied ? 
                                <Check /> : 
                                <Copy size={23} />
                            }
                        </div>
                    </div>

                   <div className='grid md:grid-cols-3 grid-cols-1 my-5 justify-center items-center gap-5'>
                        {
                            explainGrammer?.mistakes.map((items) => (
                            <div className={`p-4 rounded-md ${changeIconOrColor(items?.type, "bg")} border`} key={items?.id}>
                                    <header className='flex justify-between items-center'>
                                        <div className='flex justify-center items-center gap-2'>
                                            <label className={`w-10 h-10 rounded-full flex justify-center items-center border ${changeIconOrColor(items?.type, "char")} text-white shadow`}>{items?.id}</label>
                                            <p className='font-semibold'>{items?.type}</p>
                                        </div>

                                        <div className={`w-10 h-10 rounded-md flex justify-center items-center ${changeIconOrColor(items?.type, "bg")} border shadow`}>
                                            {changeIconOrColor(items?.type, "grammer")}
                                        </div>
                                    </header>

                                <div className='flex flex-col gap-1 mt-5'>
                                    <div className={`flex justify-center items-center text-sm font-semibold ${changeIconOrColor(items?.type, "border")} border rounded-sm overflow-hidden`}>
                                        <div className={`${changeIconOrColor(items?.type, "correct")} py-1 px-5 pr-10`}>
                                            Wrong
                                        </div>
                                        <div className='flex-1 py-1 px-5 text-red-500 bg-white'>
                                            {items?.wrongText}
                                        </div>
                                    </div>

                                    <div className={`flex justify-center items-center text-sm font-semibold ${changeIconOrColor(items?.type, "border")} border rounded-md overflow-hidden`}>
                                        <div className={`${changeIconOrColor(items?.type, "correct")} py-1 px-5 pr-10`}>
                                            Correct
                                        </div>
                                        <div className='flex-1 py-1 px-5 text-green-500 bg-white'>
                                            {items?.correctText}
                                        </div>
                                    </div>

                                    <div className={`flex justify-center items-center text-sm  ${changeIconOrColor(items?.type, "border")} border rounded-md overflow-hidden`}>
                                        <div className={`${changeIconOrColor(items?.type, "correct")} py-1  px-5 pr-10 font-semibold`}>
                                            Explain
                                        </div>
                                        <div className='flex-1 py-1 px-5 bg-white flex justify-between items-center'>
                                            <span>
                                            {items?.explanation.slice(0, 25)}...
                                            </span>
                                            <Eye onClick={() => showRuleAndExample('explain', items)} size={15} className='cursor-pointer' />
                                        </div>
                                    </div>

                                    <div className={`flex justify-center items-center text-sm  ${changeIconOrColor(items?.type, "border")} border rounded-md overflow-hidden`}>
                                        <div className={`${changeIconOrColor(items?.type, "correct")} py-1 px-5 pr-10 font-semibold`}>
                                            Rule
                                        </div>
                                        <div className='flex-1 py-1 px-5 bg-white flex justify-between items-center'>
                                            <span>
                                            {items?.rule.slice(0, 30)}...
                                            </span>
                                            <Eye size={15} className='cursor-pointer' onClick={() => showRuleAndExample('rule', items)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                   </div>
                </div>
            ) : (
                <div className="text-gray-500 italic text-center">
                    {
                        loader ? (
                        <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto rounded-3xl border border-white/10 bg-white/10 px-10 py-8 shadow-2xl backdrop-blur-xl animate-pulse">
                            <LoaderCircle className="h-12 w-12 animate-spin text-blue-500" />
                            <div className="space-y-1 text-center ">
                            <p className="text-lg font-semibold text-black/70">
                                Analysing...
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
                                           Please enter a valid Sentence
                                        </p>
                         </div>
                        ) : 
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <Search className="w-14 h-14 text-slate-400" />
                            <p className="mt-2 text-slate-500 max-w-md text-center">
                                Enter a sentence to identify grammar mistakes, understand why they happened, and learn how to write it correctly.
                            </p>                 
                        </div>
                    }
                </div>
            ) 
        }

        </div>

    </div>
  )
}

export default ExplainGrammerMistakesPage