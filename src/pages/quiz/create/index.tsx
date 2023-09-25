import Editor from "@site/src/components/editor";
import Layout from "@theme/Layout";
import React, {useState} from "react";
import PreviewForm from "@site/src/pages/quiz/create/_preview-form";


const QuizCreate = () => {
    const [quiz, setQuiz] = useState([]);
    const handleChange = (quiz) => {
        setQuiz(quiz)
    }

    return (
        <Layout
            title={`Hello from`}
            description="Description will go into a meta tag in <head />"
            noFooter
        >
            <div className="flex">
                <Editor className="flex-1" onChange={handleChange} />
                <div className="flex-1 flex flex-col">
                    <PreviewForm jsonArr={quiz} />
                    <pre>
                        {JSON.stringify(quiz, null, 2)}
                    </pre>
                </div>
            </div>
        </Layout>
    )
}


export default QuizCreate;
