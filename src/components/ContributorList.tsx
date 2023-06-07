import useBreakpoint from "@site/src/hooks/useBreakpoint";
import React, {useMemo} from "react";
import {useRequest} from "ahooks";
import {getContributors} from "@site/src/api/contributor";
import {chunk} from "lodash-es";
import {Button} from "@site/src/components/ui/Button";

const ContributorList = () => {
    const size = useBreakpoint();

    const {data, loading} = useRequest(getContributors)

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
        <div className="bg-white border-border rounded">
            <table className="border-collapse">
                {userChunks.slice(0, showColumnCount).map((chunk) => (
                    <tr>
                        {
                            chunk.map(user => (
                                <td key={user.id} className="w-[95px] h-[120px] bg-card border border-border">
                                    <img className="w-[64px] h-[64px] rounded-full" src={user.avatar_url} alt={user.login} />
                                    <div className="w-[64px] mt-[6px] text-sm truncate">{user.login}</div>
                                </td>
                            ))
                        }
                    </tr>
                ))}
            </table>
            <div className="flex justify-center">
                <Button className="bg-other1 text-other1-foreground">Expand All Contributors</Button>
            </div>
        </div>
    )
}

export default ContributorList;
