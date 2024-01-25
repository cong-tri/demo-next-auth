// import { getCookie, getServerSide } from '@/app/services'
// import Title from 'antd/es/typography/Title'
// import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

// type Repo = {
//     id: number
//     name: string
//     password: string
//     email: string
// }
// export const getServerSideProps = (async (): Promise<any | undefined> => {
//     // const res = await fetch('https://api.github.com/repos/vercel/next.js')
//     // const repo: Repo = await res.json()
//     const { myData } = await getServerSide();
//     if (myData === undefined) return
//     const { sessionID, user } = myData;
//     const cookieClient = getCookie("Session%20ID");
//     if (sessionID !== cookieClient) return
//     return { props: { repo: user } }
// }) satisfies GetServerSideProps<{ repo: Repo }>

// export default function Page({
//     repo,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//     console.log(repo);

//     return (
//         <main>
//             {/* <p>{res}</p> */}
//             <Title>HELLO</Title>
//         </main>
//     )
// }