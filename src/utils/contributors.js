import {Octokit} from '@octokit/rest'

const octokit = new Octokit();

export async function GetContributors(
    owner = 'wtfacademy',
    repo = 'WTFSolidity',
    page = 1,
    per_page = 100
) {
    let {data} = await octokit.repos.listContributors({
        owner,
        repo,
        page,
        per_page
    })

    if (data.length === per_page) {
        data = [...data, ...(await GetContributors(
            owner,
            repo,
            page + 1,
            per_page
        ))]
    }
    return data
}