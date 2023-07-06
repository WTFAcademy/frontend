import {Avatar, AvatarFallback, AvatarImage} from "@site/src/components/ui/Avatar";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@site/src/components/ui/DropdownMenu";
import useAuth from "@site/src/hooks/useAuth";
import {Button} from "@site/src/components/ui/Button";
import {LogOutIcon, UserIcon, WalletIcon} from "lucide-react";
import {useHistory} from "@docusaurus/router";
import Link from "@docusaurus/Link";
import {useAccount} from "wagmi";
import truncation from "@site/src/utils/truncation";
import {cn} from "@site/src/utils/class-utils"

type TProps = {
    mobile?: boolean
}

const Profile = (props: TProps) => {
    const {address} = useAccount();
    const {isLogin, isWalletLogin, data: user, signOut, signOutWithWallet} = useAuth();
    const history = useHistory();

    const handleSignOut = () => {
        signOut();
        history.push("/");
    }

    const renderWalletInfo = () => {
        if (user?.wallet) {
            return (
                <>
                    <DropdownMenuLabel className="flex items-center">
                        {truncation(user?.wallet)}
                        {/*复制*/}
                        {/*<UnplugIcon*/}
                        {/*    className="w-4 h-4 ml-2 hover:text-destructive cursor-pointer"*/}
                        {/*    onClick={signOutWithWallet}*/}
                        {/*/>*/}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                </>
            )
        }

        if (isLogin && !user?.wallet) {
            return (
                <DropdownMenuItem>
                    <WalletIcon className="w-4 h-4 mr-2"/>
                    绑定钱包
                </DropdownMenuItem>
            )
        }

        return <></>
    }

    if (!isLogin) {
        return (
            <Link to="/login">
                <Button className="h-9 mr-3">Login</Button>
            </Link>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn("relative h-8 w-8 rounded-full mr-3", {'hidden': props.mobile})}>
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user?.avatar} alt={user?.nickname}/>
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {renderWalletInfo()}
                <DropdownMenuItem>
                    <UserIcon className="w-4 h-4 mr-2"/>
                    <Link to="/personal">
                        个人中心
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={handleSignOut}>
                    <LogOutIcon className="w-4 h-4 mr-2"/>
                    <span>登出</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Profile
