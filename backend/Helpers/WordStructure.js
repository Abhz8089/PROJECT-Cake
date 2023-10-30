function capitalizeFirstLetter(name) {
 
  if (name.length === 0) {
    return name;
  }

  const firstLetter = name[0].toUpperCase();
  const restOfName = name.slice(1).toLowerCase();

  const convertedName = firstLetter + restOfName;

  return convertedName;
}
export {capitalizeFirstLetter}