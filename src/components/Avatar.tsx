function Avatar({ fullname } : { fullname : string }) {
  const initials = fullname
    ? fullname
        .toString()
        .split(' ')
        .map((name) => name.charAt(0))
        .join('')
    : '';

  return (
    <div className='avatar'>
      <div className='bg-gray-600 h-10 w-10 rounded-full grid place-items-center'>
        {initials}
      </div>
    </div>
  );
}

export default Avatar;
