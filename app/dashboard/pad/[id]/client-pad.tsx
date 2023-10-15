'use client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
export default function ClientPad({ email }: { email: any }) {
  const params = useParams();
  console.log(params.id, email);

  useEffect(() => {
    const getPad = async () => {
      const res = await fetch(`/api/pad/${params.id}/${email}`);
      // const data = await res.json();
      // console.log(data);
      const pad = await res.text();
    };
    getPad();
  }, [params.id, email]);

  return (
    <div>
      <h1>Client Pad</h1>
    </div>
  );
}
