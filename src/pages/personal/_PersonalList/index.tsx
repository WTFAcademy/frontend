import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@site/src/components/ui/Tabs";

function PersonalList() {
    return (
        <Tabs defaultValue="certificates" className="w-full">
            <TabsList>
                <TabsTrigger value="certificates">My Certificates</TabsTrigger>
                <TabsTrigger value="courses">My Courses</TabsTrigger>
            </TabsList>
            <TabsContent value="certificates">
                <div className="relative w-[300px] h-[180px] my-4 rounded-xl overflow-hidden">
                    <div className="absolute w-full h-full">
                        <img src={require('@site/static/img/solidity-pass-1.jpg').default} className="object-cover w-full h-full" alt="Solidity Pass 1" />
                    </div>
                    <div className="absolute z-0 w-full h-full bg-black opacity-50"></div>
                    <div className="absolute z-10 flex flex-col items-start justify-end h-full p-3">
                        <h2 className="text-xl font-bold text-white">Solidity 101</h2>
                        <p className="mt-0.5 text-white text-xs font-semibold">Learn Solidity Basics</p>
                        <div className="mt-2 py-1 px-2 flex items-center rounded-md bg-[#ffffff3f] overflow-hidden backdrop-blur-[2px]">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 3.66667V6L7.75 7.75M11.25 6C11.25 8.8995 8.8995 11.25 6 11.25C3.10051 11.25 0.75 8.8995 0.75 6C0.75 3.10051 3.10051 0.75 6 0.75C8.8995 0.75 11.25 3.10051 11.25 6Z" stroke="#F9FAFB" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="ml-1 text-xs text-white">2023-03-03</p>
                        </div>
                    </div>
                </div>
                <div className="relative w-[300px] h-[180px] my-4 rounded-xl overflow-hidden">
                    <div className="absolute w-full h-full">
                        <img src={require('@site/static/img/solidity-pass-2.jpg').default} className="object-cover w-full h-full" alt="Solidity Pass 2" />
                    </div>
                    <div className="absolute z-0 w-full h-full bg-black opacity-50"></div>
                    <div className="absolute z-10 flex flex-col items-start justify-end h-full p-3">
                        <h2 className="text-xl font-bold text-white">Solidity 102</h2>
                        <p className="mt-0.5 text-white text-xs font-semibold">Learn Advanced Solidity Topics</p>
                        <div className="mt-2 py-1 px-2 flex items-center rounded-md bg-[#ffffff3f] overflow-hidden backdrop-blur-[2px]">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 3.66667V6L7.75 7.75M11.25 6C11.25 8.8995 8.8995 11.25 6 11.25C3.10051 11.25 0.75 8.8995 0.75 6C0.75 3.10051 3.10051 0.75 6 0.75C8.8995 0.75 11.25 3.10051 11.25 6Z" stroke="#F9FAFB" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="ml-1 text-xs text-white">2023-04-03</p>
                        </div>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="courses">Coming Soon</TabsContent>
        </Tabs>
    );
}

export default PersonalList;
