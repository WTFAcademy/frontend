import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import PersonalBanner from "@site/src/pages/personal/_PersonalBanner";
import PersonalAvatar from "@site/src/pages/personal/_PersonalAvatar";
import PersonalList from "@site/src/pages/personal/_PersonalList";
import PersonalInfo from "@site/src/pages/personal/_PersonalInfo";
import useAuth from "@site/src/hooks/useAuth";
import useProfile from "@site/src/hooks/useProfile";

function Personal() {

    const { data, isGithubLogin } = useAuth();
    const { profile } = useProfile();

    return (
        <Layout>
            <PersonalBanner />
            <div className="">
                <PersonalAvatar />
                <div className="flex flex-col items-start w-full px-8 mx-auto mt-12 mb-10 md:flex-row md:w-[1024px] md:mb-28">
                    <PersonalInfo />
                    <div className="w-full mt-10 md:mt-0">
                        <PersonalList />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Personal;
