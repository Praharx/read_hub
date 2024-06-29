import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface CardProps {
  id: string;
  title: string;
  authorId: string;
  joker: number;
}

const Card: React.FC<CardProps> = ({ title, authorId,id , joker}) => {

  return (
    <Link href={`/blogs?id=${id}`}>
      <div>
        {
            <div
            className="flex mx-auto mt-8 w-[80%] p-4 my-2 border rounded-lg bg-white cursor-pointer hover:shadow-md transition-shadow duration-200"
            key={joker}>
            <div className="flex-1">
              
              <h2 className="text-lg font-bold">{title}</h2>
              
            </div>
            <div className="text-xl text-black">
              &rarr;
            </div>
          </div>
        }
    </div>
    </Link>
  );
};

export default Card;
