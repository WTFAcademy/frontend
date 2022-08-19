import { Octokit } from '@octokit/rest'

const octokit = new Octokit();

export async function GetContributors() {
    const {data} = await octokit.repos.listContributors({
        owner:  'wtfacademy',
        repo: 'WTFSolidity'
    })
    return data
}