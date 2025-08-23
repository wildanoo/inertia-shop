import { Link } from '@inertiajs/react';

export default function PageTitle({
  title,
  btnLink,
  btnTitle,
  btnHandler,
  links = [],
}) {
  return (
    <div className='flex justify-between items-center'>
      <div>
        <h1 className='font-bold text-2xl'>{title}</h1>
        <div className='breadcrumbs text-sm'>
          <ul>
            <li>
              <Link href={route('dashboard.index')}>Dashboard</Link>
            </li>
            {links.map((link, index) => {
              if (link.active) {
                return <li key={index}>{link.title}</li>;
              }
              return (
                <li key={index}>
                  <Link href={link.url}>{link.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {btnLink && btnLink !== '#' && btnTitle && (
        <div>
          <Link className='btn btn-primary btn-sm btn-outline' href={btnLink}>
            {btnTitle}
          </Link>
        </div>
      )}
      {btnLink === '#' && btnTitle && btnHandler && (
        <div>
          <button
            onClick={btnHandler}
            className='btn btn-primary btn-sm btn-outline'
          >
            {btnTitle}
          </button>
        </div>
      )}
    </div>
  );
}
