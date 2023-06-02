import React from 'react';
import Layout from '@theme/Layout';
import PersonalBanner from '@site/src/pages/personal/_PersonalBanner';
import {Button} from "@site/src/components/ui/Button";
import Link from '@docusaurus/Link';

function Settings() {
    return (
        <Layout>
            <PersonalBanner />
            <div className="bg-gray-50">
                <div className="w-[800px] mx-auto mt-12 flex items-center">
                    <Link to="/personal">
                        <div className="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-gray-100">
                            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.70711 9.70711C5.31658 10.0976 4.68342 10.0976 4.2929 9.70711L0.292894 5.70711C-0.0976312 5.31658 -0.0976312 4.68342 0.292894 4.29289L4.29289 0.292894C4.68342 -0.0976312 5.31658 -0.0976312 5.70711 0.292894C6.09763 0.683417 6.09763 1.31658 5.70711 1.70711L3.41421 4L15 4C15.5523 4 16 4.44771 16 5C16 5.55228 15.5523 6 15 6L3.41421 6L5.70711 8.29289C6.09763 8.68342 6.09763 9.31658 5.70711 9.70711Z" fill="#111827"/>
                            </svg>
                        </div>
                    </Link>
                    <p className="ml-6 text-gray-900 font-bold text-xl">Settings</p>
                </div>
                <div className="w-[800px] mx-auto my-12 p-8 border border-gray-300 rounded-md">
                    <div className="w-full mb-6">
                        <h2 className="mb-1 text-gray-900 text-lg">Account</h2>
                        <p className="text-gray-500 text-sm">Settings related to your account.</p>
                    </div>
                    <div className="w-full mb-6">
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                disabled
                                defaultValue="tank@wtf.academy"
                                className="block w-[504px] rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>
                    <div className="w-full mb-6">
                        <h2 className="block mb-1 text-sm font-medium text-gray-700">Connections</h2>
                        <div className="w-full h-[74px] px-6 py-4 flex items-center justify-between my-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-md">
                            <div className="mr-3 flex-shrink-0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.3724 0 0 5.3808 0 12.0204C0 17.3304 3.438 21.8364 8.2068 23.4252C8.8068 23.5356 9.0252 23.1648 9.0252 22.8456C9.0252 22.5612 9.0156 21.804 9.0096 20.802C5.6712 21.528 4.9668 19.1904 4.9668 19.1904C4.422 17.8008 3.6348 17.4312 3.6348 17.4312C2.5452 16.6872 3.7176 16.7016 3.7176 16.7016C4.9212 16.7856 5.5548 17.94 5.5548 17.94C6.6252 19.776 8.364 19.2456 9.0468 18.9384C9.1572 18.162 9.4668 17.6328 9.81 17.3328C7.146 17.0292 4.344 15.9972 4.344 11.3916C4.344 10.08 4.812 9.006 5.5788 8.166C5.4552 7.8624 5.0436 6.6396 5.6964 4.986C5.6964 4.986 6.7044 4.662 8.9964 6.2172C9.97532 5.95022 10.9853 5.81423 12 5.8128C13.02 5.8176 14.046 5.9508 15.0048 6.2172C17.2956 4.662 18.3012 4.9848 18.3012 4.9848C18.9564 6.6396 18.5448 7.8624 18.4212 8.166C19.1892 9.006 19.6548 10.08 19.6548 11.3916C19.6548 16.0092 16.848 17.0256 14.1756 17.322C14.6064 17.694 14.9892 18.4272 14.9892 19.5492C14.9892 21.1548 14.9748 22.452 14.9748 22.8456C14.9748 23.1672 15.1908 23.5416 15.8004 23.424C18.19 22.6225 20.2672 21.0904 21.7386 19.0441C23.2099 16.9977 24.001 14.5408 24 12.0204C24 5.3808 18.6264 0 12 0Z" fill="#111827"/>
                                </svg>
                            </div>
                            <div className="flex flex-col w-full">
                                <h2 className="text-sm text-gray-700 font-semibold">GitHub</h2>
                                <p className="text-sm text-gray-500">Tank Xu (<span className="text-[#274BC9]">@tankxu</span>)</p>
                            </div>
                            <div className="w-[30px] h-[30px] flex flex-shrink-0 justify-center items-center cursor-pointer">
                                <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.8001 2.00002C3.8001 2.88368 3.08375 3.60002 2.2001 3.60002C1.31644 3.60002 0.600098 2.88368 0.600098 2.00002C0.600098 1.11637 1.31644 0.400024 2.2001 0.400024C3.08375 0.400024 3.8001 1.11637 3.8001 2.00002Z" fill="#6B7280"/>
                                    <path d="M8.6001 2.00002C8.6001 2.88368 7.88375 3.60002 7.0001 3.60002C6.11644 3.60002 5.4001 2.88368 5.4001 2.00002C5.4001 1.11637 6.11644 0.400024 7.0001 0.400024C7.88375 0.400024 8.6001 1.11637 8.6001 2.00002Z" fill="#6B7280"/>
                                    <path d="M11.8001 3.60002C12.6838 3.60002 13.4001 2.88368 13.4001 2.00002C13.4001 1.11637 12.6838 0.400024 11.8001 0.400024C10.9164 0.400024 10.2001 1.11637 10.2001 2.00002C10.2001 2.88368 10.9164 3.60002 11.8001 3.60002Z" fill="#6B7280"/>
                                </svg>
                            </div>
                        </div>
                        <div className="w-full h-[74px] px-6 py-4 flex items-center justify-between my-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-md">
                            <div className="mr-3 flex-shrink-0">
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
                                <h2 className="text-sm text-gray-700 font-semibold">ETH</h2>
                                <p className="text-sm text-gray-500">0xaB4...0F97</p>
                            </div>
                            <div className="w-[30px] h-[30px] flex flex-shrink-0 justify-center items-center cursor-pointer">
                                <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.8001 2.00002C3.8001 2.88368 3.08375 3.60002 2.2001 3.60002C1.31644 3.60002 0.600098 2.88368 0.600098 2.00002C0.600098 1.11637 1.31644 0.400024 2.2001 0.400024C3.08375 0.400024 3.8001 1.11637 3.8001 2.00002Z" fill="#6B7280"/>
                                    <path d="M8.6001 2.00002C8.6001 2.88368 7.88375 3.60002 7.0001 3.60002C6.11644 3.60002 5.4001 2.88368 5.4001 2.00002C5.4001 1.11637 6.11644 0.400024 7.0001 0.400024C7.88375 0.400024 8.6001 1.11637 8.6001 2.00002Z" fill="#6B7280"/>
                                    <path d="M11.8001 3.60002C12.6838 3.60002 13.4001 2.88368 13.4001 2.00002C13.4001 1.11637 12.6838 0.400024 11.8001 0.400024C10.9164 0.400024 10.2001 1.11637 10.2001 2.00002C10.2001 2.88368 10.9164 3.60002 11.8001 3.60002Z" fill="#6B7280"/>
                                </svg>
                            </div>
                        </div>
                        <Button className="w-auto h-[34px] mt-2 text-base bg-[#DDE6FA] text-[#3F69D5]">
                            <svg width="12" height="12" className="mr-2" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.00002 0.400024C6.44185 0.400024 6.80002 0.758197 6.80002 1.20002V5.20002H10.8C11.2419 5.20002 11.6 5.5582 11.6 6.00002C11.6 6.44185 11.2419 6.80002 10.8 6.80002H6.80002V10.8C6.80002 11.2419 6.44185 11.6 6.00002 11.6C5.5582 11.6 5.20002 11.2419 5.20002 10.8V6.80002H1.20002C0.758197 6.80002 0.400024 6.44185 0.400024 6.00002C0.400024 5.5582 0.758197 5.20002 1.20002 5.20002H5.20002V1.20002C5.20002 0.758197 5.5582 0.400024 6.00002 0.400024Z" fill="#3F69D5"/>
                            </svg>
                            Connect new wallet
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Settings;
