import {Octokit} from '@octokit/rest'

const octokit = new Octokit();

export const getContributors = async (
    owner = 'wtfacademy',
    repo = 'WTFSolidity',
    page = 1,
    perPage = 100
) => {
    let {data} = await octokit.repos.listContributors({
        owner,
        repo,
        page,
        perPage
    })

    if (data.length === perPage) {
        data = [...data, ...(await getContributors(
            owner,
            repo,
            page + 1,
            perPage
        ))]
    }
    return data
}
