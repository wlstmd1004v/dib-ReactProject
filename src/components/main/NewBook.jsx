import ScrollButton from '../common/ScrollButton';
import { useEffect,useState } from 'react';
import { pb } from '@/api/pocketbase';
import { getPbImageURL } from '@/utils/getPbImageURL';

function NewBook() {
  const [data, setData] = useState([]);

  useEffect(() => {
    pb.autoCancellation(false);
    async function fetchNewBooks() {
      const newRecords = await pb.collection('posts').getFullList({
        sort: '-created',
      });
    
      setData(newRecords);
    }
    fetchNewBooks();
  }, []);
  {
  return (
    <>
      <section className="text-center relative w-[1920px] h-[670px] m-auto">
        <h2 className="text-dibBlack text-[32px] not-italic font-normal leading-[normal] tracking-[-1.5px] m-5">
          신규 도서
        </h2>
        <strong className="text-dibBlack text-[20px] not-italic font-normal">
          새롭게 소개하는 도서를 여기서 만나보세요!
        </strong>
        <div className="w-[1200px] mx-auto">
          <ul className="flex justify-center gap-6 my-10">     
          {data.map((item) => (
                <li key={item.id}>
                  {/* 이미지와 제목 출력 */}
                  <img src={getPbImageURL(item, 'book_image')} alt={item.book_title} />
                  <span>{item.book_title}</span>
                  <span>{item.id}</span>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <ScrollButton />
        </div>
      </section>
    </>
  );
}
}

export default NewBook;