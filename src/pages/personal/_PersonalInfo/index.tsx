import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { Button } from '@site/src/components/ui/Button';
import CopyIcon from '@site/src/icons/Copy';
import EthereumIcon from '@site/src/icons/Ethereum';
import GithubIcon from '@site/src/icons/Github';
import CheckIcon from '@site/src/icons/Check';
// import TwitterIcon from '@site/src/icons/Twitter';
import useAuth from "@site/src/hooks/useAuth";
import truncation from "@site/src/utils/truncation";

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log("Copied to clipboard successfully!");
    }, (error) => {
        console.error("Failed to copy text: ", error);
    });
}

function PersonalInfo() {

    const { data } = useAuth();
    
    const [bio,setBio] = useState(null);
    const [github,setGithub] = useState(null);
    const [copy,setCopy] = useState(false);
    const [wallet,setWallet] = useState('');
    
    const handleCopy = () => {
        if(!copy){
            setCopy(true);
            copyToClipboard(wallet);
            setTimeout(() => {
                setCopy(false);
            }, 1000);
        }
    };

    useEffect(() => {
        setBio(data?.bio);
        setGithub(data?.github);
        setWallet(data?.wallet);
    },[data]);

    return (
        <div className="box-border flex flex-col flex-shrink-0 w-full p-8 mr-12 overflow-hidden border border-border-input rounded-md md:w-[280px]">
            <p className="mb-6 text-sm leading-5 text-gray-500">{ bio ?? '这个人很懒，什么都没有留下。' }</p>
            <div className="flex items-center mb-6 text-gray-700">
                <EthereumIcon />
                <p className="mx-2">{truncation(wallet)}</p>
                <div className="cursor-pointer" onClick={handleCopy}>
                    { copy ? <CheckIcon /> : <CopyIcon /> }
                </div>
            </div>
            <div className="w-full h-px mb-6 bg-gray-200"></div>
            <div className="flex flex-col mb-6">
                <div className="flex items-center justify-start">
                    <GithubIcon />
                    <p className="ml-2.5">{ github }</p>
                </div>
                {/* <div className="flex items-center justify-start">
                    <TwitterIcon />
                    <p className="ml-2.5">@tankxu</p>
                </div> */}
            </div>
            <div className="flex">
                <Link to="/personal/settings">
                    <Button className="w-[82px] h-[34px] text-base bg-[#DDE6FA] text-[#1B3799]">Settings</Button>
                </Link>
            </div>
        </div>
    );
}

export default PersonalInfo;