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
    const languages = [];
    item.languages &&
    item.languages.forEach((language) => {
      languages.push(
        <li>{language}</li>
      );
    });

    criminals.push(
      <div className='criminal' key={item.id}>
        <div className='top_info'>
          <div className='image_frame'>
            <img src={item.images[0].large} alt={item.title} />
          </div>
          <div className='details'>
            <h2>{item.title}</h2>
            <p>Sex: {item.sex ? item.sex : '???'}</p>
            <p>Date of birth: {item.dates_of_birth_used ? item.dates_of_birth_used[0] : '???'}</p>
          </div>
        </div>
        <div className='other_info'>
          <h3>Other info</h3>
          <p>Nationality: {item.nationality ? item.nationality : '???'}</p>
          <p>Hair: {item.hair ? item.hair : '???'}</p>
          <p>Occupations: {item.occupations ? item.occupations : '???'}</p>
          <p>Race: {item.race_raw ? item.race_raw : '???'}</p>
          <p>Hair raw: {item.hair_raw ? item.hair_raw : '???'}</p>
          <div className='languages'>
            <h4>Languages</h4>
            {item.languages ? <ul>{languages}</ul> : <p>???</p>}
          </div>
        </div>
      </div>
    );
  });

  return (
    <section className='criminals'>{criminals}</section>
  );
}
