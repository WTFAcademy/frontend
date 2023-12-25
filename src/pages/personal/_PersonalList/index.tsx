import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@site/src/components/ui/Tabs";
import { Skeleton } from "@site/src/components/ui/Skeleton";
import { getUserCourse } from "@site/src/api/user";
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function PersonalList() {
    
    const [certificates,setCertificates] = useState();
    const [courses,setCourses] = useState();
    const { i18n } = useDocusaurusContext();

    useEffect(() => {
        const fetchCertificates = async () => {
            const { list } = await getUserCourse(i18n.currentLocale === 'zh' ? null : 'en');
            setCertificates(list.filter(item => item.finish_status == 2));
            setCourses(list.filter(item => item.finish_status == 1));
        };
        fetchCertificates();
    },[]);


    return (
        <Tabs defaultValue="certificates" className="w-full">
            <TabsList>
                <TabsTrigger value="certificates">
                    <Translate id="personal.PersonalList.Certificates.title">
                        我的证书
                    </Translate>
                </TabsTrigger>
                <TabsTrigger value="courses">
                    <Translate id="personal.PersonalList.Courses.title">
                        我的课程
                    </Translate>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="certificates">
                { certificates ? certificates?.length > 0 ? (certificates.map((item, index) => (
                    item.finish_status == 2 && <div className="relative w-[300px] h-[180px] mt-8 rounded-xl overflow-hidden" key={index}>
                            <div className="absolute w-full h-full">
                                <img src={item.finish_status == 2 ? item.nft_info?.cover_img : item.course?.cover_img } className="object-cover w-full h-full" alt="Solidity Pass" />
                            </div>
                            <div className="absolute z-0 w-full h-full bg-black opacity-60"></div>
                            <div className="absolute z-10 flex flex-col items-start justify-end h-full p-3">
                                <h3 className="text-xl font-bold text-white">{item.course.title}</h3>
                                <p className="mt-0.5 text-white text-xs font-medium">{item.course.description}</p>
                                <div className="mt-2 py-1 px-2 flex items-center rounded-md bg-[#ffffff3f] overflow-hidden backdrop-blur-[2px]">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 3.66667V6L7.75 7.75M11.25 6C11.25 8.8995 8.8995 11.25 6 11.25C3.10051 11.25 0.75 8.8995 0.75 6C0.75 3.10051 3.10051 0.75 6 0.75C8.8995 0.75 11.25 3.10051 11.25 6Z" stroke="#F9FAFB" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p className="ml-1 text-xs text-white">{new Date(item.nft_info.created_at).toISOString().split('T')[0] || '2023-03-03'}</p>
                                </div>
                            </div>
                        </div>
                    ))):(
                        <div className="mt-8">
                            <span>
                                <Translate id="personal.PersonalList.Certificates.tips">
                                    您还没有获得任何证书
                                </Translate>
                            </span>
                        </div>
                    ) : 
                    <Skeleton className="relative w-[300px] h-[180px] mt-8 rounded-xl bg-gray-200">
                        <div className="absolute z-10 flex flex-col items-start justify-end h-full p-3">
                            <Skeleton className="w-[150px] h-[28px] rounded-md bg-gray-300"></Skeleton>
                            <Skeleton className="w-[150px] h-[16px] mt-0.5 rounded-md bg-gray-300"></Skeleton>
                            <Skeleton className="w-[100px] h-[24px] mt-2 rounded-md bg-gray-300"></Skeleton>
                        </div>
                    </Skeleton>
                }
            </TabsContent>
            <TabsContent value="courses">
                { courses ? courses?.length > 0 ? (courses.map((item, index) => (
                    item.finish_status == 1 && <div className="relative w-[300px] h-[180px] mt-8 rounded-xl overflow-hidden" key={index}>
                            <div className="absolute w-full h-full">
                                <img src={ item.course.cover_img } className="object-cover w-full h-full" alt="Solidity Pass" />
                            </div>
                            <div className="absolute z-0 w-full h-full bg-black opacity-60"></div>
                            <div className="absolute z-10 flex flex-col items-start justify-end h-full p-3">
                                <h3 className="text-xl font-bold text-white">{item.course.title}</h3>
                                <p className="mt-0.5 text-white text-xs font-medium">{item.course.description}</p>
                                <div className="mt-2 py-1 px-2 flex items-center rounded-md bg-[#ffffff3f] overflow-hidden backdrop-blur-[2px]">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 3.66667V6L7.75 7.75M11.25 6C11.25 8.8995 8.8995 11.25 6 11.25C3.10051 11.25 0.75 8.8995 0.75 6C0.75 3.10051 3.10051 0.75 6 0.75C8.8995 0.75 11.25 3.10051 11.25 6Z" stroke="#F9FAFB" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p className="ml-1 text-xs text-white">{new Date(item.course.created_at).toISOString().split('T')[0] || '2023-03-03'}</p>
                                </div>
                            </div>
                        </div>
                    ))):(
                        <div className="mt-8">
                            <span>
                                <Translate id="personal.PersonalList.Courses.tips">
                                    您还没有开始任何课程
                                </Translate>
                            </span>
                        </div>
                    ) : 
                    <Skeleton className="relative w-[300px] h-[180px] mt-8 rounded-xl bg-gray-200">
                        <div className="absolute z-10 flex flex-col items-start justify-end h-full p-3">
                            <Skeleton className="w-[150px] h-[28px] rounded-md bg-gray-300"></Skeleton>
                            <Skeleton className="w-[150px] h-[16px] mt-0.5 rounded-md bg-gray-300"></Skeleton>
                            <Skeleton className="w-[100px] h-[24px] mt-2 rounded-md bg-gray-300"></Skeleton>
                        </div>
                    </Skeleton>
                }
            </TabsContent>
        </Tabs>
    );
}

export default PersonalList;
