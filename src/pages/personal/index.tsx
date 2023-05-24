import React from 'react';
import Layout from '@theme/Layout';
import PersonalBanner from '@site/src/pages/personal/_PersonalBanner';
import PersonalAvatar from '@site/src/pages/personal/_PersonalAvatar';
import PersonalList from '@site/src/pages/personal/_PersonalList';
import PersonalInfo from '@site/src/pages/personal/_PersonalInfo';

function Personal() {
    return (
        <Layout>
            <PersonalBanner />
            <div className="bg-gray-50">
                <PersonalAvatar />
                <div className="w-[1024px] mx-auto mt-12 mb-28 px-8 flex items-start">
                    <PersonalInfo />
                    <div className="w-full">
                        <PersonalList />
                    </div>
                </div>
            </div>
        </Layout>
    );
}


export default Personal;
