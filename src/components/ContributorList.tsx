import useBreakpoint from "@site/src/hooks/useBreakpoint";
import React, {useMemo} from "react";
import {useRequest} from "ahooks";
import {getContributors} from "@site/src/api/contributor";
import {chunk} from "lodash-es";
import {Button} from "@site/src/components/ui/Button";

import {cn} from "@site/src/utils/class-utils";
import {useQuery} from "react-query";
import Spinner from "@site/src/components/ui/Spinner";

const ContributorList = () => {
    const size = useBreakpoint();

    const {data, isLoading} = useQuery('contributors', () => getContributors())

    const showCount = useMemo(() => {
        switch (size) {
            case 'md':
                return 4;
            default:
                return 8;
        }
    }, [size])

    const showColumnCount = useMemo(() => {
        switch (size) {
            case 'md':
                return 3;
            default:
                return 2;
        }
    }, [size])


    const userChunks = useMemo(() => {
        return chunk(data, showCount);
    }, [data, showCount])

    return (
        <Spinner loading={isLoading}>
            <div className="bg-background border-border border rounded-md overflow-hidden">
                <table className="border-collapse">
                    <tbody>
                    {userChunks.slice(0, showColumnCount).map((chunk, index) => (
                        <tr key={`tr_${index}`} className="border-0">
                            {
                                chunk.map((user, index) => (
                                    <td
                                        key={user.id}
                                        className={
                                            cn(
                                                "w-[95px] h-[120px] bg-card border-r-0 border-b border-t-0 border-l-0 border-border",
                                                {"border-r": index !== chunk.length - 1}
                                            )
                                        }
                                    >
                                        <img className="w-[64px] h-[64px] rounded-full" src={user.avatar_url}
                                             alt={user.login}/>
                                        <div className="w-[64px] mt-[6px] text-sm truncate">{user.login}</div>
                                    </td>
                                ))
                            }
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex justify-center mb-4">
                    {userChunks && userChunks.length ? <Button className="bg-other1 text-other1-foreground">Expand All Contributors</Button> : <></>}
                </div>
            </div>
        </Spinner>
    )
}

export default ContributorList;
