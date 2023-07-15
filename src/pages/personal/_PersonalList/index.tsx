import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@site/src/components/ui/Tabs";
import { getUserCourse } from "@site/src/api/user";

function PersonalList() {
    
    const [certificates,setCertificates] = useState(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            const { list } = await getUserCourse();
            setCertificates(list);
        };
        fetchCertificates();
    },[]);


    return (
        <Tabs defaultValue="certificates" className="w-full">
            <TabsList>
                <TabsTrigger value="certificates">My Certificates</TabsTrigger>
                <TabsTrigger value="courses">My Courses</TabsTrigger>
            </TabsList>
            <TabsContent value="certificates">
                { certificates ? (certificates.map((item, index) => (
                    item.finish_status == 2 && <div className="relative w-[300px] h-[180px] my-4 rounded-xl overflow-hidden" key={index}>
                            <div className="absolute w-full h-full">
                                <img src={item.finish_status == 2 ? item.nft_info?.cover_img : item.course?.cover_img } className="object-cover w-full h-full" alt="Solidity Pass" />
                            </div>
                            <div className="absolute z-0 w-full h-full bg-black opacity-50"></div>
                            <div className="absolute z-10 flex flex-col items-start justify-end h-full p-3">
                                <h3 className="text-xl font-bold text-white">{item.course.title}</h3>
                                <p className="mt-0.5 text-white text-xs font-semibold">{item.course.description}</p>
                                <div className="mt-2 py-1 px-2 flex items-center rounded-md bg-[#ffffff3f] overflow-hidden backdrop-blur-[2px]">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 3.66667V6L7.75 7.75M11.25 6C11.25 8.8995 8.8995 11.25 6 11.25C3.10051 11.25 0.75 8.8995 0.75 6C0.75 3.10051 3.10051 0.75 6 0.75C8.8995 0.75 11.25 3.10051 11.25 6Z" stroke="#F9FAFB" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p className="ml-1 text-xs text-white">{new Date(item.course.updated_at).toISOString().split('T')[0] || '2023-03-03'}</p>
                                </div>
                            </div>
                        </div>
                    ))):(
                        <span>You have not yet obtained any course certification</span>
                    )
                }
            </TabsContent>
            <TabsContent value="courses">
                { certificates ? (certificates.map((item, index) => (
                    item.finish_status == 1 && <div className="relative w-[300px] h-[180px] my-4 rounded-xl overflow-hidden" key={index}>
                            <div className="absolute w-full h-full">
                                <img src={item.course.cover_img } className="object-cover w-full h-full" alt="Solidity Pass" />
                            </div>
                            <div className="absolute z-0 w-full h-full bg-black opacity-50"></div>
                            <div className="absolute z-10 flex flex-col items-start justify-end h-full p-3">
                                <h3 className="text-xl font-bold text-white">{item.course.title}</h3>
                                <p className="mt-0.5 text-white text-xs font-semibold">{item.course.description}</p>
                                <div className="mt-2 py-1 px-2 flex items-center rounded-md bg-[#ffffff3f] overflow-hidden backdrop-blur-[2px]">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 3.66667V6L7.75 7.75M11.25 6C11.25 8.8995 8.8995 11.25 6 11.25C3.10051 11.25 0.75 8.8995 0.75 6C0.75 3.10051 3.10051 0.75 6 0.75C8.8995 0.75 11.25 3.10051 11.25 6Z" stroke="#F9FAFB" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p className="ml-1 text-xs text-white">{new Date(item.course.updated_at).toISOString().split('T')[0] || '2023-03-03'}</p>
                                </div>
                            </div>
                        </div>
                    ))):(
                        <span>You have not yet obtained any course</span>
                    )
                }
                </TabsContent>
        </Tabs>
    );
}

export default PersonalList;
