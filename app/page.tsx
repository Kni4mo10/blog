// app/page.tsx
import Link from 'next/link';
import { client } from '../libs/microcms';
import Header from '@/components/Header/page';
import Footer from '@/components/Footer/page';
import Side from '@/components/Side/page';


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
      <h1 className="text-3xl font-bold text-center text-black mt-5 mr-70">ブログ記事一覧</h1>
      <ul className='mt-5 ml-10 '>
        {posts.map((post) => (
          <li key={post.id} className='p-2'>
            <Link href={`/blog/${post.id}`}> {/* 記事へのリンクを生成 */}
              <div className="block max-w-3xl p-6 bg-white 
              rounded-lg shadow-md hover:bg-gray-100 
              hover:bg-gray-100 dark:bg-white 
              dark:border-gray-400 dark:hover:bg-gray-400">
                <h4 className="mb-2 text-xl font-bold 
                tracking-tight text-gray-900 
                dark:text-black">{post.title}
                </h4> {/* タイトルを表示 */}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Footer />
    </main>
  );
}