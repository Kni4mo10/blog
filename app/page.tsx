// app/page.tsx
import Link from 'next/link';
import { client } from '../libs/microcms';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import ParticlesBackground from '@/components/Particle/page';


// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
};

// microCMSからブログ記事を取得
async function getBlogPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: 'blog', // 'blog'はmicroCMSのエンドポイント名
    queries: {
      fields: 'id,title',  // idとtitleを取得
      limit: 5,  // 最新の5件を取得
    },
  });
  return data.contents;
}

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <main>
      <Header />
        <div className='flex'>
          <div className='w-110 flex-auto mr-5 ml-5'>
            <h1 className="text-3xl font-bold text-center text-black mt-5 ">ブログ記事一覧</h1>
            <ul className='mt-5 mb-20'>
              {posts.map((post) => (
                <li key={post.id} className='p-2'>
                  <Link href={`/blog/${post.id}`}> {/* 記事へのリンクを生成 */}
                    <div className="block max-w-5xl p-6 bg-white 
                    rounded-lg shadow-md hover:bg-green-100 
                    hover:bg-green-200 dark:bg-white 
                     dark:border-green-200 dark:hover:bg-green-200">
                      <h4 className="mb-2 text-xl font-bold 
                      tracking-tight text-gray-900 
                      dark:text-black">{post.title}
                      </h4> {/* タイトルを表示 */}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='w-10 flex-auto bg-black text-center'>
              <h1 className='text-3xl font-bold'>Profile</h1>
              <p>hello,world</p>
          </div>
        </div>
      <Footer />
    </main>
  );
}