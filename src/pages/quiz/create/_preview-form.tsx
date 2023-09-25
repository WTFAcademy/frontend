import React from "react";
import {useForm} from "react-hook-form";
import FormProvider from "@site/src/components/hook-form/form-provider";
import { RadioGroup, RadioGroupItem } from "@site/src/components/ui/RadioGroup";
import { Label } from "@site/src/components/ui/Label";

const PreviewForm = ({jsonArr}: {jsonArr: any[]}) => {
    const methods = useForm();

    return (
        <FormProvider methods={methods}>
            <div className="flex flex-col space-y-4">
                {jsonArr.map((item, index) => (
                    <div className="flex flex-col space-y-2">
                        <h2 className="text-xl font-bold">{`${item.title.index}. ${item.title.title}`}</h2>
                        {item.other && <div></div>}
                        <div>
                            <RadioGroup defaultValue="option-one">
                                {
                                    item.quiz.map((quiz, index) => (
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value={quiz.option} id={quiz.option} />
                                            <Label htmlFor={quiz.option}>{quiz.content}</Label>
                                        </div>
                                    ))
                                }
                            </RadioGroup>
                        </div>
                    </div>
                ))}
            </div>

        </FormProvider>
    )
}


export default PreviewForm;
