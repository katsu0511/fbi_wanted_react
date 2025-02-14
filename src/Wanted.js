import { useQuery } from 'react-query';

const fetchWantedCriminals = async () => {
  const res = await fetch(`https://api.fbi.gov/wanted/v1/list`);
  if (res.ok){ return res.json(); }
  throw new Error(res.statusText);
};

export default function Wanted() {
  const { data } = useQuery('criminals', fetchWantedCriminals);
  const criminals = [];

  data.items.forEach((item) => {
    criminals.push(
      <div className='criminal' key={item.uid}>
        <h2>{item.title}</h2>
        <p>{item.dates_of_birth_used}</p>
        <img src={item.images[0].large} alt={item.title} />
      </div>
    );
  });

  return (
    <section className='criminals'>{criminals}</section>
  );
}
