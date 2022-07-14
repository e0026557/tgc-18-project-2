export default function validateEmail(email) {
  let regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi);

  if (email.match(regex)) {
    return true;
  }
  return false;
}