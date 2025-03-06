// app/page.tsx
import Link from 'next/link';
import { client } from '../libs/microcms';
import Header from '@/components/Header/page';

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
      <h1 className="text-3xl font-bold text-center">ブログ記事一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className='p-2'>
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5> {/* タイトルを表示 */}
              <button >
                <Link href={`/blog/${post.id}`}> {/* 記事へのリンクを生成 */}
                  <h5 className='text-gray font-bold'>続きを読む</h5>
                </Link>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}