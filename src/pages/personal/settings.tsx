import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@theme/Layout';
import PersonalBanner from '@site/src/pages/personal/_PersonalBanner';
import {Button} from "@site/src/components/ui/Button";
import Link from '@docusaurus/Link';
import useAuth from "@site/src/hooks/useAuth";
import truncation from "@site/src/utils/truncation";
import { updateUserInfo } from "@site/src/api/user";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import RHFInput from "@site/src/components/hook-form/rhf-input";
import Translate, { translate } from '@docusaurus/Translate';

function Settings() {

    const { data } = useAuth();

    const message = useMemo(() => {
        return translate({
            id: 'personal.Settings.Save.button',
            message: '保存',
        })
    },[]);
    
    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            username: data?.username,
            github: data?.github,
            wallet: data?.wallet,
            email: data?.email,
            nickname: data?.nickname,
            bio: data?.bio
        }
    });

    const wallet = watch('wallet');
    const username = watch('username');

    const onSubmit = data => {
        updateUserInfo({
            nickname: data.nickname,
            bio: data.bio
        }).then(()=> {
            toast.success("更新成功");
        }).catch(() => {
            toast.error("更新失败");
        });
    };

    useEffect(() => {
        reset({
            username: data?.username,
            github: data?.github,
            wallet: data?.wallet,
            email: data?.email,
            nickname: data?.nickname,
            bio: data?.bio
        });
    },[data]);
    
    return (
        <Layout noFooter>
            <PersonalBanner />
            <div>
                <div className="w-full mx-auto mt-12 px-4 flex items-center md:w-[800px] md:px-0 ">
                    <Link to="/personal">
                        <div className="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-gray-100 text-content dark:bg-zinc-700">
                            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.70711 9.70711C5.31658 10.0976 4.68342 10.0976 4.2929 9.70711L0.292894 5.70711C-0.0976312 5.31658 -0.0976312 4.68342 0.292894 4.29289L4.29289 0.292894C4.68342 -0.0976312 5.31658 -0.0976312 5.70711 0.292894C6.09763 0.683417 6.09763 1.31658 5.70711 1.70711L3.41421 4L15 4C15.5523 4 16 4.44771 16 5C16 5.55228 15.5523 6 15 6L3.41421 6L5.70711 8.29289C6.09763 8.68342 6.09763 9.31658 5.70711 9.70711Z" fill="currentColor"/>
                            </svg>
                        </div>
                    </Link>
                    <p className="ml-6 text-xl font-bold">
                        <Translate id="personal.Settings.button">
                            设置
                        </Translate>
                    </p>
                </div>
                <div className="w-auto p-8 mx-4 my-12 border border-border shadow-sm rounded-md md:w-[800px] md:mx-auto">
                    <div className="w-full mb-6">
                        <h4 className="mb-1 text-lg font-bold">
                            <Translate id="personal.Settings.Account.title">
                                帐户
                            </Translate>
                        </h4>
                        <p className="text-sm text-content-muted">
                            <Translate id="personal.Settings.Account.intro">
                                设置您的个人信息
                            </Translate>
                        </p>
                    </div>
                    <div className="w-full mb-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h4 className="block mb-3 text-sm font-bold text-content-subtle">
                                <Translate id="personal.Settings.Connections.title">
                                    连接
                                </Translate>
                            </h4>
                            <div className="w-full h-[74px] px-6 py-4 flex items-center justify-between my-1 text-sm font-medium text-content-subtle border border-border-muted rounded-md">
                                <div className="flex-shrink-0 mr-3">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.3724 0 0 5.3808 0 12.0204C0 17.3304 3.438 21.8364 8.2068 23.4252C8.8068 23.5356 9.0252 23.1648 9.0252 22.8456C9.0252 22.5612 9.0156 21.804 9.0096 20.802C5.6712 21.528 4.9668 19.1904 4.9668 19.1904C4.422 17.8008 3.6348 17.4312 3.6348 17.4312C2.5452 16.6872 3.7176 16.7016 3.7176 16.7016C4.9212 16.7856 5.5548 17.94 5.5548 17.94C6.6252 19.776 8.364 19.2456 9.0468 18.9384C9.1572 18.162 9.4668 17.6328 9.81 17.3328C7.146 17.0292 4.344 15.9972 4.344 11.3916C4.344 10.08 4.812 9.006 5.5788 8.166C5.4552 7.8624 5.0436 6.6396 5.6964 4.986C5.6964 4.986 6.7044 4.662 8.9964 6.2172C9.97532 5.95022 10.9853 5.81423 12 5.8128C13.02 5.8176 14.046 5.9508 15.0048 6.2172C17.2956 4.662 18.3012 4.9848 18.3012 4.9848C18.9564 6.6396 18.5448 7.8624 18.4212 8.166C19.1892 9.006 19.6548 10.08 19.6548 11.3916C19.6548 16.0092 16.848 17.0256 14.1756 17.322C14.6064 17.694 14.9892 18.4272 14.9892 19.5492C14.9892 21.1548 14.9748 22.452 14.9748 22.8456C14.9748 23.1672 15.1908 23.5416 15.8004 23.424C18.19 22.6225 20.2672 21.0904 21.7386 19.0441C23.2099 16.9977 24.001 14.5408 24 12.0204C24 5.3808 18.6264 0 12 0Z" fill="#111827"/>
                                    </svg>
                                </div>
                                <div className="flex flex-col w-full">
                                    <h4 className="text-sm font-medium text-content-subtle">GitHub</h4>
                                    <p className="text-sm text-content-muted">{ username } (<span className="text-[#274BC9]">@{ username }</span>)</p>
                                </div>
                            </div>
                            <div className="w-full h-[74px] px-6 py-4 flex items-center justify-between my-1 text-sm font-medium text-content-subtle border border-border-muted rounded-md mb-6">
                                <div className="flex-shrink-0 mr-3">
                                    <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect y="0.599976" width="28.8" height="28.8" rx="14.4" fill="#F3F4F6"/>
                                        <g clipPath="url(#clip0_147_3131)">
                                            <path d="M14.3983 5.40002L14.2695 5.83757V18.5329L14.3983 18.6614L20.2913 15.1781L14.3983 5.40002Z" fill="#343434"/>
                                            <path d="M14.3982 5.40002L8.50513 15.1781L14.3982 18.6614V12.4995V5.40002Z" fill="#8C8C8C"/>
                                            <path d="M14.3982 19.7772L14.3256 19.8657V24.388L14.3982 24.5999L20.2947 16.2957L14.3982 19.7772Z" fill="#3C3C3B"/>
                                            <path d="M14.3982 24.5999V19.7772L8.50513 16.2957L14.3982 24.5999Z" fill="#8C8C8C"/>
                                            <path d="M14.3982 18.6615L20.2911 15.1781L14.3982 12.4995V18.6615Z" fill="#141414"/>
                                            <path d="M8.50513 15.1781L14.3982 18.6615V12.4995L8.50513 15.1781Z" fill="#393939"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_147_3131">
                                                <rect width="11.7896" height="19.2" fill="white" transform="translate(8.50513 5.40002)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="flex flex-col w-full">
                                    <h4 className="text-sm font-medium text-content-subtle">ETH</h4>
                                    <p className="text-sm text-content-muted">
                                        { truncation(wallet) }
                                    </p>
                                </div>
                            </div>
                            {/* <RHFInput label={'email'} name={'email'}></RHFInput> */}
                            <div className="w-full mb-6">
                                <label htmlFor="nickname" className="block mb-1 text-sm font-bold text-content-subtle">
                                    <Translate id="personal.Settings.Nickname.title">
                                        昵称
                                    </Translate>
                                </label>
                                <div className="mt-2 mb-6">
                                    <input
                                        {...register("nickname")}
                                        className="block w-full rounded-md py-1.5 px-3 text-content shadow-sm bg-background border border-border-muted placeholder:text-content focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 md:w-[504px]"
                                    />
                                </div>
                                <div className="w-full mb-6">
                                    <label htmlFor="bio" className="block mb-1 text-sm font-bold text-content-subtle">
                                        <Translate id="personal.Settings.Bio.title">
                                            个人简介
                                        </Translate>
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            rows={3}
                                            {...register("bio")}
                                            className="block w-full rounded-md py-1.5 px-3 text-content shadow-sm bg-background border border-border-muted placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-content-muted">
                                        <Translate id="personal.Settings.Bio.tips">
                                            介绍一下你自己
                                        </Translate>
                                    </p>
                                </div>
                            </div>
                            <Button type="submit">{message}</Button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Settings;
