import { useQuery } from 'react-query';
import './Wanted.css';

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
      <div className='criminal' key={item.id}>
        <div className='top_info'>
          <div className='image_frame'>
            <img src={item.images[0].large} alt={item.title} />
          </div>
          <div className='details'>
            <h2>{item.title}</h2>
            <p>{item.dates_of_birth_used}</p>
          </div>
        </div>
        <div className='other_info'>
          <h3>Other info</h3>
        </div>
      </div>
    );
  });

  return (
    <section className='criminals'>{criminals}</section>
  );
}
