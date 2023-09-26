import {useController, UseControllerProps} from "react-hook-form";
import {IQuiz} from "@site/src/typings/quiz";
import ReactMarkdown from "react-markdown";
import {cn} from "@site/src/utils/class-utils";
import React, {useMemo} from "react";
import {IQuizFormValues} from "@site/src/components/quiz-form/Preview";


const REPLACEMENT_INSET='<<!!>>'
const QuizInset= ({quiz,...props}: UseControllerProps<IQuizFormValues> & {quiz:IQuiz}) => {
    const { field } = useController(props)

    const {value=[],onChange}=field

    const extend=useMemo(()=>{
        return (value as string[]).reduce((prev,next)=>prev.map(md=>
                ({...md,raw:md.raw.replace('_____',
                        quiz.content.options.find(option=>option.value===next).label)}))
            ,quiz.content.extend.map(md=>({...md,raw:md.raw.replace(/<<!!>>/g,'_____')})))

    },[quiz.content.extend,value])

    return (<div>
        <div className='py-[20px] text-[16px] font-bold'>
            <ReactMarkdown children={quiz.title} />
        </div>
        <div className='my-[20px]'>
            {extend.map((md,index)=> <ReactMarkdown key={index} children={md.raw} />)}
        </div>
        <div className='px-[10px] py-[20px] border border-solid border-black-500  min-h-[100px] flex flex-wrap'>
            {quiz.content.options.map((answer) => (<div
                key={answer.value}
                onClick={()=>{
                    if(!value.includes(answer.value)){
                        onChange([...(value as string[]),answer.value])
                    }else {
                        onChange((value as string[]).filter(v=>v!==answer.value))
                    }
                }}
                className={cn('border flex items-center px-[10px] mx-[10px] border-solid border-black-500 rounded-[4px] mb-[20px] cursor-pointer', {'border-green-500 text-green-500': value.includes(answer.value)})}>
                {`${answer.value}. ${answer.label}`}
            </div>))}
        </div>
    </div>)
}

export default QuizInset
