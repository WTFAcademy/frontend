import React from 'react';
import _ from 'lodash';
import Link from '@docusaurus/Link';
import { Button } from '@site/src/components/ui/Button';
import CopyIcon from '@site/src/icons/Copy';
import EthereumIcon from '@site/src/icons/Ethereum';
import GithubIcon from '@site/src/icons/Github';
import TwitterIcon from '@site/src/icons/Twitter';

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function PersonalInfo() {
  
    const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

    const firstFive = _.slice(address, 0, 5); // 获取前4位字符
    const lastFour = _.slice(address, -4); // 获取后5位字符

    const handleCopy = () => {
        copyToClipboard(address);
    };

    return (
      <div className="w-[280px] p-8 mr-12 flex flex-col flex-shrink-0 box-border border border-gray-300 rounded-md overflow-hidden">
          <p className="text-gray-500 text-sm leading-5 mb-6">DAO, AGI Researcher | Ex-Tencent Cloud (DevOps) Sr. Prod. Designer → Web3 Builder | Figma Developer - Quick Commands</p>
          <div className="text-gray-700 mb-6 flex items-center">
              <EthereumIcon />
              <p className="mx-2">{firstFive}...{lastFour}</p>
              <div className="cursor-pointer" onClick={handleCopy}>
                  <CopyIcon />
              </div>
          </div>
          <div className="w-full h-px mb-6 bg-gray-200"></div>
          <div className="mb-6 flex flex-col">
              <div className="flex items-center justify-start">
                  <GithubIcon />
                  <p className="ml-2.5">tank@wtf.academy</p>
              </div>
              <div className="flex items-center justify-start">
                  <TwitterIcon />
                  <p className="ml-2.5">@tankxu</p>
              </div>
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
