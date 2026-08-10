import {
  BookOpen,
  CaseSensitive,
  CircleAlert,
  Clock3,
  FileText,
  GitCompareArrows,
  Languages,
  MoveRight,
  Pilcrow,
  SpellCheck,
} from "lucide-react";

export const changeIconOrColor = (type, isFor) => {
  if (isFor === "grammer") {
    if (type === "Grammar") return <BookOpen />;
    if (type === "Spelling") return <SpellCheck />;
    if (type === "Punctuation") return <Pilcrow />;
    if (type === "Vocabulary") return <Languages />;
    if (type === "Tense") return <Clock3 />;
    if (type === "Article") return <FileText />;
    if (type === "Preposition") return <MoveRight />;
    if (type === "Subject-Verb Agreement") return <GitCompareArrows />;
    if (type === "Capitalization") return <CaseSensitive />;
    if (type === "Capitalization") return <CaseSensitive />;
    return <CircleAlert />;
  }

  if (isFor === "char") {
    if (type === "Grammar") return "bg-blue-500";
    if (type === "Spelling") return "bg-green-500";
    if (type === "Punctuation") return "bg-yellow-500";
    if (type === "Vocabulary") return "bg-purple-500";
    if (type === "Tense") return "bg-orange-500";
    if (type === "Article") return "bg-cyan-500";
    if (type === "Preposition") return "bg-indigo-500";
    if (type === "Subject-Verb Agreement") return "bg-pink-500";
    if (type === "Capitalization") return "bg-emerald-500";
    return "bg-gray-500";
  }

  if (isFor === "bg") {
    if (type === "Grammar") return "bg-blue-50 border-blue-200";
    if (type === "Spelling") return "bg-green-50 border-green-200";
    if (type === "Punctuation") return "bg-yellow-50 border-yellow-200";
    if (type === "Vocabulary") return "bg-purple-50 border-purple-200";
    if (type === "Tense") return "bg-orange-50 border-orange-200";
    if (type === "Article") return "bg-cyan-50 border-cyan-200";
    if (type === "Preposition") return "bg-indigo-50 border-indigo-200";
    if (type === "Subject-Verb Agreement") return "bg-pink-50 border-pink-200";
    if (type === "Capitalization") return "bg-emerald-50 border-emerald-200";
    return "bg-gray-50 border-gray-200";
  }

  if (isFor === "correct") {
    if (type === "Grammar") return "bg-blue-100 border-blue-200";
    if (type === "Spelling") return "bg-green-100 border-green-200";
    if (type === "Punctuation") return "bg-yellow-100 border-yellow-200";
    if (type === "Vocabulary") return "bg-purple-100 border-purple-200";
    if (type === "Tense") return "bg-orange-100 border-orange-200";
    if (type === "Article") return "bg-cyan-100 border-cyan-200";
    if (type === "Preposition") return "bg-indigo-100 border-indigo-200";
    if (type === "Subject-Verb Agreement") return "bg-pink-100 border-pink-200";
    if (type === "Capitalization") return "bg-emerald-100 border-emerald-200";
    return "bg-gray-100 border-gray-200";
  }

  if (isFor === "border") {
    if (type === "Grammar") return "border-blue-100";
    if (type === "Spelling") return "border-green-100";
    if (type === "Punctuation") return "border-yellow-100";
    if (type === "Vocabulary") return "border-purple-100";
    if (type === "Tense") return "border-orange-100";
    if (type === "Article") return "border-cyan-100";
    if (type === "Preposition") return "border-indigo-100";
    if (type === "Subject-Verb Agreement") return "border-pink-100";
    if (type === "Capitalization") return "border-emerald-100";
    return "border-gray-100";
  }
};


export const changeBgOfDetails = (type) => {
   if(type === "G") return "bg-green-500"
   if(type === "Aa") return "bg-orange-500"
   if(type === "S") return "bg-blue-500"
   if(type === "V") return "bg-indigo-500"
   if(type === "T") return "bg-sky-500"
}